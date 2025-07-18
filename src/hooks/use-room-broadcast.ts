import {
  RoomBroadcast,
  type PlayerInfo,
  type RoomEvent,
  type PingBroadcast,
} from "@/gen/file_pb";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@connectrpc/connect-query";
import { listMembers } from "@/gen/file-RoomService_connectquery";

const transport = createConnectTransport({
  baseUrl: "https://catan.bretteswebservices.fr/",
});
const client = createClient(RoomBroadcast, transport);

export function useRoomBroadcast(roomId: string | undefined) {
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const streamRef = useRef<any>(null);
  const eventsRef = useRef<RoomEvent[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Trigger re-renders manually
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [pingMap, setPingMap] = useState<Record<string, number>>({});

  const { data: listMembersResponse, refetch } = useQuery(listMembers, {
    roomId,
  });

  useEffect(() => {
    if (listMembersResponse?.players.length) {
      setPlayers(listMembersResponse.players);
    }
  }, [listMembersResponse]);

  const scrollToBottom = useCallback(() => {
    chatScrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, []);

  useEffect(() => {
    if (!roomId) return;

    const streamRoomEvents = async () => {
      const stream = client.streamRoomEvents({ roomId });
      streamRef.current = stream;

      for await (const event of stream) {
        eventsRef.current.push(event);
        setUpdateTrigger((prev) => prev + 1); // Triggers rerender
        setTimeout(scrollToBottom, 100);

        switch (event.event.case) {
          case "playerJoined": {
            const newPlayer = event.event.value.player;
            if (!newPlayer) break;
            setPlayers((prev) => {
              const alreadyExists = prev.some(
                (p) => p.playerId === newPlayer.playerId
              );
              return alreadyExists ? prev : [...prev, newPlayer];
            });
            break;
          }
          case "playerLeft": {
            const leftPlayerId = event.event.value?.player?.playerId;
            if (!leftPlayerId) break;
            setPlayers((prev) =>
              prev.filter((p) => p.playerId !== leftPlayerId)
            );
            refetch();
            break;
          }
          case "pingBroadcast": {
            const ping = event.event.value as PingBroadcast;
            if (ping && ping.playerId && ping.latencyMs != null) {
              // Convert bigint → number (safe: ping is a few hundred ms at most)
              const latency =
                typeof ping.latencyMs === "bigint"
                  ? Number(ping.latencyMs)
                  : ping.latencyMs;

              setPingMap((prev) => ({
                ...prev,
                [ping.playerId]: latency,
              }));
            }
            break;
          }
        }
      }
    };

    streamRoomEvents();

    return () => {
      streamRef.current?.close?.();
    };
  }, [roomId, scrollToBottom]);

  const allEvents = useMemo(() => {
    return [...eventsRef.current];
  }, [updateTrigger]);

  return { allEvents, chatScrollRef, players, pingMap };
}

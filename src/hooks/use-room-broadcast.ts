import { RoomBroadcast, type PlayerInfo, type RoomEvent } from "@/gen/file_pb";
import { createConnectTransport } from "@connectrpc/connect-web";
import { createClient } from "@connectrpc/connect";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@connectrpc/connect-query";
import { listMembers } from "@/gen/file-RoomService_connectquery";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});
const client = createClient(RoomBroadcast, transport);

export function useRoomBroadcast(roomId: string | undefined) {
  const [players, setPlayers] = useState<PlayerInfo[]>([]);
  const streamRef = useRef<any>(null);
  const eventsRef = useRef<RoomEvent[]>([]);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Trigger re-renders manually
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const { data: listMembersResponse } = useQuery(listMembers, { roomId });

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
    return [...eventsRef.current]; // Always returns a fresh, stable copy
  }, [updateTrigger]); // Only recalculates when events actually change

  return { allEvents, chatScrollRef, players };
}

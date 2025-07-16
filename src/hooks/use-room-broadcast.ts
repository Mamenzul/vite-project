import {
  RoomBroadcast,
  type ChatMessageBroadcast,
  type PlayerInfo,
} from "@/gen/file_pb";
import { createConnectTransport } from "@connectrpc/connect-web";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@connectrpc/connect";
import { useEffect, useRef } from "react";

export function useRoomBroadcast(roomId: string | undefined) {
  const queryClient = useQueryClient();
  const streamRef = useRef<any>(null);

  useEffect(() => {
    if (!roomId) return;

    const transport = createConnectTransport({
      baseUrl: "http://localhost:8080", // adjust as needed
    });
    const client = createClient(RoomBroadcast, transport);

    const doStream = async () => {
      const stream = client.streamRoomEvents({ roomId });
      streamRef.current = stream;
      for await (const event of stream) {
        switch (event.event.case) {
          case "playerJoined":
            const playerJoined = event.event.value;
            if (!playerJoined.player) break;
            queryClient.setQueryData(
              ["listMembers", { roomId }],
              (oldData: PlayerInfo[]) => {
                return [...oldData, playerJoined.player!];
              }
            );
            break;
          case "playerLeft":
            const playerLeft = event.event.value;
            if (!playerLeft.player) break;
            queryClient.setQueryData(
              ["listMembers", { roomId }],
              (oldData: PlayerInfo[]) => {
                return oldData.filter(
                  (player) => player.playerId !== playerLeft.player!.playerId
                );
              }
            );
            break;
          case "chatMessageBroadcast":
            const chatMessage = event.event.value;
            queryClient.setQueryData(
              ["chatMessages", { roomId }],
              (oldData: ChatMessageBroadcast[]) => {
                return [...oldData, chatMessage];
              }
            );
            break;
        }
      }
    };

    doStream();

    return () => {
      if (streamRef.current) {
        streamRef.current.close?.();
      }
    };
  }, [roomId, queryClient]);
}

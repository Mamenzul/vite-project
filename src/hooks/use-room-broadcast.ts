import { RoomBroadcast } from "@/gen/file_pb";
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
          case "playerLeft":
            queryClient.invalidateQueries({
              queryKey: ["listMembers", { roomId }],
            });
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

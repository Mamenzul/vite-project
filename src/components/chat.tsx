import { useCallback, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { useNavigate, useParams } from "@tanstack/react-router";
import { usePlayerStore } from "@/store";
import { useRoomBroadcast } from "@/hooks/use-room-broadcast";
import { sendMessage } from "@/gen/file-RoomService_connectquery";
import { useMutation } from "@connectrpc/connect-query";
import { Loader2, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function Chat() {
  const navigate = useNavigate();
  const { roomId } = useParams({ strict: false });
  const playerStore = usePlayerStore();
  const player = playerStore.player;
  const [chatMessage, setChatMessage] = useState("");

  // Load player once on mount
  useEffect(() => {
    playerStore.loadPlayerStore();
  }, [playerStore]);

  if (!roomId || !playerStore.player) {
    navigate({ to: "/" });
    return null;
  }
  const { allEvents, chatScrollRef } = useRoomBroadcast(roomId);

  const sendMessageMutation = useMutation(sendMessage, {
    onSuccess: () => {
      setChatMessage("");
    },
  });

  const isSendingMessage = sendMessageMutation.isPending;

  const formatMessageTime = useCallback((timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const handleSendMessage = useCallback(() => {
    const message = chatMessage.trim();
    if (!message || !roomId || !player?.playerId) return;

    sendMessageMutation.mutate({
      roomId,
      playerId: player.playerId,
      message,
    });
  }, [chatMessage, roomId, player?.playerId, sendMessageMutation]);

  if (!roomId || !player) return null;
  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Chat</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Make sure ScrollArea has constrained height */}
        <ScrollArea className="flex-1 overflow-y-auto px-4">
          <div className="space-y-3 py-4" ref={chatScrollRef}>
            {allEvents.map((msg) => {
              const isYou =
                msg.event.value?.player?.playerId ===
                playerStore.player?.playerId;
              const key = `${msg.event.case}-${msg.event.value?.timestamp}-${msg.event.value?.player?.playerId}`;
              if (
                msg.event.case === "playerJoined" ||
                msg.event.case === "playerLeft"
              ) {
                return (
                  <div key={key} className="text-center">
                    <div className="text-xs text-muted-foreground italic">
                      {msg.event.value?.player?.playerName}{" "}
                      {msg.event.case === "playerJoined" ? "joined" : "left"}{" "}
                      the room
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={key}
                  className={`space-y-1 flex flex-col ${isYou ? "items-end" : "items-start"}`}
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span
                      className={`font-medium ${isYou ? "text-blue-600" : ""}`}
                    >
                      {isYou ? "You" : msg.event.value?.player?.playerName}
                    </span>
                    <span>
                      {formatMessageTime(Number(msg.event.value?.timestamp))}
                    </span>
                  </div>
                  <div
                    className={`text-sm px-3 py-2 rounded-lg max-w-[75%] break-words break-all overflow-hidden ${
                      isYou
                        ? "bg-blue-100 text-blue-900"
                        : "bg-muted/50 text-foreground"
                    }`}
                  >
                    {msg.event.value?.message}
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="border-t p-4 flex gap-2 items-center">
          <Textarea
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={isSendingMessage}
            className="flex-1 resize-none"
            maxLength={200}
            rows={1}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent newline
                handleSendMessage();
              }
            }}
          />
          <Button
            type="submit"
            disabled={!chatMessage.trim() || isSendingMessage}
            onClick={() => {
              handleSendMessage();
            }}
          >
            {isSendingMessage ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

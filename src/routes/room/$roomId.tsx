import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { leaveRoom, listMembers } from "@/gen/file-RoomService_connectquery";
import { useMutation, useQuery } from "@connectrpc/connect-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { Users, Copy, Crown, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import { usePlayerStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import clsx from "clsx";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/room/$roomId")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const playerStore = usePlayerStore();
  playerStore.loadPlayerStore();
  const [copied, setcopied] = useState(false);
  const { roomId } = useParams({ strict: false });
  if (!roomId || !playerStore.player) {
    navigate({ to: "/" });
    return null;
  }
  const { data: listMembersResponse } = useQuery(listMembers, { roomId });
  const leaveRoomMutation = useMutation(leaveRoom, {
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  const chatScrollRef = useRef<HTMLDivElement>(null);

  const players =
    listMembersResponse?.players.sort((a, b) => {
      if (a.isHost && !b.isHost) return -1;
      if (!a.isHost && b.isHost) return 1;
      return a.playerName.localeCompare(b.playerName);
    }) || [];
  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId);
  };

  const leaveGame = () => {
    leaveRoomMutation.mutate({
      roomId: roomId,
      playerId: playerStore.player!.playerId || "",
    });
  };
  const handleClick = () => {
    setcopied(true);

    copyRoomCode();

    // Reset after 2 seconds
    setTimeout(() => {
      setcopied(false);
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-4">
                      <Users className="h-5 w-5" />
                      Game Lobby
                    </CardTitle>
                    <CardDescription>
                      {players.length} player{players.length !== 1 ? "s" : ""}{" "}
                      in lobby
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className="font-mono text-lg px-3 py-1"
                    >
                      {roomId}
                    </Badge>
                    <motion.div
                      initial={{ scale: 1 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative inline-block"
                    >
                      <Button
                        onClick={handleClick}
                        variant={"outline"}
                        className={clsx(
                          "w-28 h-10 flex items-center justify-center gap-2 relative overflow-hidden",
                          copied ? "bg-green-600 text-white" : ""
                        )}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {!copied ? (
                            <motion.div
                              key="copy"
                              initial={{ opacity: 0, rotate: -45, scale: 0.5 }}
                              animate={{ opacity: 1, rotate: 0, scale: 1 }}
                              exit={{ opacity: 0, rotate: 45, scale: 0.5 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-1"
                            >
                              <Copy className="h-4 w-4" />
                              <span className="text-sm">Copy</span>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="copied"
                              initial={{ opacity: 0, y: -10, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.8 }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center gap-1"
                            >
                              <Check className="h-4 w-4" />
                              <span className="text-sm">Copied!</span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Background Pulse Effect */}
                        {copied && (
                          <motion.div
                            layoutId="pulse"
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 2.5, opacity: 0 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 bg-green-500 rounded-md z-0"
                          />
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {players.map((player) => (
                    <div
                      key={player.playerId}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 justify-between">
                          <span className="font-medium">
                            {player.playerName}
                          </span>
                          {player.isHost && (
                            <Badge variant="default" className="text-xs">
                              <Crown className="h-3 w-3 mr-1" />
                              Host
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="h-[500px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Chat</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 px-4" ref={chatScrollRef}>
                  <div className="space-y-3 pb-4">
                    {/* {room.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`${msg.type === "system" ? "text-center" : ""}`}
                      >
                        {msg.type === "system" ? (
                          <div className="text-xs text-muted-foreground italic">
                            {msg.message}
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-xs">
                              <span
                                className={`font-medium ${msg.playerId === currentUser.id ? "text-blue-600" : ""}`}
                              >
                                {msg.playerName}
                              </span>
                              <span className="text-muted-foreground">
                                {formatMessageTime(msg.timestamp)}
                              </span>
                            </div>
                            <div className="text-sm bg-muted/50 rounded-lg px-3 py-2">
                              {msg.message}
                            </div>
                          </div>
                        )}
                      </div>
                    ))} */}
                  </div>
                </ScrollArea>
                <div className="border-t p-4">
                  {/* <form onSubmit={sendMessage} className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Type a message..."
                      disabled={isSendingMessage}
                      className="flex-1"
                      maxLength={200}
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!chatMessage.trim() || isSendingMessage}
                    >
                      {isSendingMessage ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </form> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={leaveGame}>
            Leave Lobby
          </Button>

          {playerStore.player?.isHost && (
            <>
              <Button className="ml-auto" disabled={players.length < 2}>
                Start Game
              </Button>
            </>
          )}

          {!playerStore.player?.isHost && (
            <div className="ml-auto text-sm text-muted-foreground flex items-center">
              Waiting for host to start...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

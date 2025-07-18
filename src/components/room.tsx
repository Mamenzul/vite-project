import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { leaveRoom, ping } from "@/gen/file-RoomService_connectquery";
import { useMutation, useQuery } from "@connectrpc/connect-query";
import { useParams } from "@tanstack/react-router";
import { Users, Copy, Crown, Check, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "@tanstack/react-router";
import { usePlayerStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { useRoomBroadcast } from "@/hooks/use-room-broadcast";

export function Room() {
  const navigate = useNavigate();
  const playerStore = usePlayerStore();
  useEffect(() => {
    playerStore.loadPlayerStore();
  }, [playerStore]);
  const [copied, setCopied] = useState(false);
  const { roomId } = useParams({ strict: false });
  const [clientTimeUnixMillis, setClientTimeUnixMillis] = useState(
    BigInt(Date.now())
  );

  // Update it every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setClientTimeUnixMillis(BigInt(Date.now()));
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  if (!roomId || !playerStore.player) {
    navigate({ to: "/" });
    return null;
  }

  const leaveRoomMutation = useMutation(leaveRoom, {
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  useQuery(ping, {
    playerId: playerStore.player.playerId,
    roomId,
    clientTimeUnixMillis,
  });

  const { players, pingMap } = useRoomBroadcast(roomId);

  const leaveGame = () => {
    leaveRoomMutation.mutate({
      roomId: roomId,
      playerId: playerStore.player!.playerId || "",
    });
  };

  const copyRoomCode = useCallback(() => {
    navigator.clipboard.writeText(roomId);
  }, [roomId]);

  const handleClick = useCallback(() => {
    setCopied(true);
    copyRoomCode();

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copyRoomCode]);

  const sortedPlayers = useMemo(() => {
    return (
      players?.slice().sort((a, b) => {
        if (a.isHost && !b.isHost) return -1;
        if (!a.isHost && b.isHost) return 1;
        return a.playerName.localeCompare(b.playerName);
      }) || []
    );
  }, [players]);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-4">
              <Users className="h-5 w-5" />
              Game Lobby
            </CardTitle>
            <CardDescription>
              {sortedPlayers.length} player
              {sortedPlayers.length !== 1 ? "s" : ""} in lobby
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-block"
            >
              <Button
                onClick={handleClick}
                variant={"outline"}
                className={clsx(
                  "w-34 h-10 flex items-center justify-center gap-2 relative overflow-hidden",
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
                      <span className="text-sm">Copy Room ID</span>
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
          {sortedPlayers.map((player) => {
            const pingLatency = pingMap[player.playerId];
            return (
              <div
                key={player.playerId}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 justify-between">
                    <span className="font-medium">{player.playerName}</span>
                    {player.isHost && (
                      <Badge variant="default" className="text-xs">
                        <Crown className="h-3 w-3 mr-1" />
                        Host
                      </Badge>
                    )}
                  </div>
                </div>
                {/* Ping Badge */}
                <Badge
                  variant="secondary"
                  className="text-xs min-w-[40px] text-center"
                  title="Ping latency in milliseconds"
                >
                  {typeof pingLatency === "number" ? (
                    `${pingLatency} ms`
                  ) : (
                    <Loader2 className="animate-spin h-4 w-4 text-muted-foreground" />
                  )}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-3">
          <Button variant="outline" onClick={leaveGame}>
            Leave Lobby
          </Button>

          {playerStore.player?.isHost && (
            <>
              <Button className="ml-auto" disabled={sortedPlayers.length < 2}>
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
      </CardFooter>
    </Card>
  );
}

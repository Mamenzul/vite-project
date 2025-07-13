"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Users, Copy, Crown, UserPlus } from "lucide-react";
import { useMutation, useQuery } from "@connectrpc/connect-query";
import {
  createRoom,
  joinRoom,
  leaveRoom,
  listMembers,
} from "@/gen/file-RoomService_connectquery";
import { useRoomBroadcast } from "@/hooks/use-room-broadcast";

export default function Lobby() {
  const [gameState, setGameState] = useState<"menu" | "lobby">("menu");
  const [roomCode, setRoomCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [playerName, setPlayerName] = useState("");

  const { data: listMembersResponse } = useQuery(
    listMembers,
    { roomId: roomCode },
    {
      enabled: gameState === "lobby" && !!roomCode,
    }
  );
  const players = listMembersResponse?.players || [];

  const createRoomMutation = useMutation(createRoom, {
    onSuccess: (data) => {
      setRoomCode(data.roomId);
      setGameState("lobby");
    },
  });

  useRoomBroadcast(gameState === "lobby" ? roomCode : undefined);

  const joinRoomMutation = useMutation(joinRoom, {
    onSuccess: () => {
      setGameState("lobby");
    },
  });

  const leaveRoomMutation = useMutation(leaveRoom, {
    onSuccess: () => {
      setGameState("menu");
      setRoomCode("");
      setJoinCode("");
    },
  });

  function createGame() {
    if (!playerName.trim()) return;

    const newRoomCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    // Call the createRoom mutation
    createRoomMutation.mutate({
      roomName: newRoomCode,
      hostPlayerId: playerName.trim(),
      playerName: playerName.trim(),
    });
  }
  const joinGame = () => {
    if (!playerName.trim() || !joinCode.trim()) return;
    setRoomCode(joinCode);
    joinRoomMutation.mutate({
      roomId: joinCode.trim(),
      playerId: playerName.trim(),
      playerName: playerName.trim(),
    });
  };

  const leaveGame = () => {
    leaveRoomMutation.mutate({
      roomId: roomCode,
      playerId: playerName,
    });
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
  };
  const isHost = players.some((p) => p.isHost && p.playerName === playerName);

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Game Lobby</CardTitle>
            <CardDescription>Create or join a multiplayer game</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="playerName">Your Name</Label>
              <Input
                id="playerName"
                placeholder="Enter your name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <Button
                className="w-full"
                size="lg"
                onClick={createGame}
                disabled={!playerName.trim()}
              >
                <Users className="mr-2 h-4 w-4" />
                Create Game
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinCode">Room Code</Label>
                <Input
                  id="joinCode"
                  placeholder="Enter room code"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                />
              </div>

              <Button
                variant="outline"
                className="w-full bg-transparent"
                size="lg"
                onClick={joinGame}
                disabled={!playerName.trim() || !joinCode.trim()}
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Join Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Game Lobby
                </CardTitle>
                <CardDescription>
                  {players.length} player{players.length !== 1 ? "s" : ""} in
                  lobby
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="font-mono text-lg px-3 py-1"
                >
                  {roomCode}
                </Badge>
                <Button variant="outline" size="sm" onClick={copyRoomCode}>
                  <Copy className="h-4 w-4" />
                </Button>
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
                      <span className="font-medium">{player.playerName}</span>
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

        <div className="flex gap-3">
          <Button variant="outline" onClick={leaveGame}>
            Leave Lobby
          </Button>

          {isHost && (
            <>
              <Button className="ml-auto" disabled={players.length < 2}>
                Start Game
              </Button>
            </>
          )}

          {!isHost && (
            <div className="ml-auto text-sm text-muted-foreground flex items-center">
              Waiting for host to start...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

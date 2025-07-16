import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createRoom, joinRoom } from "@/gen/file-RoomService_connectquery";
import { useMutation } from "@connectrpc/connect-query";
import { Label } from "@radix-ui/react-label";
import { createFileRoute } from "@tanstack/react-router";
import { Users, UserPlus } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { usePlayerStore } from "@/store";
import { useState } from "react";
export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const playerStore = usePlayerStore();
  const navigate = useNavigate();
  const [joinCode, setJoinCode] = useState("");
  const [playerName, setPlayerName] = useState("");
  const createRoomMutation = useMutation(createRoom, {
    onSuccess: (data) => {
      navigate({
        to: `/room/${data.roomId}`,
        params: { roomId: data.roomId },
      });
    },
  });

  const joinRoomMutation = useMutation(joinRoom, {
    onSuccess: () => {
      navigate({
        to: `/room/${joinCode.trim()}`,
        params: { roomId: joinCode.trim() },
      });
    },
  });

  function createGame() {
    if (!playerName || playerName.trim() === "") return;
    const playerId = crypto.randomUUID();
    playerStore.setPlayer({
      playerName: playerName.trim(),
      $typeName: "lobby.PlayerInfo",
      playerId: playerId,
      isHost: true,
    });

    // Save player to local storage
    playerStore.savePlayerStore();
    // Call the createRoom mutation
    createRoomMutation.mutate({
      playerId: playerId,
      playerName: playerName.trim(),
    });
  }

  const joinGame = () => {
    if (!playerName || playerName.trim() === "" || joinCode.trim() === "")
      return;
    const playerId = crypto.randomUUID();
    playerStore.setPlayer({
      playerName: playerName.trim(),
      $typeName: "lobby.PlayerInfo",
      playerId: playerId,
      isHost: false,
    });
    // Save player to local storage
    playerStore.savePlayerStore();
    joinRoomMutation.mutate({
      roomId: joinCode.trim(),
      playerId: playerId,
      playerName: playerName.trim(),
    });
  };
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
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <Button
              className="w-full"
              size="lg"
              onClick={createGame}
              disabled={!playerName || playerName.trim() === ""}
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
              disabled={
                !playerName ||
                playerName.trim() === "" ||
                joinCode.trim() === ""
              }
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

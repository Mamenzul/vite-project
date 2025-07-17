import { createFileRoute } from "@tanstack/react-router";
import { Room } from "@/components/room";
import { Chat } from "@/components/chat";

export const Route = createFileRoute("/room/$roomId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Room />
          </div>
          <div className="lg:col-span-1">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

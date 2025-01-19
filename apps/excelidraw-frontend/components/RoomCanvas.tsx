"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";
import { toast } from "sonner";

export function RoomCanvas({
  roomId,
  token,
}: {
  roomId: string;
  token: string | null;
}) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  if(!token){
    toast.error(`TOKEN IS MISSING`, {
        position: "bottom-right",
        duration: 3000,
      });
  }
  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        type: "join_room",
        roomId,
      });
      toast.success(`connecting with the room - ${roomId}`, {
        position: "bottom-right",
        duration: 3000,
      });
      ws.send(data);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!socket) {
    return <div className="justify-center items-center flex">Connecting to server....</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}

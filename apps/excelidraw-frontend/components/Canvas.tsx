"use client";
import { initDraw } from "@/draw";
import { useRef, useEffect, useState } from "react";

export function Canvas({
  roomId,
  socket,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef<ReturnType<typeof initDraw>>();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket).then((drawInstance) => {
        drawRef.current = drawInstance;
      });
    }
  }, [canvasRef]);

  const setShapeType = (type: string | null) => {
    setSelectedTool(type);
    if (type) {
      drawRef.current?.setShapeType(type as Shape["type"]);
    }
  };

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} width={2000} height={1000}></canvas>
      <div className="absolute flex bottom-4 right-4 gap-2">
        <button
          onClick={() => setShapeType(null)}
          className={`p-2 rounded-full ${
            selectedTool === null ? "bg-gray-500" : "bg-gray-300"
          } text-white hover:bg-gray-400`}
        >
          Cursor
        </button>
        <button
          onClick={() => setShapeType("circle")}
          className={`p-2 rounded-full ${
            selectedTool === "circle" ? "bg-blue-500" : "bg-blue-300"
          } text-white hover:bg-blue-400`}
        >
          Circle
        </button>
        <button
          onClick={() => setShapeType("rect")}
          className={`p-2 rounded-full ${
            selectedTool === "rect" ? "bg-green-500" : "bg-green-300"
          } text-white hover:bg-green-400`}
        >
          Rectangle
        </button>
        <button
          onClick={() => setShapeType("line")}
          className={`p-2 rounded-full ${
            selectedTool === "line" ? "bg-red-500" : "bg-red-300"
          } text-white hover:bg-red-400`}
        >
          Line
        </button>
      </div>
    </div>
  );
}

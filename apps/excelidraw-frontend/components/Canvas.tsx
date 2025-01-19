import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";

export function Canvas({
  roomId,
  socket,
}: {
  socket: WebSocket;
  roomId: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedShape, setSelectedShape] = useState<
    "rect" | "circle" | "line"
  >("circle");

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket, selectedShape);
    }
  }, [canvasRef, roomId, socket, selectedShape]);

  const handleToolClick = (tool: "rect" | "circle" | "line") => {
    setSelectedShape(tool);
    console.log(`Selected tool: ${tool}`);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div className="absolute top-[10px] left-[50%] flex gap-[4] bg-[grey] p-4 rounded">
        <button
          onClick={() => handleToolClick("rect")}
          className="px-4 py-2 cursor-pointer border border-gray-300 rounded"
        >
          Rectangle
        </button>
        <button
          onClick={() => handleToolClick("circle")}
          className="px-4 py-2 cursor-pointer border border-gray-300 rounded"
        >
          Circle
        </button>
        <button
          onClick={() => handleToolClick("line")}
          className="px-4 py-2 cursor-pointer border border-gray-300 rounded"
        >
          Line
        </button>
      </div>

      <canvas ref={canvasRef} width={2000} height={1000}></canvas>
    </div>
  );
}

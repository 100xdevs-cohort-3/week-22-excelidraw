import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Minus, Plus, ZoomIn, ZoomOut, Hand, Grab, MousePointer, SquareDashedMousePointer, Eraser } from "lucide-react";
import {
    Circle,
    Pencil,
    Square,
} from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rect" | "pencil";

export const colors = [
    { hex: "#000000", name: "Black" },
    { hex: "#ff0000", name: "Red" },
    { hex: "#00ff00", name: "Green" },
    { hex: "#0000ff", name: "Blue" },
    { hex: "#ffff00", name: "Yellow" },
    { hex: "#ff00ff", name: "Magenta" },
    { hex: "#00ffff", name: "Cyan" },
    { hex: "#ffffff", name: "White" },
];

export function Canvas({
    roomId,
    socket,
}: {
    socket: WebSocket;
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("circle");
    const [selectedColor, setSelectedColor] = useState(colors[0]);
    const [strokeWidth, setStrokeWidth] = useState<number>(1);

    useEffect(() => {
        game?.setTool(selectedTool);
    }, [selectedTool, game]);

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy();
            };
        }
    }, [canvasRef]);

    return (
        <div
            style={{
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
            >
            </canvas>
            <Topbar
                setSelectedTool={setSelectedTool}
                selectedTool={selectedTool}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                strokeWidth={strokeWidth}
                setStrokeWidth={setStrokeWidth}
            />
        </div>
    );
}

function Topbar(
    {
        selectedTool,
        setSelectedTool,
        selectedColor,
        setSelectedColor,
        strokeWidth,
        setStrokeWidth,
    }: {
        selectedTool: Tool;
        setSelectedTool: (s: Tool) => void;
        selectedColor: { hex: string; name: string };
        setSelectedColor: (s: { hex: string; name: string }) => void;
        strokeWidth: number;
        setStrokeWidth: (s: number) => void;
    },
) {
    return (
        <div
            style={{
                position: "fixed",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)",
            }}
        >
            <div className="flex gap-t items-center justify-center bg-slate-950 border border-gray-700 rounded-2xl px-4">
                <div className="flex gap-4 m-2">
                    <MousePointer className="text-gray-400 text-sm" />
                    <Hand className="text-gray-400 text-sm" />
                    <Eraser className="text-gray-400 text-sm" />
                </div>
                
                <IconButton
                    onClick={() => {
                        setSelectedTool("pencil");
                    }}
                    activated={selectedTool === "pencil"}
                    icon={<Pencil />}
                />
                <IconButton
                    onClick={() => {
                        setSelectedTool("rect");
                    }}
                    activated={selectedTool === "rect"}
                    icon={<Square />}
                >
                </IconButton>

                <IconButton
                    onClick={() => {
                        setSelectedTool("circle");
                    }}
                    activated={selectedTool === "circle"}
                    icon={<Circle />}
                >
                </IconButton>
                <label htmlFor="color" className="text-gray-100 font-medium pr-2">
                    Stroke color 
                </label>
                <select
                    id="color"
                    value={selectedColor.hex}
                    onChange={(e) =>
                        setSelectedColor(
                            colors.find((color) =>
                                color.hex === e.target.value
                            ) || colors[0],
                        )}
                    style={{
                        backgroundColor: selectedColor.hex,
                        cursor: "pointer",
                    }}
                    className="rounded-xl border border-gray-700 py-1 text-gray-200"
                >
                    {colors.map((color) => (
                        <option key={color.hex} value={color.hex}>
                            {color.name}
                        </option>
                    ))}
                </select>
                <div className="flex gap-1 pl-4">
                    <label className="text-gray-100 text-md font-medium">
                        Stroke width
                    </label>
                    <div className="flex gap-1">
                        <Plus
                            onClick={() => setStrokeWidth(strokeWidth + 1)}
                            className="border border-gray-800 rounded-md text-gray-200"
                        />
                        <Minus
                            onClick={() => setStrokeWidth(strokeWidth - 1)}
                            className="border border-gray-800 rounded-md text-gray-200"
                        />
                        <span className="font-medium font-sans text-gray-100">{strokeWidth}px</span>
                    </div>
                    <div className="flex gap-2 pl-5">
                        <span className="font-medium text-md font-sans text-gray-100">Zoom</span>
                        <ZoomIn
                            className="rounded-md text-gray-200"
                        />
                        <ZoomOut
                            className="rounded-md text-gray-200"
                        />
                        <SquareDashedMousePointer className="rounded-md text-gray-200" />
                    </div>
                </div>
            </div>
        </div>
    );
    
}

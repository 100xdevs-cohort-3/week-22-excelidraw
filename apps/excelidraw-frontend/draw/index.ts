import { HTTP_BACKEND } from "@/config";
import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: "line";
      startX: number;
      startY: number;
      endX: number;
      endY: number;
    };

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
  selectedShape: "rect" | "circle" | "line"
) {
  const ctx = canvas.getContext("2d");

  let existingShapes: Shape[] = await getExistingShapes(roomId);

  if (!ctx) {
    return;
  }

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);

    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape.shape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  clearCanvas(existingShapes, canvas, ctx);
  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.clientX;
    startY = e.clientY;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const endX = e.clientX;
    const endY = e.clientY;

    let shape: Shape;

    if (selectedShape === "rect") {
      shape = {
        type: "rect",
        x: startX,
        y: startY,
        width: endX - startX,
        height: endY - startY,
      };
    } else if (selectedShape === "circle") {
      const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
      shape = {
        type: "circle",
        centerX: startX,
        centerY: startY,
        radius,
      };
    } else {
      shape = {
        type: "line",
        startX,
        startY,
        endX,
        endY,
      };
    }

    existingShapes.push(shape);

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId,
      })
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const endX = e.clientX;
      const endY = e.clientY;
      clearCanvas(existingShapes, canvas, ctx);

      ctx.strokeStyle = "rgba(255, 255, 255)";
      if (selectedShape === "rect") {
        ctx.strokeRect(startX, startY, endX - startX, endY - startY);
      } else if (selectedShape === "circle") {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
    }
  });
}

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShapes.forEach((shape) => {
    ctx.strokeStyle = "rgba(255, 255, 255)";
    if (shape.type === "rect") {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      ctx.beginPath();
      ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape.type === "line") {
      ctx.beginPath();
      ctx.moveTo(shape.startX, shape.startY);
      ctx.lineTo(shape.endX, shape.endY);
      ctx.stroke();
    }
  });
}

async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData.shape;
  });

  return shapes;
}

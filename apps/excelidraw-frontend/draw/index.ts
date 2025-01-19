import { HTTP_BACKEND } from "@/config";
import axios from "axios"
type Shape =
    | { type: "rect"; x: number; y: number; width: number; height: number }
    | { type: "circle"; centerX: number; centerY: number; radius: number }
    | { type: "line"; startX: number; startY: number; endX: number; endY: number };
    export async function initDraw(
        canvas: HTMLCanvasElement,
        roomId: string,
        socket: WebSocket
      ) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
      
        let existingShapes: Shape[] = await getExistingShapes(roomId);
      
        let clicked = false;
        let startX = 0;
        let startY = 0;
        let currentShapeType: Shape["type"] | null = null; 
      
        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          if (message.type === "chat") {
            const parsedShape = JSON.parse(message.message);
            existingShapes.push(parsedShape.shape);
            clearCanvas(existingShapes, canvas, ctx);
          }
        };
      
        clearCanvas(existingShapes, canvas, ctx);
      
        canvas.addEventListener("mousedown", (e) => {
          if (!currentShapeType) return; 
      
          clicked = true;
          startX = e.offsetX;
          startY = e.offsetY;
        });
      
        canvas.addEventListener("mouseup", (e) => {
          if (!clicked || !currentShapeType) return; 
      
          clicked = false;
      
          const endX = e.offsetX;
          const endY = e.offsetY;
      
          let shape: Shape;
      
          if (currentShapeType === "rect") {
            shape = {
              type: "rect",
              x: startX,
              y: startY,
              width: endX - startX,
              height: endY - startY,
            };
          } else if (currentShapeType === "circle") {
            const radius = Math.sqrt(
              Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
            );
            shape = {
              type: "circle",
              centerX: startX,
              centerY: startY,
              radius,
            };
          } else if (currentShapeType === "line") {
            shape = {
              type: "line",
              startX,
              startY,
              endX,
              endY,
            };
          } else {
            console.error("Unsupported shape type");
            return;
          }
      
          existingShapes.push(shape);
      
          socket.send(
            JSON.stringify({
              type: "chat",
              message: JSON.stringify({ shape }),
              roomId,
            })
          );
      
          clearCanvas(existingShapes, canvas, ctx);
        });
      
        canvas.addEventListener("mousemove", (e) => {
          if (!clicked || !currentShapeType) return;
      
          clearCanvas(existingShapes, canvas, ctx);
      
          const endX = e.offsetX;
          const endY = e.offsetY;
      
          if (currentShapeType === "rect") {
            ctx.strokeStyle = "white";
            ctx.strokeRect(startX, startY, endX - startX, endY - startY);
          } else if (currentShapeType === "circle") {
            const radius = Math.sqrt(
              Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
            );
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            ctx.stroke();
          } else if (currentShapeType === "line") {
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
          }
        });
      
        return {
          setShapeType: (type: Shape["type"]) => {
            currentShapeType = type; 
          },
        };
      }
      
  function clearCanvas(
    existingShapes: Shape[],
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    existingShapes.forEach((shape) => {
        if (shape.type === "rect") {
            ctx.strokeStyle = "white";
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
            ctx.strokeStyle = "white";
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
            ctx.stroke();
        } else if (shape.type === "line") {
            ctx.strokeStyle = "white";
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
  
import express from "express";
import { prismaClient } from "@repo/db/client";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import roomRoutes from "./routes/room.js";

const app = express();
app.use(express.json());
app.use(cors());

// app.use(routes);
app.use("/auth", authRoutes);
app.use(roomRoutes);

app.get("/chats/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);
    console.log(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 50,
    });

    res.json({
      messages,
    });
  } catch (e) {
    console.log(e);
    res.json({
      messages: [],
    });
  }
});

app.use((req: Request, res: any, next: any, err: any) => {
  console.log(
    "--------------------------------------error middleware ----------------------------------"
  );
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(3001);

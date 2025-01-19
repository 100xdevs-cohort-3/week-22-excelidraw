import express, { Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { AuthenticatedRequest, middleware } from "./middleware";
import {
  CreateUserSchema,
  SigninSchema,
  CreateRoomSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/v1/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    console.log(parsedData.error);
    res.json({
        success: false,
      message: "Incorrect inputs",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.email,
        password: hashedPassword,
        name: parsedData.data.username,
      },
    });
    res.json({
      success: true,
      message: "User created successfully",
      userId: user.id,
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exists with this username",
    });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      success: false,
      message: "Incorrect inputs",
    });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.email,
    },
  });

  if (!user) {
    res.status(403).json({
      success: false,
      message: "Not authorized",
    });
    return;
  }

  const checkPassword = await bcrypt.compare(
    parsedData.data.password,
    user.password
  );
  if (!checkPassword) {
    res.status(403).json({
      success: false,
      message: "Not authorized - incorrect password",
    });
    return;
  }
  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  );

  res.json({
    success: true,
    message: "Login Successfully",
    token,
  });
});

app.post(
  "/api/v1/room",
  middleware,
  async (req: AuthenticatedRequest, res: Response) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.json({
        success: false,
        message: "Incorrect inputs",
      });
      return;
    }

    const userId = req.userId;
    if (!userId) {
      res.status(403).json({
        success: false,
        message: "Not authorized",
      });
      return;
    }

    try {
      const room = await prismaClient.room.create({
        data: {
          slug: parsedData.data.name,
          adminId: userId,
        },
      });

      res.json({
        success: true,
        roomId: room.id,
        message: "Room has been created",
      });
    } catch (e) {
      res.status(411).json({
        message: "Room already exists with this name",
      });
    }
  }
);

app.get("/api/v1/chats/:roomId", async (req, res) => {
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

app.get("/api/v1/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });

  res.json({
    room,
  });
});

const PORT = 3001; // env
app.listen(PORT , () => {
    console.log("Server started at port : " , PORT);
});

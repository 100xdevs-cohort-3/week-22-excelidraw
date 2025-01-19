import { Request, Response, NextFunction } from "express";
import { CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

export const createRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Entering createRoom endpoint");
  const parsedData = CreateRoomSchema.safeParse(req.body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid room data",
      errors: parsedData.error.format(),
    });
    return;
  }

  // @ts-ignore
  const userId = req.userId;

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });

    res.status(201).json({
      message: "Room created successfully",
      roomId: room.id,
    });
  } catch (e: any) {
    console.error("Error creating room:", e);

    if (e.code === "P2002") {
      res.status(409).json({
        message: "A room with this name already exists",
      });
    } else {
      next(e);
    }
  }
};

export const roomCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Entering roomCheck endpoint");
  const { roomId } = req.body;

  const parsedRoomId = Number(roomId);
  if (isNaN(parsedRoomId)) {
    res.status(400).json({
      message: "Invalid Room ID format",
    });
    return;
  }

  try {
    const room = await prismaClient.room.findFirst({
      where: { id: parsedRoomId },
      select: { id: true, slug: true },
    });

    if (!room) {
      res.status(404).json({
        message: "Room does not exist with this ID",
      });
      return;
    }

    res.status(200).json({
      message: "Room found",
      roomId: room.id,
      roomSlug: room.slug,
    });
  } catch (e: any) {
    console.error("Error checking room:", e);
    res.status(500).json({
      message: "An error occurred while checking the room",
    });
  }
};


export const getRoomBySlug = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log("Entering getRoomBySlug endpoint");
    const { slug } = req.params;
  
    try {
      const room = await prismaClient.room.findFirst({
        where: { slug },
      });
  
      if (!room) {
        res.status(404).json({
          message: `Room with slug '${slug}' not found`,
        });
        return;
      }
  
      res.status(200).json({
        message: "Room found",
        room,
      });
    } catch (e: any) {
      console.error("Error fetching room by slug:", e);
      res.status(500).json({
        message: "An error occurred while fetching the room",
      });
    }
  };
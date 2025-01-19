import express, { Router } from "express";
import {
  createRoom,
  getRoomBySlug,
  roomCheck,
} from "../controllers/roomController.js";

const router: Router = express.Router();

router.post("/room-check", roomCheck);

router.post("/create-room", createRoom);

router.get("/room/:slug", getRoomBySlug);

export default router;

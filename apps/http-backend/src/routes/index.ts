import express, { Router } from "express";
import authRoutes from "./auth.js";
const router: Router = express.Router();

router.use("/auth", authRoutes);

export default router;

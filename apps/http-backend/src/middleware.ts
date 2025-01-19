import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export function middleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["authorization"]?.split(" ")[1];
//   console.log("token in middleware", token);
  if (!token) {
    console.log('unauthroized token')
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
  try {
    // console.log('decoding token')
    const decoded = jwt.verify(token, JWT_SECRET);
    // console.log("decoded", decoded);

    // console.log('settin user Id in req')
    // @ts-ignore: TODO: Fix this
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("Unauthorized access", error);
    res.status(403).json({
      message: "Unauthorized, invalid token",
    });
  }
}

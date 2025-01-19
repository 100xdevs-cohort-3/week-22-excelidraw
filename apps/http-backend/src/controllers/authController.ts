import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
import { throwError } from "../helper.js";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    return throwError(400, "Invalid signup data");
  }

  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });

    res.status(201).json({ userId: user.id });
  } catch (e: any) {
    console.log("eror during signup:", e);
    next(e);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsedData = SigninSchema.safeParse(req.body);
  if (!parsedData.success) {
    return throwError(400, "Invalid signin data");
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: { email: parsedData.data.email },
    });

    if (!user) {
      return throwError(401, "User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );

    if (!isPasswordValid) {
      return throwError(401, "Invalid password");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (e: any) {
    console.log("Error .:", e);
    next(e);
  }
};

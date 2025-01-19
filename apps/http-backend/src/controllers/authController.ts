import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema, SigninSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("in sigup", req.body);
  console.log(req.body);
  const parsedData = CreateUserSchema.safeParse(req.body);
  console.log("parseData", parsedData);
  if (!parsedData.success) {
    res.status(400).json({ message: "invalid signup data" });
    return;
  }

  console.log("parsedData", parsedData);

  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    console.log("hashedPassword", hashedPassword);
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        name: parsedData.data.name,
      },
    });

    console.log("user", user);

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
    res.status(400).json({ message: "Invalid signin data" });
    return;
    // throw throwError(400, "Invalid signin data");
  }

  try {
    const user = await prismaClient.user.findFirst({
      where: { email: parsedData.data.email },
    });

    if (!user) {
      res.status(401).json({ message: "User does not exist" });
      return;
      //   throw throwError(401, "User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(
      parsedData.data.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "100h",
    });

    res.status(200).json({ message: "Signin successful", token });
  } catch (e: any) {
    console.log("Error .:", e);
    next(e);
  }
};

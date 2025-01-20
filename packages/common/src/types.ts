import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(3).max(20),
    password: z.string(),
    email: z.string()
})

export const SigninSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20),
})

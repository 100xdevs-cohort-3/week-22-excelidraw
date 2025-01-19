import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z.any(),
    password: z.string(),
    name: z.string()
})

export const SigninSchema = z.object({
    email: z.any(),
    password: z.string(),
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20),
})

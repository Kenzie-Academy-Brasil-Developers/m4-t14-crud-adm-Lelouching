import { z } from "zod"
import { hashSync } from "bcryptjs"

export const createUserSchema = z.object({
    email: z.string().email().max(100),
    name: z.string().min(3).max(20),
    password: z.string().max(120).transform((password: string) => {
        return hashSync(password, 10)
    })
})

export const updateUserSchema = z.object({
    email: z.string().email().max(100),
    name: z.string().min(3).max(20),
    password: z.string().max(120)
})

export const patchUserSchema = z.object({
    email: z.string().email().max(100).optional(),
    name: z.string().min(3).max(20).optional(),
    password: z.string().max(120).transform((password: string) => {
        return hashSync(password, 10)
    }).optional()
})
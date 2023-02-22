import { z } from "zod";

export const userLoginSchema = z.object({
    email: z.string().email().max(100),
    password: z.string().max(120)
})
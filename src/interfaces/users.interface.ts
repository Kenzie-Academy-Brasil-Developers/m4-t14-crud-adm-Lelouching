import { QueryResult } from "pg"
import { z } from "zod"
import { createUserSchema } from "../schemas/users.schema"

export type iUserCreate = z.infer<typeof createUserSchema>

export interface iUserCreated extends iUserCreate {
    id: number,
    admin: boolean,
    active: boolean
}

export type iUserWithoutPassword = Omit<iUserCreated, "password">

export type iUserInfoResult = QueryResult<iUserCreated>
export type iUserInfoWithoutPasswordResult = QueryResult<iUserWithoutPassword>

export type iCreateUserRequiredKeys = "name" | "email" | "password"
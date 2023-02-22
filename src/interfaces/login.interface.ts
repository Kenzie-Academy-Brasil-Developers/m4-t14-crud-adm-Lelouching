import { QueryResult } from "pg"
import { z } from "zod"
import { userLoginSchema } from "../schemas/login.schema"

export type iUserLogin = z.infer<typeof userLoginSchema>

export type iUserLoginResult = QueryResult<iUserLogin>
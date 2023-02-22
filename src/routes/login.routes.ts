import { ifUserIsFound } from "./../middlewares/login.middlewares"
import { userLoginSchema } from "../schemas/login.schema"
import { loginUser } from "./../controllers/login.controllers"
import { Router } from "express"

export const loginRoute: Router = Router()

loginRoute.post("", ifUserIsFound(userLoginSchema), loginUser)


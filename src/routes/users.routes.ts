import { recoverUser } from "./../controllers/users.controllers"
import { ifEmailExists, ifHasPermission, ifIdExists, ifIsAdmin, validateToken } from "./../middlewares/users.middlewares"
import { Router } from "express"
import { allUsers, createUser, deleteUser, retrieveUser, updateUser } from "../controllers/users.controllers"
import { createUserSchema, patchUserSchema } from "../schemas/users.schema"

export const usersRoute: Router = Router()

usersRoute.post("", ifEmailExists(createUserSchema), createUser)
usersRoute.get("/profile", validateToken, retrieveUser)
usersRoute.get("", validateToken, ifIsAdmin, allUsers)
usersRoute.patch("/:id", validateToken, ifHasPermission, ifIdExists, ifEmailExists(patchUserSchema), updateUser)
usersRoute.delete("/:id", validateToken, ifHasPermission, ifIdExists, deleteUser)
usersRoute.put("/:id/recover", validateToken, ifIsAdmin, ifIdExists, recoverUser)
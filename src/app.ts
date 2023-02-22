import "express-async-errors"
import { loginRoute } from "./routes/login.routes"
import express, { Application } from "express"
import { usersRoute } from "./routes/users.routes"
import { handleErrors } from "./errors"

export const app: Application = express()
app.use(express.json())

app.use("/users", usersRoute)
app.use("/login", loginRoute)

app.use(handleErrors)
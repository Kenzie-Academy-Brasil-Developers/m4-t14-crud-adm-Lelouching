import { recoverUserService } from "./../services/users/recoverUser.service"
import { patchUserService } from "./../services/users/patchUser.service"
import { allUsersService } from "./../services/users/allUsers.service"
import { iUserWithoutPassword } from "./../interfaces/users.interface"
import { Request, Response } from "express"
import { creatingUser } from "../services/users/userCreate.service"
import { deleteUserService } from "../services/users/deleteUser.service"

export const createUser = async (req: Request, res: Response): Promise<Response> => {
    const user: iUserWithoutPassword = await creatingUser(req.body)

    return res.status(201).json(user)
}

export const retrieveUser = async (req: Request, res: Response): Promise<Response> => {
    const user: iUserWithoutPassword = req.userInfo

    return res.status(200).json(user)
}

export const allUsers = async (req: Request, res: Response): Promise<Response> => {
    const users: iUserWithoutPassword[] = await allUsersService()

    return res.status(200).json(users)
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    const user: iUserWithoutPassword = await patchUserService(req.body, Number(req.params.id))

    return res.status(200).json(user)
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    await deleteUserService(Number(req.params.id))

    return res.status(204).send()
}

export const recoverUser = async (req: Request, res: Response): Promise<Response> => {
    const user: iUserWithoutPassword = await recoverUserService(Number(req.params.id))

    return res.status(200).json(user)
}
import { ifIdExistsService } from "./../services/users/ifIdExists.service"
import { retrieveUserService } from "./../services/users/retrieveUser.service"
import { iUserCreate, iUserWithoutPassword } from "./../interfaces/users.interface"
import { AppError } from "./../errors"
import { NextFunction, Request, Response } from "express";
import { verifyUserEmail } from "../services/users/userEmailVerify.service";
import { ZodTypeAny } from "zod";

export const ifEmailExists = (schema: ZodTypeAny) => async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const validateBody: iUserCreate = await schema.parse(req.body)

    if(req.method === "PATCH" && req.baseUrl === "/users" && !validateBody.email){
        req.body = validateBody

        return next()
    }

    const verifiedEmail: number = await verifyUserEmail(validateBody.email)

    if(verifiedEmail > 0) {
        throw new AppError("Email already exists", 409)
    }

    req.body = validateBody

    return next()
}

export const validateToken = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const user = await retrieveUserService(req.headers.authorization)

    if(!user.active) {
        throw new AppError("The user is unactive", 401)
    }

    req.userInfo = user

    return next()
}

export const ifIsAdmin = (req: Request, res: Response, next: NextFunction): void | Response => {
    if(!req.userInfo.admin) {
        throw new AppError("Insufficient Permission", 403)
    }

    return next()
}

export const ifHasPermission = (req: Request, res: Response, next: NextFunction): void | Response => {
    if(Number(req.params.id) !== req.userInfo.id && !req.userInfo.admin) {
        throw new AppError("Insufficient Permission", 403)
    }

    return next()
}

export const ifIdExists = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const user: iUserWithoutPassword = await ifIdExistsService(Number(req.params.id))

    if(!user) {
        throw new AppError(`User with id ${req.params.id} does not exist`, 404)
    }

    if(req.method === "PUT" && user.active) {
        throw new AppError("User already active", 400)
    } 

    return next()
}
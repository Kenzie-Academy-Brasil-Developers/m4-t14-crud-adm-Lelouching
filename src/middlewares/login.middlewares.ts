import { ZodTypeAny } from "zod"
import { iUserLogin } from "./../interfaces/login.interface"
import { verifyUserEmail } from "./../services/users/userEmailVerify.service"
import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"

export const ifUserIsFound = (schema: ZodTypeAny) => async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const validateBody: iUserLogin = await schema.parse(req.body)

    const verifiedEmail: number = await verifyUserEmail(validateBody.email)

    if(verifiedEmail === 0) {
        throw new AppError("User not found", 404)
    }

    req.body = validateBody

    return next()
}
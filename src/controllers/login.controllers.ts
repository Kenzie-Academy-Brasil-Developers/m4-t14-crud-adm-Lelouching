import { userLoginService } from "./../services/login/userLogin.service"
import { Request, Response } from "express"

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const token: string = await userLoginService(req.body)

    return res.status(200).json({token})
}
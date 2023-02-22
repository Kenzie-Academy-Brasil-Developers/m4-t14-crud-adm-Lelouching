import { iUserInfoResult } from "./../../interfaces/users.interface"
import { AppError } from "./../../errors"
import { compare } from "bcryptjs";
import { QueryConfig } from "pg";
import { client } from "../../database/config.database";
import { iUserLogin, iUserLoginResult } from "../../interfaces/login.interface";
import { sign } from "jsonwebtoken";
import "dotenv/config"

export const userLoginService = async (userData: iUserLogin): Promise<string> => {
    const queryString: string = `
        SELECT
            *
        FROM
            "users"
        WHERE
            LOWER("email") = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userData.email.toLowerCase()]
    }

    const queryResult: iUserInfoResult = await client.query(queryConfig)

    if(queryResult.rowCount === 0) {
        throw new AppError("Email or password invalid!", 401)
    }

    const comparePassword: boolean = await compare(userData.password, queryResult.rows[0].password)

    if(!comparePassword) {
        throw new AppError("Email or password invalid!", 401)
    }

    const token: string = sign(
        { 
            email: userData.email
        },
        String(process.env.SECRET_KEY),
        {
            expiresIn: "24h",
            subject: String(queryResult.rows[0].id)
        }
    )

    return token
}
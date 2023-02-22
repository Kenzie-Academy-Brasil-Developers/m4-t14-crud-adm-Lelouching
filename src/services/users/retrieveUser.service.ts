import { iUserInfoWithoutPasswordResult, iUserWithoutPassword } from "./../../interfaces/users.interface"
import { client } from "../../database/config.database"
import { QueryConfig } from "pg"
import { verify } from "jsonwebtoken"
import { AppError } from "../../errors"
import "dotenv/config"

export const retrieveUserService = async (authToken: string | undefined): Promise<iUserWithoutPassword> => {
    if(!authToken) {
        throw new AppError("Missing authorization token", 401)
    }

    const token: string = authToken.split(" ")[1]

    let user: iUserWithoutPassword[] = []

    await verify(
        token,
        String(process.env.SECRET_KEY),
        async (error: any, decoded: any): Promise<void> => {
            if(error) {
                throw new AppError(error.message, 401)
            }

            const queryString: string = `
                SELECT
                    "id", "name", "email", "admin", "active"
                FROM
                    "users"
                WHERE
                    LOWER("email") = $1;
            `

            const queryConfig: QueryConfig = {
                text: queryString,
                values: [decoded.email.toLowerCase()]
            }

            const queryResult: iUserInfoWithoutPasswordResult = await client.query(queryConfig)

            user.push(queryResult.rows[0])
        }
    )

    return user[0]
}
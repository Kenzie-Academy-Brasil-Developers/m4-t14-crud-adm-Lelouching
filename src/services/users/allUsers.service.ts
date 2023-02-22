import { client } from "./../../database/config.database"
import { AppError } from "./../../errors"
import { iUserInfoWithoutPasswordResult, iUserWithoutPassword } from "./../../interfaces/users.interface"

export const allUsersService = async (): Promise<iUserWithoutPassword[]> => {
    const queryString: string = `
        SELECT
            "id", "name", "email", "admin", "active"
        FROM
            "users";
    `

    const queryResult: iUserInfoWithoutPasswordResult = await client.query(queryString)

    return queryResult.rows
}
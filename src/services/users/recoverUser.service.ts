import { client } from "./../../database/config.database"
import { QueryConfig } from "pg"
import { iUserInfoWithoutPasswordResult, iUserWithoutPassword } from "./../../interfaces/users.interface"

export const recoverUserService = async (userId: number): Promise<iUserWithoutPassword> => {
    const queryString: string = `
        UPDATE
            "users"
        SET "active" = TRUE
        WHERE
            "id" = $1
        RETURNING "id", "name", "email", "admin", "active";
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: iUserInfoWithoutPasswordResult = await client.query(queryConfig)

    return queryResult.rows[0]
}
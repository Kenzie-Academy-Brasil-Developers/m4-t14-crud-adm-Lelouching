import { client } from "./../../database/config.database"
import { QueryConfig } from "pg"
import { iUserInfoWithoutPasswordResult, iUserWithoutPassword } from "./../../interfaces/users.interface"

export const ifIdExistsService = async (userId: number): Promise<iUserWithoutPassword> => {
    const queryString: string = `
        SELECT
            "id", "name", "email", "admin", "active"
        FROM
            "users"
        WHERE
            "id" = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: iUserInfoWithoutPasswordResult = await client.query(queryConfig)

    return queryResult.rows[0]
}
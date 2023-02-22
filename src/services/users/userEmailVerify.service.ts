import { client } from "../../database/config.database"
import { QueryConfig } from "pg"
import { iUserInfoResult } from "../../interfaces/users.interface"

export const verifyUserEmail = async (email: string): Promise<number> => {
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
        values: [email.toLowerCase()]
    }

    const queryResult: iUserInfoResult = await client.query(queryConfig)

    return queryResult.rowCount
}
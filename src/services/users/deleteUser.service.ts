import { client } from "./../../database/config.database"
import { QueryConfig, QueryResult } from "pg"

export const deleteUserService = async (userId: number): Promise<void> => {
    const queryString: string = `
        UPDATE
            "users"
        SET
            "active" = FALSE
        WHERE
            "id" = $1;
    `

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    await client.query(queryConfig)
}
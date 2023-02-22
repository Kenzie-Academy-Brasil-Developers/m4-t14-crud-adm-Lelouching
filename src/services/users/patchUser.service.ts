import { QueryConfig } from "pg"
import { iUserInfoWithoutPasswordResult, iUserWithoutPassword } from "./../../interfaces/users.interface"
import format from "pg-format"
import { client } from "./../../database/config.database"

export const patchUserService = async (bodyRequest: any, userId: number): Promise<iUserWithoutPassword> => {
    const queryString: string = format(
        `
            UPDATE
                "users"
            SET(%I) = ROW(%L)
            WHERE
                "id" = $1
            RETURNING "id", "name", "email", "admin", "active";
        `,
        Object.keys(bodyRequest),
        Object.values(bodyRequest)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId]
    }

    const queryResult: iUserInfoWithoutPasswordResult = await client.query(queryConfig)

    return queryResult.rows[0]
}
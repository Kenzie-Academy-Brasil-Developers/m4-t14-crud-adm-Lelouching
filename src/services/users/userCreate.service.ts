import { client } from "../../database/config.database"
import format from "pg-format"
import { iUserCreate, iUserInfoWithoutPasswordResult, iUserWithoutPassword } from "../../interfaces/users.interface"

export const creatingUser = async (userCreateData: iUserCreate): Promise<iUserWithoutPassword> => {

    const queryString: string = format(
        `
            INSERT INTO
                "users"(%I)
            VALUES(%L)
            RETURNING "id", "name", "email", "admin", "active";
        `,
        Object.keys(userCreateData),
        Object.values(userCreateData)
    )

    const queryResult: iUserInfoWithoutPasswordResult = await client.query(queryString)

    return queryResult.rows[0]
}
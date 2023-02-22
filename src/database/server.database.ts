import { client } from "./config.database"

export const startDatabase = async (): Promise<void> => {
    await client.connect()
}
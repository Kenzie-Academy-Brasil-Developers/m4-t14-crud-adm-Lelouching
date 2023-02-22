import { app } from "./app"
import { startDatabase } from "./database/server.database"
import "dotenv/config"

const PORT: number = Number(process.env.PORT)

app.listen(PORT, async (): Promise<void> => {
    await startDatabase()
    console.log(`Server is running on http://localhost:${PORT}`)
})
import { app } from "./app"
import "dotenv/config"

const PORT: number = Number(process.env.PORT)

app.listen(PORT, (): void => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
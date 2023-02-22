import { iUserWithoutPassword } from "./../../interfaces/users.interface"
declare global {
    namespace Express {
        interface Request {
            userInfo: iUserWithoutPassword
        }
    }
}
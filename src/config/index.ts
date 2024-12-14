import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join(process.cwd(),".env")})

export default {
    mongoDb_Uri : process.env.MongoDB_Uri
}

import express, { Request, Response } from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import rateLimiter from "express-rate-limit"
import cookieParser from "cookie-parser"
// Load environment variables from .env file

const app = express()
dotenv.config()
const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
}
// Middlewares
app.use(express.json())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(helmet())
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
)
// Db Connect

// Routes
const PORT = process.env.PORT || 3000
// Run app
app.get("/", (req: Request, res: Response) => {
  res.send("Hello world")
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

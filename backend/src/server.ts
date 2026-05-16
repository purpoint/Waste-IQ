import rateLimit from "express-rate-limit"
import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import inventoryRoutes from "./routes/inventory.routes"
import wasteRoutes from "./routes/waste.routes"
import aiRoutes from "./routes/ai.routes"
import analyticsRoutes from "./routes/analytics.routes"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }))
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}))
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per 15 minutes per IP
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
})

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // only 10 login attempts per 15 minutes
  message: {
    success: false,
    message: "Too many login attempts, please try again later.",
  },
})

app.use("/api", limiter)
app.use("/api/auth", authLimiter)

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/inventory", inventoryRoutes)
app.use("/api/waste", wasteRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/analytics", analyticsRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "WasteIQ API is running",
    timestamp: new Date().toISOString(),
  })
})

// Keep process alive
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err)
})

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason)
})

const server = app.listen(PORT, () => {
  console.log(`🚀 WasteIQ server running on http://localhost:${PORT}`)
})

server.on("error", (err) => {
  console.error("Server error:", err)
})

export default app
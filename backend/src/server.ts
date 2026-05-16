import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import inventoryRoutes from "./routes/inventory.routes"

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

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/inventory", inventoryRoutes)

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
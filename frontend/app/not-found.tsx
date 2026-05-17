"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Leaf, ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  return (
    <div style={{
      minHeight: "100vh", background: "#0d0d1a",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px", position: "relative", overflow: "hidden",
    }}>
      {/* Background blobs */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(168,85,247,0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(244,114,182,0.1) 0%, transparent 40%)
        `,
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: "center", position: "relative", zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "40px" }}>
          <div style={{
            width: "42px", height: "42px", borderRadius: "12px",
            background: "linear-gradient(135deg, #a855f7, #f472b6)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Leaf style={{ width: "22px", height: "22px", color: "white" }} />
          </div>
          <span style={{
            fontSize: "24px", fontWeight: "800",
            background: "linear-gradient(135deg, #a855f7, #f472b6, #fb923c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>WasteIQ</span>
        </div>

        {/* 404 */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 style={{
            fontSize: "120px", fontWeight: "900", lineHeight: "1", margin: "0 0 8px",
            background: "linear-gradient(135deg, #a855f7, #f472b6, #fb923c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            404
          </h1>
        </motion.div>

        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "white", marginBottom: "12px" }}>
          Page not found
        </h2>
        <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.4)", marginBottom: "40px", maxWidth: "400px" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.back()}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
              padding: "12px 24px", borderRadius: "12px",
              fontSize: "14px", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <ArrowLeft style={{ width: "16px", height: "16px" }} />
            Go back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push("/dashboard")}
            style={{
              background: "linear-gradient(135deg, #a855f7, #f472b6)",
              border: "none", color: "white",
              padding: "12px 24px", borderRadius: "12px",
              fontSize: "14px", fontWeight: "600", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "8px",
              boxShadow: "0 0 30px rgba(168,85,247,0.3)",
            }}
          >
            <Home style={{ width: "16px", height: "16px" }} />
            Go to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
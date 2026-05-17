"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuthStore } from "@/store/auth.store"
import { registerApi } from "@/lib/auth.api"
import { Loader2, Leaf, Mail, Lock, User, Store } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [form, setForm] = useState({ name: "", email: "", password: "", restaurantName: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const response = await registerApi(form)
      const { token, user, restaurant } = response.data
      setAuth(user, restaurant, token)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: "100%", padding: "12px 16px 12px 42px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px", color: "white",
    fontSize: "14px", outline: "none",
  }

  const fields = [
    { name: "name", label: "Full Name", placeholder: "John Doe", type: "text", icon: User },
    { name: "restaurantName", label: "Restaurant Name", placeholder: "My Restaurant", type: "text", icon: Store },
    { name: "email", label: "Email Address", placeholder: "you@gmail.com", type: "email", icon: Mail },
    { name: "password", label: "Password", placeholder: "Min. 6 characters", type: "password", icon: Lock },
  ]

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#0d0d1a", padding: "24px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(168,85,247,0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(244,114,182,0.15) 0%, transparent 40%)
        `,
        pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "32px" }}>
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

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px", padding: "36px",
          boxShadow: "0 0 60px rgba(168,85,247,0.1)",
        }}>
          <h1 style={{ fontSize: "24px", fontWeight: "700", color: "white", textAlign: "center", marginBottom: "6px" }}>
            Create your account
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)", textAlign: "center", marginBottom: "28px" }}>
            Start reducing food waste with AI
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)",
                color: "#f87171", fontSize: "13px", padding: "12px 16px",
                borderRadius: "10px", marginBottom: "20px",
              }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSignup} autoComplete="off">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "24px" }}>
              {fields.map((field) => {
                const Icon = field.icon
                return (
                  <div key={field.name}>
                    <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "8px" }}>
                      {field.label}
                    </label>
                    <div style={{ position: "relative" }}>
                      <Icon style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "rgba(255,255,255,0.3)" }} />
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        autoComplete="off"
                        required
                        style={inputStyle}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%", padding: "13px",
                background: loading ? "rgba(168,85,247,0.4)" : "linear-gradient(135deg, #a855f7, #f472b6)",
                border: "none", color: "white", borderRadius: "12px",
                fontSize: "15px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                boxShadow: "0 0 30px rgba(168,85,247,0.3)",
              }}
            >
              {loading ? <><Loader2 style={{ width: "18px", height: "18px" }} className="animate-spin" />Creating account...</> : "Create account"}
            </motion.button>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>
            Already have an account?{" "}
            <Link href="/login" style={{
              background: "linear-gradient(135deg, #a855f7, #f472b6)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontWeight: "600", textDecoration: "none",
            }}>
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
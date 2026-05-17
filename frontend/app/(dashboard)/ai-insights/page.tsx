"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles, Send, Loader2, TrendingDown,
  Package, AlertTriangle, User, Zap,
  Brain, ChevronRight,
} from "lucide-react"
import { getAIInsightsApi, chatWithAIApi } from "@/lib/ai.api"

interface Message {
  role: "user" | "assistant"
  content: string
}

const suggestedQuestions = [
  { icon: TrendingDown, text: "Which ingredients are wasting the most?", color: "#f87171" },
  { icon: Package, text: "What should I purchase tomorrow?", color: "#60a5fa" },
  { icon: Brain, text: "How can I reduce my food waste costs?", color: "#c084fc" },
  { icon: AlertTriangle, text: "Which items are expiring soon?", color: "#fbbf24" },
  { icon: Zap, text: "Give me a waste reduction strategy.", color: "#34d399" },
]

export default function AIInsightsPage() {
  const [insights, setInsights] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm WasteIQ AI 🌿 I have full access to your restaurant's inventory and waste data. Ask me anything — I can help you reduce waste, optimize purchases, and boost profitability!",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [insightsLoading, setInsightsLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => { fetchInsights() }, [])
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const fetchInsights = async () => {
    try {
      const response = await getAIInsightsApi()
      setInsights(response.data)
    } catch (error) {
      console.error("Failed to fetch insights:", error)
    } finally {
      setInsightsLoading(false)
    }
  }

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText || loading) return
    const userMessage: Message = { role: "user", content: messageText }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    try {
      const history = messages.map((m) => ({ role: m.role, content: m.content }))
      const response = await chatWithAIApi(messageText, history)
      setMessages((prev) => [...prev, { role: "assistant", content: response.data.message }])
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't process that. Please try again." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4" style={{ position: "relative", zIndex: 1 }}>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(244,114,182,0.06))",
          border: "1px solid rgba(168,85,247,0.2)",
          borderRadius: "16px", padding: "20px",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Glow */}
        <div style={{
          position: "absolute", top: "-40px", right: "-40px",
          width: "150px", height: "150px",
          background: "radial-gradient(circle, rgba(168,85,247,0.3), transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
          position: "relative", zIndex: 1,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0,
              background: "linear-gradient(135deg, #a855f7, #f472b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 24px rgba(168,85,247,0.4)",
            }}>
              <Sparkles style={{ width: "24px", height: "24px", color: "white" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "22px", fontWeight: "800", color: "white", margin: 0 }}>
                AI Insights
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: "3px 0 0" }}>
                Powered by Groq AI · trained on your real restaurant data
              </p>
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)",
            padding: "7px 14px", borderRadius: "99px",
          }}>
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#34d399" }} className="animate-pulse" />
            <span style={{ fontSize: "13px", color: "#34d399", fontWeight: "500" }}>AI Online</span>
          </div>
        </div>

        {/* Stats */}
        {!insightsLoading && insights && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px", marginTop: "16px",
            position: "relative", zIndex: 1,
          }}>
            {[
              { label: "Inventory Items", value: insights.totalInventoryItems, icon: Package, color: "#60a5fa" },
              { label: "Total Waste Cost", value: `₹${insights.totalWasteCost}`, icon: TrendingDown, color: "#f87171" },
              { label: "Expiring Soon", value: `${insights.expiringItemsCount} items`, icon: AlertTriangle, color: "#fbbf24" },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "12px",
                  display: "flex", alignItems: "center", gap: "10px",
                }}>
                  <Icon style={{ width: "18px", height: "18px", color: stat.color, flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{stat.label}</p>
                    <p style={{ fontSize: "16px", fontWeight: "700", color: "white", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{stat.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </motion.div>

      {/* Main layout — sidebar + chat on desktop, stacked on mobile */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "16px",
      }} className="lg:grid-cols-[280px_1fr]">

        {/* Suggested Questions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px", padding: "16px",
          }}
        >
          <p style={{
            fontSize: "11px", fontWeight: "600",
            color: "rgba(255,255,255,0.3)",
            textTransform: "uppercase", letterSpacing: "0.08em",
            margin: "0 0 12px",
          }}>
            Quick Questions
          </p>

          {/* Horizontal scroll on mobile, vertical on desktop */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}>
            {suggestedQuestions.map((q, i) => {
              const Icon = q.icon
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  onClick={() => sendMessage(q.text)}
                  whileHover={{ x: 3 }}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "10px", padding: "10px 12px",
                    cursor: "pointer", textAlign: "left",
                    display: "flex", alignItems: "center", gap: "10px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(168,85,247,0.08)"
                    e.currentTarget.style.borderColor = "rgba(168,85,247,0.2)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.03)"
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"
                  }}
                >
                  <div style={{
                    width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
                    background: `${q.color}15`, border: `1px solid ${q.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon style={{ width: "13px", height: "13px", color: q.color }} />
                  </div>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.6)", flex: 1, textAlign: "left", lineHeight: "1.4" }}>
                    {q.text}
                  </span>
                  <ChevronRight style={{ width: "13px", height: "13px", color: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                </motion.button>
              )
            })}
          </div>

          {/* Context aware info */}
          <div style={{
            marginTop: "16px", padding: "12px",
            background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(244,114,182,0.05))",
            border: "1px solid rgba(168,85,247,0.15)",
            borderRadius: "10px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
              <Brain style={{ width: "13px", height: "13px", color: "#c084fc" }} />
              <span style={{ fontSize: "11px", fontWeight: "600", color: "#c084fc" }}>Context aware</span>
            </div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", lineHeight: "1.5", margin: 0 }}>
              AI knows your inventory, waste logs, and restaurant data in real time.
            </p>
          </div>
        </motion.div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "16px",
            display: "flex", flexDirection: "column",
            overflow: "hidden", minHeight: "500px",
          }}
        >
          {/* Chat header */}
          <div style={{
            padding: "14px 18px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "rgba(168,85,247,0.04)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: "linear-gradient(135deg, #a855f7, #f472b6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 16px rgba(168,85,247,0.3)",
              }}>
                <Sparkles style={{ width: "17px", height: "17px", color: "white" }} />
              </div>
              <div>
                <p style={{ color: "white", fontSize: "14px", fontWeight: "700", margin: 0 }}>
                  WasteIQ AI Assistant
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399" }} className="animate-pulse" />
                  <p style={{
                    fontSize: "12px", margin: 0,
                    background: "linear-gradient(135deg, #a855f7, #f472b6)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>
                    Always learning from your data
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "18px",
            display: "flex", flexDirection: "column", gap: "14px",
          }}>
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display: "flex", gap: "10px",
                    flexDirection: msg.role === "user" ? "row-reverse" : "row",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{
                    width: "30px", height: "30px", borderRadius: "9px", flexShrink: 0,
                    background: msg.role === "assistant"
                      ? "linear-gradient(135deg, #a855f7, #f472b6)"
                      : "rgba(255,255,255,0.08)",
                    border: msg.role === "assistant" ? "none" : "1px solid rgba(255,255,255,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: msg.role === "assistant" ? "0 0 12px rgba(168,85,247,0.3)" : "none",
                  }}>
                    {msg.role === "assistant"
                      ? <Sparkles style={{ width: "14px", height: "14px", color: "white" }} />
                      : <User style={{ width: "14px", height: "14px", color: "rgba(255,255,255,0.6)" }} />
                    }
                  </div>
                  <div style={{
                    maxWidth: "78%", padding: "12px 16px",
                    fontSize: "14px", lineHeight: "1.65",
                    color: "rgba(255,255,255,0.9)",
                    borderRadius: msg.role === "assistant" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                    background: msg.role === "assistant"
                      ? "rgba(255,255,255,0.06)"
                      : "linear-gradient(135deg, #a855f7, #f472b6)",
                    border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                    boxShadow: msg.role === "user" ? "0 0 20px rgba(168,85,247,0.2)" : "none",
                  }}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {loading && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <div style={{
                  width: "30px", height: "30px", borderRadius: "9px",
                  background: "linear-gradient(135deg, #a855f7, #f472b6)",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  boxShadow: "0 0 12px rgba(168,85,247,0.3)",
                }}>
                  <Sparkles style={{ width: "14px", height: "14px", color: "white" }} />
                </div>
                <div style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px 16px 16px 16px",
                  padding: "14px 18px",
                  display: "flex", gap: "5px", alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: "linear-gradient(135deg, #a855f7, #f472b6)",
                        boxShadow: "0 0 6px rgba(168,85,247,0.5)",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{
            padding: "14px 16px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}>
            <div style={{
              display: "flex", gap: "10px", alignItems: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(168,85,247,0.2)",
              borderRadius: "14px", padding: "8px 8px 8px 16px",
            }}>
              <input
                placeholder="Ask anything about your restaurant..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={loading}
                style={{
                  flex: 1, background: "transparent", border: "none",
                  color: "white", fontSize: "14px", outline: "none",
                }}
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: "36px", height: "36px", borderRadius: "10px", border: "none",
                  background: input.trim() && !loading
                    ? "linear-gradient(135deg, #a855f7, #f472b6)"
                    : "rgba(255,255,255,0.06)",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  boxShadow: input.trim() && !loading ? "0 0 16px rgba(168,85,247,0.3)" : "none",
                  transition: "all 0.2s",
                }}
              >
                {loading
                  ? <Loader2 style={{ width: "16px", height: "16px", color: "white" }} className="animate-spin" />
                  : <Send style={{ width: "16px", height: "16px", color: "white" }} />
                }
              </motion.button>
            </div>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.2)", textAlign: "center", marginTop: "8px" }}>
              Responses are generated based on your actual inventory and waste data
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
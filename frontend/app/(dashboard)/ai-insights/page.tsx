"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles, Send, Loader2, TrendingDown,
  Package, AlertTriangle, User, Zap,
  MessageCircle, Brain, ChevronRight,
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
      content: "Hi! I'm WasteIQ AI 🌿 I have full access to your restaurant's inventory and waste data. Ask me anything!",
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
          borderRadius: "16px", padding: "16px",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "44px", height: "44px", borderRadius: "14px", flexShrink: 0,
              background: "linear-gradient(135deg, #a855f7, #f472b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 20px rgba(168,85,247,0.4)",
            }}>
              <Sparkles style={{ width: "22px", height: "22px", color: "white" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "20px", fontWeight: "800", color: "white", margin: 0 }}>AI Insights</h1>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "2px 0 0" }}>
                Powered by Groq AI · real restaurant data
              </p>
            </div>
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
            background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)",
            padding: "6px 12px", borderRadius: "99px",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399" }} className="animate-pulse" />
            <span style={{ fontSize: "12px", color: "#34d399", fontWeight: "500" }}>AI Online</span>
          </div>
        </div>

        {/* Stats */}
        {!insightsLoading && insights && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginTop: "14px" }}>
            {[
              { label: "Inventory", value: insights.totalInventoryItems, icon: Package, color: "#60a5fa" },
              { label: "Waste Cost", value: `₹${insights.totalWasteCost}`, icon: TrendingDown, color: "#f87171" },
              { label: "Expiring", value: `${insights.expiringItemsCount}`, icon: AlertTriangle, color: "#fbbf24" },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px", padding: "10px 8px",
                  display: "flex", alignItems: "center", gap: "8px",
                }}>
                  <Icon style={{ width: "16px", height: "16px", color: stat.color, flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{stat.label}</p>
                    <p style={{ fontSize: "14px", fontWeight: "700", color: "white", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{stat.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </motion.div>

      {/* Suggested Questions — horizontal scroll on mobile */}
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: "4px" }}>
        <div style={{ display: "flex", gap: "8px", minWidth: "max-content" }}>
          {suggestedQuestions.map((q, i) => {
            const Icon = q.icon
            return (
              <button
                key={i}
                onClick={() => sendMessage(q.text)}
                style={{
                  background: "rgba(168,85,247,0.06)",
                  border: "1px solid rgba(168,85,247,0.15)",
                  borderRadius: "10px", padding: "8px 12px",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
                  color: "rgba(255,255,255,0.6)", fontSize: "12px", whiteSpace: "nowrap",
                }}
              >
                <Icon style={{ width: "14px", height: "14px", color: q.color, flexShrink: 0 }} />
                {q.text}
              </button>
            )
          })}
        </div>
      </div>

      {/* Chat */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "16px",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Chat header */}
        <div style={{
          padding: "12px 16px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "10px",
              background: "linear-gradient(135deg, #a855f7, #f472b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sparkles style={{ width: "16px", height: "16px", color: "white" }} />
            </div>
            <div>
              <p style={{ color: "white", fontSize: "13px", fontWeight: "700", margin: 0 }}>WasteIQ AI</p>
              <p style={{
                fontSize: "11px", margin: 0,
                background: "linear-gradient(135deg, #a855f7, #f472b6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Always learning from your data</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "14px",
          display: "flex", flexDirection: "column", gap: "12px",
          maxHeight: "360px", minHeight: "200px",
        }}>
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  display: "flex", gap: "8px",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row",
                  alignItems: "flex-start",
                }}
              >
                <div style={{
                  width: "28px", height: "28px", borderRadius: "8px", flexShrink: 0,
                  background: msg.role === "assistant"
                    ? "linear-gradient(135deg, #a855f7, #f472b6)"
                    : "rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {msg.role === "assistant"
                    ? <Sparkles style={{ width: "13px", height: "13px", color: "white" }} />
                    : <User style={{ width: "13px", height: "13px", color: "rgba(255,255,255,0.6)" }} />
                  }
                </div>
                <div style={{
                  maxWidth: "80%", padding: "10px 14px",
                  fontSize: "13px", lineHeight: "1.6", color: "rgba(255,255,255,0.9)",
                  borderRadius: msg.role === "assistant" ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                  background: msg.role === "assistant"
                    ? "rgba(255,255,255,0.06)"
                    : "linear-gradient(135deg, #a855f7, #f472b6)",
                  border: msg.role === "assistant" ? "1px solid rgba(255,255,255,0.08)" : "none",
                }}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", gap: "8px" }}>
              <div style={{
                width: "28px", height: "28px", borderRadius: "8px",
                background: "linear-gradient(135deg, #a855f7, #f472b6)",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Sparkles style={{ width: "13px", height: "13px", color: "white" }} />
              </div>
              <div style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "4px 14px 14px 14px",
                padding: "12px 16px", display: "flex", gap: "4px", alignItems: "center",
              }}>
                {[0, 1, 2].map((i) => (
                  <motion.div key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#a855f7" }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{
            display: "flex", gap: "8px", alignItems: "center",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(168,85,247,0.2)",
            borderRadius: "12px", padding: "6px 6px 6px 12px",
          }}>
            <input
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
              style={{
                flex: 1, background: "transparent", border: "none",
                color: "white", fontSize: "13px", outline: "none",
              }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              style={{
                width: "34px", height: "34px", borderRadius: "8px", border: "none",
                background: input.trim() && !loading
                  ? "linear-gradient(135deg, #a855f7, #f472b6)"
                  : "rgba(255,255,255,0.06)",
                cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}
            >
              {loading
                ? <Loader2 style={{ width: "14px", height: "14px", color: "white" }} className="animate-spin" />
                : <Send style={{ width: "14px", height: "14px", color: "white" }} />
              }
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
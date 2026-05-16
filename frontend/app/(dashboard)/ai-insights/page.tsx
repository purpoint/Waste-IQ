"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Send,
  Loader2,
  TrendingDown,
  Package,
  AlertTriangle,
  User,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getAIInsightsApi, chatWithAIApi } from "@/lib/ai.api"

interface Message {
  role: "user" | "assistant"
  content: string
}

const suggestedQuestions = [
  "Which ingredients are wasting the most?",
  "What should I purchase tomorrow?",
  "How can I reduce my food waste costs?",
  "Which items are expiring soon?",
  "Give me a waste reduction strategy.",
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

  useEffect(() => {
    fetchInsights()
  }, [])

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
      const aiMessage: Message = {
        role: "assistant",
        content: response.data.message,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't process that. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-400" />
          <h1 className="text-2xl font-bold text-white">AI Insights</h1>
        </div>
        <p className="text-slate-400 mt-1">
          Powered by Groq AI — trained on your restaurant's real data
        </p>
      </motion.div>

      {/* Insights Cards */}
      {!insightsLoading && insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Package className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Inventory Items</p>
                <p className="text-white text-xl font-bold">{insights.totalInventoryItems}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Total Waste Cost</p>
                <p className="text-white text-xl font-bold">₹{insights.totalWasteCost}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Expiring Soon</p>
                <p className="text-white text-xl font-bold">{insights.expiringItemsCount} items</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Chat Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
        {/* Suggested Questions */}
        <Card className="bg-slate-900 border-slate-800 xl:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-sm font-semibold">
              Suggested Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suggestedQuestions.map((q, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-xs text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/5 border border-slate-700/50 hover:border-emerald-500/30 rounded-lg p-2.5 transition-all duration-200"
              >
                {q}
              </motion.button>
            ))}
          </CardContent>
        </Card>

        {/* Chat */}
        <Card className="bg-slate-900 border-slate-800 xl:col-span-3 flex flex-col">
          <CardHeader className="pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-white text-sm font-semibold">WasteIQ AI Assistant</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-emerald-400 text-xs">Online — powered by Groq</p>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[420px]">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    msg.role === "assistant"
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "bg-blue-500/10 border border-blue-500/20"
                  }`}>
                    {msg.role === "assistant" ? (
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-blue-400" />
                    )}
                  </div>

                  <div className={`max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-slate-800 text-slate-200 rounded-tl-none"
                      : "bg-emerald-600 text-white rounded-tr-none"
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="bg-slate-800 rounded-xl rounded-tl-none px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex gap-2">
              <Input
                placeholder="Ask anything about your restaurant..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                disabled={loading}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-slate-600 text-xs mt-2 text-center">
              AI responses are based on your actual restaurant data
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
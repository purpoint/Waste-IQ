"use client"

import { useEffect, useState } from "react"
import { useAuthStore } from "@/store/auth.store"
import { motion } from "framer-motion"
import {
  TrendingDown, Package, AlertTriangle,
  DollarSign, Sparkles, ArrowUpRight, ArrowDownRight,
} from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts"
import { getDashboardStatsApi } from "@/lib/analytics.api"
import { SkeletonDashboard } from "@/components/ui/skeleton-loader"

const demandData = [
  { time: "8am", orders: 24 },
  { time: "10am", orders: 45 },
  { time: "12pm", orders: 89 },
  { time: "2pm", orders: 56 },
  { time: "4pm", orders: 38 },
  { time: "6pm", orders: 72 },
  { time: "8pm", orders: 61 },
]

const aiRecommendations = [
  { message: "Reduce tomato purchase by 15% next week — demand predicted to drop due to festival season.", gradient: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(251,146,60,0.04))", border: "rgba(251,191,36,0.2)", color: "#fbbf24" },
  { message: "Increase paneer stock by 20% for this weekend — high demand predicted.", gradient: "linear-gradient(135deg, rgba(52,211,153,0.08), rgba(96,165,250,0.04))", border: "rgba(52,211,153,0.2)", color: "#34d399" },
  { message: "3 inventory items expire within 2 days. Consider running a special menu today.", gradient: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(244,114,182,0.04))", border: "rgba(168,85,247,0.2)", color: "#c084fc" },
]

const glassStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
}

const tooltipStyle = {
  contentStyle: {
    backgroundColor: "rgba(15,10,30,0.95)",
    border: "1px solid rgba(168,85,247,0.3)",
    borderRadius: "12px",
    color: "#f0eeff",
  },
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await getDashboardStatsApi()
      setStats(response.data)
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = stats ? [
    {
      title: "Food Waste This Week",
      value: `₹${stats.thisWeekWasteCost.toLocaleString()}`,
      change: stats.wasteChange,
      trend: stats.wasteTrend,
      icon: TrendingDown,
      gradient: "linear-gradient(135deg, rgba(248,113,113,0.15), rgba(251,146,60,0.05))",
      border: "rgba(248,113,113,0.2)",
      iconColor: "#f87171",
      changeColor: stats.wasteTrend === "down" ? "#34d399" : "#f87171",
      description: "vs last week",
    },
    {
      title: "Inventory Items",
      value: stats.totalInventoryItems,
      change: "Live",
      trend: "up",
      icon: Package,
      gradient: "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(168,85,247,0.05))",
      border: "rgba(96,165,250,0.2)",
      iconColor: "#60a5fa",
      changeColor: "#60a5fa",
      description: "items tracked",
    },
    {
      title: "Expiry Alerts",
      value: stats.expiringItemsCount,
      change: `${stats.unreadAlerts} unread`,
      trend: "up",
      icon: AlertTriangle,
      gradient: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,146,60,0.05))",
      border: "rgba(251,191,36,0.2)",
      iconColor: "#fbbf24",
      changeColor: "#fbbf24",
      description: "expiring soon",
    },
    {
      title: "Monthly Revenue",
      value: `₹${stats.thisMonthRevenue.toLocaleString()}`,
      change: stats.revenueChange,
      trend: stats.revenueTrend,
      icon: DollarSign,
      gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(244,114,182,0.05))",
      border: "rgba(168,85,247,0.2)",
      iconColor: "#c084fc",
      changeColor: "#34d399",
      description: "this month",
    },
  ] : []

  return (
    <div className="space-y-6" style={{ position: "relative", zIndex: 1 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-white">
          Good morning, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Here's what's happening with your restaurant today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      {loading ? (
        <SkeletonDashboard />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{
                  background: stat.gradient,
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${stat.border}`,
                  borderRadius: "16px", padding: "20px",
                }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.trend === "down"
                        ? <ArrowDownRight className="w-3 h-3" style={{ color: stat.changeColor }} />
                        : <ArrowUpRight className="w-3 h-3" style={{ color: stat.changeColor }} />
                      }
                      <span className="text-xs font-medium" style={{ color: stat.changeColor }}>{stat.change}</span>
                      <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>{stat.description}</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <Icon className="w-5 h-5" style={{ color: stat.iconColor }} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Waste Trend - Real Data */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={glassStyle}
          className="p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-white">Waste vs Prediction</p>
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(244,114,182,0.1))",
              border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc",
            }}>This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={stats?.wasteByDay || []}>
              <defs>
                <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="predictGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.4)" }} />
              <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.4)" }} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="waste" stroke="#f87171" fill="url(#wasteGrad)" strokeWidth={2} name="Actual Waste (₹)" />
              <Area type="monotone" dataKey="predicted" stroke="#a855f7" fill="url(#predictGrad)" strokeWidth={2} name="Predicted (₹)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Demand Pattern */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={glassStyle}
          className="p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="font-semibold text-white">Today's Demand Pattern</p>
            <span className="text-xs px-3 py-1 rounded-full font-medium" style={{
              background: "linear-gradient(135deg, rgba(244,114,182,0.2), rgba(251,146,60,0.1))",
              border: "1px solid rgba(244,114,182,0.3)", color: "#f472b6",
            }}>Live</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={demandData}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity={1} />
                  <stop offset="100%" stopColor="#f472b6" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.4)" }} />
              <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.4)" }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="orders" fill="url(#barGradient)" radius={[6, 6, 0, 0]} name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={glassStyle}
        className="p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5" style={{ color: "#c084fc" }} />
          <p className="font-semibold text-white">AI Recommendations</p>
        </div>
        <div className="space-y-3">
          {aiRecommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-xl text-sm"
              style={{ background: rec.gradient, border: `1px solid ${rec.border}` }}
            >
              <Sparkles className="w-4 h-4 mt-0.5 shrink-0" style={{ color: rec.color }} />
              <p style={{ color: "rgba(255,255,255,0.8)" }}>{rec.message}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TrendingDown, Package, AlertTriangle, DollarSign, Loader2, BarChart3 } from "lucide-react"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts"
import { getAnalyticsApi } from "@/lib/analytics.api"
import { SkeletonDashboard } from "@/components/ui/skeleton-loader"

const COLORS = ["#a855f7", "#f472b6", "#fb923c", "#34d399", "#60a5fa", "#fbbf24"]

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

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchAnalytics() }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await getAnalyticsApi()
      setData(response.data)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <SkeletonDashboard />
  }

  if (!data) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px", color: "rgba(255,255,255,0.4)" }}>
        Failed to load analytics
      </div>
    )
  }

  const reasonChartData = Object.entries(data.wasteByReason).map(([name, value]) => ({ name, value }))

  const stats = [
    { title: "Total Waste Cost", value: `₹${data.totalWasteCost.toLocaleString()}`, icon: TrendingDown, gradient: "linear-gradient(135deg, rgba(248,113,113,0.15), rgba(251,146,60,0.05))", border: "rgba(248,113,113,0.2)", color: "#f87171" },
    { title: "Inventory Value", value: `₹${data.totalInventoryValue.toLocaleString()}`, icon: DollarSign, gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(244,114,182,0.05))", border: "rgba(168,85,247,0.2)", color: "#c084fc" },
    { title: "Total Waste Logs", value: data.totalWasteLogs, icon: Package, gradient: "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(168,85,247,0.05))", border: "rgba(96,165,250,0.2)", color: "#60a5fa" },
    { title: "Expiring Soon", value: data.expiringItemsCount, icon: AlertTriangle, gradient: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,146,60,0.05))", border: "rgba(251,191,36,0.2)", color: "#fbbf24" },
  ]

  return (
    <div className="space-y-6" style={{ position: "relative", zIndex: 1 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <BarChart3 style={{ width: "24px", height: "24px", color: "#c084fc" }} />
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
        </div>
        <p className="mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Real-time insights from your restaurant data
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={{ background: stat.gradient, border: `1px solid ${stat.border}`, borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ padding: "10px", background: "rgba(255,255,255,0.06)", borderRadius: "12px" }}>
                <Icon style={{ width: "20px", height: "20px", color: stat.color }} />
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{stat.title}</p>
                <p style={{ fontSize: "20px", fontWeight: "700", color: "white" }}>{stat.value}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Waste trend */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ ...glassStyle, padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <p className="font-semibold text-white">Waste Cost — Last 7 Days</p>
          <span style={{
            background: "linear-gradient(135deg, rgba(248,113,113,0.15), rgba(251,146,60,0.1))",
            border: "1px solid rgba(248,113,113,0.3)",
            color: "#f87171", fontSize: "11px", padding: "4px 12px", borderRadius: "99px", fontWeight: "500",
          }}>Real data</span>
        </div>
        {data.wasteByDay.every((d: any) => d.cost === 0) ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
            No waste logged in the last 7 days
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={data.wasteByDay}>
              <defs>
                <linearGradient id="wasteAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.4)" }} />
              <YAxis stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.4)" }} />
              <Tooltip {...tooltipStyle} formatter={(value) => [`₹${value}`, "Waste Cost"]} />
              <Area type="monotone" dataKey="cost" stroke="#a855f7" fill="url(#wasteAreaGrad)" strokeWidth={2} name="Waste Cost" />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Top wasted items */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} style={{ ...glassStyle, padding: "20px" }}>
          <p className="font-semibold text-white mb-4">Top Wasted Items</p>
          {data.topWastedItems.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "180px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>No waste data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.topWastedItems} layout="vertical">
                <defs>
                  <linearGradient id="hBarGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis type="number" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.4)" }} tickFormatter={(v) => `₹${v}`} />
                <YAxis type="category" dataKey="name" stroke="rgba(255,255,255,0.2)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.4)" }} width={80} />
                <Tooltip {...tooltipStyle} formatter={(value) => [`₹${value}`, "Loss"]} />
                <Bar dataKey="cost" fill="url(#hBarGrad)" radius={[0, 6, 6, 0]} name="Loss" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Waste by reason */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} style={{ ...glassStyle, padding: "20px" }}>
          <p className="font-semibold text-white mb-4">Waste by Reason</p>
          {reasonChartData.length === 0 ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "180px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>No waste data yet</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={reasonChartData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {reasonChartData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} formatter={(value) => [`₹${value}`, "Loss"]} />
                <Legend iconType="circle" iconSize={8} formatter={(value) => <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </motion.div>
      </div>
    </div>
  )
}
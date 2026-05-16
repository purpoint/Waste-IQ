"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  TrendingDown,
  Package,
  AlertTriangle,
  DollarSign,
  Loader2,
  BarChart3,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { getAnalyticsApi } from "@/lib/analytics.api"

const COLORS = ["#f87171", "#fb923c", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa"]

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

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
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        Failed to load analytics
      </div>
    )
  }

  const reasonChartData = Object.entries(data.wasteByReason).map(
    ([name, value]) => ({ name, value })
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-emerald-400" />
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
        </div>
        <p className="text-slate-400 mt-1">
          Real-time insights from your restaurant data
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            title: "Total Waste Cost",
            value: `₹${data.totalWasteCost.toLocaleString()}`,
            icon: TrendingDown,
            color: "red",
          },
          {
            title: "Inventory Value",
            value: `₹${data.totalInventoryValue.toLocaleString()}`,
            icon: DollarSign,
            color: "emerald",
          },
          {
            title: "Total Waste Logs",
            value: data.totalWasteLogs,
            icon: Package,
            color: "blue",
          },
          {
            title: "Expiring Soon",
            value: data.expiringItemsCount,
            icon: AlertTriangle,
            color: "amber",
          },
        ].map((stat, i) => {
          const Icon = stat.icon
          const colorMap: Record<string, string> = {
            red: "text-red-400 bg-red-500/10 border-red-500/20",
            emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
            blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
            amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
          }
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${colorMap[stat.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">{stat.title}</p>
                    <p className="text-white text-xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Waste trend last 7 days */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white text-base font-semibold">
                Waste Cost — Last 7 Days
              </CardTitle>
              <Badge
                variant="outline"
                className="border-red-500/30 text-red-400 bg-red-500/10 text-xs"
              >
                Real data
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {data.wasteByDay.every((d: any) => d.cost === 0) ? (
              <div className="flex items-center justify-center h-48 text-slate-500 text-sm">
                No waste logged in the last 7 days
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={data.wasteByDay}>
                  <defs>
                    <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="day" stroke="#475569" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                    formatter={(value) => [`₹${value}`, "Waste Cost"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="cost"
                    stroke="#f87171"
                    fill="url(#wasteGrad)"
                    strokeWidth={2}
                    name="Waste Cost"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Bottom row - two charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Top wasted items */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base font-semibold">
                Top Wasted Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data.topWastedItems.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-slate-500 text-sm">
                  No waste data yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={data.topWastedItems}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      type="number"
                      stroke="#475569"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(v) => `₹${v}`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      stroke="#475569"
                      tick={{ fontSize: 12 }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #1e293b",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      formatter={(value) => [`₹${value}`, "Loss"]}
                    />
                    <Bar
                      dataKey="cost"
                      fill="#f87171"
                      radius={[0, 4, 4, 0]}
                      name="Loss"
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Waste by reason pie */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-white text-base font-semibold">
                Waste by Reason
              </CardTitle>
            </CardHeader>
            <CardContent>
              {reasonChartData.length === 0 ? (
                <div className="flex items-center justify-center h-48 text-slate-500 text-sm">
                  No waste data yet
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={reasonChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {reasonChartData.map((_, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        border: "1px solid #1e293b",
                        borderRadius: "8px",
                        color: "#fff",
                      }}
                      formatter={(value) => [`₹${value}`, "Loss"]}
                    />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      formatter={(value) => (
                        <span style={{ color: "#94a3b8", fontSize: "11px" }}>
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
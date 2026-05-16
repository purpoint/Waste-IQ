"use client"

import { useAuthStore } from "@/store/auth.store"
import { motion } from "framer-motion"
import {
  TrendingDown,
  Package,
  AlertTriangle,
  DollarSign,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
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
} from "recharts"

const wasteData = [
  { day: "Mon", waste: 12, predicted: 15 },
  { day: "Tue", waste: 8, predicted: 10 },
  { day: "Wed", waste: 15, predicted: 12 },
  { day: "Thu", waste: 6, predicted: 8 },
  { day: "Fri", waste: 18, predicted: 16 },
  { day: "Sat", waste: 22, predicted: 20 },
  { day: "Sun", waste: 10, predicted: 12 },
]

const demandData = [
  { time: "8am", orders: 24 },
  { time: "10am", orders: 45 },
  { time: "12pm", orders: 89 },
  { time: "2pm", orders: 56 },
  { time: "4pm", orders: 38 },
  { time: "6pm", orders: 72 },
  { time: "8pm", orders: 61 },
]

const stats = [
  {
    title: "Food Waste This Week",
    value: "₹4,280",
    change: "-12%",
    trend: "down",
    icon: TrendingDown,
    color: "emerald",
    description: "vs last week",
  },
  {
    title: "Inventory Items",
    value: "142",
    change: "+3",
    trend: "up",
    icon: Package,
    color: "blue",
    description: "items tracked",
  },
  {
    title: "Expiry Alerts",
    value: "7",
    change: "+2",
    trend: "up",
    icon: AlertTriangle,
    color: "amber",
    description: "items expiring soon",
  },
  {
    title: "Revenue Saved",
    value: "₹18,500",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    color: "emerald",
    description: "this month",
  },
]

const aiRecommendations = [
  {
    type: "warning",
    message: "Reduce tomato purchase by 15% next week — demand predicted to drop due to festival season.",
  },
  {
    type: "success",
    message: "Increase paneer stock by 20% for this weekend — high demand predicted.",
  },
  {
    type: "info",
    message: "3 inventory items expire within 2 days. Consider running a special menu today.",
  },
]

const colorMap: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
}

export default function DashboardPage() {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white">
          Good morning, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="text-slate-400 mt-1">
          Here's what's happening with your restaurant today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white mt-1">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {stat.trend === "down" ? (
                          <ArrowDownRight className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                        )}
                        <span className="text-emerald-400 text-xs font-medium">
                          {stat.change}
                        </span>
                        <span className="text-slate-500 text-xs">
                          {stat.description}
                        </span>
                      </div>
                    </div>
                    <div className={`p-2.5 rounded-lg border ${colorMap[stat.color]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Waste Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-base font-semibold">
                  Waste vs Prediction
                </CardTitle>
                <Badge
                  variant="outline"
                  className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs"
                >
                  This Week
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={wasteData}>
                  <defs>
                    <linearGradient id="wasteGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f87171" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="predictGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
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
                  />
                  <Area
                    type="monotone"
                    dataKey="waste"
                    stroke="#f87171"
                    fill="url(#wasteGrad)"
                    strokeWidth={2}
                    name="Actual Waste"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#34d399"
                    fill="url(#predictGrad)"
                    strokeWidth={2}
                    name="Predicted"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Demand Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white text-base font-semibold">
                  Today's Demand Pattern
                </CardTitle>
                <Badge
                  variant="outline"
                  className="border-blue-500/30 text-blue-400 bg-blue-500/10 text-xs"
                >
                  Live
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={demandData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#475569" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#475569" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      border: "1px solid #1e293b",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar
                    dataKey="orders"
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="Orders"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <CardTitle className="text-white text-base font-semibold">
                AI Recommendations
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {aiRecommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border text-sm",
                  rec.type === "warning" && "bg-amber-500/5 border-amber-500/20 text-amber-300",
                  rec.type === "success" && "bg-emerald-500/5 border-emerald-500/20 text-emerald-300",
                  rec.type === "info" && "bg-blue-500/5 border-blue-500/20 text-blue-300"
                )}
              >
                <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
                <p>{rec.message}</p>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
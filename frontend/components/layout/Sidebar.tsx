"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  Trash2,
  BarChart3,
  Sparkles,
  Settings,
  Leaf,
  ChevronRight,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Waste Tracker", href: "/waste", icon: Trash2 },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "AI Insights", href: "/ai-insights", icon: Sparkles },
  { label: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div
      className="w-64 h-full flex flex-col"
      style={{
        background: "rgba(13, 13, 26, 0.8)",
        backdropFilter: "blur(30px)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <div className="p-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #a855f7, #f472b6)" }}
          >
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span
            className="text-xl font-bold"
            style={{
              background: "linear-gradient(135deg, #a855f7, #f472b6, #fb923c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            WasteIQ
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group cursor-pointer"
                style={
                  isActive
                    ? {
                        background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(244,114,182,0.1))",
                        border: "1px solid rgba(168,85,247,0.3)",
                        color: "#e9d5ff",
                      }
                    : {
                        color: "rgba(255,255,255,0.4)",
                        border: "1px solid transparent",
                      }
                }
              >
                <Icon
                  className="w-5 h-5 transition-colors"
                  style={
                    isActive
                      ? { color: "#c084fc" }
                      : { color: "rgba(255,255,255,0.3)" }
                  }
                />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 ml-auto" style={{ color: "#c084fc" }} />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* AI Badge */}
      <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="rounded-xl p-3"
          style={{
            background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(244,114,182,0.05))",
            border: "1px solid rgba(168,85,247,0.2)",
          }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4" style={{ color: "#c084fc" }} />
            <span className="text-xs font-semibold" style={{ color: "#c084fc" }}>
              AI Powered
            </span>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Real-time predictions and waste reduction insights
          </p>
        </div>
      </div>
    </div>
  )
}
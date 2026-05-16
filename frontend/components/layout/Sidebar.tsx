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
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: Package,
  },
  {
    label: "Waste Tracker",
    href: "/waste",
    icon: Trash2,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "AI Insights",
    href: "/ai-insights",
    icon: Sparkles,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">WasteIQ</span>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer",
                  isActive
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-emerald-400" : "text-slate-500 group-hover:text-white"
                  )}
                />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-4 h-4 text-emerald-400 ml-auto" />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom - AI Badge */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-semibold">AI Powered</span>
          </div>
          <p className="text-slate-400 text-xs">
            Real-time predictions and waste reduction insights
          </p>
        </div>
      </div>
    </div>
  )
}
"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard, Package, Trash2, BarChart3,
  Sparkles, Settings, Leaf, ChevronRight, Menu, X,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Waste Tracker", href: "/waste", icon: Trash2 },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "AI Insights", href: "/ai-insights", icon: Sparkles },
  { label: "Settings", href: "/settings", icon: Settings },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()

  return (
    <div style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      background: "rgba(13,13,26,0.98)",
      backdropFilter: "blur(30px)",
      borderRight: "1px solid rgba(255,255,255,0.06)",
    }}>
      {/* Logo */}
      <div style={{
        padding: "20px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/dashboard" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #a855f7, #f472b6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Leaf style={{ width: "18px", height: "18px", color: "white" }} />
          </div>
          <span style={{
            fontSize: "20px", fontWeight: "800",
            background: "linear-gradient(135deg, #a855f7, #f472b6, #fb923c)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>WasteIQ</span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer", color: "rgba(255,255,255,0.6)",
              padding: "6px", borderRadius: "8px", display: "flex",
            }}
          >
            <X style={{ width: "18px", height: "18px" }} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px", display: "flex", flexDirection: "column", gap: "4px", overflowY: "auto" }}>
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href} onClick={onClose} style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "10px 12px", borderRadius: "12px",
                  fontSize: "14px", fontWeight: "500", cursor: "pointer",
                  background: isActive
                    ? "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(244,114,182,0.1))"
                    : "transparent",
                  border: isActive
                    ? "1px solid rgba(168,85,247,0.3)"
                    : "1px solid transparent",
                  color: isActive ? "#e9d5ff" : "rgba(255,255,255,0.4)",
                }}
              >
                <Icon style={{
                  width: "18px", height: "18px", flexShrink: 0,
                  color: isActive ? "#c084fc" : "rgba(255,255,255,0.3)",
                }} />
                <span>{item.label}</span>
                {isActive && (
                  <ChevronRight style={{ width: "14px", height: "14px", color: "#c084fc", marginLeft: "auto" }} />
                )}
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* AI Badge */}
      <div style={{ padding: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{
          borderRadius: "12px", padding: "12px",
          background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(244,114,182,0.05))",
          border: "1px solid rgba(168,85,247,0.2)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
            <Sparkles style={{ width: "14px", height: "14px", color: "#c084fc" }} />
            <span style={{ fontSize: "11px", fontWeight: "600", color: "#c084fc" }}>AI Powered</span>
          </div>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: "1.5" }}>
            Real-time predictions and waste reduction insights
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className="hidden md:flex"
        style={{ width: "256px", flexShrink: 0, height: "100%", flexDirection: "column" }}
      >
        <SidebarContent />
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMobileOpen(true)}
        style={{
          position: "fixed", top: "14px", left: "16px", zIndex: 100,
          background: "linear-gradient(135deg, #a855f7, #f472b6)",
          border: "none", borderRadius: "10px", padding: "8px",
          cursor: "pointer", display: "flex",
          boxShadow: "0 0 20px rgba(168,85,247,0.3)",
        }}
      >
        <Menu style={{ width: "20px", height: "20px", color: "white" }} />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.7)",
                backdropFilter: "blur(4px)",
              }}
              className="md:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{
                position: "fixed", top: 0, left: 0, bottom: 0,
                width: "280px", zIndex: 300,
              }}
              className="md:hidden"
            >
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
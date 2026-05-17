"use client"

import { motion } from "framer-motion"
import { useAuthStore } from "@/store/auth.store"
import { Settings, User, Store, Shield, Bell, Palette } from "lucide-react"

const glassStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
}

const sections = [
  {
    icon: User,
    title: "Profile",
    description: "Your personal information and account details",
    color: "#60a5fa",
    fields: [
      { label: "Full Name", placeholder: "Your full name", type: "text", autoComplete: "off" },
      { label: "Email Address", placeholder: "your@gmail.com", type: "email", autoComplete: "off" },
    ],
  },
  {
    icon: Store,
    title: "Restaurant",
    description: "Your restaurant information and preferences",
    color: "#c084fc",
    fields: [
      { label: "Restaurant Name", placeholder: "Restaurant name", type: "text", autoComplete: "off" },
      { label: "Address", placeholder: "Restaurant address", type: "text", autoComplete: "off" },
      { label: "Phone", placeholder: "+91 00000 00000", type: "text", autoComplete: "off" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Control when and how you get notified",
    color: "#fbbf24",
    toggles: [
      { label: "Low stock alerts", description: "Get notified when items are running low" },
      { label: "Expiry warnings", description: "Alert before items expire" },
      { label: "AI recommendations", description: "Daily AI-powered insights" },
      { label: "Waste reports", description: "Weekly waste summary" },
    ],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Manage your password and account security",
    color: "#34d399",
    fields: [
      { label: "Current Password", placeholder: "Enter current password", type: "password", autoComplete: "new-password" },
      { label: "New Password", placeholder: "Enter new password", type: "password", autoComplete: "new-password" },
      { label: "Confirm New Password", placeholder: "Confirm new password", type: "password", autoComplete: "new-password" },
    ],
  },

  {
    icon: Store,
    title: "Restaurant",
    description: "Your restaurant information and preferences",
    color: "#c084fc",
    fields: [
      { label: "Restaurant Name", placeholder: "Restaurant name" },
      { label: "Address", placeholder: "Restaurant address" },
      { label: "Phone", placeholder: "+91 00000 00000" },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Control when and how you get notified",
    color: "#fbbf24",
    toggles: [
      { label: "Low stock alerts", description: "Get notified when items are running low" },
      { label: "Expiry warnings", description: "Alert before items expire" },
      { label: "AI recommendations", description: "Daily AI-powered insights" },
      { label: "Waste reports", description: "Weekly waste summary" },
    ],
  },
  {
    icon: Shield,
    title: "Security",
    description: "Manage your password and account security",
    color: "#34d399",
    fields: [
      { label: "Current Password", placeholder: "••••••••", type: "password" },
      { label: "New Password", placeholder: "••••••••", type: "password" },
      { label: "Confirm Password", placeholder: "••••••••", type: "password" },
    ],
  },
]

export default function SettingsPage() {
  const { user, restaurant } = useAuthStore()

  return (
    <div className="space-y-6" style={{ position: "relative", zIndex: 1 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Settings style={{ width: "24px", height: "24px", color: "#c084fc" }} />
          <h1 className="text-2xl font-bold text-white">Settings</h1>
        </div>
        <p className="mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
          Manage your account and restaurant preferences
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          ...glassStyle,
          padding: "24px",
          background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(244,114,182,0.05))",
          border: "1px solid rgba(168,85,247,0.2)",
          display: "flex", alignItems: "center", gap: "20px",
        }}
      >
        <div style={{
          width: "64px", height: "64px", borderRadius: "20px", flexShrink: 0,
          background: "linear-gradient(135deg, #a855f7, #f472b6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "24px", fontWeight: "700", color: "white",
          boxShadow: "0 0 30px rgba(168,85,247,0.3)",
        }}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: "18px", fontWeight: "700", color: "white", margin: 0 }}>{user?.name}</p>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", margin: "4px 0" }}>{user?.email}</p>
          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
            <span style={{
              background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(244,114,182,0.1))",
              border: "1px solid rgba(168,85,247,0.3)",
              color: "#c084fc", fontSize: "11px", padding: "3px 10px", borderRadius: "99px", fontWeight: "500",
            }}>
              {user?.role}
            </span>
            <span style={{
              background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)",
              color: "#34d399", fontSize: "11px", padding: "3px 10px", borderRadius: "99px", fontWeight: "500",
            }}>
              {restaurant?.name}
            </span>
          </div>
        </div>
        <button style={{
          background: "linear-gradient(135deg, #a855f7, #f472b6)",
          border: "none", color: "white", padding: "10px 20px",
          borderRadius: "10px", cursor: "pointer", fontSize: "13px", fontWeight: "600",
        }}>
          Edit Profile
        </button>
      </motion.div>

      {/* Settings Sections */}
      {sections.map((section, si) => {
        const Icon = section.icon
        return (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + si * 0.1 }}
            style={{ ...glassStyle, padding: "24px" }}
          >
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <div style={{
                width: "36px", height: "36px", borderRadius: "10px",
                background: `${section.color}15`,
                border: `1px solid ${section.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon style={{ width: "18px", height: "18px", color: section.color }} />
              </div>
              <div>
                <p style={{ fontSize: "15px", fontWeight: "600", color: "white", margin: 0 }}>{section.title}</p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{section.description}</p>
              </div>
            </div>

            {/* Fields */}
            {section.fields && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                {section.fields.map((field, fi) => (
                  <div key={fi} style={{ gridColumn: section.fields!.length === 1 ? "1 / -1" : "auto" }}>
                    <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "8px" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      autoComplete={(field as any).autoComplete || "off"}
                      style={{
                        width: "100%", padding: "10px 14px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px", color: "white",
                        fontSize: "14px", outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Toggles */}
            {section.toggles && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {section.toggles.map((toggle, ti) => (
                  <div key={ti} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: "14px", color: "white", margin: 0, fontWeight: "500" }}>{toggle.label}</p>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: "2px 0 0" }}>{toggle.description}</p>
                    </div>
                    {/* Toggle switch */}
                    <div
                      style={{
                        width: "44px", height: "24px", borderRadius: "99px",
                        background: ti % 2 === 0
                          ? "linear-gradient(135deg, #a855f7, #f472b6)"
                          : "rgba(255,255,255,0.1)",
                        cursor: "pointer", position: "relative",
                        transition: "all 0.2s", flexShrink: 0,
                      }}
                    >
                      <div style={{
                        width: "18px", height: "18px", borderRadius: "50%",
                        background: "white", position: "absolute",
                        top: "3px", left: ti % 2 === 0 ? "23px" : "3px",
                        transition: "all 0.2s",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Save button */}
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <button style={{
                background: "linear-gradient(135deg, #a855f7, #f472b6)",
                border: "none", color: "white", padding: "10px 24px",
                borderRadius: "10px", cursor: "pointer", fontSize: "13px", fontWeight: "600",
                boxShadow: "0 0 20px rgba(168,85,247,0.2)",
              }}>
                Save {section.title}
              </button>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
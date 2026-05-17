"use client"

import { motion } from "framer-motion"
import { useAuthStore } from "@/store/auth.store"
import { Settings, User, Store, Shield, Bell } from "lucide-react"

const glassStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
}

interface Field {
  label: string
  placeholder: string
  type?: string
  autoComplete?: string
  fullWidth?: boolean
}

interface Toggle {
  label: string
  description: string
}

interface Section {
  icon: any
  title: string
  description: string
  color: string
  fields?: Field[]
  toggles?: Toggle[]
}

const sections: Section[] = [
  {
    icon: User,
    title: "Profile",
    description: "Your personal information",
    color: "#60a5fa",
    fields: [
      { label: "Full Name", placeholder: "Your full name", type: "text", autoComplete: "off" },
      { label: "Email Address", placeholder: "your@gmail.com", type: "email", autoComplete: "off" },
    ],
  },
  {
    icon: Store,
    title: "Restaurant",
    description: "Restaurant information",
    color: "#c084fc",
    fields: [
      { label: "Restaurant Name", placeholder: "Restaurant name", type: "text", autoComplete: "off" },
      { label: "Address", placeholder: "Restaurant address", type: "text", autoComplete: "off" },
      { label: "Phone", placeholder: "+91 00000 00000", type: "text", autoComplete: "off", fullWidth: true },
    ],
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Control your notifications",
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
    description: "Manage your password",
    color: "#34d399",
    fields: [
      { label: "Current Password", placeholder: "Enter current password", type: "password", autoComplete: "new-password", fullWidth: true },
      { label: "New Password", placeholder: "Enter new password", type: "password", autoComplete: "new-password" },
      { label: "Confirm Password", placeholder: "Confirm new password", type: "password", autoComplete: "new-password" },
    ],
  },
]

export default function SettingsPage() {
  const { user, restaurant } = useAuthStore()

  return (
    <div className="space-y-4" style={{ position: "relative", zIndex: 1 }}>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Settings style={{ width: "22px", height: "22px", color: "#c084fc" }} />
          <h1 className="text-xl font-bold text-white">Settings</h1>
        </div>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "2px" }}>
          Manage your account preferences
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          ...glassStyle,
          padding: "16px",
          background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(244,114,182,0.05))",
          border: "1px solid rgba(168,85,247,0.2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "16px", flexShrink: 0,
            background: "linear-gradient(135deg, #a855f7, #f472b6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", fontWeight: "700", color: "white",
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: "16px", fontWeight: "700", color: "white", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.name}</p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "3px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email}</p>
            <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc", fontSize: "10px", padding: "2px 8px", borderRadius: "99px" }}>
                {user?.role}
              </span>
              <span style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#34d399", fontSize: "10px", padding: "2px 8px", borderRadius: "99px" }}>
                {restaurant?.name}
              </span>
            </div>
          </div>
          <button style={{
            background: "linear-gradient(135deg, #a855f7, #f472b6)",
            border: "none", color: "white", padding: "8px 16px",
            borderRadius: "10px", cursor: "pointer", fontSize: "12px", fontWeight: "600",
            whiteSpace: "nowrap",
          }}>
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Sections */}
      {sections.map((section, si) => {
        const Icon = section.icon
        return (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + si * 0.1 }}
            style={{ ...glassStyle, padding: "16px" }}
          >
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "9px",
                background: `${section.color}15`,
                border: `1px solid ${section.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              }}>
                <Icon style={{ width: "16px", height: "16px", color: section.color }} />
              </div>
              <div>
                <p style={{ fontSize: "14px", fontWeight: "600", color: "white", margin: 0 }}>{section.title}</p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{section.description}</p>
              </div>
            </div>

            {/* Fields */}
            {section.fields && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "12px", marginBottom: "14px" }}>
                {section.fields.map((field, fi) => (
                  <div key={fi} style={{ gridColumn: field.fullWidth ? "1 / -1" : "auto" }}>
                    <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      autoComplete={field.autoComplete || "off"}
                      style={{
                        width: "100%", padding: "9px 12px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "10px", color: "white",
                        fontSize: "13px", outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Toggles */}
            {section.toggles && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "14px" }}>
                {section.toggles.map((toggle, ti) => (
                  <div key={ti} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "13px", color: "white", margin: 0, fontWeight: "500" }}>{toggle.label}</p>
                      <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: "2px 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{toggle.description}</p>
                    </div>
                    <div style={{
                      width: "42px", height: "23px", borderRadius: "99px", flexShrink: 0,
                      background: ti % 2 === 0 ? "linear-gradient(135deg, #a855f7, #f472b6)" : "rgba(255,255,255,0.1)",
                      cursor: "pointer", position: "relative",
                    }}>
                      <div style={{
                        width: "17px", height: "17px", borderRadius: "50%",
                        background: "white", position: "absolute",
                        top: "3px", left: ti % 2 === 0 ? "22px" : "3px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Save button */}
    <div style={{
  display: "flex", justifyContent: "flex-end",
  marginTop: "16px",
  paddingTop: "16px",
  borderTop: "1px solid rgba(255,255,255,0.06)",
  }}>
    <button style={{
    background: "linear-gradient(135deg, #a855f7, #f472b6)",
    border: "none", color: "white", padding: "10px 24px",
    borderRadius: "10px", cursor: "pointer", fontSize: "13px",
    fontWeight: "600", display: "flex", alignItems: "center", gap: "6px",
    }}>
    Save {section.title}
    </button>
  </div>
  )
}
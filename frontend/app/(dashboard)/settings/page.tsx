"use client"

import { motion } from "framer-motion"
import { useAuthStore } from "@/store/auth.store"
import { Settings, User, Store, Shield, Bell, Brain } from "lucide-react"

const glassStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
}

export default function SettingsPage() {
  const { user, restaurant } = useAuthStore()

  const profileFields = [
    { label: "Full Name", placeholder: "Your full name", type: "text" },
    { label: "Email Address", placeholder: "your@gmail.com", type: "email" },
  ]

  const restaurantFields = [
    { label: "Restaurant Name", placeholder: "Restaurant name", type: "text", fullWidth: false },
    { label: "Address", placeholder: "Restaurant address", type: "text", fullWidth: false },
    { label: "Phone", placeholder: "+91 00000 00000", type: "text", fullWidth: true },
  ]

  const securityFields = [
    { label: "Current Password", placeholder: "Enter current password", type: "password", fullWidth: true },
    { label: "New Password", placeholder: "Enter new password", type: "password", fullWidth: false },
    { label: "Confirm Password", placeholder: "Confirm new password", type: "password", fullWidth: false },
  ]

  const toggles = [
    { label: "Low stock alerts", description: "Get notified when items are running low", on: true },
    { label: "Expiry warnings", description: "Alert before items expire", on: false },
    { label: "AI recommendations", description: "Daily AI-powered insights", on: true },
    { label: "Waste reports", description: "Weekly waste summary", on: false },
  ]

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px", color: "white",
    fontSize: "14px", outline: "none",
    boxSizing: "border-box" as const,
  }

  const saveButtonStyle = {
    background: "linear-gradient(135deg, #a855f7, #f472b6)",
    border: "none", color: "white", padding: "10px 24px",
    borderRadius: "10px", cursor: "pointer",
    fontSize: "13px", fontWeight: "600" as const,
  }

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
          ...glassStyle, padding: "16px",
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
            <p style={{ fontSize: "16px", fontWeight: "700", color: "white", margin: 0 }}>{user?.name}</p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", margin: "3px 0" }}>{user?.email}</p>
            <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap" }}>
              <span style={{ background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc", fontSize: "10px", padding: "2px 8px", borderRadius: "99px" }}>
                {user?.role}
              </span>
              <span style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", color: "#34d399", fontSize: "10px", padding: "2px 8px", borderRadius: "99px" }}>
                {restaurant?.name}
              </span>
            </div>
          </div>
          <button style={saveButtonStyle}>Edit Profile</button>
        </div>
      </motion.div>

      {/* Profile Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ ...glassStyle, padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(96,165,250,0.15)", border: "1px solid rgba(96,165,250,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <User style={{ width: "16px", height: "16px", color: "#60a5fa" }} />
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "white", margin: 0 }}>Profile</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Your personal information</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "16px" }}>
          {profileFields.map((field, i) => (
            <div key={i}>
              <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px" }}>{field.label}</label>
              <input type={field.type} placeholder={field.placeholder} autoComplete="off" style={inputStyle} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button style={saveButtonStyle}>Save Profile</button>
        </div>
      </motion.div>

      {/* Restaurant Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ ...glassStyle, padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(192,132,252,0.15)", border: "1px solid rgba(192,132,252,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Store style={{ width: "16px", height: "16px", color: "#c084fc" }} />
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "white", margin: 0 }}>Restaurant</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Restaurant information</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "16px" }}>
          {restaurantFields.map((field, i) => (
            <div key={i} style={{ gridColumn: field.fullWidth ? "1 / -1" : "auto" }}>
              <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px" }}>{field.label}</label>
              <input type={field.type} placeholder={field.placeholder} autoComplete="off" style={inputStyle} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button style={saveButtonStyle}>Save Restaurant</button>
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        style={{ ...glassStyle, padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Bell style={{ width: "16px", height: "16px", color: "#fbbf24" }} />
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "white", margin: 0 }}>Notifications</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Control your notifications</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "16px" }}>
          {toggles.map((toggle, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "13px", color: "white", margin: 0, fontWeight: "500" }}>{toggle.label}</p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: "2px 0 0" }}>{toggle.description}</p>
              </div>
              <div style={{
                width: "42px", height: "23px", borderRadius: "99px", flexShrink: 0,
                background: toggle.on ? "linear-gradient(135deg, #a855f7, #f472b6)" : "rgba(255,255,255,0.1)",
                cursor: "pointer", position: "relative",
              }}>
                <div style={{
                  width: "17px", height: "17px", borderRadius: "50%",
                  background: "white", position: "absolute",
                  top: "3px", left: toggle.on ? "22px" : "3px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                  transition: "left 0.2s",
                }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button style={saveButtonStyle}>Save Notifications</button>
        </div>
      </motion.div>

      {/* Security Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        style={{ ...glassStyle, padding: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Shield style={{ width: "16px", height: "16px", color: "#34d399" }} />
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "white", margin: 0 }}>Security</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0 }}>Manage your password</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px", marginBottom: "16px" }}>
          {securityFields.map((field, i) => (
            <div key={i} style={{ gridColumn: field.fullWidth ? "1 / -1" : "auto" }}>
              <label style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", display: "block", marginBottom: "6px" }}>{field.label}</label>
              <input type={field.type} placeholder={field.placeholder} autoComplete="new-password" style={inputStyle} />
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button style={saveButtonStyle}>Save Security</button>
        </div>
      </motion.div>

    </div>
  )
}
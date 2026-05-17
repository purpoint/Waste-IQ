"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Trash2, Plus, Search, Loader2, TrendingDown, AlertTriangle, DollarSign } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { getWasteLogsApi, addWasteLogApi, deleteWasteLogApi, WasteLog } from "@/lib/waste.api"
import { SkeletonTable } from "@/components/ui/skeleton-loader"

const reasons = ["Spoilage", "Overproduction", "Customer Return", "Expired", "Damaged", "Quality Issue", "Other"]
const units = ["kg", "g", "L", "ml", "pieces", "dozen"]
const COLORS = ["#a855f7", "#f472b6", "#fb923c", "#34d399", "#60a5fa", "#fbbf24", "#f87171"]

const glassStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
}

const inputStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white", borderRadius: "10px",
}

const selectStyle = {
  width: "100%", height: "36px", padding: "0 12px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "white", borderRadius: "10px", fontSize: "14px",
}

export default function WastePage() {
  const [wasteLogs, setWasteLogs] = useState<WasteLog[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [totalCost, setTotalCost] = useState(0)
  const [form, setForm] = useState({ itemName: "", quantity: "", unit: "kg", reason: "Spoilage", cost: "" })

  useEffect(() => { fetchWasteLogs() }, [])

  const fetchWasteLogs = async () => {
    try {
      const response = await getWasteLogsApi()
      setWasteLogs(response.data.wasteLogs)
      setTotalCost(response.data.totalCost)
    } catch (error) {
      console.error("Failed to fetch waste logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await addWasteLogApi(form)
      await fetchWasteLogs()
      setOpen(false)
      setForm({ itemName: "", quantity: "", unit: "kg", reason: "Spoilage", cost: "" })
    } catch (error) {
      console.error("Failed to add:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteWasteLogApi(id)
      await fetchWasteLogs()
    } catch (error) {
      console.error("Failed to delete:", error)
    }
  }

  const filtered = wasteLogs.filter((log) =>
    log.itemName.toLowerCase().includes(search.toLowerCase()) ||
    log.reason.toLowerCase().includes(search.toLowerCase())
  )

  const reasonData = reasons.map((reason) => ({
    name: reason,
    value: wasteLogs.filter((log) => log.reason === reason).reduce((sum, log) => sum + log.cost, 0),
  })).filter((d) => d.value > 0)

  const todayLogs = wasteLogs.filter((log) =>
    new Date(log.createdAt).toDateString() === new Date().toDateString()
  )

  return (
    <div className="space-y-4" style={{ position: "relative", zIndex: 1 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px" }}
      >
        <div>
          <h1 className="text-xl font-bold text-white">Waste Tracker</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>Log and analyze food waste</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button style={{
              background: "linear-gradient(135deg, #a855f7, #f472b6)",
              border: "none", color: "white", padding: "9px 14px",
              borderRadius: "12px", cursor: "pointer", fontSize: "13px",
              fontWeight: "600", display: "flex", alignItems: "center", gap: "6px",
            }}>
              <Plus style={{ width: "15px", height: "15px" }} /> Log Waste
            </button>
          </DialogTrigger>
          <DialogContent style={{
            background: "rgba(20,15,35,0.98)", backdropFilter: "blur(30px)",
            border: "1px solid rgba(168,85,247,0.2)", borderRadius: "20px", color: "white",
            maxHeight: "90vh", overflowY: "auto",
          }}>
            <DialogHeader>
              <DialogTitle style={{ color: "white" }}>Log Food Waste</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-3 mt-2">
              <div className="space-y-1">
                <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Item Name</Label>
                <Input placeholder="e.g. Tomatoes" value={form.itemName}
                  onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                  required style={inputStyle} className="placeholder:text-white/20" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Quantity</Label>
                  <Input type="number" placeholder="0" value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    required style={inputStyle} className="placeholder:text-white/20" />
                </div>
                <div className="space-y-1">
                  <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Unit</Label>
                  <select value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} style={selectStyle}>
                    {units.map((u) => <option key={u} style={{ background: "#1a0d2e" }}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Reason</Label>
                <select value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} style={selectStyle}>
                  {reasons.map((r) => <option key={r} style={{ background: "#1a0d2e" }}>{r}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Financial Loss (₹)</Label>
                <Input type="number" placeholder="0.00" value={form.cost}
                  onChange={(e) => setForm({ ...form, cost: e.target.value })}
                  required style={inputStyle} className="placeholder:text-white/20" />
              </div>
              <button type="submit" disabled={saving} style={{
                width: "100%", padding: "10px",
                background: "linear-gradient(135deg, #a855f7, #f472b6)",
                border: "none", color: "white", borderRadius: "10px",
                fontSize: "14px", fontWeight: "600", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
              }}>
                {saving ? <><Loader2 style={{ width: "16px", height: "16px" }} className="animate-spin" />Saving...</> : "Log Waste"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
        {[
          { label: "Total Loss", value: `₹${totalCost.toLocaleString()}`, icon: DollarSign, gradient: "linear-gradient(135deg, rgba(248,113,113,0.15), rgba(251,146,60,0.05))", border: "rgba(248,113,113,0.2)", color: "#f87171" },
          { label: "Today", value: `${todayLogs.length} logs`, icon: AlertTriangle, gradient: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,146,60,0.05))", border: "rgba(251,191,36,0.2)", color: "#fbbf24" },
          { label: "Total", value: `${wasteLogs.length} logs`, icon: TrendingDown, gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(244,114,182,0.05))", border: "rgba(168,85,247,0.2)", color: "#c084fc" },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              style={{ background: stat.gradient, border: `1px solid ${stat.border}`, borderRadius: "14px", padding: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ padding: "8px", background: "rgba(255,255,255,0.06)", borderRadius: "10px", flexShrink: 0 }}>
                  <Icon style={{ width: "16px", height: "16px", color: stat.color }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", margin: 0 }}>{stat.label}</p>
                  <p style={{ fontSize: "15px", fontWeight: "700", color: "white", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{stat.value}</p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Pie Chart */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{ ...glassStyle, padding: "16px" }}>
        <p className="font-semibold text-white mb-3" style={{ fontSize: "14px" }}>Waste by Reason</p>
        {reasonData.length === 0 ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "160px", color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
            No data yet
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={reasonData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {reasonData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "rgba(15,10,30,0.95)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: "10px", color: "#fff", fontSize: "12px" }}
                formatter={(value) => [`₹${value}`, "Loss"]} />
              <Legend iconType="circle" iconSize={7}
                formatter={(value) => <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px" }}>{value}</span>} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Search + Table */}
      <div style={{ position: "relative" }}>
        <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "rgba(255,255,255,0.3)" }} />
        <input placeholder="Search waste logs..." value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", padding: "10px 12px 10px 38px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" as const }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={glassStyle}>
        {loading ? (
          <SkeletonTable />
        ) : filtered.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 20px", color: "rgba(255,255,255,0.3)" }}>
            <Trash2 style={{ width: "36px", height: "36px", marginBottom: "12px", opacity: 0.3 }} />
            <p style={{ fontSize: "14px", margin: 0 }}>No waste logs yet</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "500px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Item", "Qty", "Reason", "Loss", "Date", ""].map((h, i) => (
                    <th key={i} style={{ textAlign: "left", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: "500", padding: "10px 12px", textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((log, i) => (
                  <tr key={log.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "12px", color: "white", fontSize: "13px", fontWeight: "500", whiteSpace: "nowrap" }}>{log.itemName}</td>
                    <td style={{ padding: "12px", color: "rgba(255,255,255,0.6)", fontSize: "13px", whiteSpace: "nowrap" }}>{log.quantity} {log.unit}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171", fontSize: "11px", padding: "3px 7px", borderRadius: "99px", whiteSpace: "nowrap" }}>
                        {log.reason}
                      </span>
                    </td>
                    <td style={{ padding: "12px", color: "#f87171", fontSize: "13px", fontWeight: "600", whiteSpace: "nowrap" }}>₹{log.cost}</td>
                    <td style={{ padding: "12px", color: "rgba(255,255,255,0.4)", fontSize: "12px", whiteSpace: "nowrap" }}>
                      {new Date(log.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <button onClick={() => handleDelete(log.id)}
                        style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", padding: "4px", borderRadius: "6px" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.background = "rgba(248,113,113,0.1)" }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; e.currentTarget.style.background = "transparent" }}>
                        <Trash2 style={{ width: "14px", height: "14px" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}
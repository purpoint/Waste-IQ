"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Package,
  Plus,
  Search,
  Trash2,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  getInventoryApi,
  addInventoryItemApi,
  deleteInventoryItemApi,
  InventoryItem,
} from "@/lib/inventory.api"
import { SkeletonTable } from "@/components/ui/skeleton-loader"

const categories = ["Vegetables", "Fruits", "Dairy", "Meat", "Seafood", "Grains", "Spices", "Beverages", "Other"]
const storageTypes = ["Refrigerated", "Frozen", "Dry Storage", "Room Temperature"]
const units = ["kg", "g", "L", "ml", "pieces", "dozen", "boxes"]

const glassStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "16px",
}

function getDaysUntilExpiry(expiryDate: string | null) {
  if (!expiryDate) return null
  const today = new Date()
  const expiry = new Date(expiryDate)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function ExpiryBadge({ expiryDate }: { expiryDate: string | null }) {
  const days = getDaysUntilExpiry(expiryDate)
  if (days === null) return <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>No expiry</span>

  const config =
    days < 0 ? { bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.3)", color: "#f87171", text: "Expired" } :
    days <= 2 ? { bg: "rgba(248,113,113,0.15)", border: "rgba(248,113,113,0.3)", color: "#f87171", text: `${days}d left` } :
    days <= 7 ? { bg: "rgba(251,191,36,0.15)", border: "rgba(251,191,36,0.3)", color: "#fbbf24", text: `${days}d left` } :
    { bg: "rgba(52,211,153,0.15)", border: "rgba(52,211,153,0.3)", color: "#34d399", text: `${days}d left` }

  return (
    <span style={{
      background: config.bg, border: `1px solid ${config.border}`,
      color: config.color, fontSize: "11px", fontWeight: "500",
      padding: "3px 8px", borderRadius: "99px",
    }}>
      {config.text}
    </span>
  )
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: "", quantity: "", unit: "kg", expiryDate: "",
    costPrice: "", category: "Vegetables", supplier: "", storageType: "Refrigerated",
  })

  useEffect(() => { fetchInventory() }, [])

  const fetchInventory = async () => {
    try {
      const response = await getInventoryApi()
      setInventory(response.data)
    } catch (error) {
      console.error("Failed to fetch inventory:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await addInventoryItemApi(form as any)
      await fetchInventory()
      setOpen(false)
      setForm({ name: "", quantity: "", unit: "kg", expiryDate: "", costPrice: "", category: "Vegetables", supplier: "", storageType: "Refrigerated" })
    } catch (error) {
      console.error("Failed to add item:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteInventoryItemApi(id)
      setInventory((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Failed to delete:", error)
    }
  }

  const filtered = inventory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  const expiringCount = inventory.filter((item) => {
    const days = getDaysUntilExpiry(item.expiryDate)
    return days !== null && days <= 7 && days >= 0
  }).length

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    borderRadius: "10px",
  }

  const selectStyle = {
    width: "100%", height: "36px", padding: "0 12px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white", borderRadius: "10px", fontSize: "14px",
  }

  return (
    <div className="space-y-6" style={{ position: "relative", zIndex: 1 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory</h1>
          <p className="mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>
            Track and manage your ingredients
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              style={{
                background: "linear-gradient(135deg, #a855f7, #f472b6)",
                border: "none", color: "white", padding: "10px 20px",
                borderRadius: "12px", cursor: "pointer", fontSize: "14px",
                fontWeight: "600", display: "flex", alignItems: "center", gap: "6px",
              }}
            >
              <Plus style={{ width: "16px", height: "16px" }} />
              Add Item
            </button>
          </DialogTrigger>
          <DialogContent style={{
            background: "rgba(20,15,35,0.98)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(168,85,247,0.2)",
            borderRadius: "20px",
            color: "white",
          }}>
            <DialogHeader>
              <DialogTitle style={{ color: "white" }}>Add Inventory Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1">
                  <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Item Name</Label>
                  <Input placeholder="e.g. Tomatoes" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required style={inputStyle} className="placeholder:text-white/20" />
                </div>
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
                <div className="space-y-1">
                  <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Cost Price (₹)</Label>
                  <Input type="number" placeholder="0.00" value={form.costPrice}
                    onChange={(e) => setForm({ ...form, costPrice: e.target.value })}
                    required style={inputStyle} className="placeholder:text-white/20" />
                </div>
                <div className="space-y-1">
                  <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Expiry Date</Label>
                  <Input type="date" value={form.expiryDate}
                    onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                    style={{ ...inputStyle, colorScheme: "dark" }} />
                </div>
                <div className="space-y-1">
                  <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Category</Label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={selectStyle}>
                    {categories.map((c) => <option key={c} style={{ background: "#1a0d2e" }}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Storage Type</Label>
                  <select value={form.storageType} onChange={(e) => setForm({ ...form, storageType: e.target.value })} style={selectStyle}>
                    {storageTypes.map((s) => <option key={s} style={{ background: "#1a0d2e" }}>{s}</option>)}
                  </select>
                </div>
                <div className="col-span-2 space-y-1">
                  <Label style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px" }}>Supplier (optional)</Label>
                  <Input placeholder="Supplier name" value={form.supplier}
                    onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                    style={inputStyle} className="placeholder:text-white/20" />
                </div>
              </div>
              <button
                type="submit" disabled={saving}
                style={{
                  width: "100%", padding: "10px",
                  background: "linear-gradient(135deg, #a855f7, #f472b6)",
                  border: "none", color: "white", borderRadius: "10px",
                  fontSize: "14px", fontWeight: "600", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                }}
              >
                {saving ? <><Loader2 style={{ width: "16px", height: "16px" }} className="animate-spin" />Saving...</> : "Add Item"}
              </button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Items", value: inventory.length, icon: Package, gradient: "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(168,85,247,0.05))", border: "rgba(96,165,250,0.2)", color: "#60a5fa" },
          { label: "Expiring Soon", value: expiringCount, icon: AlertTriangle, gradient: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,146,60,0.05))", border: "rgba(251,191,36,0.2)", color: "#fbbf24" },
          { label: "Total Value", value: `₹${inventory.reduce((sum, item) => sum + item.costPrice * item.quantity, 0).toLocaleString()}`, icon: Package, gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(244,114,182,0.05))", border: "rgba(168,85,247,0.2)", color: "#c084fc" },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ background: stat.gradient, border: `1px solid ${stat.border}`, borderRadius: "16px", padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div style={{ padding: "10px", background: "rgba(255,255,255,0.06)", borderRadius: "12px" }}>
                <Icon style={{ width: "20px", height: "20px", color: stat.color }} />
              </div>
              <div>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
                <p style={{ fontSize: "20px", fontWeight: "700", color: "white" }}>{stat.value}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Search */}
      <div style={{ position: "relative" }}>
        <Search style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "rgba(255,255,255,0.3)" }} />
        <input
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "10px 12px 10px 38px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px", color: "white", fontSize: "14px",
            outline: "none",
          }}
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={glassStyle}
      >
        {loading ? (
          <SkeletonTable />
        ) : filtered.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "60px", color: "rgba(255,255,255,0.3)" }}>
            <Package style={{ width: "40px", height: "40px", marginBottom: "12px", opacity: 0.3 }} />
            <p style={{ fontSize: "14px" }}>No inventory items yet</p>
            <p style={{ fontSize: "12px", marginTop: "4px" }}>Click "Add Item" to get started</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {["Item", "Category", "Quantity", "Cost", "Storage", "Expiry", "Actions"].map((h) => (
                    <th key={h} style={{ textAlign: "left", fontSize: "11px", color: "rgba(255,255,255,0.3)", fontWeight: "500", padding: "12px 16px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, i) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <p style={{ color: "white", fontSize: "14px", fontWeight: "500" }}>{item.name}</p>
                      {item.supplier && <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px" }}>{item.supplier}</p>}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{
                        background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.2)",
                        color: "#c084fc", fontSize: "11px", padding: "3px 8px", borderRadius: "99px",
                      }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
                      {item.quantity} {item.unit}
                    </td>
                    <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.7)", fontSize: "14px" }}>
                      ₹{item.costPrice}
                    </td>
                    <td style={{ padding: "14px 16px", color: "rgba(255,255,255,0.4)", fontSize: "13px" }}>
                      {item.storageType}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <ExpiryBadge expiryDate={item.expiryDate} />
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          background: "transparent", border: "none",
                          color: "rgba(255,255,255,0.3)", cursor: "pointer", padding: "6px",
                          borderRadius: "8px", transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#f87171"
                          e.currentTarget.style.background = "rgba(248,113,113,0.1)"
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.3)"
                          e.currentTarget.style.background = "transparent"
                        }}
                      >
                        <Trash2 style={{ width: "16px", height: "16px" }} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  )
}
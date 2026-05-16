"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Trash2,
  Plus,
  Search,
  Loader2,
  TrendingDown,
  AlertTriangle,
  DollarSign,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import {
  getWasteLogsApi,
  addWasteLogApi,
  deleteWasteLogApi,
  WasteLog,
} from "@/lib/waste.api"

const reasons = [
  "Spoilage",
  "Overproduction",
  "Customer Return",
  "Expired",
  "Damaged",
  "Quality Issue",
  "Other",
]

const units = ["kg", "g", "L", "ml", "pieces", "dozen"]

const COLORS = ["#f87171", "#fb923c", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6"]

export default function WastePage() {
  const [wasteLogs, setWasteLogs] = useState<WasteLog[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [totalCost, setTotalCost] = useState(0)
  const [form, setForm] = useState({
    itemName: "",
    quantity: "",
    unit: "kg",
    reason: "Spoilage",
    cost: "",
  })

  useEffect(() => {
    fetchWasteLogs()
  }, [])

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
      console.error("Failed to add waste log:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteWasteLogApi(id)
      await fetchWasteLogs()
    } catch (error) {
      console.error("Failed to delete waste log:", error)
    }
  }

  const filtered = wasteLogs.filter((log) =>
    log.itemName.toLowerCase().includes(search.toLowerCase()) ||
    log.reason.toLowerCase().includes(search.toLowerCase())
  )

  // Pie chart data by reason
  const reasonData = reasons.map((reason) => ({
    name: reason,
    value: wasteLogs
      .filter((log) => log.reason === reason)
      .reduce((sum, log) => sum + log.cost, 0),
  })).filter((d) => d.value > 0)

  const todayLogs = wasteLogs.filter((log) => {
    const today = new Date().toDateString()
    return new Date(log.createdAt).toDateString() === today
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Waste Tracker</h1>
          <p className="text-slate-400 mt-1">Log and analyze food waste in real time</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
              <Plus className="w-4 h-4" />
              Log Waste
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Log Food Waste</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Item Name</Label>
                <Input
                  placeholder="e.g. Tomatoes"
                  value={form.itemName}
                  onChange={(e) => setForm({ ...form, itemName: e.target.value })}
                  required
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Quantity</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Unit</Label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full h-9 px-3 rounded-md bg-slate-800 border border-slate-600 text-white text-sm"
                  >
                    {units.map((u) => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Reason</Label>
                <select
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full h-9 px-3 rounded-md bg-slate-800 border border-slate-600 text-white text-sm"
                >
                  {reasons.map((r) => <option key={r}>{r}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-slate-300 text-xs">Financial Loss (₹)</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={form.cost}
                  onChange={(e) => setForm({ ...form, cost: e.target.value })}
                  required
                  className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                {saving ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>
                ) : (
                  "Log Waste"
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <DollarSign className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total Loss</p>
              <p className="text-white text-xl font-bold">₹{totalCost.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Today's Waste</p>
              <p className="text-white text-xl font-bold">{todayLogs.length} logs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <TrendingDown className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total Logs</p>
              <p className="text-white text-xl font-bold">{wasteLogs.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart + Table Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Pie Chart */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-base font-semibold">
              Waste by Reason
            </CardTitle>
          </CardHeader>
          <CardContent>
            {reasonData.length === 0 ? (
              <div className="flex items-center justify-center h-48 text-slate-500 text-sm">
                No data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={reasonData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {reasonData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
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
                      <span style={{ color: "#94a3b8", fontSize: "11px" }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Table */}
        <div className="xl:col-span-2 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search waste logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>

          <Card className="bg-slate-900 border-slate-800">
            <CardContent className="p-0">
              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                </div>
              ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                  <Trash2 className="w-10 h-10 mb-3 opacity-30" />
                  <p className="text-sm">No waste logs yet</p>
                  <p className="text-xs mt-1">Click "Log Waste" to start tracking</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Item</th>
                        <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Quantity</th>
                        <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Reason</th>
                        <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Loss</th>
                        <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Date</th>
                        <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((log, i) => (
                        <motion.tr
                          key={log.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="px-4 py-3 text-white text-sm font-medium">
                            {log.itemName}
                          </td>
                          <td className="px-4 py-3 text-slate-300 text-sm">
                            {log.quantity} {log.unit}
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="outline"
                              className="border-red-500/30 text-red-400 bg-red-500/5 text-xs"
                            >
                              {log.reason}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-red-400 text-sm font-medium">
                            ₹{log.cost}
                          </td>
                          <td className="px-4 py-3 text-slate-400 text-xs">
                            {new Date(log.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(log.id)}
                              className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
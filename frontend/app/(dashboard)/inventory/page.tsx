"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Package,
  Plus,
  Search,
  Trash2,
  AlertTriangle,
  Edit,
  Loader2,
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
  getInventoryApi,
  addInventoryItemApi,
  deleteInventoryItemApi,
  InventoryItem,
} from "@/lib/inventory.api"

const categories = ["Vegetables", "Fruits", "Dairy", "Meat", "Seafood", "Grains", "Spices", "Beverages", "Other"]
const storageTypes = ["Refrigerated", "Frozen", "Dry Storage", "Room Temperature"]
const units = ["kg", "g", "L", "ml", "pieces", "dozen", "boxes"]

function getDaysUntilExpiry(expiryDate: string | null) {
  if (!expiryDate) return null
  const today = new Date()
  const expiry = new Date(expiryDate)
  const diff = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  return diff
}

function ExpiryBadge({ expiryDate }: { expiryDate: string | null }) {
  const days = getDaysUntilExpiry(expiryDate)
  if (days === null) return <span className="text-slate-500 text-xs">No expiry</span>
  if (days < 0) return <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs">Expired</Badge>
  if (days <= 2) return <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-xs">{days}d left</Badge>
  if (days <= 7) return <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-xs">{days}d left</Badge>
  return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs">{days}d left</Badge>
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    unit: "kg",
    expiryDate: "",
    costPrice: "",
    category: "Vegetables",
    supplier: "",
    storageType: "Refrigerated",
  })

  useEffect(() => {
    fetchInventory()
  }, [])

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
      setForm({
        name: "", quantity: "", unit: "kg", expiryDate: "",
        costPrice: "", category: "Vegetables", supplier: "", storageType: "Refrigerated",
      })
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
      console.error("Failed to delete item:", error)
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory</h1>
          <p className="text-slate-400 mt-1">Track and manage your ingredients</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white gap-2">
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Add Inventory Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2 space-y-1">
                  <Label className="text-slate-300 text-xs">Item Name</Label>
                  <Input
                    placeholder="e.g. Tomatoes"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
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
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Cost Price (₹)</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={form.costPrice}
                    onChange={(e) => setForm({ ...form, costPrice: e.target.value })}
                    required
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Expiry Date</Label>
                  <Input
                    type="date"
                    value={form.expiryDate}
                    onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Category</Label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full h-9 px-3 rounded-md bg-slate-800 border border-slate-600 text-white text-sm"
                  >
                    {categories.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-300 text-xs">Storage Type</Label>
                  <select
                    value={form.storageType}
                    onChange={(e) => setForm({ ...form, storageType: e.target.value })}
                    className="w-full h-9 px-3 rounded-md bg-slate-800 border border-slate-600 text-white text-sm"
                  >
                    {storageTypes.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="col-span-2 space-y-1">
                  <Label className="text-slate-300 text-xs">Supplier (optional)</Label>
                  <Input
                    placeholder="Supplier name"
                    value={form.supplier}
                    onChange={(e) => setForm({ ...form, supplier: e.target.value })}
                    className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={saving}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white"
              >
                {saving ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</> : "Add Item"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total Items</p>
              <p className="text-white text-xl font-bold">{inventory.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Expiring Soon</p>
              <p className="text-white text-xl font-bold">{expiringCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <Package className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-slate-400 text-xs">Total Value</p>
              <p className="text-white text-xl font-bold">
                ₹{inventory.reduce((sum, item) => sum + item.costPrice * item.quantity, 0).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <Input
          placeholder="Search by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-slate-900 border-slate-700 text-white placeholder:text-slate-500"
        />
      </div>

      {/* Table */}
      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-500">
              <Package className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">No inventory items yet</p>
              <p className="text-xs mt-1">Click "Add Item" to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Item</th>
                    <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Category</th>
                    <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Quantity</th>
                    <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Cost</th>
                    <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Storage</th>
                    <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Expiry</th>
                    <th className="text-left text-xs text-slate-400 font-medium px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="text-white text-sm font-medium">{item.name}</p>
                        {item.supplier && (
                          <p className="text-slate-500 text-xs">{item.supplier}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                          {item.category}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-sm">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="px-4 py-3 text-slate-300 text-sm">
                        ₹{item.costPrice}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs">
                        {item.storageType}
                      </td>
                      <td className="px-4 py-3">
                        <ExpiryBadge expiryDate={item.expiryDate} />
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(item.id)}
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
  )
}
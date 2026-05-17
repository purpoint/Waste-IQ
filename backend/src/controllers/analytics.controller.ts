import { Response } from "express"
import { prisma } from "../lib/prisma"
import { AuthRequest } from "../middleware/auth"

export const getAnalytics = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurantId = req.user?.restaurantId

    const [inventory, wasteLogs] = await Promise.all([
      prisma.inventory.findMany({ where: { restaurantId } }),
      prisma.wasteLog.findMany({
        where: { restaurantId },
        orderBy: { createdAt: "desc" },
      }),
    ])

    // Total waste cost
    const totalWasteCost = wasteLogs.reduce((sum, log) => sum + log.cost, 0)

    // Total inventory value
    const totalInventoryValue = inventory.reduce(
      (sum, item) => sum + item.costPrice * item.quantity, 0
    )

    // Waste by reason
    const wasteByReason = wasteLogs.reduce((acc: Record<string, number>, log) => {
      acc[log.reason] = (acc[log.reason] || 0) + log.cost
      return acc
    }, {})

    // Waste by item
    const wasteByItem = wasteLogs.reduce((acc: Record<string, number>, log) => {
      acc[log.itemName] = (acc[log.itemName] || 0) + log.cost
      return acc
    }, {})

    // Top 5 wasted items
    const topWastedItems = Object.entries(wasteByItem)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, cost]) => ({ name, cost }))

    // Waste by category (from inventory)
    const wasteByCategory = inventory.reduce((acc: Record<string, number>, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.costPrice * item.quantity
      return acc
    }, {})

    // Expiring items
    const expiringItems = inventory.filter((item) => {
      if (!item.expiryDate) return false
      const days = Math.ceil(
        (new Date(item.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
      return days <= 7 && days >= 0
    })

    // Waste logs by day (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split("T")[0]
    })

    const wasteByDay = last7Days.map((day) => {
      const dayLogs = wasteLogs.filter(
        (log) => log.createdAt.toISOString().split("T")[0] === day
      )
      return {
        day: new Date(day).toLocaleDateString("en-IN", { weekday: "short" }),
        cost: dayLogs.reduce((sum, log) => sum + log.cost, 0),
        count: dayLogs.length,
      }
    })

    res.status(200).json({
      success: true,
      data: {
        totalWasteCost,
        totalInventoryValue,
        totalWasteLogs: wasteLogs.length,
        totalInventoryItems: inventory.length,
        expiringItemsCount: expiringItems.length,
        wasteByReason,
        topWastedItems,
        wasteByCategory,
        wasteByDay,
      },
    })
  } catch (error) {
    console.error("Analytics error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurantId = req.user?.restaurantId

    const now = new Date()
    const startOfWeek = new Date(now)
    startOfWeek.setDate(now.getDate() - 7)

    const startOfLastWeek = new Date(now)
    startOfLastWeek.setDate(now.getDate() - 14)

    const [
      inventory,
      thisWeekWaste,
      lastWeekWaste,
      alerts,
      thisMonthSales,
      lastMonthSales,
    ] = await Promise.all([
      prisma.inventory.findMany({ where: { restaurantId } }),
      prisma.wasteLog.findMany({
        where: { restaurantId, createdAt: { gte: startOfWeek } },
      }),
      prisma.wasteLog.findMany({
        where: { restaurantId, createdAt: { gte: startOfLastWeek, lt: startOfWeek } },
      }),
      prisma.alert.findMany({
        where: { restaurantId, isRead: false },
      }),
      prisma.salesData.findMany({
        where: {
          restaurantId,
          date: { gte: new Date(now.getFullYear(), now.getMonth(), 1) },
        },
      }),
      prisma.salesData.findMany({
        where: {
          restaurantId,
          date: {
            gte: new Date(now.getFullYear(), now.getMonth() - 1, 1),
            lt: new Date(now.getFullYear(), now.getMonth(), 1),
          },
        },
      }),
    ])

    const thisWeekWasteCost = thisWeekWaste.reduce((sum, log) => sum + log.cost, 0)
    const lastWeekWasteCost = lastWeekWaste.reduce((sum, log) => sum + log.cost, 0)
    const wasteChange = lastWeekWasteCost > 0
      ? (((thisWeekWasteCost - lastWeekWasteCost) / lastWeekWasteCost) * 100).toFixed(1)
      : "0"

    const expiringItems = inventory.filter((item) => {
      if (!item.expiryDate) return false
      const days = Math.ceil((new Date(item.expiryDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return days <= 7 && days >= 0
    })

    const thisMonthRevenue = thisMonthSales.reduce((sum, s) => sum + s.revenue, 0)
    const lastMonthRevenue = lastMonthSales.reduce((sum, s) => sum + s.revenue, 0)
    const revenueChange = lastMonthRevenue > 0
      ? (((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1)
      : "0"

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split("T")[0]
    })

    const wasteByDay = last7Days.map((day) => {
      const dayLogs = thisWeekWaste.filter(
        (log) => new Date(log.createdAt).toISOString().split("T")[0] === day
      )
      return {
        day: new Date(day).toLocaleDateString("en-IN", { weekday: "short" }),
        waste: dayLogs.reduce((sum, log) => sum + log.cost, 0),
        predicted: Math.floor(Math.random() * 500) + 200,
      }
    })

    res.status(200).json({
      success: true,
      data: {
        thisWeekWasteCost,
        wasteChange: `${Number(wasteChange) > 0 ? "+" : ""}${wasteChange}%`,
        wasteTrend: Number(wasteChange) <= 0 ? "down" : "up",
        totalInventoryItems: inventory.length,
        expiringItemsCount: expiringItems.length,
        unreadAlerts: alerts.length,
        thisMonthRevenue,
        revenueChange: `${Number(revenueChange) > 0 ? "+" : ""}${revenueChange}%`,
        revenueTrend: Number(revenueChange) >= 0 ? "up" : "down",
        wasteByDay,
      },
    })
  } catch (error) {
    console.error("Dashboard stats error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}
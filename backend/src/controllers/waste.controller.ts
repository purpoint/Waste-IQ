import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { AuthRequest } from "../middleware/auth"

export const getWasteLogs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurantId = req.user?.restaurantId

    const wasteLogs = await prisma.wasteLog.findMany({
      where: { restaurantId },
      orderBy: { createdAt: "desc" },
    })

    const totalCost = wasteLogs.reduce((sum, log) => sum + log.cost, 0)

    res.status(200).json({
      success: true,
      message: "Waste logs fetched successfully",
      data: { wasteLogs, totalCost },
    })
  } catch (error) {
    console.error("Get waste logs error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export const addWasteLog = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurantId = req.user?.restaurantId
    const { itemName, quantity, unit, reason, cost } = req.body

    if (!itemName || !quantity || !unit || !reason || !cost) {
      res.status(400).json({ success: false, message: "All fields are required" })
      return
    }

    const wasteLog = await prisma.wasteLog.create({
      data: {
        itemName,
        quantity: parseFloat(quantity),
        unit,
        reason,
        cost: parseFloat(cost),
        restaurantId: restaurantId!,
      },
    })

    res.status(201).json({
      success: true,
      message: "Waste log added successfully",
      data: wasteLog,
    })
  } catch (error) {
    console.error("Add waste log error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export const deleteWasteLog = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const restaurantId = req.user?.restaurantId

    const existing = await prisma.wasteLog.findFirst({
      where: { id, restaurantId },
    })

    if (!existing) {
      res.status(404).json({ success: false, message: "Waste log not found" })
      return
    }

    await prisma.wasteLog.delete({ where: { id } })

    res.status(200).json({
      success: true,
      message: "Waste log deleted successfully",
    })
  } catch (error) {
    console.error("Delete waste log error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}
import { Request, Response } from "express"
import { prisma } from "../lib/prisma"
import { AuthRequest } from "../middleware/auth"

export const getInventory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurantId = req.user?.restaurantId

    const inventory = await prisma.inventory.findMany({
      where: { restaurantId },
      orderBy: { createdAt: "desc" },
    })

    res.status(200).json({
      success: true,
      message: "Inventory fetched successfully",
      data: inventory,
    })
  } catch (error) {
    console.error("Get inventory error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export const addInventoryItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurantId = req.user?.restaurantId
    const { name, quantity, unit, expiryDate, costPrice, category, supplier, storageType } = req.body

    if (!name || !quantity || !unit || !costPrice || !category || !storageType) {
      res.status(400).json({ success: false, message: "Required fields missing" })
      return
    }

    const item = await prisma.inventory.create({
      data: {
        name,
        quantity: parseFloat(quantity),
        unit,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        costPrice: parseFloat(costPrice),
        category,
        supplier: supplier || null,
        storageType,
        restaurantId: restaurantId!,
      },
    })

    res.status(201).json({
      success: true,
      message: "Item added successfully",
      data: item,
    })
  } catch (error) {
    console.error("Add inventory error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export const updateInventoryItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const restaurantId = req.user?.restaurantId

    const existing = await prisma.inventory.findFirst({
      where: { id, restaurantId },
    })

    if (!existing) {
      res.status(404).json({ success: false, message: "Item not found" })
      return
    }

    const updated = await prisma.inventory.update({
      where: { id },
      data: {
        ...req.body,
        quantity: req.body.quantity ? parseFloat(req.body.quantity) : existing.quantity,
        costPrice: req.body.costPrice ? parseFloat(req.body.costPrice) : existing.costPrice,
        expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : existing.expiryDate,
      },
    })

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      data: updated,
    })
  } catch (error) {
    console.error("Update inventory error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export const deleteInventoryItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const restaurantId = req.user?.restaurantId

    const existing = await prisma.inventory.findFirst({
      where: { id, restaurantId },
    })

    if (!existing) {
      res.status(404).json({ success: false, message: "Item not found" })
      return
    }

    await prisma.inventory.delete({ where: { id } })

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    })
  } catch (error) {
    console.error("Delete inventory error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}
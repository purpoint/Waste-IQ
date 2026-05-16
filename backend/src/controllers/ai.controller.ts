import { Response } from "express"
import { prisma } from "../lib/prisma"
import { AuthRequest } from "../middleware/auth"

export const getAIInsights = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurantId = req.user?.restaurantId

    const [inventory, wasteLogs, restaurant] = await Promise.all([
      prisma.inventory.findMany({ where: { restaurantId } }),
      prisma.wasteLog.findMany({
        where: { restaurantId },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
      prisma.restaurant.findUnique({ where: { id: restaurantId } }),
    ])

    // Calculate insights
    const totalWasteCost = wasteLogs.reduce((sum, log) => sum + log.cost, 0)
    const expiringItems = inventory.filter((item) => {
      if (!item.expiryDate) return false
      const days = Math.ceil((new Date(item.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      return days <= 7 && days >= 0
    })

    const wasteByReason = wasteLogs.reduce((acc: Record<string, number>, log) => {
      acc[log.reason] = (acc[log.reason] || 0) + log.cost
      return acc
    }, {})

    const topWastedItems = wasteLogs.reduce((acc: Record<string, number>, log) => {
      acc[log.itemName] = (acc[log.itemName] || 0) + log.cost
      return acc
    }, {})

    const insights = {
      restaurant: restaurant?.name,
      totalInventoryItems: inventory.length,
      totalWasteCost,
      expiringItemsCount: expiringItems.length,
      expiringItems: expiringItems.map((i) => i.name),
      wasteByReason,
      topWastedItems,
      recentWasteLogs: wasteLogs.slice(0, 5),
    }

    res.status(200).json({
      success: true,
      data: insights,
    })
  } catch (error) {
    console.error("AI insights error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}

export const chatWithAI = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurantId = req.user?.restaurantId
    const { message, history = [] } = req.body

    // Get restaurant context
    const [inventory, wasteLogs, restaurant] = await Promise.all([
      prisma.inventory.findMany({ where: { restaurantId } }),
      prisma.wasteLog.findMany({
        where: { restaurantId },
        orderBy: { createdAt: "desc" },
        take: 30,
      }),
      prisma.restaurant.findUnique({ where: { id: restaurantId } }),
    ])

    const totalWasteCost = wasteLogs.reduce((sum, log) => sum + log.cost, 0)
    const expiringItems = inventory.filter((item) => {
      if (!item.expiryDate) return false
      const days = Math.ceil((new Date(item.expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      return days <= 7 && days >= 0
    })

    const context = `
You are WasteIQ AI, a smart food waste reduction assistant for ${restaurant?.name}.

Current restaurant data:
- Total inventory items: ${inventory.length}
- Inventory: ${inventory.map((i) => `${i.name} (${i.quantity}${i.unit}, expires: ${i.expiryDate ? new Date(i.expiryDate).toDateString() : "no expiry"})`).join(", ")}
- Total food waste cost: ₹${totalWasteCost}
- Recent waste logs: ${wasteLogs.slice(0, 10).map((w) => `${w.itemName}: ${w.quantity}${w.unit} wasted (${w.reason}) - ₹${w.cost}`).join(", ")}
- Items expiring within 7 days: ${expiringItems.map((i) => i.name).join(", ") || "None"}

Your job is to:
1. Answer questions about inventory, waste, and demand
2. Give smart recommendations to reduce food waste
3. Suggest what to purchase or avoid purchasing
4. Be concise, friendly, and data-driven
5. Always respond in the context of the restaurant's actual data above
`

   // Call Groq API
const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
  },
  body: JSON.stringify({
    model: "llama-3.3-70b-versatile",
    max_tokens: 1024,
    messages: [
      { role: "system", content: context },
      ...history,
      { role: "user", content: message },
    ],
  }),
})

const data = await response.json() as any

if (!response.ok) {
  throw new Error(data.error?.message || "AI request failed")
}

const aiMessage = data.choices[0].message.content

    res.status(200).json({
      success: true,
      data: { message: aiMessage },
    })
  } catch (error) {
    console.error("Chat AI error:", error)
    res.status(500).json({ success: false, message: "Internal server error" })
  }
}
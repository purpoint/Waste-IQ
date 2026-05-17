import { PrismaClient } from "@prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"
import pg from "pg"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config()

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL! })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("🌱 Seeding database...")

  // Create restaurant
  const hashedPassword = await bcrypt.hash("demo123456", 12)

  const restaurant = await prisma.restaurant.upsert({
    where: { id: "demo-restaurant-001" },
    update: {},
    create: {
      id: "demo-restaurant-001",
      name: "Spice Garden Restaurant",
      address: "123 MG Road, Bangalore, Karnataka",
      phone: "+91 98765 43210",
      email: "owner@spicegarden.com",
      users: {
        create: {
          id: "demo-user-001",
          email: "demo@wasteiq.com",
          password: hashedPassword,
          name: "Rahul Sharma",
          role: "OWNER",
        },
      },
    },
    include: { users: true },
  })

  console.log("✅ Restaurant created:", restaurant.name)

  // Create inventory items
  const inventoryItems = [
    { name: "Tomatoes", quantity: 15, unit: "kg", costPrice: 40, category: "Vegetables", supplier: "Fresh Farms Co.", storageType: "Refrigerated", expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000) },
    { name: "Onions", quantity: 20, unit: "kg", costPrice: 25, category: "Vegetables", supplier: "Fresh Farms Co.", storageType: "Dry Storage", expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) },
    { name: "Paneer", quantity: 8, unit: "kg", costPrice: 320, category: "Dairy", supplier: "Amul Dairy", storageType: "Refrigerated", expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
    { name: "Chicken", quantity: 12, unit: "kg", costPrice: 280, category: "Meat", supplier: "Fresh Meats Ltd.", storageType: "Frozen", expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
    { name: "Basmati Rice", quantity: 50, unit: "kg", costPrice: 85, category: "Grains", supplier: "India Rice Mills", storageType: "Dry Storage", expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) },
    { name: "Garam Masala", quantity: 3, unit: "kg", costPrice: 450, category: "Spices", supplier: "Spice World", storageType: "Dry Storage", expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000) },
    { name: "Milk", quantity: 30, unit: "L", costPrice: 55, category: "Dairy", supplier: "Amul Dairy", storageType: "Refrigerated", expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) },
    { name: "Potatoes", quantity: 25, unit: "kg", costPrice: 20, category: "Vegetables", supplier: "Fresh Farms Co.", storageType: "Dry Storage", expiryDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000) },
    { name: "Bell Peppers", quantity: 6, unit: "kg", costPrice: 120, category: "Vegetables", supplier: "Fresh Farms Co.", storageType: "Refrigerated", expiryDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000) },
    { name: "Cooking Oil", quantity: 20, unit: "L", costPrice: 150, category: "Other", supplier: "Fortune Foods", storageType: "Dry Storage", expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) },
    { name: "Yogurt", quantity: 10, unit: "kg", costPrice: 80, category: "Dairy", supplier: "Amul Dairy", storageType: "Refrigerated", expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000) },
    { name: "Garlic", quantity: 4, unit: "kg", costPrice: 200, category: "Vegetables", supplier: "Fresh Farms Co.", storageType: "Dry Storage", expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
    { name: "Ginger", quantity: 3, unit: "kg", costPrice: 180, category: "Vegetables", supplier: "Fresh Farms Co.", storageType: "Refrigerated", expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) },
    { name: "Lemon", quantity: 5, unit: "kg", costPrice: 60, category: "Fruits", supplier: "Fresh Farms Co.", storageType: "Refrigerated", expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    { name: "Butter", quantity: 5, unit: "kg", costPrice: 450, category: "Dairy", supplier: "Amul Dairy", storageType: "Refrigerated", expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) },
  ]

  for (const item of inventoryItems) {
    await prisma.inventory.create({
      data: { ...item, restaurantId: restaurant.id },
    })
  }
  console.log(`✅ ${inventoryItems.length} inventory items created`)

  // Create waste logs
  const wasteLogs = [
    { itemName: "Tomatoes", quantity: 3, unit: "kg", reason: "Spoilage", cost: 120, daysAgo: 0 },
    { itemName: "Milk", quantity: 5, unit: "L", reason: "Expired", cost: 275, daysAgo: 1 },
    { itemName: "Chicken", quantity: 2, unit: "kg", reason: "Quality Issue", cost: 560, daysAgo: 1 },
    { itemName: "Paneer", quantity: 1, unit: "kg", reason: "Overproduction", cost: 320, daysAgo: 2 },
    { itemName: "Bell Peppers", quantity: 2, unit: "kg", reason: "Spoilage", cost: 240, daysAgo: 2 },
    { itemName: "Yogurt", quantity: 3, unit: "kg", reason: "Expired", cost: 240, daysAgo: 3 },
    { itemName: "Bread", quantity: 4, unit: "pieces", reason: "Overproduction", cost: 80, daysAgo: 3 },
    { itemName: "Onions", quantity: 2, unit: "kg", reason: "Damaged", cost: 50, daysAgo: 4 },
    { itemName: "Rice", quantity: 3, unit: "kg", reason: "Overproduction", cost: 255, daysAgo: 4 },
    { itemName: "Tomatoes", quantity: 2, unit: "kg", reason: "Spoilage", cost: 80, daysAgo: 5 },
    { itemName: "Chicken", quantity: 1.5, unit: "kg", reason: "Customer Return", cost: 420, daysAgo: 5 },
    { itemName: "Milk", quantity: 3, unit: "L", reason: "Expired", cost: 165, daysAgo: 6 },
  ]

  for (const log of wasteLogs) {
    const createdAt = new Date()
    createdAt.setDate(createdAt.getDate() - log.daysAgo)
    await prisma.wasteLog.create({
      data: {
        itemName: log.itemName,
        quantity: log.quantity,
        unit: log.unit,
        reason: log.reason,
        cost: log.cost,
        restaurantId: restaurant.id,
        createdAt,
      },
    })
  }
  console.log(`✅ ${wasteLogs.length} waste logs created`)

  // Create sales data
  const salesData = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    salesData.push({
      date,
      revenue: Math.floor(Math.random() * (isWeekend ? 25000 : 18000)) + (isWeekend ? 15000 : 8000),
      orderCount: Math.floor(Math.random() * (isWeekend ? 120 : 80)) + (isWeekend ? 60 : 30),
      restaurantId: restaurant.id,
    })
  }

  await prisma.salesData.createMany({ data: salesData })
  console.log(`✅ ${salesData.length} days of sales data created`)

  // Create alerts
  const alerts = [
    { type: "EXPIRY_WARNING" as const, message: "Paneer expires in 3 days — use or discard soon", severity: "high" },
    { type: "EXPIRY_WARNING" as const, message: "Chicken expires in 2 days — prioritize usage", severity: "critical" },
    { type: "LOW_STOCK" as const, message: "Garam Masala stock is low — consider reordering", severity: "medium" },
    { type: "HIGH_WASTE" as const, message: "Food waste this week is 23% higher than last week", severity: "high" },
    { type: "DEMAND_SPIKE" as const, message: "Weekend demand predicted to be 40% higher — stock up", severity: "medium" },
  ]

  for (const alert of alerts) {
    await prisma.alert.create({
      data: { ...alert, restaurantId: restaurant.id },
    })
  }
  console.log(`✅ ${alerts.length} alerts created`)

  console.log("\n🎉 Database seeded successfully!")
  console.log("📧 Demo login: demo@wasteiq.com")
  console.log("🔑 Demo password: demo123456")
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
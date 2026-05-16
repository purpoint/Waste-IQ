import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "../lib/prisma"

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, restaurantName } = req.body

    // Validate input
    if (!email || !password || !name || !restaurantName) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      })
      return
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists with this email",
      })
      return
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create restaurant and user together
    const restaurant = await prisma.restaurant.create({
      data: {
        name: restaurantName,
        users: {
          create: {
            email,
            password: hashedPassword,
            name,
            role: "OWNER",
          },
        },
      },
      include: {
        users: true,
      },
    })

    const user = restaurant.users[0]

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        restaurantId: restaurant.id,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    )

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
        },
      },
    })
  } catch (error) {
    console.error("Register error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      })
      return
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { restaurant: true },
    })

    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
      return
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      })
      return
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        restaurantId: user.restaurantId,
      },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    )

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        restaurant: {
          id: user.restaurant.id,
          name: user.restaurant.name,
        },
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { restaurant: true },
    })

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      })
      return
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        restaurant: {
          id: user.restaurant.id,
          name: user.restaurant.name,
        },
      },
    })
  } catch (error) {
    console.error("GetMe error:", error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
}
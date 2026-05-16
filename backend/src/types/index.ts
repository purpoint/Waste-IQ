export interface AuthRequest {
  email: string
  password: string
  name?: string
  restaurantName?: string
}

export interface JwtPayload {
  userId: string
  email: string
  role: string
  restaurantId: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  error?: string
}
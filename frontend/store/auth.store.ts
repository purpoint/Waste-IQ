import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface Restaurant {
  id: string
  name: string
}

interface AuthState {
  user: User | null
  restaurant: Restaurant | null
  token: string | null
  isAuthenticated: boolean
  setAuth: (user: User, restaurant: Restaurant, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      restaurant: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, restaurant, token) =>
        set({ user, restaurant, token, isAuthenticated: true }),
      logout: () =>
        set({ user: null, restaurant: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "wasteiq-auth",
    }
  )
)
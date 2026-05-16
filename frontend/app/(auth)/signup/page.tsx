"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAuthStore } from "@/store/auth.store"
import { registerApi } from "@/lib/auth.api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Leaf } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    restaurantName: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await registerApi(form)
      const { token, user, restaurant } = response.data
      setAuth(user, restaurant, token)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-4">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">WasteIQ</span>
        </div>

        <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-700/50 shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white text-center">
              Create your account
            </CardTitle>
            <CardDescription className="text-slate-400 text-center">
              Start reducing food waste with AI
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg"
                >
                  {error}
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-300">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="restaurantName" className="text-slate-300">
                  Restaurant Name
                </Label>
                <Input
                  id="restaurantName"
                  name="restaurantName"
                  placeholder="My Restaurant"
                  value={form.restaurantName}
                  onChange={handleChange}
                  required
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@restaurant.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-500"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-11 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="justify-center">
            <p className="text-slate-400 text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Sparkles,
  TrendingDown,
  Package,
  BarChart3,
  Brain,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Globe,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Demand Forecasting",
    description: "Predict future customer demand using historical sales, weather, holidays, and seasonal trends.",
    color: "emerald",
  },
  {
    icon: Package,
    title: "Smart Inventory Management",
    description: "Track ingredients, expiry dates, and stock levels in real time with automatic alerts.",
    color: "blue",
  },
  {
    icon: TrendingDown,
    title: "Waste Tracking & Analytics",
    description: "Log food waste, identify patterns, and measure financial losses with detailed reports.",
    color: "amber",
  },
  {
    icon: Sparkles,
    title: "AI Chat Assistant",
    description: "Ask anything — 'What should I buy tomorrow?' and get instant AI-powered answers.",
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Beautiful dashboards with charts, trends, and insights updated in real time.",
    color: "pink",
  },
  {
    icon: Shield,
    title: "Multi-restaurant Support",
    description: "Manage multiple locations with isolated dashboards and role-based access control.",
    color: "teal",
  },
]

const stats = [
  { value: "32%", label: "Average waste reduction" },
  { value: "₹2.4L", label: "Average monthly savings" },
  { value: "500+", label: "Restaurants using WasteIQ" },
  { value: "99.9%", label: "Uptime guaranteed" },
]

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Owner, Spice Garden Restaurant",
    text: "WasteIQ reduced our food waste by 40% in just 2 months. The AI recommendations are incredibly accurate.",
    avatar: "RS",
  },
  {
    name: "Priya Mehta",
    role: "Operations Head, Cloud Kitchen Co.",
    text: "The demand forecasting feature alone saved us ₹1.5 lakhs last quarter. Best investment we made.",
    avatar: "PM",
  },
  {
    name: "Amit Patel",
    role: "F&B Manager, Grand Hotel",
    text: "Finally a platform that understands restaurant operations. The AI assistant is like having a consultant 24/7.",
    avatar: "AP",
  },
]

const colorMap: Record<string, string> = {
  emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  teal: "text-teal-400 bg-teal-500/10 border-teal-500/20",
}

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-sm border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">WasteIQ</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#stats" className="hover:text-white transition-colors">Results</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push("/login")}
              className="text-slate-400 hover:text-white"
            >
              Sign in
            </Button>
            <Button
              onClick={() => router.push("/signup")}
              className="bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Get started free
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Background glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-6 px-4 py-1.5">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Food Waste Reduction
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Stop wasting food.
              <br />
              <span className="text-emerald-400">Start saving money.</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              WasteIQ uses AI to predict demand, track waste, and optimize inventory
              for restaurants, cafes, and food businesses — saving lakhs every month.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push("/signup")}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white h-12 px-8 text-base font-semibold gap-2"
              >
                Start for free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => router.push("/login")}
                size="lg"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 h-12 px-8 text-base"
              >
                View dashboard demo
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Free forever plan
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                Setup in 5 minutes
              </div>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 max-w-5xl mx-auto shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="flex-1 bg-slate-800 rounded-md h-6 ml-2" />
              </div>
              <div className="grid grid-cols-4 gap-3 mb-4">
                {["Food Waste ₹4,280", "Inventory 142", "Alerts 7", "Saved ₹18,500"].map((item, i) => (
                  <div key={i} className="bg-slate-800 rounded-lg p-3">
                    <div className="w-12 h-1.5 bg-slate-700 rounded mb-2" />
                    <div className="text-white text-sm font-semibold">{item}</div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800 rounded-lg p-3 h-32 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-emerald-500/40 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="bg-slate-800 rounded-lg p-3 h-32 flex items-end gap-1">
                  {[60, 40, 75, 50, 85, 45, 65].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-500/40 rounded-t"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Glow under dashboard */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-emerald-500/10 blur-2xl rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-4">
              Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Everything you need to eliminate food waste
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              WasteIQ combines AI forecasting, inventory intelligence, and real-time analytics
              into one powerful platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-6 transition-all duration-300 hover:shadow-lg group"
                >
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center mb-4 ${colorMap[feature.color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 mb-4">
              Testimonials
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Loved by restaurant owners
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6"
              >
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 rounded-2xl p-12">
              <Zap className="w-10 h-10 text-emerald-400 mx-auto mb-6" />
              <h2 className="text-4xl font-bold mb-4">
                Ready to reduce food waste?
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Join 500+ restaurants already saving money with WasteIQ.
                Start for free — no credit card required.
              </p>
              <Button
                onClick={() => router.push("/signup")}
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-500 text-white h-12 px-10 text-base font-semibold gap-2"
              >
                Get started for free
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
              <Leaf className="w-3 h-3 text-white" />
            </div>
            <span className="text-white font-semibold">WasteIQ</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 WasteIQ. Built with ❤️ to reduce food waste.
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            <Globe className="w-4 h-4" />
            <span>India</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
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
  Globe,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI Demand Forecasting",
    description: "Predict future customer demand using historical sales, weather, holidays, and seasonal trends.",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(244,114,182,0.05))",
    border: "rgba(168,85,247,0.2)",
    iconColor: "#c084fc",
  },
  {
    icon: Package,
    title: "Smart Inventory Management",
    description: "Track ingredients, expiry dates, and stock levels in real time with automatic alerts.",
    gradient: "linear-gradient(135deg, rgba(96,165,250,0.15), rgba(168,85,247,0.05))",
    border: "rgba(96,165,250,0.2)",
    iconColor: "#60a5fa",
  },
  {
    icon: TrendingDown,
    title: "Waste Tracking & Analytics",
    description: "Log food waste, identify patterns, and measure financial losses with detailed reports.",
    gradient: "linear-gradient(135deg, rgba(251,146,60,0.15), rgba(244,114,182,0.05))",
    border: "rgba(251,146,60,0.2)",
    iconColor: "#fb923c",
  },
  {
    icon: Sparkles,
    title: "AI Chat Assistant",
    description: "Ask anything — 'What should I buy tomorrow?' and get instant AI-powered answers.",
    gradient: "linear-gradient(135deg, rgba(244,114,182,0.15), rgba(251,146,60,0.05))",
    border: "rgba(244,114,182,0.2)",
    iconColor: "#f472b6",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Beautiful dashboards with charts, trends, and insights updated in real time.",
    gradient: "linear-gradient(135deg, rgba(52,211,153,0.15), rgba(96,165,250,0.05))",
    border: "rgba(52,211,153,0.2)",
    iconColor: "#34d399",
  },
  {
    icon: Shield,
    title: "Multi-restaurant Support",
    description: "Manage multiple locations with isolated dashboards and role-based access control.",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(96,165,250,0.05))",
    border: "rgba(168,85,247,0.2)",
    iconColor: "#a78bfa",
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
    gradient: "linear-gradient(135deg, #a855f7, #f472b6)",
  },
  {
    name: "Priya Mehta",
    role: "Operations Head, Cloud Kitchen Co.",
    text: "The demand forecasting feature alone saved us ₹1.5 lakhs last quarter. Best investment we made.",
    avatar: "PM",
    gradient: "linear-gradient(135deg, #f472b6, #fb923c)",
  },
  {
    name: "Amit Patel",
    role: "F&B Manager, Grand Hotel",
    text: "Finally a platform that understands restaurant operations. The AI assistant is like having a consultant 24/7.",
    avatar: "AP",
    gradient: "linear-gradient(135deg, #fb923c, #a855f7)",
  },
]

const glassStyle = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
}

export default function LandingPage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d1a", color: "#f0eeff", overflowX: "hidden" }}>

      {/* Background blobs */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: `
          radial-gradient(ellipse at 15% 15%, rgba(168,85,247,0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 10%, rgba(244,114,182,0.15) 0%, transparent 40%),
          radial-gradient(ellipse at 50% 80%, rgba(251,146,60,0.1) 0%, transparent 40%)
        `,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: "rgba(13,13,26,0.8)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #a855f7, #f472b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Leaf style={{ width: "18px", height: "18px", color: "white" }} />
            </div>
            <span style={{
              fontSize: "20px", fontWeight: "700",
              background: "linear-gradient(135deg, #a855f7, #f472b6, #fb923c)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>WasteIQ</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => router.push("/login")}
              style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)", padding: "8px 20px",
                borderRadius: "10px", cursor: "pointer", fontSize: "14px",
                transition: "all 0.2s",
              }}
            >
              Sign in
            </button>
            <button
              onClick={() => router.push("/signup")}
              style={{
                background: "linear-gradient(135deg, #a855f7, #f472b6)",
                border: "none", color: "white", padding: "8px 20px",
                borderRadius: "10px", cursor: "pointer", fontSize: "14px",
                fontWeight: "600", transition: "all 0.2s",
              }}
            >
              Get started free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, paddingTop: "140px", paddingBottom: "80px", textAlign: "center", padding: "140px 24px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
            <div style={{
              padding: "6px 16px", borderRadius: "99px",
              background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(244,114,182,0.1))",
              border: "1px solid rgba(168,85,247,0.3)",
              fontSize: "13px", color: "#c084fc", fontWeight: "500",
              display: "flex", alignItems: "center", gap: "6px",
            }}>
              <Sparkles style={{ width: "14px", height: "14px" }} />
              AI-Powered Food Waste Reduction
            </div>
          </div>

          {/* Headline */}
          <h1 style={{ fontSize: "clamp(40px, 7vw, 80px)", fontWeight: "800", lineHeight: "1.1", marginBottom: "24px" }}>
            Stop wasting food.
            <br />
            <span style={{
              background: "linear-gradient(135deg, #a855f7, #f472b6, #fb923c)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Start saving money.
            </span>
          </h1>

          <p style={{ fontSize: "18px", color: "rgba(255,255,255,0.5)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.7" }}>
            WasteIQ uses AI to predict demand, track waste, and optimize inventory
            for restaurants, cafes, and food businesses — saving lakhs every month.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/signup")}
              style={{
                background: "linear-gradient(135deg, #a855f7, #f472b6)",
                border: "none", color: "white",
                padding: "14px 32px", borderRadius: "12px",
                fontSize: "16px", fontWeight: "600", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "8px",
                boxShadow: "0 0 40px rgba(168,85,247,0.3)",
              }}
            >
              Start for free <ArrowRight style={{ width: "18px", height: "18px" }} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/login")}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.8)",
                padding: "14px 32px", borderRadius: "12px",
                fontSize: "16px", cursor: "pointer",
                backdropFilter: "blur(10px)",
              }}
            >
              View dashboard demo
            </motion.button>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
            {["No credit card required", "Free forever plan", "Setup in 5 minutes"].map((text) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                <CheckCircle style={{ width: "14px", height: "14px", color: "#a855f7" }} />
                {text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{ marginTop: "60px", maxWidth: "900px", margin: "60px auto 0" }}
        >
          <div style={{
            ...glassStyle,
            padding: "20px",
            boxShadow: "0 0 80px rgba(168,85,247,0.15), 0 0 40px rgba(244,114,182,0.1)",
          }}>
            {/* Browser bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#f87171" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#fbbf24" }} />
              <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#34d399" }} />
              <div style={{ flex: 1, background: "rgba(255,255,255,0.05)", borderRadius: "6px", height: "24px", marginLeft: "8px" }} />
            </div>
            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "16px" }}>
              {[
                { label: "Food Waste", value: "₹4,280", color: "#f87171" },
                { label: "Inventory", value: "142 items", color: "#60a5fa" },
                { label: "Alerts", value: "7 expiring", color: "#fbbf24" },
                { label: "Saved", value: "₹18,500", color: "#a855f7" },
              ].map((item) => (
                <div key={item.label} style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px", padding: "12px",
                }}>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "6px" }}>{item.label}</div>
                  <div style={{ fontSize: "16px", fontWeight: "600", color: item.color }}>{item.value}</div>
                </div>
              ))}
            </div>
            {/* Chart bars */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "12px", height: "100px", display: "flex", alignItems: "flex-end", gap: "6px" }}>
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: `linear-gradient(to top, #a855f7, #f472b6)`, borderRadius: "4px 4px 0 0", height: `${h}%`, opacity: 0.8 }} />
                ))}
              </div>
              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: "12px", padding: "12px", height: "100px", display: "flex", alignItems: "flex-end", gap: "6px" }}>
                {[60, 40, 75, 50, 85, 45, 65].map((h, i) => (
                  <div key={i} style={{ flex: 1, background: `linear-gradient(to top, #f472b6, #fb923c)`, borderRadius: "4px 4px 0 0", height: `${h}%`, opacity: 0.8 }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              style={{ textAlign: "center" }}
            >
              <div style={{
                fontSize: "42px", fontWeight: "800", marginBottom: "8px",
                background: "linear-gradient(135deg, #a855f7, #f472b6, #fb923c)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "14px", color: "rgba(255,255,255,0.4)" }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <div style={{
              display: "inline-block", padding: "6px 16px", borderRadius: "99px", marginBottom: "16px",
              background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)",
              fontSize: "13px", color: "#60a5fa",
            }}>
              Features
            </div>
            <h2 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "16px" }}>
              Everything you need to
              <span style={{
                background: "linear-gradient(135deg, #a855f7, #f472b6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}> eliminate food waste</span>
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.4)", maxWidth: "600px", margin: "0 auto" }}>
              WasteIQ combines AI forecasting, inventory intelligence, and real-time analytics into one powerful platform.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  style={{
                    background: feature.gradient,
                    border: `1px solid ${feature.border}`,
                    borderRadius: "20px", padding: "24px",
                    backdropFilter: "blur(20px)",
                    cursor: "default",
                  }}
                >
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: "rgba(255,255,255,0.06)", display: "flex",
                    alignItems: "center", justifyContent: "center", marginBottom: "16px",
                  }}>
                    <Icon style={{ width: "22px", height: "22px", color: feature.iconColor }} />
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", color: "white", marginBottom: "8px" }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.45)", lineHeight: "1.6" }}>
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: "center", marginBottom: "60px" }}
          >
            <div style={{
              display: "inline-block", padding: "6px 16px", borderRadius: "99px", marginBottom: "16px",
              background: "rgba(251,146,60,0.1)", border: "1px solid rgba(251,146,60,0.2)",
              fontSize: "13px", color: "#fb923c",
            }}>
              Testimonials
            </div>
            <h2 style={{ fontSize: "42px", fontWeight: "700" }}>
              Loved by restaurant owners
            </h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  ...glassStyle,
                  padding: "24px",
                }}
              >
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: "1.7", marginBottom: "24px" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "50%",
                    background: t.gradient, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "14px", fontWeight: "700", color: "white",
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: "600", color: "white" }}>{t.name}</p>
                    <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 1, padding: "80px 24px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              textAlign: "center", padding: "60px 40px", borderRadius: "24px",
              background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(244,114,182,0.05), rgba(251,146,60,0.05))",
              border: "1px solid rgba(168,85,247,0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(168,85,247,0.1)",
            }}
          >
            <Zap style={{ width: "48px", height: "48px", color: "#c084fc", margin: "0 auto 24px" }} />
            <h2 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "16px" }}>
              Ready to reduce food waste?
            </h2>
            <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.5)", marginBottom: "32px" }}>
              Join 500+ restaurants already saving money with WasteIQ. Start for free.
            </p>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/signup")}
              style={{
                background: "linear-gradient(135deg, #a855f7, #f472b6)",
                border: "none", color: "white",
                padding: "16px 40px", borderRadius: "12px",
                fontSize: "16px", fontWeight: "600", cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: "8px",
                boxShadow: "0 0 40px rgba(168,85,247,0.4)",
              }}
            >
              Get started for free <ArrowRight style={{ width: "18px", height: "18px" }} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        position: "relative", zIndex: 1, padding: "24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{
              width: "28px", height: "28px", borderRadius: "8px",
              background: "linear-gradient(135deg, #a855f7, #f472b6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Leaf style={{ width: "14px", height: "14px", color: "white" }} />
            </div>
            <span style={{ fontWeight: "600", color: "white" }}>WasteIQ</span>
          </div>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>
            © 2026 WasteIQ. Built to reduce food waste.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.3)", fontSize: "13px" }}>
            <Globe style={{ width: "14px", height: "14px" }} />
            India
          </div>
        </div>
      </footer>
    </div>
  )
}
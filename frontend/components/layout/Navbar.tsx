"use client"

import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/auth.store"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, LogOut, Settings, User } from "lucide-react"

export default function Navbar() {
  const { user, restaurant, logout } = useAuthStore()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "U"

  return (
    <header
      style={{
        height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 16px",
        background: "rgba(13,13,26,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        position: "sticky", top: 0, zIndex: 10,
        flexShrink: 0,
      }}
    >
      {/* Left — offset on mobile for hamburger */}
      <div style={{ paddingLeft: "44px" }} className="md:pl-0">
        <h2 style={{ fontWeight: "600", color: "white", fontSize: "14px", margin: 0 }}>
          {restaurant?.name}
        </h2>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", margin: 0 }}>
          AI Food Waste Platform
        </p>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <Bell className="w-5 h-5" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: "linear-gradient(135deg, #a855f7, #f472b6)" }}
          />
        </Button>

        {/* Role badge - hide on mobile */}
        <div
          className="hidden sm:block"
          style={{
            padding: "4px 12px", borderRadius: "99px", fontSize: "12px",
            background: "linear-gradient(135deg, rgba(168,85,247,0.15), rgba(244,114,182,0.1))",
            border: "1px solid rgba(168,85,247,0.3)", color: "#c084fc", fontWeight: "500",
          }}
        >
          {user?.role}
        </div>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
              <Avatar className="h-9 w-9">
                <AvatarFallback
                  className="text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #a855f7, #f472b6)" }}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 border"
            style={{
              background: "rgba(20,15,35,0.98)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.8)",
            }}
            align="end"
          >
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator style={{ background: "rgba(255,255,255,0.06)" }} />
            <DropdownMenuItem className="cursor-pointer" style={{ color: "rgba(255,255,255,0.7)" }}>
              <User className="w-4 h-4 mr-2" /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" style={{ color: "rgba(255,255,255,0.7)" }}>
              <Settings className="w-4 h-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator style={{ background: "rgba(255,255,255,0.06)" }} />
            <DropdownMenuItem
              className="cursor-pointer"
              style={{ color: "#f87171" }}
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
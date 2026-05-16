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
import { Badge } from "@/components/ui/badge"

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
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      {/* Left - Restaurant name */}
      <div>
        <h2 className="text-white font-semibold">{restaurant?.name}</h2>
        <p className="text-slate-400 text-xs">AI Food Waste Platform</p>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full" />
        </Button>

        {/* Role badge */}
        <Badge
          variant="outline"
          className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 text-xs"
        >
          {user?.role}
        </Badge>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-full p-0 hover:ring-2 hover:ring-emerald-500/30"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-emerald-600 text-white text-sm font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 bg-slate-900 border-slate-700 text-slate-300"
            align="end"
          >
            <DropdownMenuLabel className="text-white">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer">
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem
              className="hover:bg-red-500/10 text-red-400 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
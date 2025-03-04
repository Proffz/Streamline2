"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  ShoppingCart,
  BarChart,
  Settings,
  CoffeeIcon as Cocktail,
  Menu,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Ingredients",
    href: "/dashboard/ingredients",
    icon: ShoppingCart,
  },
  {
    title: "My Drinks",
    href: "/dashboard/my-drinks",
    icon: Cocktail,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart,
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(true)

  // Load sidebar state from localStorage on component mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState !== null) {
      setIsCollapsed(JSON.parse(savedState))
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    // Save to localStorage
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState))
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-muted/40 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Button variant="ghost" size="icon" className="w-full flex justify-center" onClick={toggleSidebar}>
            {isCollapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="grid gap-1 px-2">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted",
                  pathname === item.href ? "bg-muted" : "transparent",
                  isCollapsed ? "justify-center" : "justify-start",
                )}
                title={item.title}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Settings link fixed at the bottom */}
        <div className="mt-auto p-4 border-t">
          <Link
            href="/dashboard/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted",
              pathname === "/dashboard/settings" ? "bg-muted" : "transparent",
              isCollapsed ? "justify-center" : "justify-start",
            )}
            title="Settings"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </div>
      </div>
    </div>
  )
}


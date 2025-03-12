"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, CoffeeIcon as Cocktail, Droplets, BarChart3, Settings, IceCream, Map } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Drinks", href: "/dashboard/my-drinks", icon: Cocktail },
    { name: "Ingredients", href: "/dashboard/ingredients", icon: Droplets },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
    { name: "Roadmap", href: "/dashboard/roadmap", icon: Map },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const IceCubeIcon = () => <IceCream className="h-5 w-5" />

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center font-semibold">
          <IceCubeIcon />
          <span className="ml-2 text-lg font-semibold">StreamLine</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-4">
        <ul className="space-y-1 px-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                <span className="truncate">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">StreamLine v0.1.0 (Pre-Alpha)</p>
      </div>
    </div>
  )
}


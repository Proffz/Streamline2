import { BarChart, LayoutDashboard, Map, Menu, Settings, ShoppingBag, Users } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { NavItem } from "@/types"

interface SidebarProps {
  className?: string
  isCollapsed: boolean
}

export function Sidebar({ className, isCollapsed }: SidebarProps) {
  const routes: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Menu",
      href: "/dashboard/menu",
      icon: Menu,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      title: "Customers",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      title: "Reports & Analytics",
      icon: BarChart,
      items: [
        {
          title: "Sales",
          href: "/dashboard/reports/sales",
        },
        {
          title: "Inventory",
          href: "/dashboard/reports/inventory",
        },
        {
          title: "Roadmap",
          href: "/dashboard/roadmap",
          icon: Map,
        },
      ],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <div className={cn("flex flex-col h-full bg-background border-r", className)}>
      <ScrollArea className="flex-1">
        <div className={cn("flex flex-col gap-2 p-2", isCollapsed && "items-center")}>
          {routes.map((route, i) => (
            <NavGroup key={i} route={route} isCollapsed={isCollapsed} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

interface NavGroupProps {
  route: NavItem
  isCollapsed: boolean
}

function NavGroup({ route, isCollapsed }: NavGroupProps) {
  if (route.items) {
    return (
      <div className="flex flex-col gap-1">
        <h4 className={cn("text-xs font-semibold px-2 py-1", isCollapsed && "sr-only")}>{route.title}</h4>
        <div className="flex flex-col gap-1 pl-2">
          {route.items.map((item, i) => (
            <Button
              key={i}
              asChild
              variant="ghost"
              className={cn("justify-start h-9 px-2", isCollapsed && "justify-center px-0 w-9")}
            >
              <Link href={item.href || "#"}>
                {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Button asChild variant="ghost" className={cn("justify-start h-9 px-2", isCollapsed && "justify-center px-0 w-9")}>
      <Link href={route.href || "#"}>
        {route.icon && <route.icon className="h-4 w-4 mr-2" />}
        {!isCollapsed && <span>{route.title}</span>}
      </Link>
    </Button>
  )
}


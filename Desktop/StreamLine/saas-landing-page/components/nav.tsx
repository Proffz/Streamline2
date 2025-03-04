"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Nav() {
  const pathname = usePathname()
  const { data: session, status } = useSession()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">
            StreamLine
          </Link>
          {status === "authenticated" && (
            <nav className="hidden md:flex gap-6">
              <Link
                href="/dashboard"
                className={`text-sm font-medium ${
                  isActive("/dashboard") ? "text-primary" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/drinks"
                className={`text-sm font-medium ${
                  pathname.startsWith("/drinks") ? "text-primary" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Drinks
              </Link>
              <Link
                href="/ingredients"
                className={`text-sm font-medium ${
                  pathname.startsWith("/ingredients") ? "text-primary" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Ingredients
              </Link>
              <Link
                href="/menus"
                className={`text-sm font-medium ${
                  pathname.startsWith("/menus") ? "text-primary" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Menus
              </Link>
              <Link
                href="/settings"
                className={`text-sm font-medium ${
                  pathname.startsWith("/settings") ? "text-primary" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                Settings
              </Link>
            </nav>
          )}
        </div>
        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {session?.user?.name
                        ? session.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{session.user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{session.user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="text-red-600 cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}


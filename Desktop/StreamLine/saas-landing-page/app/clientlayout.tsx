"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Inter } from "next/font/google"
import { AppProvider } from "@/lib/store"
import { SettingsProvider } from "@/lib/settings-context"
import { Toaster } from "@/components/ui/toaster"
import { Nav } from "@/components/nav"
import { usePathname } from "next/navigation"

const inter = Inter({ subsets: ["latin"] })

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Determine if we should show the Nav component
  const showNav =
    !pathname.startsWith("/login") && !pathname.startsWith("/register") && !pathname.startsWith("/forgot-password")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  return (
    <SettingsProvider>
      <AppProvider>
        {showNav && <Nav />}
        <main className={inter.className}>{children}</main>
        <Toaster />
      </AppProvider>
    </SettingsProvider>
  )
}


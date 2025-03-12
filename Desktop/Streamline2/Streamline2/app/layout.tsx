import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AppProvider } from "@/lib/store"
import { SettingsProvider } from "@/lib/settings-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StreamLine Menu Calculator",
  description: "Pricing tool for bars and restaurants",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SettingsProvider>
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </SettingsProvider>
      </body>
    </html>
  )
}



import './globals.css'
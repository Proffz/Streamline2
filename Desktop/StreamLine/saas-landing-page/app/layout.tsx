import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import ClientWrapper from "./clientlayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StreamLine Menu Calculator",
  description: "Pricing tool for bars and restaurants",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ClientWrapper>{children}</ClientWrapper>
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ErrorBoundary } from "@/components/error-boundary"
import { Toaster } from "@/components/ui/toaster"

export function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  // Set loading to false after component mounts
  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <ErrorBoundary>
      {isLoading ? (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      ) : (
        <>
          {children}
          <Toaster />
        </>
      )}
    </ErrorBoundary>
  )
}


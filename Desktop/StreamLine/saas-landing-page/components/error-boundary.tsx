"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("Caught in error boundary:", error)
      setError(error.error || new Error("Unknown error occurred"))
      setHasError(true)
    }

    window.addEventListener("error", handleError)

    return () => {
      window.removeEventListener("error", handleError)
    }
  }, [])

  if (hasError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>{error?.message || "An unexpected error occurred"}</AlertDescription>
          </Alert>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Please try refreshing the page or clearing your browser cache.
            </p>
            <Button
              onClick={() => {
                setHasError(false)
                setError(null)
                window.location.reload()
              }}
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}


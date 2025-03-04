"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function MigrateLocalStorage() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [hasLocalData, setHasLocalData] = useState(false)

  useEffect(() => {
    // Check if there's data in localStorage
    if (typeof window !== "undefined") {
      const appState = localStorage.getItem("appState")
      setHasLocalData(!!appState)
    }
  }, [])

  const migrateData = async () => {
    if (!session?.user?.id || !hasLocalData) return

    try {
      setIsLoading(true)
      setError(null)
      setSuccess(false)
      setProgress(0)

      // Get data from localStorage
      const appState = JSON.parse(localStorage.getItem("appState") || "{}")

      // Migrate ingredients
      if (appState.ingredients && appState.ingredients.length > 0) {
        setProgress(10)
        for (const ingredient of appState.ingredients) {
          await fetch("/api/ingredients", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...ingredient,
              id: undefined, // Remove the old ID
              userId: session.user.id,
            }),
          })
        }
      }

      setProgress(40)

      // Migrate drinks
      if (appState.drinks && appState.drinks.length > 0) {
        for (const drink of appState.drinks) {
          await fetch("/api/drinks", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...drink,
              id: undefined, // Remove the old ID
              userId: session.user.id,
              menuHistory: JSON.stringify(drink.menuHistory || []),
            }),
          })
        }
      }

      setProgress(70)

      // Migrate menus
      if (appState.menus && appState.menus.length > 0) {
        for (const menu of appState.menus) {
          await fetch("/api/menus", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...menu,
              id: undefined, // Remove the old ID
              userId: session.user.id,
              drinks: [], // We'll add drinks in a separate step
            }),
          })
        }
      }

      setProgress(100)
      setSuccess(true)

      // Optionally, clear localStorage after successful migration
      // localStorage.removeItem("appState")
    } catch (error) {
      console.error("Migration error:", error)
      setError(error instanceof Error ? error.message : "An error occurred during migration")
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    return (
      <Alert>
        <AlertTitle>Authentication Required</AlertTitle>
        <AlertDescription>Please log in to migrate your data.</AlertDescription>
      </Alert>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Migrate Local Data</CardTitle>
        <CardDescription>Transfer your existing data from local storage to your account</CardDescription>
      </CardHeader>
      <CardContent>
        {!hasLocalData ? (
          <Alert>
            <AlertTitle>No Local Data Found</AlertTitle>
            <AlertDescription>There is no data in local storage to migrate.</AlertDescription>
          </Alert>
        ) : error ? (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : success ? (
          <Alert variant="default" className="bg-green-50 border-green-200">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>Your data has been successfully migrated to your account.</AlertDescription>
          </Alert>
        ) : (
          <>
            <p className="mb-4">
              This will copy all your drinks, ingredients, and menus from your browser's local storage to your account.
              This allows you to access your data from any device.
            </p>
            {isLoading && (
              <div className="space-y-2 mt-4">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-gray-500 text-center">{progress}% complete</p>
              </div>
            )}
          </>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={migrateData} disabled={isLoading || !hasLocalData || success} className="w-full">
          {isLoading ? "Migrating..." : "Migrate Data"}
        </Button>
      </CardFooter>
    </Card>
  )
}


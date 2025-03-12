"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export function ResetDataButton() {
  const { toast } = useToast()
  const router = useRouter()

  const handleReset = () => {
    // Get current user
    const currentUser = localStorage.getItem("currentUser") || ""

    // Clear user's app state
    if (currentUser) {
      localStorage.removeItem(`appState_${currentUser}`)
    }

    toast({
      title: "Data Reset",
      description: "Your app data has been reset. Refreshing page...",
    })

    // Refresh the page to load fresh data
    setTimeout(() => {
      router.refresh()
      window.location.reload()
    }, 1000)
  }

  return (
    <Button variant="destructive" onClick={handleReset} className="mt-4">
      Reset App Data
    </Button>
  )
}


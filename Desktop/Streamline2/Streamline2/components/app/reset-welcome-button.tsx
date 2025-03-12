"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function ResetWelcomeButton() {
  const { toast } = useToast()

  const handleResetWelcome = () => {
    localStorage.removeItem("welcomeShown")
    toast({
      title: "Welcome guide reset",
      description: "The welcome guide will be shown the next time you visit the dashboard.",
    })
  }

  return (
    <Button variant="outline" onClick={handleResetWelcome}>
      Show Welcome Guide Again
    </Button>
  )
}


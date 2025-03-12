"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"

export function FeedbackButton() {
  const handleClick = () => {
    window.location.href = "mailto:hugo.svedjeland@gmail.com?subject=Streamline Feedback"
  }

  return (
    <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={handleClick}>
      <MessageSquare className="h-4 w-4" />
      Send Feedback
    </Button>
  )
}


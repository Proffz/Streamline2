"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronRight, ChevronLeft, HelpCircle } from "lucide-react"

type TutorialStep = {
  target: string
  title: string
  content: string
  position: "top" | "right" | "bottom" | "left"
}

type TutorialOverlayProps = {
  steps: TutorialStep[]
  onComplete: () => void
  isOpen: boolean
  onClose: () => void
}

export function TutorialOverlay({ steps, onComplete, isOpen, onClose }: TutorialOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })

  const step = steps[currentStep]

  const updatePosition = useCallback(() => {
    if (!step) return

    const targetElement = document.querySelector(step.target)
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      setPosition({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        height: rect.height,
      })

      // Scroll element into view if needed
      if (rect.top < 0 || rect.bottom > window.innerHeight) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" })
      }
    }
  }, [step])

  useEffect(() => {
    if (!isOpen) return
    updatePosition()
  }, [isOpen, updatePosition])

  if (!isOpen || !step) return null

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Calculate tooltip position
  const getTooltipStyle = () => {
    const margin = 12 // margin from the target element
    let top = 0
    let left = 0

    switch (step.position) {
      case "top":
        top = position.top - margin
        left = position.left + position.width / 2
        return {
          top: `${top}px`,
          left: `${left}px`,
          transform: "translate(-50%, -100%)",
        }
      case "right":
        top = position.top + position.height / 2
        left = position.left + position.width + margin
        return {
          top: `${top}px`,
          left: `${left}px`,
          transform: "translateY(-50%)",
        }
      case "bottom":
        top = position.top + position.height + margin
        left = position.left + position.width / 2
        return {
          top: `${top}px`,
          left: `${left}px`,
          transform: "translateX(-50%)",
        }
      case "left":
        top = position.top + position.height / 2
        left = position.left - margin
        return {
          top: `${top}px`,
          left: `${left}px`,
          transform: "translate(-100%, -50%)",
        }
      default:
        return {}
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Highlight target element */}
      <div
        className="absolute z-10 rounded-md ring-4 ring-primary ring-offset-2"
        style={{
          top: position.top,
          left: position.left,
          width: position.width,
          height: position.height,
        }}
      />

      {/* Tooltip */}
      <div className="absolute z-20 w-72 rounded-lg bg-card p-4 shadow-lg" style={getTooltipStyle()}>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium">{step.title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">{step.content}</p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentStep === 0}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back
            </Button>
            <Button size="sm" onClick={handleNext}>
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                "Finish"
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Help button */}
      <Button className="fixed bottom-4 right-4 z-20" size="icon" variant="secondary" onClick={onClose}>
        <HelpCircle className="h-5 w-5" />
      </Button>
    </div>
  )
}


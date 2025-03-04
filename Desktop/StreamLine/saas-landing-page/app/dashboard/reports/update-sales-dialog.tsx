"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { SalesDataInput } from "./sales-data-input"
import { WeekSelector } from "./week-selector"

interface UpdateSalesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  salesData: {
    period: string
    weekNumber?: number
    data: Array<{
      id: number
      name: string
      price: number
      salesVolume: number
      revenue: number
    }>
  }
  updateSalesData: (
    period: string,
    weekNumber: number,
    data: Array<{
      id: number
      name: string
      price: number
      salesVolume: number
      revenue: number
    }>,
  ) => void
}

export function UpdateSalesDialog({ open, onOpenChange, salesData, updateSalesData }: UpdateSalesDialogProps) {
  const [period, setPeriod] = useState(salesData.period)
  const [weekNumber, setWeekNumber] = useState(salesData.weekNumber || getCurrentWeek())
  const [localSalesData, setLocalSalesData] = useState(salesData.data)
  const { toast } = useToast()

  // Function to get current week number
  function getCurrentWeek() {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 1)
    const diff = now.getTime() - start.getTime()
    const oneWeek = 604800000 // milliseconds in a week
    return Math.ceil((diff + start.getDay() * 86400000) / oneWeek)
  }

  // Update local data when props change
  useEffect(() => {
    setLocalSalesData(salesData.data)
    setPeriod(salesData.period)
    setWeekNumber(salesData.weekNumber || getCurrentWeek())
  }, [salesData])

  const handleSave = () => {
    updateSalesData(period, weekNumber, localSalesData)
    onOpenChange(false)

    toast({
      title: "Sales data updated",
      description: `Sales data for Week ${weekNumber} has been saved.`,
    })
  }

  const handleSalesDataChange = (newData: typeof localSalesData) => {
    setLocalSalesData(newData)
  }

  const handleWeekChange = (newWeek: number) => {
    setWeekNumber(newWeek)

    // In a real app, you would fetch data for the selected week here
    // For now, we'll just use the existing data or empty data if none exists
    if (salesData.weekNumber !== newWeek) {
      // If we have data for this week, use it
      // Otherwise, keep the current data (it will be saved to the new week)
      // This allows users to copy data from one week to another if needed
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Sales Data</DialogTitle>
          <DialogDescription>
            Enter sales volumes for a specific calendar week to improve analytics and predictions
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <WeekSelector value={weekNumber} onChange={handleWeekChange} className="mb-4" />

          <SalesDataInput salesData={localSalesData} onSalesDataChange={handleSalesDataChange} />

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Sales Data</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}


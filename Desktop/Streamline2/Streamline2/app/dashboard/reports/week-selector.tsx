"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface WeekSelectorProps {
  value: number
  onChange: (weekNumber: number) => void
  showNavigation?: boolean
  showYear?: boolean
  className?: string
}

export function WeekSelector({
  value,
  onChange,
  showNavigation = true,
  showYear = true,
  className,
}: WeekSelectorProps) {
  const [year, setYear] = useState(new Date().getFullYear())
  const [weekNumber, setWeekNumber] = useState(value)

  // Update internal state when props change
  useEffect(() => {
    setWeekNumber(value)
  }, [value])

  // Generate array of weeks for the selected year
  function getWeeksInYear(year: number) {
    const weeks = []
    for (let i = 1; i <= 52; i++) {
      weeks.push(i)
    }
    return weeks
  }

  // Get date range for a given week number
  function getWeekDateRange(weekNum: number, year: number) {
    const firstDayOfYear = new Date(year, 0, 1)
    const daysOffset = firstDayOfYear.getDay() - 1 // Adjust for Monday as first day of week

    const firstDayOfWeek = new Date(year, 0, (weekNum - 1) * 7 + 1 - daysOffset)
    const lastDayOfWeek = new Date(year, 0, (weekNum - 1) * 7 + 7 - daysOffset)

    return {
      start: firstDayOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      end: lastDayOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }
  }

  // Handle week change
  const handleWeekChange = (newWeek: number) => {
    setWeekNumber(newWeek)
    onChange(newWeek)
  }

  // Handle navigation
  const goToPreviousWeek = () => {
    let newWeek = weekNumber - 1
    let newYear = year

    if (newWeek < 1) {
      newWeek = 52
      newYear = year - 1
      setYear(newYear)
    }

    setWeekNumber(newWeek)
    onChange(newWeek)
  }

  const goToNextWeek = () => {
    let newWeek = weekNumber + 1
    let newYear = year

    if (newWeek > 52) {
      newWeek = 1
      newYear = year + 1
      setYear(newYear)
    }

    setWeekNumber(newWeek)
    onChange(newWeek)
  }

  const weekDateRange = getWeekDateRange(weekNumber, year)

  return (
    <Card className={className}>
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={weekNumber.toString()} onValueChange={(value) => handleWeekChange(Number.parseInt(value))}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select week" />
              </SelectTrigger>
              <SelectContent>
                {getWeeksInYear(year).map((week) => (
                  <SelectItem key={week} value={week.toString()}>
                    Week {week}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {showYear && (
              <Select value={year.toString()} onValueChange={(value) => setYear(Number.parseInt(value))}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {[year - 2, year - 1, year, year + 1, year + 2].map((y) => (
                    <SelectItem key={y} value={y.toString()}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          {showNavigation && (
            <div className="flex items-center space-x-1">
              <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={goToNextWeek}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="text-sm">
            <span className="text-muted-foreground">
              {weekDateRange.start} - {weekDateRange.end}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


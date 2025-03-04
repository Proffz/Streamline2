"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PredictionChartProps {
  timeframe: string
  showPredictions: boolean
  viewMode?: "weekly" | "monthly"
}

export function PredictionChart({ timeframe, showPredictions, viewMode = "weekly" }: PredictionChartProps) {
  const [predictionType, setPredictionType] = useState("sales")

  // Generate mock data for the chart
  const generatePredictionData = () => {
    const data = []

    if (viewMode === "weekly") {
      // Weekly view
      const weeksCount = timeframe === "week" ? 1 : timeframe === "month" ? 4 : 52
      const futureWeeksCount = Math.floor(weeksCount / 2)

      // Historical data
      for (let i = 1; i <= weeksCount - futureWeeksCount; i++) {
        data.push({
          name: `Week ${i}`,
          actual: Math.floor(Math.random() * 5000) + 1000,
          predicted: null,
        })
      }

      // Future predictions
      const lastActualValue = data[data.length - 1].actual
      for (let i = weeksCount - futureWeeksCount + 1; i <= weeksCount; i++) {
        // Add some randomness to predictions but with an upward trend
        const predictedValue =
          lastActualValue * (1 + (i - (weeksCount - futureWeeksCount)) * 0.05) + (Math.random() * 500 - 250)

        data.push({
          name: `Week ${i}`,
          actual: null,
          predicted: Math.floor(predictedValue),
        })
      }
    } else {
      // Monthly view
      const monthsCount = timeframe === "week" || timeframe === "month" ? 1 : 12
      const futureMonthsCount = Math.floor(monthsCount / 2)
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      // Historical data
      for (let i = 0; i < monthsCount - futureMonthsCount; i++) {
        data.push({
          name: monthNames[i % 12],
          actual: Math.floor(Math.random() * 5000) + 1000,
          predicted: null,
        })
      }

      // Future predictions
      const lastActualValue = data[data.length - 1].actual
      for (let i = monthsCount - futureMonthsCount; i < monthsCount; i++) {
        // Add some randomness to predictions but with an upward trend
        const predictedValue =
          lastActualValue * (1 + (i - (monthsCount - futureMonthsCount) + 1) * 0.05) + (Math.random() * 500 - 250)

        data.push({
          name: monthNames[i % 12],
          actual: null,
          predicted: Math.floor(predictedValue),
        })
      }
    }

    return data
  }

  const predictionData = generatePredictionData()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Predictions</CardTitle>
            <CardDescription>
              Forecast for the next {timeframe === "week" ? "7 days" : timeframe === "month" ? "30 days" : "6 months"}
              {viewMode === "weekly" ? " (Weekly View)" : " (Monthly View)"}
            </CardDescription>
          </div>
          <Select value={predictionType} onValueChange={setPredictionType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select prediction type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales">Sales Revenue</SelectItem>
              <SelectItem value="profit">Profit</SelectItem>
              <SelectItem value="volume">Sales Volume</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predictionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#8884d8"
              name="Actual Data"
              strokeWidth={2}
              connectNulls={false}
            />
            {showPredictions && (
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#ff7300"
                name="Prediction"
                strokeDasharray="5 5"
                strokeWidth={2}
                connectNulls={false}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


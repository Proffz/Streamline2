"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface PredictionChartProps {
  timeframe: string
  showPredictions: boolean
}

export function PredictionChart({ timeframe, showPredictions }: PredictionChartProps) {
  const [predictionType, setPredictionType] = useState("sales")

  // Generate mock data for the chart
  const generatePredictionData = () => {
    const data = []
    const periods = timeframe === "week" ? 7 : timeframe === "month" ? 30 : 12
    const periodLabel = timeframe === "week" ? "Day" : timeframe === "month" ? "Day" : "Month"
    const futurePeriodsCount = Math.floor(periods / 2)

    // Historical data
    for (let i = 1; i <= periods - futurePeriodsCount; i++) {
      const label = timeframe === "year" ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i - 1] : `${periodLabel} ${i}`

      data.push({
        name: label,
        actual: Math.floor(Math.random() * 5000) + 1000,
        predicted: null,
      })
    }

    // Future predictions
    const lastActualValue = data[data.length - 1].actual
    for (let i = periods - futurePeriodsCount + 1; i <= periods; i++) {
      const label =
        timeframe === "year"
          ? ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i - (periods - futurePeriodsCount + 1)]
          : `${periodLabel} ${i}`

      // Add some randomness to predictions but with an upward trend
      const predictedValue =
        lastActualValue * (1 + (i - (periods - futurePeriodsCount)) * 0.05) + (Math.random() * 500 - 250)

      data.push({
        name: label,
        actual: null,
        predicted: Math.floor(predictedValue),
      })
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


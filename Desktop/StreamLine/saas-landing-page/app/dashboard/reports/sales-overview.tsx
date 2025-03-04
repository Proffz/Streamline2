import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSettings } from "@/hooks/use-settings"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface SalesOverviewProps {
  timeframe: string
  viewMode?: "weekly" | "monthly"
}

export function SalesOverview({ timeframe, viewMode = "weekly" }: SalesOverviewProps) {
  const { settings } = useSettings()

  // Generate mock data for the chart
  const generateSalesData = () => {
    const data = []

    if (viewMode === "weekly") {
      // Weekly view
      const weeksCount = timeframe === "week" ? 1 : timeframe === "month" ? 4 : 52

      for (let i = 1; i <= weeksCount; i++) {
        data.push({
          name: `Week ${i}`,
          sales: Math.floor(Math.random() * 5000) + 1000,
          profit: Math.floor(Math.random() * 3000) + 500,
          costs: Math.floor(Math.random() * 2000) + 500,
        })
      }
    } else {
      // Monthly view
      const monthsCount = timeframe === "week" || timeframe === "month" ? 1 : 12
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

      for (let i = 0; i < monthsCount; i++) {
        data.push({
          name: monthNames[i % 12],
          sales: Math.floor(Math.random() * 5000) + 1000,
          profit: Math.floor(Math.random() * 3000) + 500,
          costs: Math.floor(Math.random() * 2000) + 500,
        })
      }
    }

    return data
  }

  const salesData = generateSalesData()

  // Calculate comparison with previous period
  const currentTotal = salesData.reduce((sum, item) => sum + item.sales, 0)
  const previousTotal = currentTotal * 0.9 // Mock data: assume 10% growth
  const growthRate = (((currentTotal - previousTotal) / previousTotal) * 100).toFixed(1)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              {timeframe === "week" ? "Last 7 days" : timeframe === "month" ? "Last 30 days" : "Last 12 months"}
              {viewMode === "weekly" ? " (Weekly View)" : " (Monthly View)"}
            </CardDescription>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Compared to previous {timeframe}</p>
            <p className={`text-lg font-bold ${Number(growthRate) >= 0 ? "text-green-500" : "text-red-500"}`}>
              {growthRate}% {Number(growthRate) >= 0 ? "↑" : "↓"}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${settings.currency} ${value}`, undefined]} />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" name="Sales" />
            <Bar dataKey="profit" fill="#82ca9d" name="Profit" />
            <Bar dataKey="costs" fill="#ffc658" name="Costs" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


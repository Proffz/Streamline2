"use client"

import { useAppState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts"

export function DashboardCharts() {
  const { state } = useAppState()

  // Prepare data for Top 5 Drinks by Profit
  const topDrinksByProfit =
    state.drinks.length > 0
      ? state.drinks
          .sort((a, b) => b.profit - a.profit)
          .slice(0, 5)
          .map((drink) => ({ name: drink.name, profit: drink.profit }))
      : [{ name: "No drinks yet", profit: 0 }]

  // Prepare data for Category Distribution
  const categoryDistribution = state.ingredients.reduce(
    (acc, ingredient) => {
      acc[ingredient.category] = (acc[ingredient.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryData = Object.entries(categoryDistribution).map(([name, value]) => ({ name, value }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Drinks by Profit</CardTitle>
        </CardHeader>
        <CardContent>
          {state.drinks.length > 0 ? (
            <BarChart width={400} height={300} data={topDrinksByProfit}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="profit" fill="#8884d8" />
            </BarChart>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
              <p className="mb-2">No drink data available yet.</p>
              <p>Add drinks to see profit analysis.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ingredient Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {categoryData.length > 0 ? (
            <PieChart width={400} height={300}>
              <Pie
                data={categoryData}
                cx={200}
                cy={150}
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
              <p className="mb-2">No ingredient data available yet.</p>
              <p>Add ingredients to see category distribution.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


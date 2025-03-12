"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAppState } from "@/lib/store"
import { useSettings } from "@/lib/settings-context"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Calendar, TrendingUp, DollarSign, BarChart2, PieChartIcon, Save, RefreshCw } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MenuSimulator } from "@/components/app/reports/menu-simulator"
import { SalesDataInput } from "./sales-data-input"
import { ExportOptions } from "@/components/app/reports/export-options"
import { PredictionChart } from "@/components/app/reports/prediction-chart"
import { SalesOverview } from "@/components/app/reports/sales-overview"
import { MenuPerformance } from "@/components/app/reports/menu-performance"
import { UpdateSalesDialog } from "./update-sales-dialog"
import { WeekSelector } from "./week-selector"

// Function to get current week number
function getCurrentWeek() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 1)
  const diff = now.getTime() - start.getTime()
  const oneWeek = 604800000 // milliseconds in a week
  return Math.ceil((diff + start.getDay() * 86400000) / oneWeek)
}

export default function ReportsPage() {
  const { state } = useAppState()
  const { settings } = useSettings()
  const { toast } = useToast()
  const [timeframe, setTimeframe] = useState("week")
  const [showPredictions, setShowPredictions] = useState(true)
  const [simulationActive, setSimulationActive] = useState(false)
  const [simulatedMenu, setSimulatedMenu] = useState<any[]>([])
  const [showSalesUpdateDialog, setShowSalesUpdateDialog] = useState(false)
  const [trendViewMode, setTrendViewMode] = useState<"weekly" | "monthly">("weekly")
  const [selectedWeek, setSelectedWeek] = useState(getCurrentWeek())

  // Change the salesData state to store data by week
  const [salesData, setSalesData] = useState<{
    byWeek: Record<
      number,
      Array<{
        id: number
        name: string
        price: number
        salesVolume: number
        revenue: number
      }>
    >
    currentWeek: number
  }>({
    byWeek: {},
    currentWeek: getCurrentWeek(),
  })

  // Helper function to calculate cost
  const calculateCost = useCallback(
    (recipe: string, iceType: string): number => {
      if (!recipe) return 0

      const ingredientsCost = recipe.split(", ").reduce((sum, item) => {
        const [amount, unit, ...nameParts] = item.split(" ")
        const name = nameParts.join(" ")
        const ingredient = state.ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase())
        if (ingredient) {
          let quantity = Number(amount)
          if (unit === "cl") quantity *= 10 // convert cl to ml
          if (unit === "oz") quantity *= 29.5735 // convert oz to ml

          if (ingredient.unit === "piece") {
            return sum + quantity * Number(ingredient.costPerUnit)
          }

          const costPerMl = Number(ingredient.costPerBottle) / Number(ingredient.volume)
          return sum + quantity * costPerMl
        }
        return sum
      }, 0)

      const selectedIceType = settings.iceTypes.find((ice) => ice.name === iceType)
      const iceCost = selectedIceType ? Number(selectedIceType.cost) : 0

      return ingredientsCost + iceCost
    },
    [state.ingredients, settings.iceTypes],
  )

  // Initialize simulated menu with current active menu
  useEffect(() => {
    if (state.drinks.length > 0 && simulatedMenu.length === 0) {
      setSimulatedMenu(
        state.drinks
          .filter((drink) => drink.active)
          .map((drink) => ({
            ...drink,
            originalRecipe: drink.recipe,
            originalCost: calculateCost(drink.recipe, drink.ice),
            originalProfit: drink.price - calculateCost(drink.recipe, drink.ice),
            salesVolume: Math.floor(Math.random() * 50) + 10, // Mock data
          })),
      )
    }
  }, [state.drinks, simulatedMenu.length, calculateCost])

  // Update the initialization effect to set up initial data by week
  useEffect(() => {
    if (state.drinks.length > 0 && Object.keys(salesData.byWeek).length === 0) {
      const currentWeek = getCurrentWeek()
      const initialData = state.drinks
        .filter((drink) => drink.active)
        .map((drink) => ({
          id: drink.id,
          name: drink.name,
          price: Number(drink.price),
          salesVolume: Math.floor(Math.random() * 50) + 10, // Mock data
          revenue: Number(drink.price) * Math.floor(Math.random() * 50 + 10),
        }))

      // Create data for a few weeks
      const weekData: Record<number, typeof initialData> = {}

      // Current week
      weekData[currentWeek] = initialData

      // Previous weeks (with slightly different data)
      for (let i = 1; i <= 3; i++) {
        const weekNum = currentWeek - i
        if (weekNum > 0) {
          weekData[weekNum] = initialData.map((item) => ({
            ...item,
            salesVolume: Math.floor(Math.random() * 40) + 5, // Different volumes for previous weeks
            revenue: item.price * (Math.floor(Math.random() * 40) + 5),
          }))
        }
      }

      setSalesData({
        byWeek: weekData,
        currentWeek,
      })
    }
  }, [state.drinks, salesData.byWeek])

  // Apply simulated menu changes
  const applyMenuChanges = () => {
    // In a real app, this would update the actual menu in the database
    toast({
      title: "Menu Changes Applied",
      description: "Your menu has been updated with the simulated changes.",
    })
    setSimulationActive(false)
  }

  // Reset simulation
  const resetSimulation = () => {
    setSimulatedMenu(
      state.drinks
        .filter((drink) => drink.active)
        .map((drink) => ({
          ...drink,
          originalRecipe: drink.recipe,
          originalCost: calculateCost(drink.recipe, drink.ice),
          originalProfit: drink.price - calculateCost(drink.recipe, drink.ice),
          salesVolume: Math.floor(Math.random() * 50) + 10, // Mock data
        })),
    )
    setSimulationActive(false)

    toast({
      title: "Simulation Reset",
      description: "All simulated changes have been discarded.",
    })
  }

  // Update the updateSalesData function to store data by week
  const updateSalesData = useCallback(
    (
      period: string,
      weekNumber: number,
      newData: Array<{
        id: number
        name: string
        price: number
        salesVolume: number
        revenue: number
      }>,
    ) => {
      setSalesData((prevData) => ({
        ...prevData,
        byWeek: {
          ...prevData.byWeek,
          [weekNumber]: newData,
        },
        currentWeek: weekNumber,
      }))

      // Update the selected week to match
      setSelectedWeek(weekNumber)

      // Recalculate any derived data that depends on sales
      toast({
        title: "Sales data updated",
        description: `Sales data for Week ${weekNumber} has been saved and analytics updated.`,
      })
    },
    [toast],
  )

  // Update the generateSalesData function to use the current week's data
  const generateSalesData = useCallback(
    (period: string, viewMode: "weekly" | "monthly") => {
      // Get the current week's data or use an empty array if not available
      const currentWeekData = salesData.byWeek[selectedWeek] || []

      const data = []

      if (viewMode === "weekly") {
        // Weekly view - group by weeks
        const weeksCount = period === "week" ? 1 : period === "month" ? 4 : 52

        for (let i = 1; i <= weeksCount; i++) {
          // Calculate total revenue from the current week's data
          const weeklyRevenue =
            currentWeekData.reduce((sum, item) => sum + item.salesVolume * item.price, 0) / weeksCount

          // Create more realistic distribution
          const factor = 0.7 + Math.random() * 0.6 // Random factor between 0.7 and 1.3
          const sales = Math.floor(weeklyRevenue * factor)
          const profit = Math.floor(sales * 0.6) // Assume 60% profit margin

          data.push({
            name: `Week ${i}`,
            sales: sales,
            profit: profit,
            prediction: Math.floor(sales * (1 + Math.random() * 0.2)), // 0-20% growth prediction
          })
        }
      } else {
        // Monthly view - group by months
        const monthsCount = period === "week" || period === "month" ? 1 : 12
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        for (let i = 0; i < monthsCount; i++) {
          // Calculate total revenue from the current week's data
          const monthlyRevenue =
            currentWeekData.reduce((sum, item) => sum + item.salesVolume * item.price, 0) / monthsCount

          // Create more realistic distribution
          const factor = 0.7 + Math.random() * 0.6 // Random factor between 0.7 and 1.3
          const sales = Math.floor(monthlyRevenue * factor)
          const profit = Math.floor(sales * 0.6) // Assume 60% profit margin

          data.push({
            name: monthNames[i % 12],
            sales: sales,
            profit: profit,
            prediction: Math.floor(sales * (1 + Math.random() * 0.2)), // 0-20% growth prediction
          })
        }
      }

      return data
    },
    [salesData.byWeek, selectedWeek],
  )

  // Memoize the sales data to prevent unnecessary recalculations
  const memoizedSalesData = useMemo(
    () => generateSalesData(timeframe, trendViewMode),
    [generateSalesData, timeframe, trendViewMode],
  )

  // Calculate summary statistics
  const totalSales = memoizedSalesData.reduce((sum, item) => sum + item.sales, 0)
  const totalProfit = memoizedSalesData.reduce((sum, item) => sum + item.profit, 0)
  const averageMargin = ((totalProfit / totalSales) * 100).toFixed(2)

  // Update the generateDrinkSalesData function to use the current week's data
  const generateDrinkSalesData = useCallback(() => {
    // Get the current week's data or use an empty array if not available
    const currentWeekData = salesData.byWeek[selectedWeek] || []

    // Group sales data by drink name and calculate total revenue
    const drinkSales = currentWeekData.reduce(
      (acc, item) => {
        acc[item.name] = (acc[item.name] || 0) + item.salesVolume * item.price
        return acc
      },
      {} as Record<string, number>,
    )

    // Convert to array format for the pie chart
    return Object.entries(drinkSales)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5) // Top 5 drinks
  }, [salesData.byWeek, selectedWeek])

  const drinkSalesData = useMemo(() => generateDrinkSalesData(), [generateDrinkSalesData])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <div className="flex items-center space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <ExportOptions />
        </div>
      </div>

      {/* Week Selector with Update Sales button */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <WeekSelector
            value={selectedWeek}
            onChange={(newWeek) => {
              setSelectedWeek(newWeek)
              // If we don't have data for this week yet, initialize it with the current week's data
              if (!salesData.byWeek[newWeek]) {
                const templateData = salesData.byWeek[salesData.currentWeek] || []
                // Create new data with zero sales for the new week
                const newWeekData = templateData.map((item) => ({
                  ...item,
                  salesVolume: 0,
                  revenue: 0,
                }))
                updateSalesData("week", newWeek, newWeekData)
              }
            }}
            showNavigation={true}
            className="border-none shadow-none"
          />
          <Button variant="outline" onClick={() => setShowSalesUpdateDialog(true)}>
            <Calendar className="mr-2 h-4 w-4" />
            Update Sales
          </Button>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {settings.currency} {totalSales.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+12.5% from previous {timeframe}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {settings.currency} {totalProfit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">+8.2% from previous {timeframe}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageMargin}%</div>
            <p className="text-xs text-muted-foreground">+1.2% from previous {timeframe}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Menu Items</CardTitle>
            <PieChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{state.drinks.filter((d) => d.active).length}</div>
            <p className="text-xs text-muted-foreground">
              {simulationActive ? "Simulation active" : "No simulation active"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales Analysis</TabsTrigger>
          <TabsTrigger value="menu">Menu Performance</TabsTrigger>
          <TabsTrigger value="simulator">Menu Simulator</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Sales & Profit Trends</CardTitle>
                    <CardDescription>
                      {timeframe === "week" ? "Last 7 days" : timeframe === "month" ? "Last 30 days" : "Last 12 months"}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={trendViewMode === "weekly" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTrendViewMode("weekly")}
                    >
                      Weekly
                    </Button>
                    <Button
                      variant={trendViewMode === "monthly" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTrendViewMode("monthly")}
                    >
                      Monthly
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={memoizedSalesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${settings.currency} ${Number(value).toLocaleString()}`, undefined]}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
                    <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" />
                    {showPredictions && (
                      <Line
                        type="monotone"
                        dataKey="prediction"
                        stroke="#ff7300"
                        strokeDasharray="5 5"
                        name="Prediction"
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Menu Split by Sales</CardTitle>
                <CardDescription>Distribution of sales across menu items</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={drinkSalesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      innerRadius={30}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                        const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
                        const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#fff"
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontWeight="bold"
                          >
                            {`${(percent * 100).toFixed(0)}%`}
                          </text>
                        )
                      }}
                    >
                      {drinkSalesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${settings.currency} ${Number(value).toLocaleString()}`, "Sales"]}
                    />
                    <Legend layout="vertical" verticalAlign="middle" align="left" />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Top Performing Items</CardTitle>
                <CardDescription>Based on profit contribution</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={simulatedMenu.slice(0, 5).map((item) => ({
                      name: item.name,
                      profit: item.originalProfit * item.salesVolume,
                      sales: item.salesVolume,
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="profit" fill="#8884d8" name="Total Profit" />
                    <Bar dataKey="sales" fill="#82ca9d" name="Units Sold" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Predictions</CardTitle>
                <CardDescription>Sales forecast for next {timeframe}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Show Predictions</p>
                      <p className="text-sm text-muted-foreground">Toggle prediction lines on charts</p>
                    </div>
                    <Switch checked={showPredictions} onCheckedChange={setShowPredictions} />
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <p className="text-sm">Predicted Sales:</p>
                      <p className="text-sm font-medium">
                        {settings.currency} {(totalSales * 1.08).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Predicted Profit:</p>
                      <p className="text-sm font-medium">
                        {settings.currency} {(totalProfit * 1.1).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm">Growth Rate:</p>
                      <p className="text-sm font-medium">+8.5%</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Detailed Forecast
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Sales Analysis Tab */}
        <TabsContent value="sales" className="space-y-4">
          <SalesOverview timeframe={timeframe} viewMode={trendViewMode} />
          <SalesDataInput
            salesData={salesData.byWeek[selectedWeek] || []}
            onSalesDataChange={(newData) => updateSalesData("week", selectedWeek, newData)}
          />
          <PredictionChart timeframe={timeframe} showPredictions={showPredictions} viewMode={trendViewMode} />
        </TabsContent>

        {/* Menu Performance Tab */}
        <TabsContent value="menu" className="space-y-4">
          <MenuPerformance menu={simulatedMenu} />
        </TabsContent>

        {/* Menu Simulator Tab */}
        <TabsContent value="simulator" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Menu Simulator</CardTitle>
                  <CardDescription>
                    Make temporary changes to recipes and see the impact on costs and profits
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={resetSimulation} disabled={!simulationActive}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset Changes
                  </Button>
                  <Button onClick={applyMenuChanges} disabled={!simulationActive}>
                    <Save className="mr-2 h-4 w-4" />
                    Apply Menu Changes
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <MenuSimulator
                menu={simulatedMenu}
                setMenu={setSimulatedMenu}
                setSimulationActive={setSimulationActive}
                ingredients={state.ingredients}
                iceTypes={settings.iceTypes}
                calculateCost={calculateCost}
              />
            </CardContent>
          </Card>

          {simulationActive && (
            <Card>
              <CardHeader>
                <CardTitle>Simulation Impact</CardTitle>
                <CardDescription>Projected changes in costs and profits based on your simulated menu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Original Total Cost</div>
                      <div className="text-2xl font-bold">
                        {settings.currency}{" "}
                        {simulatedMenu.reduce((sum, item) => sum + item.originalCost * item.salesVolume, 0).toFixed(2)}
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Simulated Total Cost</div>
                      <div className="text-2xl font-bold">
                        {settings.currency}{" "}
                        {simulatedMenu
                          .reduce((sum, item) => {
                            const currentCost = calculateCost(item.recipe, item.ice)
                            return sum + currentCost * item.salesVolume
                          }, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Cost Difference</div>
                      <div className="text-2xl font-bold">
                        {(() => {
                          const originalCost = simulatedMenu.reduce(
                            (sum, item) => sum + item.originalCost * item.salesVolume,
                            0,
                          )
                          const simulatedCost = simulatedMenu.reduce((sum, item) => {
                            const currentCost = calculateCost(item.recipe, item.ice)
                            return sum + currentCost * item.salesVolume
                          }, 0)
                          const diff = simulatedCost - originalCost
                          const color = diff > 0 ? "text-red-500" : "text-green-500"
                          return (
                            <span className={color}>
                              {diff > 0 ? "+" : ""}
                              {settings.currency} {diff.toFixed(2)}
                            </span>
                          )
                        })()}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Original Total Profit</div>
                      <div className="text-2xl font-bold">
                        {settings.currency}{" "}
                        {simulatedMenu
                          .reduce((sum, item) => sum + item.originalProfit * item.salesVolume, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Simulated Total Profit</div>
                      <div className="text-2xl font-bold">
                        {settings.currency}{" "}
                        {simulatedMenu
                          .reduce((sum, item) => {
                            const currentCost = calculateCost(item.recipe, item.ice)
                            const currentProfit = item.price - currentCost
                            return sum + currentProfit * item.salesVolume
                          }, 0)
                          .toFixed(2)}
                      </div>
                    </div>
                    <div className="rounded-lg border p-3">
                      <div className="text-sm font-medium text-muted-foreground">Profit Difference</div>
                      <div className="text-2xl font-bold">
                        {(() => {
                          const originalProfit = simulatedMenu.reduce(
                            (sum, item) => sum + item.originalProfit * item.salesVolume,
                            0,
                          )
                          const simulatedProfit = simulatedMenu.reduce((sum, item) => {
                            const currentCost = calculateCost(item.recipe, item.ice)
                            const currentProfit = item.price - currentCost
                            return sum + currentProfit * item.salesVolume
                          }, 0)
                          const diff = simulatedProfit - originalProfit
                          const color = diff > 0 ? "text-green-500" : "text-red-500"
                          return (
                            <span className={color}>
                              {diff > 0 ? "+" : ""}
                              {settings.currency} {diff.toFixed(2)}
                            </span>
                          )
                        })()}
                      </div>
                    </div>
                  </div>

                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={simulatedMenu.map((item) => {
                          const currentCost = calculateCost(item.recipe, item.ice)
                          const currentProfit = item.price - currentCost
                          const originalProfit = item.originalProfit
                          return {
                            name: item.name,
                            originalProfit: originalProfit,
                            newProfit: currentProfit,
                            difference: currentProfit - originalProfit,
                          }
                        })}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="originalProfit" fill="#8884d8" name="Original Profit per Unit" />
                        <Bar dataKey="newProfit" fill="#82ca9d" name="New Profit per Unit" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Use the separate UpdateSalesDialog component */}
      <UpdateSalesDialog
        open={showSalesUpdateDialog}
        onOpenChange={setShowSalesUpdateDialog}
        salesData={{
          period: "week",
          weekNumber: selectedWeek,
          data: salesData.byWeek[selectedWeek] || [],
        }}
        updateSalesData={updateSalesData}
      />
    </div>
  )
}


"use client"

import { useAppState } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

export function DashboardCards() {
  const { state } = useAppState()

  // Find the active menu
  const activeMenu = state.menus.find((menu) => menu.active)

  // Get drinks in the active menu
  const menuDrinks = activeMenu ? state.drinks.filter((drink) => activeMenu.drinks.includes(drink.id)) : []

  // Count active drinks in the menu
  const activeDrinksCount = menuDrinks.filter((drink) => drink.active).length

  // Calculate average profit multiplier
  const avgProfitMultiplier =
    menuDrinks.length > 0 ? menuDrinks.reduce((sum, drink) => sum + drink.price / drink.cost, 0) / menuDrinks.length : 0

  // Calculate average cost of goods
  const avgCostOfGoods =
    menuDrinks.length > 0
      ? menuDrinks.reduce((sum, drink) => sum + (drink.cost / drink.price) * 100, 0) / menuDrinks.length
      : 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Menu Items</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{menuDrinks.length}</div>
          <p className="text-xs text-muted-foreground">
            {activeDrinksCount} active items {activeMenu ? `in ${activeMenu.name}` : ""}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Profit Multiplier</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34" />
            <path d="M14 3v4a2 2 0 0 0 2 2h4" />
            <path d="M5 3v4a2 2 0 0 0 2 2h4" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(avgProfitMultiplier)}x</div>
          <p className="text-xs text-muted-foreground">
            {menuDrinks.length > 0 ? "+4.3% from last month" : "No data available"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Cost of Goods</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatNumber(avgCostOfGoods)}%</div>
          <p className="text-xs text-muted-foreground">
            {menuDrinks.length > 0 ? "-1.5% from last month" : "No data available"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Ingredients</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{state.ingredients.length}</div>
          <p className="text-xs text-muted-foreground">
            {state.ingredients.length > 0 ? `${state.categories.length} categories` : "No ingredients added yet"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


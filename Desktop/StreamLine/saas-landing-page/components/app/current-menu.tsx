"use client"

import { useAppState } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency, formatNumber } from "@/lib/utils"

export function CurrentMenu() {
  const { state, dispatch } = useAppState()

  // Find the active menu
  const activeMenu = state.menus.find((menu) => menu.active)

  // If no active menu, show a message
  if (!activeMenu) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Active Menu</CardTitle>
          <CardDescription>Create a menu to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Go to the "My Drinks" section and create a menu to start managing your drinks.
          </p>
        </CardContent>
      </Card>
    )
  }

  // Get the drinks in the active menu
  const menuDrinks = state.drinks.filter((drink) => activeMenu.drinks.includes(drink.id))

  return (
    <Card>
      <CardHeader>
        <CardTitle>{activeMenu.name}</CardTitle>
        <CardDescription>{activeMenu.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {menuDrinks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No drinks in this menu yet.</p>
        ) : (
          <div className="space-y-2">
            {menuDrinks.map((drink) => (
              <div key={drink.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant={drink.active ? "default" : "outline"}>{drink.active ? "Active" : "Inactive"}</Badge>
                  <span>{drink.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">
                    CoG: {formatNumber((drink.cost / drink.price) * 100)}%
                  </span>
                  <span className="text-sm text-muted-foreground">Cost: {formatCurrency(drink.cost)}</span>
                  <span className="font-medium">{formatCurrency(drink.price)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto"
          onClick={() => {
            // Navigate to the My Drinks page
            window.location.href = "/dashboard/my-drinks"
          }}
        >
          Manage Menu
        </Button>
      </CardFooter>
    </Card>
  )
}


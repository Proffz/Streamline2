"use client"

import { useAppState } from "@/lib/store"
import { useSettings } from "@/lib/settings-context"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CurrentMenu() {
  const { state } = useAppState()
  const { settings } = useSettings()

  // Find the active menu
  const activeMenu = state.menus.find((menu) => menu.active)

  // Get drinks in the active menu
  const menuDrinks = activeMenu ? state.drinks.filter((drink) => activeMenu.drinks.includes(drink.id)) : []

  // Tax rate (25% is standard in Sweden)
  const TAX_RATE = 0.25

  if (!activeMenu) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No active menu selected. Go to My Drinks to create or activate a menu.
      </div>
    )
  }

  if (menuDrinks.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No drinks in the active menu. Go to My Drinks to add drinks to "{activeMenu.name}".
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Style</TableHead>
          <TableHead>Cost (SEK)</TableHead>
          <TableHead>Price (SEK)</TableHead>
          <TableHead>CoG (%)</TableHead>
          <TableHead>Profit (SEK)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {menuDrinks.map((drink) => {
          // Calculate pre-tax price
          const preTaxPrice = drink.price / (1 + TAX_RATE)

          // Calculate CoG percentage using pre-tax price
          const cogPercentage = drink.cost > 0 ? (drink.cost / preTaxPrice) * 100 : 0

          // Calculate profit using pre-tax price
          const profit = preTaxPrice - drink.cost

          const isCogGood = cogPercentage <= settings.cogGoal

          return (
            <TableRow key={drink.id}>
              <TableCell>{drink.name}</TableCell>
              <TableCell>{drink.type}</TableCell>
              <TableCell>{drink.style || "-"}</TableCell>
              <TableCell>{drink.cost.toFixed(2)}</TableCell>
              <TableCell>{drink.price.toFixed(2)}</TableCell>
              <TableCell className={isCogGood ? "text-green-500" : "text-red-500"}>
                {cogPercentage.toFixed(2)}%
              </TableCell>
              <TableCell>{profit.toFixed(2)}</TableCell>
            </TableRow>
          )
        })}
        <TableRow className="font-medium bg-muted/50">
          <TableCell>Averages</TableCell>
          <TableCell colSpan={2}></TableCell>
          <TableCell>
            {(menuDrinks.reduce((sum, drink) => sum + drink.cost, 0) / menuDrinks.length).toFixed(2)}
          </TableCell>
          <TableCell>
            {(menuDrinks.reduce((sum, drink) => sum + drink.price, 0) / menuDrinks.length).toFixed(2)}
          </TableCell>
          <TableCell>
            {(
              menuDrinks.reduce((sum, drink) => {
                const preTaxPrice = drink.price / (1 + TAX_RATE)
                return sum + (drink.cost / preTaxPrice) * 100
              }, 0) / menuDrinks.length
            ).toFixed(2)}
            %
          </TableCell>
          <TableCell>
            {(
              menuDrinks.reduce((sum, drink) => {
                const preTaxPrice = drink.price / (1 + TAX_RATE)
                return sum + (preTaxPrice - drink.cost)
              }, 0) / menuDrinks.length
            ).toFixed(2)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}


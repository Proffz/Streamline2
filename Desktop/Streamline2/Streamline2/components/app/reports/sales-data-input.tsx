"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { useAppState } from "@/lib/store"
import { useSettings } from "@/lib/settings-context"
import { RefreshCw } from "lucide-react"

export function SalesDataInput() {
  const { state } = useAppState()
  const { settings } = useSettings()
  const { toast } = useToast()

  // Mock sales data for active menu items
  const [salesData, setSalesData] = useState(
    state.drinks
      .filter((drink) => drink.active)
      .map((drink) => ({
        id: drink.id,
        name: drink.name,
        price: Number(drink.price),
        salesVolume: Math.floor(Math.random() * 50) + 10, // Mock data
        revenue: 0,
      })),
  )

  // Update revenue when sales volume changes
  const handleSalesVolumeChange = (id: number, value: string) => {
    const volume = Number.parseInt(value) || 0
    setSalesData(
      salesData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            salesVolume: volume,
            revenue: volume * Number(item.price),
          }
        }
        return item
      }),
    )
  }

  // Save sales data
  const handleSaveData = () => {
    // In a real app, this would save to a database
    toast({
      title: "Sales Data Saved",
      description: "Your sales data has been recorded and will be used for future predictions.",
    })
  }

  // Reset sales data
  const handleResetData = () => {
    setSalesData(
      salesData.map((item) => ({
        ...item,
        salesVolume: 0,
        revenue: 0,
      })),
    )
  }

  // Calculate totals
  const totalVolume = salesData.reduce((sum, item) => sum + item.salesVolume, 0)
  const totalRevenue = salesData.reduce((sum, item) => sum + item.salesVolume * item.price, 0)

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2 mb-4">
        <Button variant="outline" size="sm" onClick={handleResetData}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Menu Item</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sales Volume</TableHead>
            <TableHead>Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salesData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                {settings.currency} {Number(item.price).toFixed(2)}
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  min="0"
                  value={item.salesVolume}
                  onChange={(e) => handleSalesVolumeChange(item.id, e.target.value)}
                  className="w-24"
                />
              </TableCell>
              <TableCell>
                {settings.currency} {(item.salesVolume * item.price).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold">
            <TableCell>Total</TableCell>
            <TableCell></TableCell>
            <TableCell>{totalVolume} units</TableCell>
            <TableCell>
              {settings.currency} {totalRevenue.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}


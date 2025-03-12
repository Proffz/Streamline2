"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { useSettings } from "@/lib/settings-context"
import { RefreshCw } from "lucide-react"

// Update the props interface
interface SalesDataInputProps {
  salesData?: Array<{
    id: number
    name: string
    price: number
    salesVolume: number
    revenue: number
  }>
  onSalesDataChange?: (
    data: Array<{
      id: number
      name: string
      price: number
      salesVolume: number
      revenue: number
    }>,
  ) => void
}

// Update the component function
export function SalesDataInput({ salesData: propsSalesData, onSalesDataChange }: SalesDataInputProps) {
  const { settings } = useSettings()
  const { toast } = useToast()
  const [localSalesData, setLocalSalesData] = useState(propsSalesData || [])

  // Update local data when props change
  useEffect(() => {
    if (propsSalesData) {
      setLocalSalesData(propsSalesData)
    }
  }, [propsSalesData])

  // Update revenue when sales volume changes
  const handleSalesVolumeChange = (id: number, value: string) => {
    const volume = Number.parseInt(value) || 0
    const updatedData = localSalesData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          salesVolume: volume,
          revenue: volume * Number(item.price),
        }
      }
      return item
    })

    setLocalSalesData(updatedData)

    if (onSalesDataChange) {
      onSalesDataChange(updatedData)
    }
  }

  // Reset sales data
  const handleResetData = () => {
    const resetData = localSalesData.map((item) => ({
      ...item,
      salesVolume: 0,
      revenue: 0,
    }))

    setLocalSalesData(resetData)

    if (onSalesDataChange) {
      onSalesDataChange(resetData)
    }
  }

  // Calculate totals
  const totalVolume = localSalesData.reduce((sum, item) => sum + item.salesVolume, 0)
  const totalRevenue = localSalesData.reduce((sum, item) => sum + item.salesVolume * item.price, 0)

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
          {localSalesData.map((item) => (
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


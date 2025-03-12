"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useSettings } from "@/lib/settings-context"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatNumber } from "@/lib/utils"

interface MenuPerformanceProps {
  menu: any[]
}

export function MenuPerformance({ menu }: MenuPerformanceProps) {
  const { settings } = useSettings()

  // Sort menu items by profit contribution (sales volume * profit per unit)
  const sortedMenu = [...menu].sort((a, b) => {
    const aProfitContribution = a.originalProfit * a.salesVolume
    const bProfitContribution = b.originalProfit * b.salesVolume
    return bProfitContribution - aProfitContribution
  })

  // Calculate total profit contribution
  const totalProfitContribution = sortedMenu.reduce((sum, item) => sum + item.originalProfit * item.salesVolume, 0)

  // Calculate profit margin for each item
  const menuWithMargins = sortedMenu.map((item) => ({
    ...item,
    profitMargin: ((item.originalProfit / Number(item.price)) * 100).toFixed(1),
    profitContribution: item.originalProfit * item.salesVolume,
    percentOfTotal: (((item.originalProfit * item.salesVolume) / totalProfitContribution) * 100).toFixed(1),
  }))

  // Prepare data for charts
  const profitContributionData = menuWithMargins.slice(0, 10).map((item) => ({
    name: item.name,
    value: item.profitContribution,
  }))

  const profitMarginData = menuWithMargins.slice(0, 10).map((item) => ({
    name: item.name,
    value: Number.parseFloat(item.profitMargin),
  }))

  const salesVolumeData = menuWithMargins.slice(0, 10).map((item) => ({
    name: item.name,
    value: item.salesVolume,
  }))

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
    "#a4de6c",
    "#d0ed57",
  ]

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Menu Performance Analysis</CardTitle>
          <CardDescription>
            Detailed breakdown of your menu items by profit contribution, margin, and sales volume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Menu Item</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Profit/Unit</TableHead>
                <TableHead>Profit Margin</TableHead>
                <TableHead>Sales Volume</TableHead>
                <TableHead>Total Profit</TableHead>
                <TableHead>% of Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuWithMargins.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {index < 3 ? (
                      <Badge variant={index === 0 ? "default" : index === 1 ? "secondary" : "outline"}>
                        {index + 1}
                      </Badge>
                    ) : (
                      index + 1
                    )}
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    {settings.currency} {formatNumber(Number(item.price))}
                  </TableCell>
                  <TableCell>
                    {settings.currency} {formatNumber(item.originalCost)}
                  </TableCell>
                  <TableCell>
                    {settings.currency} {formatNumber(item.originalProfit)}
                  </TableCell>
                  <TableCell>{formatNumber(item.profitMargin)}%</TableCell>
                  <TableCell>{item.salesVolume}</TableCell>
                  <TableCell>
                    {settings.currency} {formatNumber(item.profitContribution)}
                  </TableCell>
                  <TableCell>{formatNumber(item.percentOfTotal)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Tabs defaultValue="contribution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="contribution">Profit Contribution</TabsTrigger>
          <TabsTrigger value="margin">Profit Margin</TabsTrigger>
          <TabsTrigger value="volume">Sales Volume</TabsTrigger>
        </TabsList>

        <TabsContent value="contribution">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Items by Profit Contribution</CardTitle>
              <CardDescription>Items that contribute the most to your total profit</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitContributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${settings.currency} ${value}`, "Profit Contribution"]} />
                  <Bar dataKey="value" name="Profit Contribution">
                    {profitContributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="margin">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Items by Profit Margin</CardTitle>
              <CardDescription>Items with the highest profit margin percentage</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={profitMarginData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, "Profit Margin"]} />
                  <Bar dataKey="value" name="Profit Margin">
                    {profitMarginData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="volume">
          <Card>
            <CardHeader>
              <CardTitle>Top 10 Items by Sales Volume</CardTitle>
              <CardDescription>Your most popular menu items by number of units sold</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} units`, "Sales Volume"]} />
                  <Bar dataKey="value" name="Sales Volume">
                    {salesVolumeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


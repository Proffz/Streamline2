"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Edit, Trash } from "lucide-react"

// Sample ingredient data
const ingredientsData = [
  {
    id: 1,
    name: "Vodka",
    category: "Spirits",
    costPerUnit: 0.45,
    unit: "oz",
    stock: 120,
    isStandard: true,
  },
  {
    id: 2,
    name: "Gin",
    category: "Spirits",
    costPerUnit: 0.55,
    unit: "oz",
    stock: 95,
    isStandard: true,
  },
  {
    id: 3,
    name: "White Rum",
    category: "Spirits",
    costPerUnit: 0.4,
    unit: "oz",
    stock: 85,
    isStandard: true,
  },
  {
    id: 4,
    name: "Lime Juice",
    category: "Mixers",
    costPerUnit: 0.25,
    unit: "oz",
    stock: 64,
    isStandard: true,
  },
  {
    id: 5,
    name: "Simple Syrup",
    category: "Mixers",
    costPerUnit: 0.1,
    unit: "oz",
    stock: 120,
    isStandard: true,
  },
  {
    id: 6,
    name: "Mint Leaves",
    category: "Garnish",
    costPerUnit: 0.05,
    unit: "piece",
    stock: 200,
    isStandard: true,
  },
  {
    id: 7,
    name: "Angostura Bitters",
    category: "Bitters",
    costPerUnit: 0.15,
    unit: "dash",
    stock: 150,
    isStandard: true,
  },
  {
    id: 8,
    name: "Orange Juice",
    category: "Mixers",
    costPerUnit: 0.2,
    unit: "oz",
    stock: 80,
    isStandard: true,
  },
  {
    id: 9,
    name: "House Special Syrup",
    category: "Mixers",
    costPerUnit: 0.3,
    unit: "oz",
    stock: 45,
    isStandard: false,
  },
  {
    id: 10,
    name: "Spiced Rum",
    category: "Spirits",
    costPerUnit: 0.5,
    unit: "oz",
    stock: 75,
    isStandard: true,
  },
]

export function IngredientsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ingredients, setIngredients] = useState(ingredientsData)

  const filteredIngredients = ingredients.filter(
    (ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ingredient.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search ingredients..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Category</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSearchTerm("")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("Spirits")}>Spirits</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("Mixers")}>Mixers</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("Garnish")}>Garnish</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSearchTerm("Bitters")}>Bitters</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Cost Per Unit</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIngredients.map((ingredient) => (
              <TableRow key={ingredient.id}>
                <TableCell className="font-medium">{ingredient.name}</TableCell>
                <TableCell>{ingredient.category}</TableCell>
                <TableCell>${ingredient.costPerUnit.toFixed(2)}</TableCell>
                <TableCell>{ingredient.unit}</TableCell>
                <TableCell>{ingredient.stock}</TableCell>
                <TableCell>{ingredient.isStandard ? "Standard" : "Custom"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


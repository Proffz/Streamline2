"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Plus,
  PlusCircle,
  Filter,
  CoffeeIcon as Cocktail,
  ShuffleIcon as Shake,
  Utensils,
  X,
} from "lucide-react"
import { useAppState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DrinkEditor } from "@/components/app/my-drinks/drink-editor"
import { useSettings } from "@/lib/settings-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function MyDrinksList() {
  const { state, dispatch } = useAppState()
  const { settings } = useSettings()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDrink, setSelectedDrink] = useState<(typeof state.drinks)[0] | null>(null)
  const [isCreatingNewDrink, setIsCreatingNewDrink] = useState(false)

  // Tax rate (25% is standard in Sweden)
  const TAX_RATE = 0.25

  // Filter states
  const [typeFilter, setTypeFilter] = useState<string[]>([])
  const [styleFilter, setStyleFilter] = useState<string[]>([])
  const [methodFilter, setMethodFilter] = useState<string[]>([])
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)

  // Update active filters count
  const updateActiveFiltersCount = () => {
    setActiveFiltersCount(typeFilter.length + styleFilter.length + methodFilter.length)
  }

  // Apply filters to drinks
  const filteredDrinks = state.drinks.filter((drink) => {
    // Text search filter
    const matchesSearch =
      drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      drink.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (drink.style && drink.style.toLowerCase().includes(searchTerm.toLowerCase()))

    // Type filter
    const matchesType = typeFilter.length === 0 || typeFilter.includes(drink.type)

    // Style filter
    const matchesStyle = styleFilter.length === 0 || (drink.style && styleFilter.includes(drink.style))

    // Method filter
    const matchesMethod =
      methodFilter.length === 0 || (drink.preparationMethod && methodFilter.includes(drink.preparationMethod))

    return matchesSearch && matchesType && matchesStyle && matchesMethod
  })

  const handleRowClick = (drink: (typeof state.drinks)[0]) => {
    setSelectedDrink(drink)
    setIsCreatingNewDrink(false)
  }

  const handleAddNewDrink = () => {
    setSelectedDrink(null)
    setIsCreatingNewDrink(true)
  }

  const handleCloseDialog = () => {
    setSelectedDrink(null)
    setIsCreatingNewDrink(false)
  }

  const handleSaveNewDrink = (newDrink: (typeof state.drinks)[0]) => {
    dispatch({ type: "ADD_DRINK", drink: newDrink })
    setIsCreatingNewDrink(false)
  }

  const toggleTypeFilter = (type: string) => {
    setTypeFilter((prev) => {
      const newFilter = prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]

      setTimeout(updateActiveFiltersCount, 0)
      return newFilter
    })
  }

  const toggleStyleFilter = (style: string) => {
    setStyleFilter((prev) => {
      const newFilter = prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]

      setTimeout(updateActiveFiltersCount, 0)
      return newFilter
    })
  }

  const toggleMethodFilter = (method: string) => {
    setMethodFilter((prev) => {
      const newFilter = prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]

      setTimeout(updateActiveFiltersCount, 0)
      return newFilter
    })
  }

  const resetFilters = () => {
    setTypeFilter([])
    setStyleFilter([])
    setMethodFilter([])
    setActiveFiltersCount(0)
  }

  // Helper function to get preparation method icon
  const getPreparationIcon = (method?: string) => {
    switch (method) {
      case "shaken":
        return <Shake className="h-5 w-5 text-blue-500" />
      case "stirred":
        return <Utensils className="h-5 w-5 text-amber-500" />
      case "build":
      default:
        return <Cocktail className="h-5 w-5 text-green-500" />
    }
  }

  // Helper function to safely format numbers
  const formatNumber = (value: any, decimals = 2) => {
    const num = Number(value)
    return isNaN(num) ? "0.00" : num.toFixed(decimals)
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-500" />
              <Input
                placeholder="Search drinks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 bg-primary text-primary-foreground">{activeFiltersCount}</Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Filter Drinks</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">By Type</DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={typeFilter.includes("Cocktail")}
                      onCheckedChange={() => toggleTypeFilter("Cocktail")}
                    >
                      Cocktail
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={typeFilter.includes("Mocktail")}
                      onCheckedChange={() => toggleTypeFilter("Mocktail")}
                    >
                      Mocktail
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={typeFilter.includes("Shot")}
                      onCheckedChange={() => toggleTypeFilter("Shot")}
                    >
                      Shot
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      By Style
                    </DropdownMenuLabel>
                    {settings.drinkStyles?.map((style) => (
                      <DropdownMenuCheckboxItem
                        key={style}
                        checked={styleFilter.includes(style)}
                        onCheckedChange={() => toggleStyleFilter(style)}
                      >
                        {style}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                      By Preparation Method
                    </DropdownMenuLabel>
                    <DropdownMenuCheckboxItem
                      checked={methodFilter.includes("shaken")}
                      onCheckedChange={() => toggleMethodFilter("shaken")}
                    >
                      <Shake className="mr-2 h-4 w-4 text-blue-500" />
                      Shaken
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={methodFilter.includes("stirred")}
                      onCheckedChange={() => toggleMethodFilter("stirred")}
                    >
                      <Utensils className="mr-2 h-4 w-4 text-amber-500" />
                      Stirred
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={methodFilter.includes("build")}
                      onCheckedChange={() => toggleMethodFilter("build")}
                    >
                      <Cocktail className="mr-2 h-4 w-4 text-green-500" />
                      Build
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />

                  <Button variant="ghost" size="sm" className="w-full justify-start" onClick={resetFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={handleAddNewDrink}>
                <Plus className="mr-2 h-4 w-4" /> Add New Drink
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardContent className="p-4">
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
              {state.drinks.length > 0 ? (
                filteredDrinks.map((drink) => {
                  // Ensure values are numbers
                  const cost = Number(drink.cost) || 0
                  const price = Number(drink.price) || 0

                  // Calculate pre-tax price
                  const preTaxPrice = price / (1 + TAX_RATE)

                  // Calculate CoG percentage using pre-tax price
                  const cogPercentage = cost > 0 ? (cost / preTaxPrice) * 100 : 0

                  // Calculate profit using pre-tax price
                  const profit = preTaxPrice - cost

                  const isCogGood = cogPercentage <= settings.cogGoal

                  return (
                    <TableRow
                      key={drink.id}
                      onClick={() => handleRowClick(drink)}
                      className="cursor-pointer hover:bg-muted"
                    >
                      <TableCell>{drink.name}</TableCell>
                      <TableCell>{drink.type}</TableCell>
                      <TableCell>{drink.style || "-"}</TableCell>
                      <TableCell>{formatNumber(cost)}</TableCell>
                      <TableCell>{formatNumber(price)}</TableCell>
                      <TableCell className={isCogGood ? "text-green-500" : "text-red-500"}>
                        {formatNumber(cogPercentage)}%
                      </TableCell>
                      <TableCell>{formatNumber(profit)}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <PlusCircle className="h-10 w-10 mb-2 text-muted-foreground/50" />
                      <p className="text-lg font-medium mb-1">No drinks yet</p>
                      <p className="mb-4">Create your first drink recipe to get started</p>
                      <Button onClick={handleAddNewDrink}>
                        <Plus className="mr-2 h-4 w-4" /> Create Your First Drink
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {state.drinks.length > 0 && filteredDrinks.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <p className="mb-2">No drinks match your search or filters.</p>
                      <p>Try different search terms or reset your filters.</p>
                      <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>
                        <X className="mr-2 h-4 w-4" />
                        Reset Filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {filteredDrinks.length > 0 && (
                <TableRow className="font-medium bg-muted/50">
                  <TableCell>Averages</TableCell>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell>
                    {formatNumber(
                      filteredDrinks.reduce((sum, drink) => sum + (Number(drink.cost) || 0), 0) / filteredDrinks.length,
                    )}
                  </TableCell>
                  <TableCell>
                    {formatNumber(
                      filteredDrinks.reduce((sum, drink) => sum + (Number(drink.price) || 0), 0) /
                        filteredDrinks.length,
                    )}
                  </TableCell>
                  <TableCell>
                    {formatNumber(
                      filteredDrinks.reduce((sum, drink) => {
                        const cost = Number(drink.cost) || 0
                        const price = Number(drink.price) || 0
                        const preTaxPrice = price / (1 + TAX_RATE)
                        return sum + (cost > 0 && preTaxPrice > 0 ? (cost / preTaxPrice) * 100 : 0)
                      }, 0) / filteredDrinks.length,
                    )}
                    %
                  </TableCell>
                  <TableCell>
                    {formatNumber(
                      filteredDrinks.reduce((sum, drink) => {
                        const cost = Number(drink.cost) || 0
                        const price = Number(drink.price) || 0
                        const preTaxPrice = price / (1 + TAX_RATE)
                        return sum + (preTaxPrice - cost)
                      }, 0) / filteredDrinks.length,
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={selectedDrink !== null || isCreatingNewDrink} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isCreatingNewDrink ? "Create New Drink" : selectedDrink?.name}</DialogTitle>
            <DialogDescription>
              {isCreatingNewDrink ? "Add a new drink to your menu" : "Edit drink details"}
            </DialogDescription>
          </DialogHeader>
          <DrinkEditor
            drink={
              selectedDrink || {
                id: Date.now(),
                name: "",
                type: "Cocktail",
                price: 0,
                active: false,
                recipe: "",
                created: new Date().toISOString().split("T")[0],
                menuHistory: [],
                ice: "Cubed",
                style: "",
                preparationMethod: "build",
              }
            }
            onClose={handleCloseDialog}
            onSave={isCreatingNewDrink ? handleSaveNewDrink : undefined}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}


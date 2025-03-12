"use client"

import { useState, useMemo, useCallback, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAppState } from "@/lib/store"
import { Search, Plus, PlusCircle, Filter, X } from "lucide-react"
import { AddCategoryDialog } from "./add-category-dialog"
import { ComplexIngredientDialog } from "./complex-ingredient-dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function IngredientsTable() {
  const { state } = useAppState()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIngredient, setSelectedIngredient] = useState(null)
  const [isComplexDialogOpen, setIsComplexDialogOpen] = useState(false)

  // Filtering and sorting state
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [volumeRange, setVolumeRange] = useState<[number, number]>([0, 2000])
  const [showComplex, setShowComplex] = useState(true)
  const [showSimple, setShowSimple] = useState(true)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [showFilters, setShowFilters] = useState(false)

  // Calculate max values for ranges
  const maxPrice = useMemo(() => {
    const max = Math.max(...state.ingredients.map((i) => i.costPerBottle), 1000)
    return Math.ceil(max / 100) * 100 // Round up to nearest 100
  }, [state.ingredients])

  const maxVolume = useMemo(() => {
    const max = Math.max(...state.ingredients.map((i) => i.volume), 1000)
    return Math.ceil(max / 500) * 500 // Round up to nearest 500
  }, [state.ingredients])

  // Initialize ranges if they're at default values
  useEffect(() => {
    if (priceRange[1] === 1000) {
      setPriceRange([0, maxPrice])
    }
    if (volumeRange[1] === 2000) {
      setVolumeRange([0, maxVolume])
    }
  }, [maxPrice, maxVolume, priceRange[1], volumeRange[1]])

  // Apply all filters and sorting
  const filteredIngredients = useMemo(() => {
    const filtered = state.ingredients.filter((ingredient) => {
      // Text search
      const matchesSearch =
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ingredient.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ingredient.producer && ingredient.producer.toLowerCase().includes(searchTerm.toLowerCase()))

      // Category filter
      const matchesCategory = !categoryFilter || ingredient.category === categoryFilter

      // Price range filter
      const matchesPrice = ingredient.costPerBottle >= priceRange[0] && ingredient.costPerBottle <= priceRange[1]

      // Volume range filter
      const matchesVolume = ingredient.volume >= volumeRange[0] && ingredient.volume <= volumeRange[1]

      // Complex/Simple filter
      const matchesType = (ingredient.isComplex && showComplex) || (!ingredient.isComplex && showSimple)

      return matchesSearch && matchesCategory && matchesPrice && matchesVolume && matchesType
    })

    // Apply sorting
    if (sortField) {
      filtered.sort((a, b) => {
        let valueA, valueB

        switch (sortField) {
          case "name":
            valueA = a.name
            valueB = b.name
            break
          case "category":
            valueA = a.category
            valueB = b.category
            break
          case "producer":
            valueA = a.producer || ""
            valueB = b.producer || ""
            break
          case "cost":
            valueA = a.costPerBottle
            valueB = b.costPerBottle
            break
          case "volume":
            valueA = a.volume
            valueB = b.volume
            break
          case "costPerUnit":
            valueA = a.costPerUnit
            valueB = b.costPerUnit
            break
          default:
            return 0
        }

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
        } else {
          return sortDirection === "asc"
            ? (valueA as number) - (valueB as number)
            : (valueB as number) - (valueA as number)
        }
      })
    }

    return filtered
  }, [
    state.ingredients,
    searchTerm,
    categoryFilter,
    priceRange,
    volumeRange,
    showComplex,
    showSimple,
    sortField,
    sortDirection,
  ])

  const handleRowClick = useCallback((ingredient) => {
    setSelectedIngredient(ingredient)
    setIsComplexDialogOpen(true)
  }, [])

  const handleAddIngredient = useCallback(() => {
    setSelectedIngredient(null)
    setIsComplexDialogOpen(true)
  }, [])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const resetFilters = () => {
    setCategoryFilter(null)
    setPriceRange([0, maxPrice])
    setVolumeRange([0, maxVolume])
    setShowComplex(true)
    setShowSimple(true)
    setSortField(null)
    setSortDirection("asc")
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? "↑" : "↓"
  }

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (categoryFilter) count++
    if (priceRange[0] > 0 || priceRange[1] < maxPrice) count++
    if (volumeRange[0] > 0 || volumeRange[1] < maxVolume) count++
    if (!showComplex || !showSimple) count++
    return count
  }, [categoryFilter, priceRange, volumeRange, showComplex, showSimple, maxPrice, maxVolume])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-gray-500" />
          <Input
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">{activeFiltersCount}</Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Category</h4>
                  <Select value={categoryFilter || ""} onValueChange={(value) => setCategoryFilter(value || null)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {state.categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium leading-none">Price Range</h4>
                    <span className="text-sm text-muted-foreground">
                      {priceRange[0]} - {priceRange[1]} SEK
                    </span>
                  </div>
                  <Slider
                    value={priceRange}
                    min={0}
                    max={maxPrice}
                    step={10}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h4 className="font-medium leading-none">Volume Range</h4>
                    <span className="text-sm text-muted-foreground">
                      {volumeRange[0]} - {volumeRange[1]} ml
                    </span>
                  </div>
                  <Slider
                    value={volumeRange}
                    min={0}
                    max={maxVolume}
                    step={50}
                    onValueChange={(value) => setVolumeRange(value as [number, number])}
                  />
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Ingredient Type</h4>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-complex"
                        checked={showComplex}
                        onCheckedChange={(checked) => setShowComplex(checked as boolean)}
                      />
                      <Label htmlFor="show-complex">Recipes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="show-simple"
                        checked={showSimple}
                        onCheckedChange={(checked) => setShowSimple(checked as boolean)}
                      />
                      <Label htmlFor="show-simple">Ingredients / Products</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <Button variant="outline" size="sm" className="mt-2" onClick={resetFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Reset Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <AddCategoryDialog />
          <Button onClick={handleAddIngredient}>
            <Plus className="mr-2 h-4 w-4" /> Add Ingredient
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
              Name {getSortIcon("name")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("category")}>
              Category {getSortIcon("category")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("producer")}>
              Producer {getSortIcon("producer")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("cost")}>
              Cost per Bottle (SEK) {getSortIcon("cost")}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("volume")}>
              Volume {getSortIcon("volume")}
            </TableHead>
            <TableHead>Unit</TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("costPerUnit")}>
              Cost per Unit (SEK) {getSortIcon("costPerUnit")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {state.ingredients.length > 0 ? (
            filteredIngredients.map((ingredient) => (
              <TableRow
                key={ingredient.id}
                onClick={() => handleRowClick(ingredient)}
                className="cursor-pointer hover:bg-muted"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    {ingredient.name}
                    {ingredient.isComplex && (
                      <Badge variant="outline" className="bg-primary/10">
                        Recipe
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{ingredient.category}</TableCell>
                <TableCell>{ingredient.producer || "-"}</TableCell>
                <TableCell>{ingredient.costPerBottle.toFixed(2)}</TableCell>
                <TableCell>{ingredient.volume}</TableCell>
                <TableCell>{ingredient.unit}</TableCell>
                <TableCell>{ingredient.costPerUnit.toFixed(4)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-32 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <PlusCircle className="h-10 w-10 mb-2 text-muted-foreground/50" />
                  <p className="text-lg font-medium mb-1">No ingredients yet</p>
                  <p className="mb-4">Add your first ingredient to get started</p>
                  <Button onClick={handleAddIngredient}>
                    <Plus className="mr-2 h-4 w-4" /> Add Ingredient
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
          {state.ingredients.length > 0 && filteredIngredients.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <p className="mb-2">No ingredients match your search or filters.</p>
                  <p>Try different search terms or reset your filters.</p>
                  <Button variant="outline" size="sm" className="mt-4" onClick={resetFilters}>
                    <X className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ComplexIngredientDialog
        isOpen={isComplexDialogOpen}
        onClose={() => setIsComplexDialogOpen(false)}
        ingredient={selectedIngredient}
      />
    </div>
  )
}


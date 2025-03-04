"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Search, Plus, Trash } from "lucide-react"
import { useSettings } from "@/lib/settings-context"
import { useDebounce } from "@/lib/hooks/use-debounce"

interface MenuSimulatorProps {
  menu: any[]
  setMenu: (menu: any[]) => void
  setSimulationActive: (active: boolean) => void
  ingredients: any[]
  iceTypes: any[]
  calculateCost: (recipe: string, iceType: string) => number
}

export function MenuSimulator({
  menu,
  setMenu,
  setSimulationActive,
  ingredients,
  iceTypes,
  calculateCost,
}: MenuSimulatorProps) {
  const { settings } = useSettings()
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editedRecipe, setEditedRecipe] = useState("")
  const [editedIce, setEditedIce] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [recipeIngredients, setRecipeIngredients] = useState<
    { id: number; name: string; amount: number; unit: string }[]
  >([])
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const searchRef = useRef<HTMLDivElement>(null)

  const handleSearch = useCallback(() => {
    const results = ingredients.filter((ing) => ing.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    setSearchResults(results)
  }, [debouncedSearchTerm, ingredients])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  const handleSearchSelect = (ingredient: any) => {
    setRecipeIngredients([...recipeIngredients, { id: ingredient.id, name: ingredient.name, amount: 30, unit: "ml" }])
    setSearchTerm("")
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleSearchSelect(searchResults[0])
    }
  }

  const handleEditClick = (item: any) => {
    setEditingItem(item)
    setEditedRecipe(item.recipe)
    setEditedIce(item.ice)

    // Parse existing recipe into ingredients
    if (item.recipe) {
      const parsedIngredients = item.recipe.split(", ").map((ingredientStr: string) => {
        const [amount, unit, ...nameParts] = ingredientStr.split(" ")
        const name = nameParts.join(" ")
        return {
          id: Math.random(), // Use a proper ID in a real app
          name: name,
          amount: Number.parseFloat(amount) || 0,
          unit: unit || "ml",
        }
      })
      setRecipeIngredients(parsedIngredients)
    } else {
      setRecipeIngredients([])
    }

    setIsDialogOpen(true)
  }

  const handleIngredientChange = (index: number, field: string, value: string | number) => {
    const updatedIngredients = [...recipeIngredients]
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: field === "amount" ? Number.parseFloat(value as string) || 0 : value,
    }
    setRecipeIngredients(updatedIngredients)

    // Update recipe string
    const newRecipe = updatedIngredients
      .filter((i) => i.name) // Only include ingredients that have been selected
      .map((i) => `${i.amount} ${i.unit} ${i.name}`)
      .join(", ")

    setEditedRecipe(newRecipe)
  }

  const handleSaveChanges = () => {
    if (!editingItem) return

    const updatedMenu = menu.map((item) => {
      if (item.id === editingItem.id) {
        const newCost = calculateCost(editedRecipe, editedIce)
        return {
          ...item,
          recipe: editedRecipe,
          ice: editedIce,
          simulatedCost: newCost,
          simulatedProfit: item.price - newCost,
        }
      }
      return item
    })

    setMenu(updatedMenu)
    setSimulationActive(true)
    setIsDialogOpen(false)
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Original Cost</TableHead>
            <TableHead>Current Cost</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Original Profit</TableHead>
            <TableHead>Current Profit</TableHead>
            <TableHead>Sales Volume</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {menu.map((item) => {
            const currentCost = calculateCost(item.recipe, item.ice)
            const currentProfit = Number(item.price) - currentCost
            const originalCost = item.originalCost || currentCost
            const originalProfit = item.originalProfit || currentProfit
            const costDiff = currentCost - originalCost
            const profitDiff = currentProfit - originalProfit

            return (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {settings.currency} {originalCost.toFixed(2)}
                </TableCell>
                <TableCell className={costDiff !== 0 ? (costDiff > 0 ? "text-red-500" : "text-green-500") : ""}>
                  {settings.currency} {currentCost.toFixed(2)}
                  {costDiff !== 0 && (
                    <span className="ml-1">
                      ({costDiff > 0 ? "+" : ""}
                      {costDiff.toFixed(2)})
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {settings.currency} {Number(item.price).toFixed(2)}
                </TableCell>
                <TableCell>
                  {settings.currency} {originalProfit.toFixed(2)}
                </TableCell>
                <TableCell className={profitDiff !== 0 ? (profitDiff > 0 ? "text-green-500" : "text-red-500") : ""}>
                  {settings.currency} {currentProfit.toFixed(2)}
                  {profitDiff !== 0 && (
                    <span className="ml-1">
                      ({profitDiff > 0 ? "+" : ""}
                      {profitDiff.toFixed(2)})
                    </span>
                  )}
                </TableCell>
                <TableCell>{item.salesVolume} units</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => handleEditClick(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Recipe</DialogTitle>
            <DialogDescription>Make changes to the recipe to simulate cost and profit impact</DialogDescription>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Drink Name</Label>
                <Input id="name" value={editingItem.name} readOnly />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ice">Ice Type</Label>
                <Select value={editedIce} onValueChange={setEditedIce}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ice type" />
                  </SelectTrigger>
                  <SelectContent>
                    {iceTypes.map((ice) => (
                      <SelectItem key={ice.name} value={ice.name}>
                        {ice.name} (+{ice.cost} {settings.currency})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <Label>Ingredients</Label>
                <div className="flex items-center mt-2 mb-4">
                  <Input
                    type="text"
                    placeholder="Search ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    className="pr-10"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {searchTerm && (
                  <div
                    ref={searchRef}
                    className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
                  >
                    {searchResults.map((ingredient) => (
                      <div
                        key={ingredient.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSearchSelect(ingredient)}
                      >
                        {ingredient.name}
                      </div>
                    ))}
                  </div>
                )}
                {recipeIngredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center space-x-2 mt-2">
                    <Input
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                      className="flex-1"
                      placeholder="Ingredient name"
                    />
                    <Input
                      type="number"
                      value={ingredient.amount}
                      onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                      className="w-20"
                    />
                    <Select
                      value={ingredient.unit}
                      onValueChange={(value) => handleIngredientChange(index, "unit", value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ml">ml</SelectItem>
                        <SelectItem value="cl">cl</SelectItem>
                        <SelectItem value="oz">oz</SelectItem>
                        <SelectItem value="piece">piece</SelectItem>
                        <SelectItem value="dash">dash</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setRecipeIngredients(recipeIngredients.filter((_, i) => i !== index))}
                      className="h-8 w-8"
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Remove ingredient</span>
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={() =>
                    setRecipeIngredients([...recipeIngredients, { id: 0, name: "", amount: 30, unit: "ml" }])
                  }
                  className="mt-2"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Ingredient
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipe">Recipe</Label>
                <Input
                  id="recipe"
                  value={editedRecipe}
                  onChange={(e) => setEditedRecipe(e.target.value)}
                  placeholder="Recipe will be auto-generated, but you can edit it"
                />
              </div>

              <div className="space-y-2">
                <Label>Cost Impact</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Original Cost</div>
                    <div className="text-xl font-bold">
                      {settings.currency} {editingItem.originalCost.toFixed(2)}
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="text-sm font-medium text-muted-foreground">Simulated Cost</div>
                    <div className="text-xl font-bold">
                      {settings.currency} {calculateCost(editedRecipe, editedIce).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


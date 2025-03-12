"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppState, getIngredientByName } from "@/lib/store"
import { useSettings } from "@/lib/settings-context"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Search, Trash } from "lucide-react"
import { useDebounce } from "@/lib/hooks/use-debounce"
import { cn } from "@/lib/utils"

interface DrinkEditorProps {
  drink: {
    id: number
    name: string
    type: string
    price: number
    active: boolean
    recipe: string
    created: string
    menuHistory: string[]
    ice: string
    style?: string
    preparationMethod?: "shaken" | "stirred" | "build"
  }
  onClose: () => void
  onSave?: (drink: DrinkEditorProps["drink"]) => void
}

export function DrinkEditor({ drink, onClose, onSave }: DrinkEditorProps) {
  const { state, dispatch } = useAppState()
  const { settings } = useSettings()
  const [editedDrink, setEditedDrink] = useState(drink)
  const [ingredients, setIngredients] = useState<{ id: number; name: string; amount: number; unit: string }[]>([])
  const { toast } = useToast()

  const isNewDrink = !drink.name

  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [searchResults, setSearchResults] = useState<typeof state.ingredients>([])
  const searchRef = useRef<HTMLDivElement>(null)

  const handleSearch = useCallback(() => {
    const results = state.ingredients.filter((ing) =>
      ing.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    )
    setSearchResults(results)
  }, [debouncedSearchTerm, state.ingredients])

  useEffect(() => {
    handleSearch()
  }, [handleSearch])

  const handleSearchSelect = (ingredient: (typeof state.ingredients)[0]) => {
    setIngredients([...ingredients, { id: ingredient.id, name: ingredient.name, amount: 30, unit: "ml" }])
    setSearchTerm("")
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchResults.length > 0) {
      handleSearchSelect(searchResults[0])
    }
  }

  useEffect(() => {
    if (drink.recipe) {
      // Parse existing recipe
      const parsedIngredients = drink.recipe.split(", ").map((item) => {
        const [amount, unit, ...nameParts] = item.split(" ")
        const name = nameParts.join(" ")
        const ingredient = getIngredientByName(state.ingredients, name)
        return {
          id: ingredient?.id || 0,
          name: ingredient?.name || name,
          amount: Number.parseFloat(amount) || 0,
          unit: unit || "ml",
        }
      })
      setIngredients(parsedIngredients)
    } else {
      // Initialize with empty ingredients for new drink
      setIngredients([
        { id: 0, name: "", amount: 30, unit: "ml" },
        { id: 0, name: "", amount: 30, unit: "ml" },
      ])
    }
  }, [drink.recipe, state.ingredients])

  const calculateCost = (ingredientsList: typeof ingredients) => {
    const ingredientsCost = ingredientsList.reduce((sum, ingredient) => {
      const ingredientData = getIngredientByName(state.ingredients, ingredient.name)
      if (ingredientData) {
        let quantity = ingredient.amount

        // Convert the recipe amount to ml if it's in cl or oz
        if (ingredient.unit === "cl") {
          quantity *= 10 // convert cl to ml
        } else if (ingredient.unit === "oz") {
          quantity *= 29.5735 // convert oz to ml
        }

        // If the ingredient is measured in pieces or dashes, don't convert
        if (ingredientData.unit === "piece" || ingredientData.unit === "dash") {
          return sum + quantity * ingredientData.costPerUnit
        }

        // For liquid ingredients, ensure we're using ml for calculations
        const costPerMl = ingredientData.costPerBottle / ingredientData.volume
        return sum + quantity * costPerMl
      }
      return sum
    }, 0)

    const selectedIceType = settings.iceTypes.find((ice) => ice.name === editedDrink.ice)
    const iceCost = selectedIceType ? selectedIceType.cost : 0

    return ingredientsCost + iceCost
  }

  const calculateCostOfGoods = (cost: number, price: number) => {
    return price > 0 ? (cost / price) * 100 : 0
  }

  const handleIngredientChange = (index: number, field: string, value: string | number) => {
    const updatedIngredients = [...ingredients]
    if (field === "id") {
      const selectedIngredient = state.ingredients.find((i) => i.id === Number(value))
      if (selectedIngredient) {
        updatedIngredients[index] = {
          ...updatedIngredients[index],
          id: selectedIngredient.id,
          name: selectedIngredient.name,
          unit: selectedIngredient.unit,
        }
      }
    } else {
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: field === "amount" ? Number.parseFloat(value as string) || 0 : value,
      }
    }
    setIngredients(updatedIngredients)

    // Update recipe string
    const newRecipe = updatedIngredients
      .filter((i) => i.id !== 0 && i.name) // Only include ingredients that have been selected
      .map((i) => `${i.amount} ${i.unit} ${i.name}`)
      .join(", ")

    const cost = calculateCost(updatedIngredients)
    const profit = editedDrink.price - cost

    setEditedDrink((prev) => ({
      ...prev,
      recipe: newRecipe,
      profit,
    }))
  }

  const handleInputChange = (field: string, value: string | number) => {
    setEditedDrink((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    // Filter out any empty ingredients
    const validIngredients = ingredients.filter((i) => i.id !== 0 && i.name)
    const newRecipe = validIngredients.map((i) => `${i.amount} ${i.unit} ${i.name}`).join(", ")
    const cost = calculateCost(validIngredients)
    const profit = editedDrink.price - cost

    const updatedDrink = {
      ...editedDrink,
      recipe: newRecipe,
      profit,
      cost,
    }

    if (isNewDrink && onSave) {
      onSave(updatedDrink)
    } else {
      dispatch({ type: "UPDATE_DRINK", drink: updatedDrink })
    }
    onClose()
  }

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDelete = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    dispatch({ type: "DELETE_DRINK", id: drink.id })
    toast({
      title: "Recipe Deleted",
      description: `${drink.name} has been permanently removed.`,
      variant: "destructive",
    })
    onClose()
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={editedDrink.name} onChange={(e) => handleInputChange("name", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <Select value={editedDrink.type} onValueChange={(value) => handleInputChange("type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cocktail">Cocktail</SelectItem>
              <SelectItem value="Mocktail">Mocktail</SelectItem>
              <SelectItem value="Shot">Shot</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="style">Style</Label>
          <Select value={editedDrink.style || ""} onValueChange={(value) => handleInputChange("style", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {settings.drinkStyles?.map((style) => (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              )) || <SelectItem value="No styles available">No styles available</SelectItem>}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="preparationMethod">Preparation Method</Label>
          <Select
            value={editedDrink.preparationMethod || "build"}
            onValueChange={(value) => handleInputChange("preparationMethod", value as "shaken" | "stirred" | "build")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select preparation method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shaken">Shaken</SelectItem>
              <SelectItem value="stirred">Stirred</SelectItem>
              <SelectItem value="build">Build</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="ice">Ice</Label>
        <Select value={editedDrink.ice} onValueChange={(value) => handleInputChange("ice", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select ice type" />
          </SelectTrigger>
          <SelectContent>
            {settings.iceTypes.map((ice) => (
              <SelectItem key={ice.name} value={ice.name}>
                {ice.name} (+{ice.cost} SEK)
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
        {ingredients.map((ingredient, index) => (
          <div key={index} className="flex items-center space-x-2 mt-2">
            <Select
              value={ingredient.id ? ingredient.id.toString() : ""}
              onValueChange={(value) => handleIngredientChange(index, "id", Number(value))}
            >
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select ingredient" />
              </SelectTrigger>
              <SelectContent>
                {state.ingredients.map((i) => (
                  <SelectItem key={i.id} value={i.id.toString()}>
                    {i.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              value={ingredient.amount}
              onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
              className="w-20"
            />
            <Select value={ingredient.unit} onValueChange={(value) => handleIngredientChange(index, "unit", value)}>
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
              onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}
              className="h-8 w-8"
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Remove ingredient</span>
            </Button>
          </div>
        ))}
        <Button
          onClick={() => setIngredients([...ingredients, { id: 0, name: "", amount: 30, unit: "ml" }])}
          className="mt-2"
        >
          Add Ingredient
        </Button>
      </div>
      <div>
        <Label htmlFor="recipe">Recipe</Label>
        <Textarea
          id="recipe"
          value={editedDrink.recipe}
          onChange={(e) => handleInputChange("recipe", e.target.value)}
          rows={4}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Label htmlFor="cost">Cost (SEK)</Label>
            <span
              className={cn(
                "text-xs whitespace-nowrap",
                calculateCostOfGoods(calculateCost(ingredients), editedDrink.price) > settings.cogGoal
                  ? "text-destructive"
                  : "text-green-500",
              )}
            >
              CoG: {calculateCostOfGoods(calculateCost(ingredients), editedDrink.price).toFixed(2)}%
            </span>
          </div>
          <Input id="cost" type="number" value={calculateCost(ingredients).toFixed(2)} readOnly />
        </div>
        <div>
          <Label htmlFor="price">Price (SEK)</Label>
          <Input
            id="price"
            type="number"
            value={editedDrink.price}
            onChange={(e) => handleInputChange("price", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="profit">Profit (SEK)</Label>
          <Input
            id="profit"
            type="number"
            value={(editedDrink.price - calculateCost(ingredients)).toFixed(2)}
            readOnly
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              onClick={handleDelete}
              className="flex items-center gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
              Delete Recipe
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will permanently delete the recipe for {drink.name}. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmDelete}>Delete Permanently</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="space-x-2">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave}>{isNewDrink ? "Create Drink" : "Save Changes"}</Button>
        </div>
      </div>
    </div>
  )
}


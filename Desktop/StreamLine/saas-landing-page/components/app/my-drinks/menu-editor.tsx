"use client"

import { useState, useEffect } from "react"
import { useAppState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Search } from "lucide-react"
import { useDebounce } from "@/lib/hooks/use-debounce"
import { useSettings } from "@/lib/settings-context"

interface MenuEditorProps {
  menu: {
    id: number
    name: string
    description: string
    drinks: number[]
    active: boolean
    created: string
  }
  onClose: () => void
  onSave: (menu: MenuEditorProps["menu"]) => void
}

export function MenuEditor({ menu, onClose, onSave }: MenuEditorProps) {
  const { state } = useAppState()
  const { settings } = useSettings()
  const [editedMenu, setEditedMenu] = useState(menu)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const [selectedDrinks, setSelectedDrinks] = useState<Set<number>>(new Set(menu.drinks))

  // Filter drinks based on search term
  const filteredDrinks = state.drinks.filter(
    (drink) =>
      drink.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      drink.type.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  )

  // Update selectedDrinks when menu.drinks changes
  useEffect(() => {
    setSelectedDrinks(new Set(menu.drinks))
  }, [menu.drinks])

  const handleInputChange = (field: string, value: string) => {
    setEditedMenu((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleDrinkToggle = (drinkId: number) => {
    const newSelectedDrinks = new Set(selectedDrinks)
    if (newSelectedDrinks.has(drinkId)) {
      newSelectedDrinks.delete(drinkId)
    } else {
      newSelectedDrinks.add(drinkId)
    }
    setSelectedDrinks(newSelectedDrinks)
    setEditedMenu((prev) => ({
      ...prev,
      drinks: Array.from(newSelectedDrinks),
    }))
  }

  const handleSave = () => {
    onSave({
      ...editedMenu,
      drinks: Array.from(selectedDrinks),
    })
  }

  // Calculate cost for a drink
  const calculateCost = (recipe: string, iceType: string): number => {
    if (!recipe) return 0

    const ingredientsCost = recipe.split(", ").reduce((sum, item) => {
      const [amount, unit, ...nameParts] = item.split(" ")
      const name = nameParts.join(" ")
      const ingredient = state.ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase())
      if (ingredient) {
        let quantity = Number(amount)
        if (unit === "cl") quantity *= 10 // convert cl to ml
        if (unit === "oz") quantity *= 29.5735 // convert oz to ml

        if (ingredient.unit === "piece") {
          return sum + quantity * Number(ingredient.costPerUnit)
        }

        const costPerMl = Number(ingredient.costPerBottle) / Number(ingredient.volume)
        return sum + quantity * costPerMl
      }
      return sum
    }, 0)

    const selectedIceType = settings.iceTypes.find((ice) => ice.name === iceType)
    const iceCost = selectedIceType ? Number(selectedIceType.cost) : 0

    return ingredientsCost + iceCost
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Menu Name</Label>
          <Input
            id="name"
            value={editedMenu.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="e.g. Summer Menu 2023"
          />
        </div>
        <div>
          <Label htmlFor="created">Created Date</Label>
          <Input
            id="created"
            type="date"
            value={editedMenu.created}
            onChange={(e) => handleInputChange("created", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={editedMenu.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe your menu..."
          rows={3}
        />
      </div>

      <div>
        <Label>Menu Items</Label>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search drinks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="border rounded-md max-h-[400px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Profit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrinks.length > 0 ? (
                filteredDrinks.map((drink) => {
                  const cost = calculateCost(drink.recipe, drink.ice)
                  const profit = drink.price - cost

                  return (
                    <TableRow
                      key={drink.id}
                      className="cursor-pointer hover:bg-muted"
                      onClick={() => handleDrinkToggle(drink.id)}
                    >
                      <TableCell className="p-4">
                        <Checkbox
                          checked={selectedDrinks.has(drink.id)}
                          onCheckedChange={() => handleDrinkToggle(drink.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{drink.name}</TableCell>
                      <TableCell>{drink.type}</TableCell>
                      <TableCell>
                        {settings.currency} {cost.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {settings.currency} {Number(drink.price).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {settings.currency} {profit.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <p className="text-muted-foreground">No drinks found. Try a different search term.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{selectedDrinks.size} items selected</p>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!editedMenu.name || selectedDrinks.size === 0}>
          {menu.id === editedMenu.id && menu.name ? "Update Menu" : "Create Menu"}
        </Button>
      </div>
    </div>
  )
}


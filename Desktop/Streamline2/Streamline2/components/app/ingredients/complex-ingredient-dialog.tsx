"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash, Plus } from "lucide-react"
import { useAppState } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"
import { Combobox } from "@/components/ui/combobox"

interface SubIngredient {
  name: string
  amount: number
  unit: string
  costPerUnit: number
  totalCost: number
}

interface ComplexIngredientDialogProps {
  isOpen: boolean
  onClose: () => void
  ingredient?: any // The existing complex ingredient to edit, if any
}

export function ComplexIngredientDialog({ isOpen, onClose, ingredient }: ComplexIngredientDialogProps) {
  const { state, dispatch } = useAppState()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [category, setCategory] = useState("House-made")
  const [producer, setProducer] = useState("")
  const [estimatedVolume, setEstimatedVolume] = useState(0)
  const [subIngredients, setSubIngredients] = useState<SubIngredient[]>([
    { name: "", amount: 0, unit: "ml", costPerUnit: 0, totalCost: 0 },
  ])
  const [recipe, setRecipe] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isComplex, setIsComplex] = useState(true)

  // Initialize form with existing ingredient data if provided
  useEffect(() => {
    if (ingredient) {
      setName(ingredient.name || "")
      setCategory(ingredient.category || "House-made")
      setProducer(ingredient.producer || "")
      setEstimatedVolume(ingredient.estimatedVolume || ingredient.volume || 0)
      setRecipe(ingredient.recipe || "")
      setSubIngredients(
        ingredient.subIngredients || [{ name: "", amount: 0, unit: "ml", costPerUnit: 0, totalCost: 0 }],
      )
      setIsEditing(true)
      setIsComplex(ingredient.isComplex !== false)
    } else {
      // Reset form for new ingredient
      setName("")
      setCategory("House-made")
      setProducer("")
      setEstimatedVolume(0)
      setSubIngredients([{ name: "", amount: 0, unit: "ml", costPerUnit: 0, totalCost: 0 }])
      setRecipe("")
      setIsEditing(false)
      setIsComplex(true)
    }
  }, [ingredient])

  // Calculate total cost - now using the absolute costs directly
  const totalCost = subIngredients.reduce((sum, ing) => sum + ing.totalCost, 0)

  // Calculate cost per unit
  const costPerUnit = estimatedVolume > 0 ? totalCost / estimatedVolume : 0

  // Add a new sub-ingredient
  const addSubIngredient = () => {
    setSubIngredients([...subIngredients, { name: "", amount: 0, unit: "ml", costPerUnit: 0, totalCost: 0 }])
  }

  // Remove a sub-ingredient
  const removeSubIngredient = (index: number) => {
    setSubIngredients(subIngredients.filter((_, i) => i !== index))
  }

  // Update a sub-ingredient - modified to handle absolute costs
  const updateSubIngredient = (index: number, field: keyof SubIngredient, value: string | number) => {
    const updatedIngredients = [...subIngredients]

    if (field === "totalCost") {
      // Directly set the total cost
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        totalCost: Number(value),
      }
    } else {
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value,
      }
    }

    setSubIngredients(updatedIngredients)
  }

  // Toggle between complex and simple ingredient
  const toggleIngredientType = () => {
    setIsComplex(!isComplex)
  }

  // Generate recipe text
  useEffect(() => {
    const recipeText = subIngredients
      .filter((ing) => ing.name && ing.amount > 0)
      .map((ing) => `${ing.amount} ${ing.unit} ${ing.name}`)
      .join(", ")
    setRecipe(recipeText)
  }, [subIngredients])

  // Handle save
  const handleSave = () => {
    if (!name) {
      toast({
        title: "Name required",
        description: "Please provide a name for your ingredient",
        variant: "destructive",
      })
      return
    }

    if (isComplex) {
      if (estimatedVolume <= 0) {
        toast({
          title: "Volume required",
          description: "Please provide a valid estimated volume",
          variant: "destructive",
        })
        return
      }

      if (subIngredients.length === 0 || !subIngredients.some((ing) => ing.name && ing.amount > 0)) {
        toast({
          title: "Ingredients required",
          description: "Please add at least one sub-ingredient",
          variant: "destructive",
        })
        return
      }

      const complexIngredient = {
        id: isEditing ? ingredient.id : Date.now(),
        name,
        category,
        producer: "",
        costPerBottle: totalCost,
        volume: estimatedVolume,
        unit: "ml" as const,
        costPerUnit,
        isComplex: true,
        subIngredients: subIngredients.filter((ing) => ing.name && ing.amount > 0),
        estimatedVolume,
        recipe,
      }

      if (isEditing) {
        dispatch({ type: "UPDATE_INGREDIENT", ingredient: complexIngredient })
        toast({
          title: "Recipe updated",
          description: `${name} has been updated`,
        })
      } else {
        dispatch({ type: "ADD_COMPLEX_INGREDIENT", ingredient: complexIngredient })
        toast({
          title: "Recipe added",
          description: `${name} has been added to your ingredients`,
        })
      }
    } else {
      // Simple ingredient
      if (!estimatedVolume) {
        toast({
          title: "Volume required",
          description: "Please provide a valid volume",
          variant: "destructive",
        })
        return
      }

      if (!totalCost) {
        toast({
          title: "Cost required",
          description: "Please provide a valid cost",
          variant: "destructive",
        })
        return
      }

      const simpleIngredient = {
        id: isEditing ? ingredient.id : Date.now(),
        name,
        category,
        producer,
        costPerBottle: totalCost,
        volume: estimatedVolume,
        unit: "ml" as const,
        costPerUnit: costPerUnit,
        isComplex: false,
      }

      if (isEditing) {
        dispatch({ type: "UPDATE_INGREDIENT", ingredient: simpleIngredient })
        toast({
          title: "Ingredient updated",
          description: `${name} has been updated`,
        })
      } else {
        dispatch({ type: "ADD_INGREDIENT", ingredient: simpleIngredient })
        toast({
          title: "Ingredient added",
          description: `${name} has been added to your ingredients`,
        })
      }
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Ingredient" : "Add Ingredient"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vanilla Syrup"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Combobox
                options={state.categories.map((cat) => ({ value: cat, label: cat }))}
                value={category}
                onChange={setCategory}
                placeholder="Select or create category"
                allowCreate={true}
                onCreateOption={(newCategory) => {
                  dispatch({ type: "ADD_CATEGORY", category: newCategory })
                  toast({
                    title: "Category added",
                    description: `The category "${newCategory}" has been added successfully.`,
                  })
                }}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant={isComplex ? "default" : "outline"}
              onClick={() => setIsComplex(true)}
              className="flex-1"
            >
              Recipe
            </Button>
            <Button
              type="button"
              variant={!isComplex ? "default" : "outline"}
              onClick={() => setIsComplex(false)}
              className="flex-1"
            >
              Ingredient / Product
            </Button>
          </div>

          {isComplex ? (
            <>
              <div>
                <Label htmlFor="estimatedVolume">Estimated Final Volume (ml)</Label>
                <Input
                  id="estimatedVolume"
                  type="number"
                  value={estimatedVolume}
                  onChange={(e) => setEstimatedVolume(Number(e.target.value))}
                  placeholder="e.g. 1000"
                />
                <p className="text-sm text-muted-foreground mt-1">The total volume you expect to produce</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Ingredients</Label>
                  <Button variant="outline" size="sm" onClick={addSubIngredient}>
                    <Plus className="h-4 w-4 mr-1" /> Add Ingredient
                  </Button>
                </div>

                {/* Column headers - only shown once */}
                <div className="grid grid-cols-12 gap-2 mb-2 items-end">
                  <div className="col-span-4">
                    <Label className="text-xs">Name</Label>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs">Amount</Label>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs">Unit</Label>
                  </div>
                  <div className="col-span-3">
                    <Label className="text-xs">Total Cost (SEK)</Label>
                  </div>
                  <div className="col-span-1"></div>
                </div>

                {/* Ingredient rows - no labels */}
                {subIngredients.map((ingredient, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 mb-2 items-end">
                    <div className="col-span-4">
                      <Input
                        value={ingredient.name}
                        onChange={(e) => updateSubIngredient(index, "name", e.target.value)}
                        placeholder="e.g. Sugar"
                      />
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        value={ingredient.amount}
                        onChange={(e) => updateSubIngredient(index, "amount", Number(e.target.value))}
                      />
                    </div>
                    <div className="col-span-2">
                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) => updateSubIngredient(index, "unit", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ml">ml</SelectItem>
                          <SelectItem value="g">g</SelectItem>
                          <SelectItem value="piece">piece</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={ingredient.totalCost}
                        onChange={(e) => updateSubIngredient(index, "totalCost", Number(e.target.value))}
                        step="0.01"
                        placeholder="Total cost"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSubIngredient(index)}
                        className="h-8 w-8"
                      >
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Remove ingredient</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <Label htmlFor="recipe">Recipe/Notes</Label>
                <Input
                  id="recipe"
                  value={recipe}
                  onChange={(e) => setRecipe(e.target.value)}
                  placeholder="Recipe will be auto-generated, but you can edit it"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="producer">Producer/Brand</Label>
                <Input
                  id="producer"
                  value={producer}
                  onChange={(e) => setProducer(e.target.value)}
                  placeholder="e.g. Absolut, Monin, etc."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="volume">Volume (ml)</Label>
                  <Input
                    id="volume"
                    type="number"
                    value={estimatedVolume}
                    onChange={(e) => setEstimatedVolume(Number(e.target.value))}
                    placeholder="e.g. 750"
                  />
                </div>
                <div>
                  <Label htmlFor="cost">Cost per Bottle (SEK)</Label>
                  <Input
                    id="cost"
                    type="number"
                    value={totalCost}
                    onChange={(e) => {
                      const newCost = Number(e.target.value)
                      // Update the first sub-ingredient's total cost
                      const updatedIngredients = [...subIngredients]
                      if (updatedIngredients[0]) {
                        updatedIngredients[0].totalCost = newCost
                        setSubIngredients(updatedIngredients)
                      }
                    }}
                    step="0.01"
                    placeholder="e.g. 249.90"
                  />
                </div>
              </div>
            </>
          )}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Total Cost</Label>
              <div className="text-2xl font-bold">{totalCost.toFixed(2)} SEK</div>
            </div>
            <div>
              <Label>Cost per ml</Label>
              <div className="text-2xl font-bold">{costPerUnit.toFixed(4)} SEK</div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {isEditing ? "Update" : "Add"} {isComplex ? "Recipe" : "Ingredient"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


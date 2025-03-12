"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash, Info } from "lucide-react"
import { useAppState } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { formatNumber } from "@/lib/utils"

export function IngredientEditDialog({ isOpen, onClose, ingredient, isNew }) {
  const { state, dispatch } = useAppState()
  const [editedIngredient, setEditedIngredient] = useState(ingredient)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setEditedIngredient(ingredient)
  }, [ingredient])

  const handleInputChange = useCallback((field, value) => {
    setEditedIngredient((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === "costPerBottle" || field === "volume") {
        const costPerBottle = Number(updated.costPerBottle) || 0
        const volume = Number(updated.volume) || 1 // Prevent division by zero
        updated.costPerUnit = costPerBottle / volume
      }
      return updated
    })
  }, [])

  const handleSave = useCallback(() => {
    if (isNew) {
      dispatch({ type: "ADD_INGREDIENT", ingredient: editedIngredient })
    } else {
      dispatch({ type: "UPDATE_INGREDIENT", ingredient: editedIngredient })
    }
    onClose()
  }, [dispatch, editedIngredient, isNew, onClose])

  const handleDelete = useCallback(() => {
    try {
      dispatch({ type: "DELETE_INGREDIENT", id: editedIngredient.id })
      toast({
        title: "Ingredient Deleted",
        description: `${editedIngredient.name} has been removed from the ingredients list.`,
        variant: "destructive",
      })
    } catch (error) {
      console.error("Error deleting ingredient:", error)
      toast({
        title: "Error",
        description: "Failed to delete the ingredient. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      onClose()
    }
  }, [dispatch, editedIngredient.id, editedIngredient.name, onClose, toast])

  // Memoize categories to prevent unnecessary re-renders
  const categories = useMemo(() => state.categories || ["Spirits", "Mixers", "Garnish", "Other"], [state.categories])

  // Check if this is a complex ingredient
  const isComplex = editedIngredient?.isComplex || false

  if (!editedIngredient) {
    return null // Don't render anything if ingredient is not available
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {isNew ? "Add New Ingredient" : "Edit Ingredient"}
              {isComplex && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 ml-2 inline-block text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This is a complex ingredient. Some fields are calculated automatically.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editedIngredient.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="col-span-3"
                readOnly={isComplex}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={editedIngredient.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="costPerBottle" className="text-right">
                Cost per Bottle (SEK)
              </Label>
              <Input
                id="costPerBottle"
                type="number"
                value={editedIngredient.costPerBottle}
                onChange={(e) => handleInputChange("costPerBottle", Number(e.target.value))}
                className="col-span-3"
                readOnly={isComplex}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="volume" className="text-right">
                Volume
              </Label>
              <Input
                id="volume"
                type="number"
                value={editedIngredient.volume}
                onChange={(e) => handleInputChange("volume", Number(e.target.value))}
                className="col-span-3"
                readOnly={isComplex}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Unit
              </Label>
              <Select value={editedIngredient.unit} onValueChange={(value) => handleInputChange("unit", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ml">ml</SelectItem>
                  <SelectItem value="cl">cl</SelectItem>
                  <SelectItem value="piece">piece</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isComplex && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="costPerUnit" className="text-right">
                  Cost per Unit
                </Label>
                <Input
                  id="costPerUnit"
                  type="number"
                  value={formatNumber(editedIngredient.costPerUnit, 4)}
                  className="col-span-3"
                  readOnly
                />
              </div>
            )}
            {isComplex && editedIngredient.recipe && (
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="recipe" className="text-right">
                  Recipe
                </Label>
                <div className="col-span-3 text-sm">{editedIngredient.recipe}</div>
              </div>
            )}
          </div>
          <div className="flex justify-between space-x-2">
            {!isNew && (
              <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(true)}>
                <Trash className="mr-2 h-4 w-4" />
                Delete Ingredient
              </Button>
            )}
            <div className="space-x-2">
              <Button onClick={onClose} variant="outline">
                Cancel
              </Button>
              <Button onClick={handleSave}>{isNew ? "Add" : "Save Changes"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently delete the ingredient {editedIngredient?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete Permanently</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default IngredientEditDialog


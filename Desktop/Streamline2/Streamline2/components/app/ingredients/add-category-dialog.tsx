"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppState } from "@/lib/store"
import { useToast } from "@/components/ui/use-toast"

export function AddCategoryDialog() {
  const [open, setOpen] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const { state, dispatch } = useAppState()
  const { toast } = useToast()

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const categoryExists = state.ingredients.some(
        (ingredient) => ingredient.category.toLowerCase() === newCategory.trim().toLowerCase(),
      )

      if (categoryExists) {
        toast({
          title: "Category already exists",
          description: "Please enter a unique category name.",
          variant: "destructive",
        })
      } else {
        dispatch({ type: "ADD_CATEGORY", category: newCategory.trim() })
        setNewCategory("")
        setOpen(false)
        toast({
          title: "Category added",
          description: `The category "${newCategory.trim()}" has been added successfully.`,
        })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>Enter the name of the new category you'd like to add.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddCategory}>
            Add Category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


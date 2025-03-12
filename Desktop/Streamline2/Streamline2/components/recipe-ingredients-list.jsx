'use client'

import { useEffect, useState } from 'react'
import { getRecipeIngredients, addRecipeIngredient, updateRecipeIngredient, deleteRecipeIngredient } from '@/lib/services/recipe-ingredients-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function RecipeIngredientsList() {
  const [recipeIngredients, setRecipeIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [newRecipeIngredient, setNewRecipeIngredient] = useState({ drink_id: '', ingredient_id: '', amount: 0, unit: '' })

  useEffect(() => {
    async function loadRecipeIngredients() {
      try {
        const data = await getRecipeIngredients()
        setRecipeIngredients(data)
      } catch (error) {
        console.error('Error loading recipe ingredients:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadRecipeIngredients()
  }, [])

  const handleAddRecipeIngredient = async () => {
    try {
      const added = await addRecipeIngredient(newRecipeIngredient)
      setRecipeIngredients([...recipeIngredients, added])
      setNewRecipeIngredient({ drink_id: '', ingredient_id: '', amount: 0, unit: '' })
    } catch (error) {
      console.error('Error adding recipe ingredient:', error)
    }
  }

  const handleUpdateRecipeIngredient = async (id, updates) => {
    try {
      const updated = await updateRecipeIngredient(id, updates)
      setRecipeIngredients(recipeIngredients.map(recipeIngredient => recipeIngredient.id === id ? updated : recipeIngredient))
    } catch (error) {
      console.error('Error updating recipe ingredient:', error)
    }
  }

  const handleDeleteRecipeIngredient = async (id) => {
    try {
      await deleteRecipeIngredient(id)
      setRecipeIngredients(recipeIngredients.filter(recipeIngredient => recipeIngredient.id !== id))
    } catch (error) {
      console.error('Error deleting recipe ingredient:', error)
    }
  }

  if (loading) {
    return <div>Loading recipe ingredients...</div>
  }

  return (
    <div>
      <h1>Recipe Ingredients List</h1>
      <div>
        <Input
          type="text"
          placeholder="Drink ID"
          value={newRecipeIngredient.drink_id}
          onChange={(e) => setNewRecipeIngredient({ ...newRecipeIngredient, drink_id: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Ingredient ID"
          value={newRecipeIngredient.ingredient_id}
          onChange={(e) => setNewRecipeIngredient({ ...newRecipeIngredient, ingredient_id: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={newRecipeIngredient.amount}
          onChange={(e) => setNewRecipeIngredient({ ...newRecipeIngredient, amount: parseFloat(e.target.value) })}
        />
        <Input
          type="text"
          placeholder="Unit"
          value={newRecipeIngredient.unit}
          onChange={(e) => setNewRecipeIngredient({ ...newRecipeIngredient, unit: e.target.value })}
        />
        <Button onClick={handleAddRecipeIngredient}>Add Recipe Ingredient</Button>
      </div>
      <ul>
        {recipeIngredients.map(recipeIngredient => (
          <li key={recipeIngredient.id}>
            {recipeIngredient.drink_id} - {recipeIngredient.ingredient_id} - {recipeIngredient.amount} - {recipeIngredient.unit}
            <Button onClick={() => handleUpdateRecipeIngredient(recipeIngredient.id, { amount: 10 })}>Update</Button>
            <Button onClick={() => handleDeleteRecipeIngredient(recipeIngredient.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
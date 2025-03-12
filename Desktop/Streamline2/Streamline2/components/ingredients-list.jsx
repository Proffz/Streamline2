'use client'

import { useEffect, useState } from 'react'
import { getIngredients, addIngredient, updateIngredient, deleteIngredient } from '@/lib/services/ingredients-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function IngredientsList() {
  const [ingredients, setIngredients] = useState([])
  const [loading, setLoading] = useState(true)
  const [newIngredient, setNewIngredient] = useState({ name: '', category: '', producer: '', cost_per_bottle: 0, volume: 0, unit: '' })

  useEffect(() => {
    async function loadIngredients() {
      try {
        const data = await getIngredients()
        setIngredients(data)
      } catch (error) {
        console.error('Error loading ingredients:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadIngredients()
  }, [])

  const handleAddIngredient = async () => {
    try {
      const added = await addIngredient(newIngredient)
      setIngredients([...ingredients, added])
      setNewIngredient({ name: '', category: '', producer: '', cost_per_bottle: 0, volume: 0, unit: '' })
    } catch (error) {
      console.error('Error adding ingredient:', error)
    }
  }

  const handleUpdateIngredient = async (id, updates) => {
    try {
      const updated = await updateIngredient(id, updates)
      setIngredients(ingredients.map(ingredient => ingredient.id === id ? updated : ingredient))
    } catch (error) {
      console.error('Error updating ingredient:', error)
    }
  }

  const handleDeleteIngredient = async (id) => {
    try {
      await deleteIngredient(id)
      setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
    } catch (error) {
      console.error('Error deleting ingredient:', error)
    }
  }

  if (loading) {
    return <div>Loading ingredients...</div>
  }

  return (
    <div>
      <h1>Ingredients List</h1>
      <div>
        <Input
          type="text"
          placeholder="Name"
          value={newIngredient.name}
          onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Category"
          value={newIngredient.category}
          onChange={(e) => setNewIngredient({ ...newIngredient, category: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Producer"
          value={newIngredient.producer}
          onChange={(e) => setNewIngredient({ ...newIngredient, producer: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Cost per Bottle"
          value={newIngredient.cost_per_bottle}
          onChange={(e) => setNewIngredient({ ...newIngredient, cost_per_bottle: parseFloat(e.target.value) })}
        />
        <Input
          type="number"
          placeholder="Volume"
          value={newIngredient.volume}
          onChange={(e) => setNewIngredient({ ...newIngredient, volume: parseFloat(e.target.value) })}
        />
        <Input
          type="text"
          placeholder="Unit"
          value={newIngredient.unit}
          onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
        />
        <Button onClick={handleAddIngredient}>Add Ingredient</Button>
      </div>
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient.id}>
            {ingredient.name} - {ingredient.category} - {ingredient.producer} - {ingredient.cost_per_bottle} - {ingredient.volume} - {ingredient.unit}
            <Button onClick={() => handleUpdateIngredient(ingredient.id, { name: 'Updated Name' })}>Update</Button>
            <Button onClick={() => handleDeleteIngredient(ingredient.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
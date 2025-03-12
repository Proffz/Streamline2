'use client'

import { useEffect, useState } from 'react'
import { getDrinks, addDrink, updateDrink, deleteDrink } from '@/lib/services/drinks-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function DrinksList() {
  const [drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [newDrink, setNewDrink] = useState({ name: '', type: '', price: 0, preparation: '', glass: '', ice: '' })

  useEffect(() => {
    async function loadDrinks() {
      try {
        const data = await getDrinks()
        setDrinks(data)
      } catch (error) {
        console.error('Error loading drinks:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadDrinks()
  }, [])

  const handleAddDrink = async () => {
    try {
      const added = await addDrink(newDrink)
      setDrinks([...drinks, added])
      setNewDrink({ name: '', type: '', price: 0, preparation: '', glass: '', ice: '' })
    } catch (error) {
      console.error('Error adding drink:', error)
    }
  }

  const handleUpdateDrink = async (id, updates) => {
    try {
      const updated = await updateDrink(id, updates)
      setDrinks(drinks.map(drink => drink.id === id ? updated : drink))
    } catch (error) {
      console.error('Error updating drink:', error)
    }
  }

  const handleDeleteDrink = async (id) => {
    try {
      await deleteDrink(id)
      setDrinks(drinks.filter(drink => drink.id !== id))
    } catch (error) {
      console.error('Error deleting drink:', error)
    }
  }

  if (loading) {
    return <div>Loading drinks...</div>
  }

  return (
    <div>
      <h1>Drinks List</h1>
      <div>
        <Input
          type="text"
          placeholder="Name"
          value={newDrink.name}
          onChange={(e) => setNewDrink({ ...newDrink, name: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Type"
          value={newDrink.type}
          onChange={(e) => setNewDrink({ ...newDrink, type: e.target.value })}
        />
        <Input
          type="number"
          placeholder="Price"
          value={newDrink.price}
          onChange={(e) => setNewDrink({ ...newDrink, price: parseFloat(e.target.value) })}
        />
        <Input
          type="text"
          placeholder="Preparation"
          value={newDrink.preparation}
          onChange={(e) => setNewDrink({ ...newDrink, preparation: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Glass"
          value={newDrink.glass}
          onChange={(e) => setNewDrink({ ...newDrink, glass: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Ice"
          value={newDrink.ice}
          onChange={(e) => setNewDrink({ ...newDrink, ice: e.target.value })}
        />
        <Button onClick={handleAddDrink}>Add Drink</Button>
      </div>
      <ul>
        {drinks.map(drink => (
          <li key={drink.id}>
            {drink.name} - {drink.type} - {drink.price} - {drink.preparation} - {drink.glass} - {drink.ice}
            <Button onClick={() => handleUpdateDrink(drink.id, { name: 'Updated Name' })}>Update</Button>
            <Button onClick={() => handleDeleteDrink(drink.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
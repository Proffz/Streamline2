'use client'

import { useEffect, useState } from 'react'
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from '@/lib/services/menu-items-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function MenuItemsList() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [newMenuItem, setNewMenuItem] = useState({ menu_id: '', drink_id: '' })

  useEffect(() => {
    async function loadMenuItems() {
      try {
        const data = await getMenuItems()
        setMenuItems(data)
      } catch (error) {
        console.error('Error loading menu items:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadMenuItems()
  }, [])

  const handleAddMenuItem = async () => {
    try {
      const added = await addMenuItem(newMenuItem)
      setMenuItems([...menuItems, added])
      setNewMenuItem({ menu_id: '', drink_id: '' })
    } catch (error) {
      console.error('Error adding menu item:', error)
    }
  }

  const handleUpdateMenuItem = async (id, updates) => {
    try {
      const updated = await updateMenuItem(id, updates)
      setMenuItems(menuItems.map(menuItem => menuItem.id === id ? updated : menuItem))
    } catch (error) {
      console.error('Error updating menu item:', error)
    }
  }

  const handleDeleteMenuItem = async (id) => {
    try {
      await deleteMenuItem(id)
      setMenuItems(menuItems.filter(menuItem => menuItem.id !== id))
    } catch (error) {
      console.error('Error deleting menu item:', error)
    }
  }

  if (loading) {
    return <div>Loading menu items...</div>
  }

  return (
    <div>
      <h1>Menu Items List</h1>
      <div>
        <Input
          type="text"
          placeholder="Menu ID"
          value={newMenuItem.menu_id}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, menu_id: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Drink ID"
          value={newMenuItem.drink_id}
          onChange={(e) => setNewMenuItem({ ...newMenuItem, drink_id: e.target.value })}
        />
        <Button onClick={handleAddMenuItem}>Add Menu Item</Button>
      </div>
      <ul>
        {menuItems.map(menuItem => (
          <li key={menuItem.id}>
            {menuItem.menu_id} - {menuItem.drink_id}
            <Button onClick={() => handleUpdateMenuItem(menuItem.id, { drink_id: 'Updated Drink ID' })}>Update</Button>
            <Button onClick={() => handleDeleteMenuItem(menuItem.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
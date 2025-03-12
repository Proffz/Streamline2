'use client'

import { useEffect, useState } from 'react'
import { getMenus, addMenu, updateMenu, deleteMenu } from '@/lib/services/menus-service'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function MenusList() {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [newMenu, setNewMenu] = useState({ name: '', description: '', active: true })

  useEffect(() => {
    async function loadMenus() {
      try {
        const data = await getMenus()
        setMenus(data)
      } catch (error) {
        console.error('Error loading menus:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadMenus()
  }, [])

  const handleAddMenu = async () => {
    try {
      const added = await addMenu(newMenu)
      setMenus([...menus, added])
      setNewMenu({ name: '', description: '', active: true })
    } catch (error) {
      console.error('Error adding menu:', error)
    }
  }

  const handleUpdateMenu = async (id, updates) => {
    try {
      const updated = await updateMenu(id, updates)
      setMenus(menus.map(menu => menu.id === id ? updated : menu))
    } catch (error) {
      console.error('Error updating menu:', error)
    }
  }

  const handleDeleteMenu = async (id) => {
    try {
      await deleteMenu(id)
      setMenus(menus.filter(menu => menu.id !== id))
    } catch (error) {
      console.error('Error deleting menu:', error)
    }
  }

  if (loading) {
    return <div>Loading menus...</div>
  }

  return (
    <div>
      <h1>Menus List</h1>
      <div>
        <Input
          type="text"
          placeholder="Name"
          value={newMenu.name}
          onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Description"
          value={newMenu.description}
          onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
        />
        <Button onClick={handleAddMenu}>Add Menu</Button>
      </div>
      <ul>
        {menus.map(menu => (
          <li key={menu.id}>
            {menu.name} - {menu.description} - {menu.active ? 'Active' : 'Inactive'}
            <Button onClick={() => handleUpdateMenu(menu.id, { name: 'Updated Name' })}>Update</Button>
            <Button onClick={() => handleDeleteMenu(menu.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
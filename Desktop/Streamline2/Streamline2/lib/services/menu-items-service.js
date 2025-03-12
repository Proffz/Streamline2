import { supabase } from '@/lib/supabase'

export async function getMenuItems() {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .order('created_at')
  
  if (error) {
    console.error('Error fetching menu items:', error)
    return []
  }
  
  return data
}

export async function addMenuItem(menuItem) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('You must be logged in to add menu items')
  }
  
  const newMenuItem = {
    ...menuItem,
    user_id: user.id
  }
  
  const { data, error } = await supabase
    .from('menu_items')
    .insert(newMenuItem)
    .select()
  
  if (error) {
    console.error('Error adding menu item:', error)
    throw error
  }
  
  return data[0]
}

export async function updateMenuItem(id, updates) {
  const { data, error } = await supabase
    .from('menu_items')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating menu item:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteMenuItem(id) {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting menu item:', error)
    throw error
  }
  
  return true
}
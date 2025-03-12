import { supabase } from '@/lib/supabase'

export async function getMenus() {
  const { data, error } = await supabase
    .from('menus')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching menus:', error)
    return []
  }
  
  return data
}

export async function addMenu(menu) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('You must be logged in to add menus')
  }
  
  const newMenu = {
    ...menu,
    user_id: user.id
  }
  
  const { data, error } = await supabase
    .from('menus')
    .insert(newMenu)
    .select()
  
  if (error) {
    console.error('Error adding menu:', error)
    throw error
  }
  
  return data[0]
}

export async function updateMenu(id, updates) {
  const { data, error } = await supabase
    .from('menus')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating menu:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteMenu(id) {
  const { error } = await supabase
    .from('menus')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting menu:', error)
    throw error
  }
  
  return true
}
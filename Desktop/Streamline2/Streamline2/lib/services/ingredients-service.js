import { supabase } from '@/lib/supabase'

export async function getIngredients() {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching ingredients:', error)
    return []
  }
  
  return data
}

export async function addIngredient(ingredient) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('You must be logged in to add ingredients')
  }
  
  const newIngredient = {
    ...ingredient,
    user_id: user.id
  }
  
  const { data, error } = await supabase
    .from('ingredients')
    .insert(newIngredient)
    .select()
  
  if (error) {
    console.error('Error adding ingredient:', error)
    throw error
  }
  
  return data[0]
}

export async function updateIngredient(id, updates) {
  const { data, error } = await supabase
    .from('ingredients')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating ingredient:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteIngredient(id) {
  const { error } = await supabase
    .from('ingredients')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting ingredient:', error)
    throw error
  }
  
  return true
}
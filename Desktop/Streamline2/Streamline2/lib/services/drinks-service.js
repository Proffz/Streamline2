import { supabase } from '@/lib/supabase'

export async function getDrinks() {
  const { data, error } = await supabase
    .from('drinks')
    .select('*')
    .order('name')
  
  if (error) {
    console.error('Error fetching drinks:', error)
    return []
  }
  
  return data
}

export async function addDrink(drink) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('You must be logged in to add drinks')
  }
  
  const newDrink = {
    ...drink,
    user_id: user.id
  }
  
  const { data, error } = await supabase
    .from('drinks')
    .insert(newDrink)
    .select()
  
  if (error) {
    console.error('Error adding drink:', error)
    throw error
  }
  
  return data[0]
}

export async function updateDrink(id, updates) {
  const { data, error } = await supabase
    .from('drinks')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating drink:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteDrink(id) {
  const { error } = await supabase
    .from('drinks')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting drink:', error)
    throw error
  }
  
  return true
}
import { supabase } from '@/lib/supabase'

export async function getRecipeIngredients() {
  const { data, error } = await supabase
    .from('recipe_ingredients')
    .select('*')
    .order('created_at')
  
  if (error) {
    console.error('Error fetching recipe ingredients:', error)
    return []
  }
  
  return data
}

export async function addRecipeIngredient(recipeIngredient) {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('You must be logged in to add recipe ingredients')
  }
  
  const newRecipeIngredient = {
    ...recipeIngredient,
    user_id: user.id
  }
  
  const { data, error } = await supabase
    .from('recipe_ingredients')
    .insert(newRecipeIngredient)
    .select()
  
  if (error) {
    console.error('Error adding recipe ingredient:', error)
    throw error
  }
  
  return data[0]
}

export async function updateRecipeIngredient(id, updates) {
  const { data, error } = await supabase
    .from('recipe_ingredients')
    .update(updates)
    .eq('id', id)
    .select()
  
  if (error) {
    console.error('Error updating recipe ingredient:', error)
    throw error
  }
  
  return data[0]
}

export async function deleteRecipeIngredient(id) {
  const { error } = await supabase
    .from('recipe_ingredients')
    .delete()
    .eq('id', id)
  
  if (error) {
    console.error('Error deleting recipe ingredient:', error)
    throw error
  }
  
  return true
}
"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode, useEffect, useState } from "react"
import { useSession } from "next-auth/react"

// Define the shape of our state
interface Drink {
  id: string
  name: string
  type: string
  price: number
  cost: number
  profit: number
  active: boolean
  recipe: string
  created: string
  menuHistory: string[]
  ice: string
  style?: string
  preparationMethod?: "shaken" | "stirred" | "build"
}

// Define the SubIngredient interface for complex ingredients
interface SubIngredient {
  name: string
  amount: number
  unit: string
  costPerUnit: number
  totalCost: number
}

// Update the Ingredient interface to include complex ingredient properties
interface Ingredient {
  id: string
  name: string
  category: string
  producer?: string
  subCategory?: string
  costPerBottle: number
  volume: number
  unit: "ml" | "cl" | "oz" | "piece"
  costPerUnit: number
  isComplex?: boolean
  subIngredients?: SubIngredient[]
  estimatedVolume?: number
  recipe?: string
}

interface IceType {
  name: string
  cost: number
}

interface AppState {
  activeMenuItems: {
    id: string
    name: string
    price: number
    cost: number
    active: boolean
  }[]
  drinks: Drink[]
  ingredients: Ingredient[]
  iceTypes: IceType[]
  categories: string[]
  menus: {
    id: string
    name: string
    description: string
    drinks: string[] // Array of drink IDs
    active: boolean
    created: string
  }[]
  isLoading: boolean
  error: string | null
}

// Update the Action type to include database operations
type Action =
  | { type: "TOGGLE_MENU_ITEM_ACTIVE"; id: string }
  | { type: "ADD_DRINK"; drink: Drink }
  | { type: "UPDATE_DRINK"; drink: Drink }
  | { type: "TOGGLE_DRINK_ACTIVE"; id: string }
  | { type: "UPDATE_INGREDIENT"; ingredient: Ingredient }
  | { type: "ADD_INGREDIENT"; ingredient: Ingredient }
  | { type: "ADD_COMPLEX_INGREDIENT"; ingredient: Ingredient }
  | { type: "ADD_CATEGORY"; category: string }
  | { type: "DELETE_DRINK"; id: string }
  | { type: "DELETE_INGREDIENT"; id: string }
  | { type: "ADD_MENU"; menu: AppState["menus"][0] }
  | { type: "UPDATE_MENU"; menu: AppState["menus"][0] }
  | { type: "DELETE_MENU"; id: string }
  | { type: "SET_ACTIVE_MENU"; id: string }
  | { type: "ADD_DRINK_TO_MENU"; menuId: string; drinkId: string }
  | { type: "REMOVE_DRINK_FROM_MENU"; menuId: string; drinkId: string }
  | { type: "SET_DATA"; data: Partial<AppState> }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_ERROR"; error: string | null }

// Update the initial state
const initialState: AppState = {
  activeMenuItems: [],
  drinks: [],
  ingredients: [],
  iceTypes: [
    { name: "Cubes", cost: 2 },
    { name: "Crushed", cost: 3 },
    { name: "Large Cube", cost: 4 },
    { name: "Shaved", cost: 5 },
  ],
  categories: ["Spirits", "Mixers", "Garnish", "Bitters", "House-made"],
  menus: [],
  isLoading: false,
  error: null,
}

// Update the reducer function with more defensive programming
const reducer = (state: AppState, action: Action): AppState => {
  try {
    switch (action.type) {
      case "SET_DATA":
        return {
          ...state,
          ...action.data,
        }
      case "SET_LOADING":
        return {
          ...state,
          isLoading: action.isLoading,
        }
      case "SET_ERROR":
        return {
          ...state,
          error: action.error,
        }
      case "TOGGLE_MENU_ITEM_ACTIVE": {
        const activeMenuItems = state.activeMenuItems || []
        const drinks = state.drinks || []

        return {
          ...state,
          activeMenuItems: activeMenuItems.map((item) =>
            item.id === action.id ? { ...item, active: !item.active } : item,
          ),
          drinks: drinks.map((drink) => (drink.id === action.id ? { ...drink, active: !drink.active } : drink)),
        }
      }
      case "ADD_DRINK": {
        const drinks = state.drinks || []
        const activeMenuItems = state.activeMenuItems || []

        return {
          ...state,
          drinks: [...drinks, action.drink],
          activeMenuItems: [
            ...activeMenuItems,
            {
              id: action.drink.id,
              name: action.drink.name,
              price: action.drink.price,
              cost: action.drink.cost,
              active: action.drink.active,
            },
          ],
        }
      }
      case "UPDATE_DRINK": {
        const updatedDrink = action.drink
        const drinks = state.drinks || []
        const activeMenuItems = state.activeMenuItems || []
        const ingredients = state.ingredients || []
        const iceTypes = state.iceTypes || []

        const cost = calculateCost(updatedDrink.recipe, updatedDrink.ice, ingredients, iceTypes)
        const profit = updatedDrink.price - cost

        return {
          ...state,
          drinks: drinks.map((drink) => (drink.id === updatedDrink.id ? { ...updatedDrink, profit } : drink)),
          activeMenuItems: activeMenuItems.map((item) =>
            item.id === updatedDrink.id
              ? {
                  ...item,
                  name: updatedDrink.name,
                  price: updatedDrink.price,
                  active: updatedDrink.active,
                }
              : item,
          ),
        }
      }
      // ... other reducer cases remain the same
      default:
        return state
    }
  } catch (error) {
    console.error("Error in reducer:", error)
    // Return the current state if there's an error
    return state
  }
}

// Function to calculate the cost per unit for complex ingredients with improved error handling
const calculateComplexIngredientCost = (ingredient: Ingredient): number => {
  try {
    if (!ingredient) return 0

    if (!ingredient.isComplex || !ingredient.subIngredients || !ingredient.estimatedVolume) {
      // Prevent division by zero
      return ingredient.costPerBottle / (ingredient.volume || 1)
    }

    const totalCost = (ingredient.subIngredients || []).reduce((sum, subIng) => {
      if (!subIng) return sum
      return sum + (subIng.totalCost || 0)
    }, 0)

    // Prevent division by zero
    return totalCost / (ingredient.estimatedVolume || 1)
  } catch (error) {
    console.error("Error calculating complex ingredient cost:", error)
    return 0
  }
}

// Update the calculateCost function with more robust error handling
const calculateCost = (recipe: string, iceType: string, ingredients: Ingredient[], iceTypes: IceType[]): number => {
  try {
    // Handle empty or undefined recipe
    if (!recipe) return 0

    // Ensure ingredients and iceTypes are arrays
    const safeIngredients = Array.isArray(ingredients) ? ingredients : []
    const safeIceTypes = Array.isArray(iceTypes) ? iceTypes : []

    const ingredientsCost = recipe.split(", ").reduce((sum, item) => {
      // Skip empty items
      if (!item || item.trim() === "") return sum

      const parts = item.split(" ")
      // Ensure we have at least amount, unit, and name
      if (parts.length < 3) return sum

      const [amountStr, unit, ...nameParts] = parts
      const name = nameParts.join(" ")

      // Find the ingredient, safely return 0 if not found
      const ingredient = safeIngredients.find((i) => i && i.name && i.name.toLowerCase() === name.toLowerCase())
      if (!ingredient) return sum

      // Parse amount with fallback to 0
      let quantity = Number.parseFloat(amountStr) || 0

      // Convert the recipe amount to ml if it's in cl or oz
      if (unit === "cl") {
        quantity *= 10 // convert cl to ml
      } else if (unit === "oz") {
        quantity *= 29.5735 // convert oz to ml
      }

      // If the ingredient is measured in pieces, don't convert
      if (ingredient.unit === "piece") {
        // Ensure costPerUnit exists and is a number
        const costPerUnit = typeof ingredient.costPerUnit === "number" ? ingredient.costPerUnit : 0
        return sum + quantity * costPerUnit
      }

      // For liquid ingredients, ensure we're using ml for calculations
      // Prevent division by zero and ensure values are numbers
      const costPerBottle = typeof ingredient.costPerBottle === "number" ? ingredient.costPerBottle : 0
      const volume = typeof ingredient.volume === "number" && ingredient.volume > 0 ? ingredient.volume : 1

      const costPerMl =
        ingredient.isComplex && typeof ingredient.costPerUnit === "number"
          ? ingredient.costPerUnit
          : costPerBottle / volume

      return sum + quantity * costPerMl
    }, 0)

    // Find ice cost, default to 0 if not found
    const selectedIceType = safeIceTypes.find((ice) => ice && ice.name === iceType)
    const iceCost = selectedIceType && typeof selectedIceType.cost === "number" ? selectedIceType.cost : 0

    return ingredientsCost + iceCost
  } catch (error) {
    console.error("Error calculating cost:", error)
    return 0 // Return 0 as fallback in case of any error
  }
}

// Update the calculateProfit function with more robust error handling
const calculateProfit = (drink: Drink, ingredients: Ingredient[], iceTypes: IceType[]): number => {
  try {
    // Handle null or undefined drink
    if (!drink) return 0

    // Ensure ingredients and iceTypes are arrays
    const safeIngredients = Array.isArray(ingredients) ? ingredients : []
    const safeIceTypes = Array.isArray(iceTypes) ? iceTypes : []

    // Handle missing recipe
    const recipe = drink.recipe || ""
    const ice = drink.ice || "Cubed"

    const totalCost = calculateCost(recipe, ice, safeIngredients, safeIceTypes)

    // Ensure price is a number
    const price = typeof drink.price === "number" ? drink.price : 0

    // Calculate price before tax, prevent division by zero
    const priceBeforeTax = price / 1.25

    return priceBeforeTax - totalCost
  } catch (error) {
    console.error("Error calculating profit:", error)
    return 0 // Return 0 as fallback in case of any error
  }
}

// Create the context
const AppContext = createContext<
  | {
      state: AppState
      dispatch: React.Dispatch<Action>
      fetchUserData: () => Promise<void>
      saveDrink: (drink: Omit<Drink, "id">) => Promise<void>
      updateDrink: (drink: Drink) => Promise<void>
      deleteDrink: (id: string) => Promise<void>
      saveIngredient: (ingredient: Omit<Ingredient, "id">) => Promise<void>
      updateIngredient: (ingredient: Ingredient) => Promise<void>
      deleteIngredient: (id: string) => Promise<void>
      saveMenu: (menu: Omit<AppState["menus"][0], "id">) => Promise<void>
      updateMenu: (menu: AppState["menus"][0]) => Promise<void>
      deleteMenu: (id: string) => Promise<void>
    }
  | undefined
>(undefined)

// Update the AppProvider component to handle database operations
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with default state
  const [state, dispatch] = useReducer(reducer, initialState)
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)

  // Fetch user data from the database
  const fetchUserData = async () => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      dispatch({ type: "SET_ERROR", error: null })

      // Fetch drinks
      const drinksResponse = await fetch(`/api/drinks?userId=${session.user.id}`)
      if (!drinksResponse.ok) throw new Error("Failed to fetch drinks")
      const drinks = await drinksResponse.json()

      // Fetch ingredients
      const ingredientsResponse = await fetch(`/api/ingredients?userId=${session.user.id}`)
      if (!ingredientsResponse.ok) throw new Error("Failed to fetch ingredients")
      const ingredients = await ingredientsResponse.json()

      // Fetch menus
      const menusResponse = await fetch(`/api/menus?userId=${session.user.id}`)
      if (!menusResponse.ok) throw new Error("Failed to fetch menus")
      const menus = await menusResponse.json()

      // Update state with fetched data
      dispatch({
        type: "SET_DATA",
        data: {
          drinks,
          ingredients,
          menus,
          activeMenuItems: drinks
            .filter((drink: Drink) => drink.active)
            .map((drink: Drink) => ({
              id: drink.id,
              name: drink.name,
              price: drink.price,
              cost: drink.cost,
              active: drink.active,
            })),
        },
      })
    } catch (error) {
      console.error("Error fetching user data:", error)
      dispatch({ type: "SET_ERROR", error: error instanceof Error ? error.message : "Failed to fetch data" })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
    }
  }

  // Save a new drink to the database
  const saveDrink = async (drink: Omit<Drink, "id">) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      dispatch({ type: "SET_ERROR", error: null })

      const response = await fetch("/api/drinks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...drink,
          userId: session.user.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to save drink")

      const savedDrink = await response.json()
      dispatch({ type: "ADD_DRINK", drink: savedDrink })
    } catch (error) {
      console.error("Error saving drink:", error)
      dispatch({ type: "SET_ERROR", error: error instanceof Error ? error.message : "Failed to save drink" })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
    }
  }

  // Update an existing drink in the database
  const updateDrink = async (drink: Drink) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      dispatch({ type: "SET_ERROR", error: null })

      const response = await fetch(`/api/drinks/${drink.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...drink,
          userId: session.user.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to update drink")

      const updatedDrink = await response.json()
      dispatch({ type: "UPDATE_DRINK", drink: updatedDrink })
    } catch (error) {
      console.error("Error updating drink:", error)
      dispatch({ type: "SET_ERROR", error: error instanceof Error ? error.message : "Failed to update drink" })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
    }
  }

  // Delete a drink from the database
  const deleteDrink = async (id: string) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      dispatch({ type: "SET_ERROR", error: null })

      const response = await fetch(`/api/drinks/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete drink")

      dispatch({ type: "DELETE_DRINK", id })
    } catch (error) {
      console.error("Error deleting drink:", error)
      dispatch({ type: "SET_ERROR", error: error instanceof Error ? error.message : "Failed to delete drink" })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
    }
  }

  // Save a new ingredient to the database
  const saveIngredient = async (ingredient: Omit<Ingredient, "id">) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      dispatch({ type: "SET_ERROR", error: null })

      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...ingredient,
          userId: session.user.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to save ingredient")

      const savedIngredient = await response.json()
      dispatch({ type: "ADD_INGREDIENT", ingredient: savedIngredient })
    } catch (error) {
      console.error("Error saving ingredient:", error)
      dispatch({ type: "SET_ERROR", error: error instanceof Error ? error.message : "Failed to save ingredient" })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
    }
  }

  // Update an existing ingredient in the database
  const updateIngredient = async (ingredient: Ingredient) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      dispatch({ type: "SET_ERROR", error: null })

      const response = await fetch(`/api/ingredients/${ingredient.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...ingredient,
          userId: session.user.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to update ingredient")

      const updatedIngredient = await response.json()
      dispatch({ type: "UPDATE_INGREDIENT", ingredient: updatedIngredient })
    } catch (error) {
      console.error("Error updating ingredient:", error)
      dispatch({ type: "SET_ERROR", error: error instanceof Error ? error.message : "Failed to update ingredient" })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
    }
  }

  // Delete an ingredient from the database
  const deleteIngredient = async (id: string) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      dispatch({ type: "SET_ERROR", error: null })

      const response = await fetch(`/api/ingredients/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete ingredient")

      dispatch({ type: "DELETE_INGREDIENT", id })
    } catch (error) {
      console.error("Error deleting ingredient:", error)
      dispatch({ type: "SET_ERROR", error: error instanceof Error ? error.message : "Failed to delete ingredient" })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
    }
  }

  // Save a new menu to the database
  const saveMenu = async (menu: Omit<AppState["menus"][0], "id">) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      dispatch({ type: "SET_ERROR", error: null })

      const response = await fetch("/api/menus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...menu,
          userId: session.user.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to save menu")

      const savedMenu = await response.json()
      dispatch({ type: "ADD_MENU", menu: savedMenu })
    } catch (error) {
      console.error("Error saving menu:", error)
      dispatch({ type: "SET_ERROR", error: error instanceof Error ? error.message : "Failed to save menu" })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
    }
  }

  // Update an existing menu in the database
  const updateMenu = async (menu: AppState["menus"][0]) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      dispatch({ type: "SET_ERROR", error: null })

      const response = await fetch(`/api/menus/${menu.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...menu,
          userId: session.user.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to update menu")

      const updatedMenu = await response.json()
      dispatch({ type: "UPDATE_MENU", menu: updatedMenu })
    } catch (error) {
      console.error("Error updating menu:", error)
      dispatch({ type: "SET_ERROR", error: error instanceof Error ? error.message : "Failed to update menu" })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
    }
  }

  // Delete a menu from the database
  const deleteMenu = async (id: string) => {
    if (!session?.user?.id) return

    try {
      dispatch({ type: "SET_LOADING", isLoading: true })
      dispatch({ type: "SET_ERROR", error: null })

      const response = await fetch(`/api/menus/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete menu")

      dispatch({ type: "DELETE_MENU", id })
    } catch (error) {
      console.error("Error deleting menu:", error)
      dispatch({ type: "SET_ERROR", error: error instanceof Error ? error.message : "Failed to delete menu" })
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false })
    }
  }

  // Fetch user data when session changes
  useEffect(() => {
    if (status === "authenticated" && session?.user?.id) {
      fetchUserData()
    }
  }, [status, session?.user?.id])

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration errors by not rendering children until mounted
  if (!mounted) {
    return null // Or a loading spinner
  }

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        fetchUserData,
        saveDrink,
        updateDrink,
        deleteDrink,
        saveIngredient,
        updateIngredient,
        deleteIngredient,
        saveMenu,
        updateMenu,
        deleteMenu,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

// Create a custom hook to use the context
export const useAppState = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider")
  }
  return context
}

// Add a new function to get an ingredient by name with improved error handling
export const getIngredientByName = (ingredients: Ingredient[], name: string): Ingredient | undefined => {
  try {
    // Ensure ingredients is an array
    if (!Array.isArray(ingredients)) return undefined

    // Ensure name is a string
    if (typeof name !== "string") return undefined

    return ingredients.find((i) => i && i.name && i.name.toLowerCase() === name.toLowerCase())
  } catch (error) {
    console.error("Error finding ingredient by name:", error)
    return undefined
  }
}
\
## 3. Create API Routes
for User Data

Now, let
's create the API routes to handle user data:

```tsx file="app/api/drinks/route.ts"
import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

const prisma = new PrismaClient()

// GET /api/drinks - Get all drinks for the current user
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    // Ensure the user can only access their own data
    if (userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const drinks = await prisma.drink.findMany({
      where: { userId: session.user.id },
    })

    return NextResponse.json(drinks)
  } catch (error) {
    console.error("Error fetching drinks:", error)
    return NextResponse.json({ message: "An error occurred while fetching drinks" }, { status: 500 })
  }
}

// POST /api/drinks - Create a new drink
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Ensure the user can only create data for themselves
    if (data.userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const drink = await prisma.drink.create({
      data: {
        name: data.name,
        type: data.type,
        price: data.price,
        cost: data.cost,
        profit: data.profit,
        active: data.active,
        recipe: data.recipe,
        menuHistory: data.menuHistory || "[]",
        ice: data.ice,
        style: data.style,
        preparationMethod: data.preparationMethod,
        userId: session.user.id,
      },
    })

    return NextResponse.json(drink, { status: 201 })
  } catch (error) {
    console.error("Error creating drink:", error)
    return NextResponse.json({ message: "An error occurred while creating the drink" }, { status: 500 })
  }
}


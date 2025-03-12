"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode, useEffect } from "react"
import { sampleData } from "./sample-data"

// Define the shape of our state
interface Drink {
  id: number
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
  id: number
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
    id: number
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
    id: number
    name: string
    description: string
    drinks: number[] // Array of drink IDs
    active: boolean
    created: string
  }[]
}

// Update the Action type to include ADD_COMPLEX_INGREDIENT
type Action =
  | { type: "TOGGLE_MENU_ITEM_ACTIVE"; id: number }
  | { type: "ADD_DRINK"; drink: Drink }
  | { type: "UPDATE_DRINK"; drink: AppState["drinks"][0] }
  | { type: "TOGGLE_DRINK_ACTIVE"; id: number }
  | { type: "UPDATE_INGREDIENT"; ingredient: AppState["ingredients"][0] }
  | { type: "ADD_INGREDIENT"; ingredient: AppState["ingredients"][0] }
  | { type: "ADD_COMPLEX_INGREDIENT"; ingredient: AppState["ingredients"][0] }
  | { type: "ADD_CATEGORY"; category: string }
  | { type: "DELETE_DRINK"; id: number }
  | { type: "DELETE_INGREDIENT"; id: number }
  | { type: "ADD_MENU"; menu: AppState["menus"][0] }
  | { type: "UPDATE_MENU"; menu: AppState["menus"][0] }
  | { type: "DELETE_MENU"; id: number }
  | { type: "SET_ACTIVE_MENU"; id: number }
  | { type: "ADD_DRINK_TO_MENU"; menuId: number; drinkId: number }
  | { type: "REMOVE_DRINK_FROM_MENU"; menuId: number; drinkId: number }

// Update the initial state - removed all stock data
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
}

// Update the reducer function
const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "TOGGLE_MENU_ITEM_ACTIVE":
      return {
        ...state,
        activeMenuItems: state.activeMenuItems.map((item) =>
          item.id === action.id ? { ...item, active: !item.active } : item,
        ),
        drinks: state.drinks.map((drink) => (drink.id === action.id ? { ...drink, active: !drink.active } : drink)),
      }
    case "ADD_DRINK":
      return {
        ...state,
        drinks: [...state.drinks, action.drink],
        activeMenuItems: [
          ...state.activeMenuItems,
          {
            id: action.drink.id,
            name: action.drink.name,
            price: action.drink.price,
            cost: action.drink.cost,
            active: action.drink.active,
          },
        ],
      }
    case "UPDATE_DRINK":
      const updatedDrink = action.drink
      const cost = calculateCost(updatedDrink.recipe, updatedDrink.ice, state.ingredients, state.iceTypes)
      const profit = updatedDrink.price - cost
      return {
        ...state,
        drinks: state.drinks.map((drink) => (drink.id === updatedDrink.id ? { ...updatedDrink, profit } : drink)),
        activeMenuItems: state.activeMenuItems.map((item) =>
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
    case "TOGGLE_DRINK_ACTIVE":
      return {
        ...state,
        drinks: state.drinks.map((drink) => (drink.id === action.id ? { ...drink, active: !drink.active } : drink)),
        activeMenuItems: state.activeMenuItems.map((item) =>
          item.id === action.id ? { ...item, active: !item.active } : item,
        ),
      }
    case "UPDATE_INGREDIENT":
      const updatedIngredientsList = state.ingredients.map((ingredient) =>
        ingredient.id === action.ingredient.id
          ? {
              ...action.ingredient,
              costPerUnit: action.ingredient.isComplex
                ? calculateComplexIngredientCost(action.ingredient)
                : action.ingredient.costPerBottle / action.ingredient.volume,
            }
          : ingredient,
      )
      return {
        ...state,
        ingredients: updatedIngredientsList,
        drinks: state.drinks.map((drink) => ({
          ...drink,
          profit: calculateProfit(drink, updatedIngredientsList, state.iceTypes),
        })),
      }
    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: [...state.ingredients, action.ingredient],
      }
    case "ADD_COMPLEX_INGREDIENT":
      const complexIngredient = {
        ...action.ingredient,
        isComplex: true,
        costPerUnit: calculateComplexIngredientCost(action.ingredient),
      }
      return {
        ...state,
        ingredients: [...state.ingredients, complexIngredient],
      }
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.category],
      }
    case "DELETE_DRINK":
      return {
        ...state,
        drinks: state.drinks.filter((drink) => drink.id !== action.id),
        activeMenuItems: state.activeMenuItems.filter((item) => item.id !== action.id),
      }
    case "DELETE_INGREDIENT":
      const filteredIngredients = state.ingredients.filter((ingredient) => ingredient.id !== action.id)
      const updatedDrinks = state.drinks.map((drink) => ({
        ...drink,
        recipe: drink.recipe
          .split(", ")
          .filter((item) => {
            const [, , ...nameParts] = item.split(" ")
            const name = nameParts.join(" ")
            return !state.ingredients.find((ing) => ing.id === action.id && ing.name === name)
          })
          .join(", "),
      }))
      return {
        ...state,
        ingredients: filteredIngredients,
        drinks: updatedDrinks,
      }
    case "ADD_MENU":
      return {
        ...state,
        menus: [...state.menus, action.menu],
      }
    case "UPDATE_MENU":
      return {
        ...state,
        menus: state.menus.map((menu) => (menu.id === action.menu.id ? action.menu : menu)),
      }
    case "DELETE_MENU":
      return {
        ...state,
        menus: state.menus.filter((menu) => menu.id !== action.id),
      }
    case "SET_ACTIVE_MENU":
      return {
        ...state,
        menus: state.menus.map((menu) => ({
          ...menu,
          active: menu.id === action.id,
        })),
      }
    case "ADD_DRINK_TO_MENU":
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu.id === action.menuId
            ? {
                ...menu,
                drinks: menu.drinks.includes(action.drinkId) ? menu.drinks : [...menu.drinks, action.drinkId],
              }
            : menu,
        ),
      }
    case "REMOVE_DRINK_FROM_MENU":
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu.id === action.menuId
            ? {
                ...menu,
                drinks: menu.drinks.filter((id) => id !== action.drinkId),
              }
            : menu,
        ),
      }
    default:
      return state
  }
}

// Function to calculate the cost per unit for complex ingredients
const calculateComplexIngredientCost = (ingredient: Ingredient): number => {
  if (!ingredient.isComplex || !ingredient.subIngredients || !ingredient.estimatedVolume) {
    return ingredient.costPerBottle / ingredient.volume
  }

  const totalCost = ingredient.subIngredients.reduce((sum, subIng) => sum + subIng.totalCost, 0)
  return totalCost / ingredient.estimatedVolume
}

const calculateCost = (recipe: string, iceType: string, ingredients: Ingredient[], iceTypes: IceType[]): number => {
  const ingredientsCost = recipe.split(", ").reduce((sum, item) => {
    const [amount, unit, ...nameParts] = item.split(" ")
    const name = nameParts.join(" ")
    const ingredient = ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase())
    if (ingredient) {
      let quantity = Number.parseFloat(amount)

      // Convert the recipe amount to ml if it's in cl or oz
      if (unit === "cl") {
        quantity *= 10 // convert cl to ml
      } else if (unit === "oz") {
        quantity *= 29.5735 // convert oz to ml
      }

      // If the ingredient is measured in pieces, don't convert
      if (ingredient.unit === "piece") {
        return sum + quantity * ingredient.costPerUnit
      }

      // For liquid ingredients, ensure we're using ml for calculations
      const costPerMl = ingredient.isComplex ? ingredient.costPerUnit : ingredient.costPerBottle / ingredient.volume
      return sum + quantity * costPerMl
    }
    return sum
  }, 0)

  const selectedIceType = iceTypes.find((ice) => ice.name === iceType)
  const iceCost = selectedIceType ? selectedIceType.cost : 0

  return ingredientsCost + iceCost
}

// Update the calculateProfit function to use the new calculateCost function
const calculateProfit = (drink: AppState["drinks"][0], ingredients: AppState["ingredients"], iceTypes: IceType[]) => {
  const totalCost = calculateCost(drink.recipe, drink.ice, ingredients, iceTypes)
  const priceBeforeTax = drink.price / 1.25
  return priceBeforeTax - totalCost
}

// Create the context
const AppContext = createContext<
  | {
      state: AppState
      dispatch: React.Dispatch<Action>
    }
  | undefined
>(undefined)

// Create a provider component with localStorage persistence
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load state from localStorage if available
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    if (typeof window !== "undefined") {
      try {
        // Get the current user from localStorage
        const currentUser = localStorage.getItem("currentUser") || ""

        // Check if there's saved state for this user
        const userKey = `appState_${currentUser}`
        const savedState = localStorage.getItem(userKey)

        // If there's saved state, use it
        if (savedState) {
          return JSON.parse(savedState)
        }

        // If there's no saved state and the user is not samuel@streamline.com,
        // initialize with sample data
        if (currentUser && currentUser !== "samuel@streamline.com") {
          console.log("Loading sample data for user:", currentUser)
          return {
            ...initialState,
            ...sampleData,
          }
        }

        // Otherwise, use the empty initial state
        return initialState
      } catch (error) {
        console.error("Error loading state:", error)
        return initialState
      }
    }
    return initialState
  })

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const currentUser = localStorage.getItem("currentUser") || ""
        const userKey = `appState_${currentUser}`
        localStorage.setItem(userKey, JSON.stringify(state))
      } catch (error) {
        console.error("Error saving state:", error)
      }
    }
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

// Create a custom hook to use the context
export const useAppState = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider")
  }
  return context
}

// Add a new function to get an ingredient by name
export const getIngredientByName = (ingredients: Ingredient[], name: string): Ingredient | undefined => {
  return ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase())
}


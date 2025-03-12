"use client"

import type React from "react"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the shape of our app state
type AppState = {
  ingredients: Array<{
    id: number
    name: string
    volume: number
    costPerBottle: number
    unit: string
    costPerUnit: string
  }>
  drinks: Array<{
    id: number
    name: string
    price: number
    recipe: string
    ice: string
    active: boolean
  }>
}

// Initial state
const initialState: AppState = {
  ingredients: [
    {
      id: 1,
      name: "Vodka",
      volume: 700,
      costPerBottle: 199,
      unit: "ml",
      costPerUnit: "",
    },
    {
      id: 2,
      name: "Lime Juice",
      volume: 500,
      costPerBottle: 39,
      unit: "ml",
      costPerUnit: "",
    },
    {
      id: 3,
      name: "Simple Syrup",
      volume: 500,
      costPerBottle: 29,
      unit: "ml",
      costPerUnit: "",
    },
    {
      id: 4,
      name: "Mint Leaves",
      volume: 0,
      costPerBottle: 0,
      unit: "piece",
      costPerUnit: "0.5",
    },
  ],
  drinks: [
    {
      id: 1,
      name: "Vodka Soda",
      price: 99,
      recipe: "4 cl Vodka, 10 cl Soda Water",
      ice: "Cubed",
      active: true,
    },
    {
      id: 2,
      name: "Mojito",
      price: 119,
      recipe: "4 cl Rum, 2 cl Lime Juice, 1 cl Simple Syrup, 8 Mint Leaves",
      ice: "Crushed",
      active: true,
    },
    {
      id: 3,
      name: "Gin & Tonic",
      price: 109,
      recipe: "4 cl Gin, 10 cl Tonic Water",
      ice: "Cubed",
      active: true,
    },
  ],
}

// Create the context
type AppContextType = {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState)

  return <AppContext.Provider value={{ state, setState }}>{children}</AppContext.Provider>
}

// Hook to use the app state
export function useAppState() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider")
  }
  return context
}


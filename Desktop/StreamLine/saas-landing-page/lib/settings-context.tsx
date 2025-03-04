"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"
type Currency = "SEK" | "USD" | "EUR"

type IceType = {
  name: string
  cost: number
}

interface Settings {
  theme: Theme
  currency: Currency
  taxRate: number
  language: string
  cogGoal: number
  iceTypes: IceType[]
  drinkStyles: string[]
}

interface SettingsContextType {
  settings: Settings
  updateSettings: (newSettings: Partial<Settings>) => void
}

const defaultSettings: Settings = {
  theme: "system",
  currency: "SEK",
  taxRate: 25,
  language: "en",
  cogGoal: 25,
  iceTypes: [
    { name: "None", cost: 0 },
    { name: "Cubed", cost: 2 },
    { name: "Crushed", cost: 3 },
    { name: "Sphere", cost: 5 },
  ],
  drinkStyles: ["Sour", "Highball", "Old Fashioned", "Martini", "Fizz", "Tiki", "Spritz"],
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [mounted, setMounted] = useState(false)

  // Update settings function with better error handling
  const updateSettings = (newSettings: Partial<Settings>) => {
    try {
      const updatedSettings = { ...settings, ...newSettings }
      setSettings(updatedSettings)

      // Apply theme changes to the DOM - only on client side
      if (typeof window !== "undefined" && newSettings.theme) {
        const root = window.document.documentElement
        if (newSettings.theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
          root.classList.toggle("dark", systemTheme === "dark")
        } else {
          root.classList.toggle("dark", newSettings.theme === "dark")
        }
      }

      // Only save to localStorage if we're in the browser
      if (typeof window !== "undefined") {
        localStorage.setItem("appSettings", JSON.stringify(updatedSettings))
      }
    } catch (error) {
      console.error("Error updating settings:", error)
    }
  }

  // Load settings from localStorage only after component mounts
  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem("appSettings")
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings)
        setSettings(parsedSettings)

        // Apply the stored theme - only on client side
        if (typeof window !== "undefined") {
          const root = window.document.documentElement
          if (parsedSettings.theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
            root.classList.toggle("dark", systemTheme === "dark")
          } else {
            root.classList.toggle("dark", parsedSettings.theme === "dark")
          }
        }
      }
      setMounted(true)
    } catch (error) {
      console.error("Error loading settings from localStorage:", error)
      setMounted(true)
    }
  }, [])

  // Prevent hydration errors by not rendering children until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    // Return default settings instead of throwing an error
    return {
      settings: defaultSettings,
      updateSettings: () => console.warn("SettingsProvider not found"),
    }
  }
  return context
}


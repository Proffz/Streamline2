"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"
type Currency = "SEK" | "USD" | "EUR"
type VolumeUnit = "ml" | "cl" | "oz"
type PriceRounding = "none" | "nearest" | "up" | "down" | "95" | "99"
type DefaultView = "list" | "grid"

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
  defaultMarkup?: number
  priceRounding?: PriceRounding
  volumeUnit?: VolumeUnit
  defaultGlassSize?: number
  defaultSpiritPour?: number
  showConversion?: boolean
  compactMode?: boolean
  highContrast?: boolean
  defaultView?: DefaultView
  autoSave?: boolean
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
  defaultMarkup: 300,
  priceRounding: "none",
  volumeUnit: "ml",
  defaultGlassSize: 200,
  defaultSpiritPour: 45,
  showConversion: false,
  compactMode: false,
  highContrast: false,
  defaultView: "list",
  autoSave: true,
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings }
    setSettings(updatedSettings)

    // Apply theme changes to the DOM
    if (typeof window !== "undefined" && newSettings.theme) {
      const root = window.document.documentElement
      if (newSettings.theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        root.classList.toggle("dark", systemTheme === "dark")
      } else {
        root.classList.toggle("dark", newSettings.theme === "dark")
      }
    }

    localStorage.setItem("appSettings", JSON.stringify(updatedSettings))
  }

  useEffect(() => {
    const storedSettings = localStorage.getItem("appSettings")
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings)
      setSettings(parsedSettings)

      // Apply the stored theme
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
  }, [])

  return <SettingsContext.Provider value={{ settings, updateSettings }}>{children}</SettingsContext.Provider>
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}


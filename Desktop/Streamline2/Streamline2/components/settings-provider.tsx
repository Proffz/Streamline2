"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type SettingsContextType = {
  theme: string
  setTheme: (theme: string) => void
  notifications: boolean
  setNotifications: (enabled: boolean) => void
  language: string
  setLanguage: (language: string) => void
  currency: string
  setCurrency: (currency: string) => void
  measurements: string
  setMeasurements: (measurements: string) => void
}

const defaultSettings: SettingsContextType = {
  theme: "light",
  setTheme: () => {},
  notifications: true,
  setNotifications: () => {},
  language: "en",
  setLanguage: () => {},
  currency: "USD",
  setCurrency: () => {},
  measurements: "oz",
  setMeasurements: () => {},
}

const SettingsContext = createContext<SettingsContextType>(defaultSettings)

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(defaultSettings.theme)
  const [notifications, setNotifications] = useState(defaultSettings.notifications)
  const [language, setLanguage] = useState(defaultSettings.language)
  const [currency, setCurrency] = useState(defaultSettings.currency)
  const [measurements, setMeasurements] = useState(defaultSettings.measurements)

  return (
    <SettingsContext.Provider
      value={{
        theme,
        setTheme,
        notifications,
        setNotifications,
        language,
        setLanguage,
        currency,
        setCurrency,
        measurements,
        setMeasurements,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}


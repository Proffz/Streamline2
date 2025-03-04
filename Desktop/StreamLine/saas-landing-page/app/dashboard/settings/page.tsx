"use client"

import { useState, useEffect } from "react"
import { useSettings } from "@/lib/settings-context"
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Trash, Plus, SeparatorVerticalIcon as Separator } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

// Add the DrinkStylesSettings component
function DrinkStylesSettings() {
  const { settings, updateSettings } = useSettings()
  const [newStyle, setNewStyle] = useState("")

  const handleAddStyle = () => {
    if (newStyle.trim() && !settings.drinkStyles.includes(newStyle.trim())) {
      updateSettings({
        ...settings,
        drinkStyles: [...settings.drinkStyles, newStyle.trim()],
      })
      setNewStyle("")
    }
  }

  const handleRemoveStyle = (style: string) => {
    updateSettings({
      ...settings,
      drinkStyles: settings.drinkStyles.filter((s) => s !== style),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Drink Styles</CardTitle>
        <CardDescription>Manage the different styles of drinks available in your menu</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Label htmlFor="new-style">Add New Style</Label>
              <Input
                id="new-style"
                value={newStyle}
                onChange={(e) => setNewStyle(e.target.value)}
                placeholder="e.g., Sour, Highball"
              />
            </div>
            <Button onClick={handleAddStyle}>
              <Plus className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
          <Separator />
          <div className="space-y-2">
            {settings.drinkStyles.map((style) => (
              <div key={style} className="flex items-center justify-between">
                <span>{style}</span>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveStyle(style)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {settings.drinkStyles.length === 0 && (
              <p className="text-sm text-muted-foreground">No drink styles added yet.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Add the DrinkStylesSettings component to the page
export default function SettingsPage() {
  const { settings, updateSettings } = useSettings()
  const [cogGoal, setCogGoal] = useState(settings.cogGoal)
  const [newIceType, setNewIceType] = useState("")
  const [newIceCost, setNewIceCost] = useState(0)
  const { toast } = useToast()

  // State to track which sections are open - default to open for better UX
  const [appSettingsOpen, setAppSettingsOpen] = useState(true)
  const [iceTypesOpen, setIceTypesOpen] = useState(true)
  const [drinkStylesOpen, setDrinkStylesOpen] = useState(true)
  const [localSettings, setLocalSettings] = useState(settings)

  // Auto-save whenever localSettings changes
  useEffect(() => {
    // Skip the initial render
    if (JSON.stringify(localSettings) !== JSON.stringify(settings)) {
      // Apply theme changes immediately to DOM
      if (localSettings.theme !== settings.theme) {
        const root = window.document.documentElement
        if (localSettings.theme === "system") {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
          root.classList.toggle("dark", systemTheme === "dark")
        } else {
          root.classList.toggle("dark", localSettings.theme === "dark")
        }
      }

      // Update settings in context/storage
      updateSettings(localSettings)

      // Show toast notification
      toast({
        title: "Settings updated",
        description: "Your changes have been saved automatically.",
        duration: 2000,
      })
    }
  }, [localSettings, updateSettings, settings, toast])

  // Add a separate useEffect to handle system theme changes
  useEffect(() => {
    if (localSettings.theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

      const handleChange = (e: MediaQueryListEvent) => {
        document.documentElement.classList.toggle("dark", e.matches)
      }

      mediaQuery.addEventListener("change", handleChange)
      return () => mediaQuery.removeEventListener("change", handleChange)
    }
  }, [localSettings.theme])

  const handleChange = (key: keyof typeof settings, value: string | number) => {
    if (key === "taxRate" || key === "cogGoal") {
      // Ensure the value is a valid number
      const numValue = Number(value)
      if (!isNaN(numValue)) {
        setLocalSettings((prev) => ({ ...prev, [key]: numValue }))
      }
    } else {
      setLocalSettings((prev) => ({ ...prev, [key]: value }))
    }
  }

  const handleUpdateCogGoal = () => {
    updateSettings({
      ...settings,
      cogGoal,
    })
  }

  const handleAddIceType = () => {
    if (newIceType.trim() && !settings.iceTypes.find((ice) => ice.name === newIceType.trim())) {
      setLocalSettings((prev) => ({
        ...prev,
        iceTypes: [...prev.iceTypes, { name: newIceType.trim(), cost: newIceCost }],
      }))
      setNewIceType("")
      setNewIceCost(0)
    } else {
      toast({
        title: "Ice type already exists",
        description: "This ice type is already in your list.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveIceType = (name: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      iceTypes: prev.iceTypes.filter((ice) => ice.name !== name),
    }))
  }

  const toggleAppSettings = () => {
    setAppSettingsOpen(!appSettingsOpen)
  }

  const toggleIceTypes = () => {
    setIceTypesOpen(!iceTypesOpen)
  }

  const toggleDrinkStyles = () => {
    setDrinkStylesOpen(!drinkStylesOpen)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">Configure your menu calculator settings</p>
      </div>
      <Separator />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cost of Goods Goal</CardTitle>
            <CardDescription>
              Set your target cost of goods percentage. This will be used to highlight drinks that exceed this goal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor="cog-goal">Cost of Goods Goal (%)</Label>
                <Input
                  id="cog-goal"
                  type="number"
                  value={localSettings.cogGoal}
                  onChange={(e) => setLocalSettings((prev) => ({ ...prev, cogGoal: Number(e.target.value) }))}
                />
              </div>
              <Button onClick={handleUpdateCogGoal}>Update</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ice Types</CardTitle>
            <CardDescription>Manage the different types of ice and their associated costs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor="new-ice-type">Add New Ice Type</Label>
                  <Input
                    id="new-ice-type"
                    value={newIceType}
                    onChange={(e) => setNewIceType(e.target.value)}
                    placeholder="e.g., Sphere, Crushed"
                  />
                </div>
                <div>
                  <Label htmlFor="new-ice-cost">Cost (SEK)</Label>
                  <Input
                    id="new-ice-cost"
                    type="number"
                    value={newIceCost}
                    onChange={(e) => setNewIceCost(Number(e.target.value))}
                  />
                </div>
                <Button onClick={handleAddIceType}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
              <Separator />
              <div className="space-y-2">
                {settings.iceTypes.map((ice) => (
                  <div key={ice.name} className="flex items-center justify-between">
                    <span>
                      {ice.name} ({ice.cost} SEK)
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveIceType(ice.name)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <DrinkStylesSettings />
      </div>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PlayCircle,
  Star,
  AlertTriangle,
  ShoppingCart,
  CoffeeIcon as Cocktail,
  Menu,
  BarChart,
  Settings,
  CloudOff,
  Database,
  RefreshCw,
} from "lucide-react"

export function WelcomeScreen() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if the welcome screen has been shown before
    const welcomeShown = localStorage.getItem("welcomeShown")
    if (!welcomeShown) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem("welcomeShown", "true")
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Welcome to Menu Calculator</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="getting-started" className="mt-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="features">Key Features</TabsTrigger>
            <TabsTrigger value="limitations">Limitations</TabsTrigger>
          </TabsList>

          <TabsContent value="getting-started" className="space-y-4 mt-4">
            <div className="flex items-start space-x-3">
              <PlayCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">How to use this app</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Follow these steps to get the most out of the Menu Calculator:
                </p>
                <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-2">
                  <li>Add your ingredients with costs in the Ingredients section</li>
                  <li>Create drinks using those ingredients in My Drinks</li>
                  <li>Add drinks to menus and set them as active</li>
                  <li>Analyze your menu's performance in the Reports section</li>
                </ol>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <ShoppingCart className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Managing Ingredients</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Start by adding your ingredients with accurate costs. You can organize them by categories and track
                  cost per unit.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Cocktail className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Creating Drinks</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Build your drink recipes by adding ingredients, specifying quantities, and setting selling prices. The
                  app will automatically calculate costs and profit margins.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Menu className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Managing Menus</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Create different menus for various occasions or seasons. Add drinks to menus and set one as active.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4 mt-4">
            <div className="flex items-start space-x-3">
              <BarChart className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Cost Analysis</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your cost of goods, profit margins, and pricing strategies. Set cost goals and identify drinks
                  that exceed your target.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Star className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Drink Styles & Preparation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Categorize drinks by style (Sour, Highball, etc.) and preparation method (Shaken, Stirred, Build).
                  Customize these categories in Settings.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Settings className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Customizable Settings</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure tax rates, currency, cost goals, ice types, and drink styles to match your business needs.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Menu Rotation</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Easily switch between different menus to test seasonal offerings or special events.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="limitations" className="space-y-4 mt-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Pre-Alpha Version</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This is a pre-alpha version for testing purposes. Features may change, and bugs are expected. Please
                  provide feedback on any issues you encounter.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Database className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Local Storage Only</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  All data is stored in your browser's local storage. Clearing browser data will erase your information.
                  Consider exporting important data regularly.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CloudOff className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">No Cloud Sync</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Data is not synchronized between devices or browsers. You'll need to use the same device and browser
                  to access your data.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button onClick={handleClose}>Get Started</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


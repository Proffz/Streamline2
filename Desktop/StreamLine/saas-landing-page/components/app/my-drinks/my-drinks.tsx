"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MyDrinksList } from "./my-drinks-list"
import { MenusTab } from "./menus-tab"

export function MyDrinks() {
  return (
    <Tabs defaultValue="drinks" className="space-y-4">
      <TabsList>
        <TabsTrigger value="drinks">Drinks</TabsTrigger>
        <TabsTrigger value="menus">Menus</TabsTrigger>
      </TabsList>

      <TabsContent value="drinks">
        <MyDrinksList />
      </TabsContent>

      <TabsContent value="menus">
        <MenusTab />
      </TabsContent>
    </Tabs>
  )
}


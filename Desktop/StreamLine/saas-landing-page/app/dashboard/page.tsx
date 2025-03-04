"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useAppState } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { state, fetchUserData } = useAppState()

  useEffect(() => {
    if (status === "authenticated") {
      fetchUserData()
    }
  }, [status, fetchUserData])

  if (status === "loading") {
    return <DashboardSkeleton />
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Welcome, {session?.user?.name || "User"}</h1>

      {state.error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="drinks">Drinks</TabsTrigger>
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="menus">Menus</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Drinks</CardTitle>
                <CardDescription>Total drinks in your collection</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{state.drinks.length}</p>
                <Button className="mt-4" onClick={() => router.push("/drinks/new")}>
                  Add New Drink
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ingredients</CardTitle>
                <CardDescription>Total ingredients available</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{state.ingredients.length}</p>
                <Button className="mt-4" onClick={() => router.push("/ingredients/new")}>
                  Add New Ingredient
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Menus</CardTitle>
                <CardDescription>Your created menus</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">{state.menus.length}</p>
                <Button className="mt-4" onClick={() => router.push("/menus/new")}>
                  Create New Menu
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="drinks">
          <Card>
            <CardHeader>
              <CardTitle>Your Drinks</CardTitle>
              <CardDescription>Manage your drink collection</CardDescription>
            </CardHeader>
            <CardContent>
              {state.isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : state.drinks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No drinks found</p>
                  <Button onClick={() => router.push("/drinks/new")}>Add Your First Drink</Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {state.drinks.map((drink) => (
                    <div key={drink.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{drink.name}</p>
                        <p className="text-sm text-gray-500">
                          {drink.type} - ${drink.price}
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => router.push(`/drinks/${drink.id}`)}>
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ingredients">
          <Card>
            <CardHeader>
              <CardTitle>Your Ingredients</CardTitle>
              <CardDescription>Manage your ingredients</CardDescription>
            </CardHeader>
            <CardContent>
              {state.isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : state.ingredients.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No ingredients found</p>
                  <Button onClick={() => router.push("/ingredients/new")}>Add Your First Ingredient</Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {state.ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{ingredient.name}</p>
                        <p className="text-sm text-gray-500">
                          {ingredient.category} - ${ingredient.costPerBottle}/{ingredient.volume} {ingredient.unit}
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => router.push(`/ingredients/${ingredient.id}`)}>
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menus">
          <Card>
            <CardHeader>
              <CardTitle>Your Menus</CardTitle>
              <CardDescription>Manage your menus</CardDescription>
            </CardHeader>
            <CardContent>
              {state.isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : state.menus.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No menus found</p>
                  <Button onClick={() => router.push("/menus/new")}>Create Your First Menu</Button>
                </div>
              ) : (
                <div className="space-y-2">
                  {state.menus.map((menu) => (
                    <div key={menu.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{menu.name}</p>
                        <p className="text-sm text-gray-500">
                          {menu.description || "No description"} - {menu.drinks.length} drinks
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => router.push(`/menus/${menu.id}`)}>
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <Skeleton className="h-10 w-64 mb-6" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-12 mb-4" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-12 mb-4" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-12 mb-4" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


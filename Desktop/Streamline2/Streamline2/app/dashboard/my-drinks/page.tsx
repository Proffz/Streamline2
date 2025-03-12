import { MyDrinks } from "@/components/app/my-drinks/my-drinks"

export default function MyDrinksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">My Drinks</h1>
      </div>
      <MyDrinks />
    </div>
  )
}


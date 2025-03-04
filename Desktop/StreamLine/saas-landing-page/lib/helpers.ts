import { ingredientsData } from "@/data/ingredients"

export const calculateCost = (
  recipe: string,
  iceType: string,
  ingredients = ingredientsData,
  iceTypes: { name: string; cost: number }[] = [],
): number => {
  if (!recipe) {
    return 0
  }

  const ingredientsCost = recipe.split(", ").reduce((sum, item) => {
    const [amount, unit, ...nameParts] = item.split(" ")
    const name = nameParts.join(" ")
    const ingredient = ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase())

    if (ingredient) {
      let quantity = Number.parseFloat(amount)

      if (unit === "cl") {
        quantity *= 10
      } else if (unit === "oz") {
        quantity *= 29.5735
      }

      if (ingredient.unit === "piece") {
        return sum + quantity * ingredient.costPerUnit
      }

      const costPerMl = ingredient.costPerBottle / ingredient.volume
      return sum + quantity * costPerMl
    }
    return sum
  }, 0)

  const selectedIceType = iceTypes.find((ice) => ice.name === iceType)
  const iceCost = selectedIceType ? selectedIceType.cost : 0

  return ingredientsCost + iceCost
}


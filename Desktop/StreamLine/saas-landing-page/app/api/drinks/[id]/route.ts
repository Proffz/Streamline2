import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

const prisma = new PrismaClient()

// GET /api/drinks/[id] - Get a specific drink
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const drink = await prisma.drink.findUnique({
      where: { id: params.id },
    })

    if (!drink) {
      return NextResponse.json({ message: "Drink not found" }, { status: 404 })
    }

    // Ensure the user can only access their own data
    if (drink.userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json(drink)
  } catch (error) {
    console.error("Error fetching drink:", error)
    return NextResponse.json({ message: "An error occurred while fetching the drink" }, { status: 500 })
  }
}

// PUT /api/drinks/[id] - Update a specific drink
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    // Check if the drink exists and belongs to the user
    const existingDrink = await prisma.drink.findUnique({
      where: { id: params.id },
    })

    if (!existingDrink) {
      return NextResponse.json({ message: "Drink not found" }, { status: 404 })
    }

    if (existingDrink.userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const updatedDrink = await prisma.drink.update({
      where: { id: params.id },
      data: {
        name: data.name,
        type: data.type,
        price: data.price,
        cost: data.cost,
        profit: data.profit,
        active: data.active,
        recipe: data.recipe,
        menuHistory: data.menuHistory || "[]",
        ice: data.ice,
        style: data.style,
        preparationMethod: data.preparationMethod,
      },
    })

    return NextResponse.json(updatedDrink)
  } catch (error) {
    console.error("Error updating drink:", error)
    return NextResponse.json({ message: "An error occurred while updating the drink" }, { status: 500 })
  }
}

// DELETE /api/drinks/[id] - Delete a specific drink
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Check if the drink exists and belongs to the user
    const existingDrink = await prisma.drink.findUnique({
      where: { id: params.id },
    })

    if (!existingDrink) {
      return NextResponse.json({ message: "Drink not found" }, { status: 404 })
    }

    if (existingDrink.userId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await prisma.drink.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Drink deleted successfully" })
  } catch (error) {
    console.error("Error deleting drink:", error)
    return NextResponse.json({ message: "An error occurred while deleting the drink" }, { status: 500 })
  }
}


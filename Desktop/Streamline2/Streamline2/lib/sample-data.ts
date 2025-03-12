// Sample data for the app
export const sampleData = {
  ingredients: [
    // Spirits
    {
      id: 1,
      name: "Vodka",
      category: "Spirits",
      producer: "Absolut",
      costPerBottle: 250,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.357, // 250 / 700
    },
    {
      id: 2,
      name: "Gin",
      category: "Spirits",
      producer: "Beefeater",
      costPerBottle: 280,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.4, // 280 / 700
    },
    {
      id: 3,
      name: "White Rum",
      category: "Spirits",
      producer: "Bacardi",
      costPerBottle: 260,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.371, // 260 / 700
    },
    {
      id: 4,
      name: "Tequila",
      category: "Spirits",
      producer: "Patrón Silver",
      costPerBottle: 450,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.643, // 450 / 700
    },
    {
      id: 5,
      name: "Bourbon",
      category: "Spirits",
      producer: "Maker's Mark",
      costPerBottle: 350,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.5, // 350 / 700
    },
    {
      id: 6,
      name: "Scotch Whisky",
      category: "Spirits",
      producer: "Johnnie Walker Black",
      costPerBottle: 380,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.543, // 380 / 700
    },
    {
      id: 7,
      name: "Mezcal",
      category: "Spirits",
      producer: "Del Maguey",
      costPerBottle: 550,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.786, // 550 / 700
    },
    {
      id: 8,
      name: "Cognac",
      category: "Spirits",
      producer: "Hennessy VS",
      costPerBottle: 420,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.6, // 420 / 700
    },
    {
      id: 9,
      name: "Aperol",
      category: "Spirits",
      producer: "Aperol",
      costPerBottle: 220,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.314, // 220 / 700
    },
    {
      id: 10,
      name: "Campari",
      category: "Spirits",
      producer: "Campari",
      costPerBottle: 240,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.343, // 240 / 700
    },

    // Mixers
    {
      id: 11,
      name: "Lime Juice",
      category: "Mixers",
      costPerBottle: 50,
      volume: 500,
      unit: "ml" as const,
      costPerUnit: 0.1, // 50 / 500
    },
    {
      id: 12,
      name: "Simple Syrup",
      category: "Mixers",
      costPerBottle: 40,
      volume: 500,
      unit: "ml" as const,
      costPerUnit: 0.08, // 40 / 500
    },
    {
      id: 13,
      name: "Tonic Water",
      category: "Mixers",
      costPerBottle: 15,
      volume: 200,
      unit: "ml" as const,
      costPerUnit: 0.075, // 15 / 200
    },
    {
      id: 14,
      name: "Cranberry Juice",
      category: "Mixers",
      costPerBottle: 30,
      volume: 1000,
      unit: "ml" as const,
      costPerUnit: 0.03, // 30 / 1000
    },
    {
      id: 15,
      name: "Orange Juice",
      category: "Mixers",
      costPerBottle: 25,
      volume: 1000,
      unit: "ml" as const,
      costPerUnit: 0.025, // 25 / 1000
    },
    {
      id: 16,
      name: "Grapefruit Juice",
      category: "Mixers",
      costPerBottle: 28,
      volume: 1000,
      unit: "ml" as const,
      costPerUnit: 0.028, // 28 / 1000
    },
    {
      id: 17,
      name: "Pineapple Juice",
      category: "Mixers",
      costPerBottle: 32,
      volume: 1000,
      unit: "ml" as const,
      costPerUnit: 0.032, // 32 / 1000
    },
    {
      id: 18,
      name: "Soda Water",
      category: "Mixers",
      costPerBottle: 10,
      volume: 330,
      unit: "ml" as const,
      costPerUnit: 0.03, // 10 / 330
    },
    {
      id: 19,
      name: "Ginger Beer",
      category: "Mixers",
      costPerBottle: 18,
      volume: 330,
      unit: "ml" as const,
      costPerUnit: 0.055, // 18 / 330
    },
    {
      id: 20,
      name: "Coconut Cream",
      category: "Mixers",
      costPerBottle: 45,
      volume: 400,
      unit: "ml" as const,
      costPerUnit: 0.113, // 45 / 400
    },

    // Garnishes
    {
      id: 21,
      name: "Mint",
      category: "Garnish",
      costPerBottle: 20,
      volume: 20,
      unit: "piece" as const,
      costPerUnit: 1, // 20 / 20
    },
    {
      id: 22,
      name: "Lime",
      category: "Garnish",
      costPerBottle: 10,
      volume: 10,
      unit: "piece" as const,
      costPerUnit: 1, // 10 / 10
    },
    {
      id: 23,
      name: "Orange",
      category: "Garnish",
      costPerBottle: 15,
      volume: 5,
      unit: "piece" as const,
      costPerUnit: 3, // 15 / 5
    },
    {
      id: 24,
      name: "Lemon",
      category: "Garnish",
      costPerBottle: 12,
      volume: 8,
      unit: "piece" as const,
      costPerUnit: 1.5, // 12 / 8
    },
    {
      id: 25,
      name: "Cucumber",
      category: "Garnish",
      costPerBottle: 8,
      volume: 2,
      unit: "piece" as const,
      costPerUnit: 4, // 8 / 2
    },

    // Bitters
    {
      id: 26,
      name: "Angostura Bitters",
      category: "Bitters",
      costPerBottle: 120,
      volume: 200,
      unit: "ml" as const,
      costPerUnit: 0.6, // 120 / 200
    },
    {
      id: 27,
      name: "Orange Bitters",
      category: "Bitters",
      costPerBottle: 110,
      volume: 150,
      unit: "ml" as const,
      costPerUnit: 0.733, // 110 / 150
    },

    // House-made ingredients
    {
      id: 28,
      name: "Strawberry Puree",
      category: "House-made",
      isComplex: true,
      costPerBottle: 60,
      volume: 500,
      unit: "ml" as const,
      costPerUnit: 0.12, // 60 / 500
      estimatedVolume: 500,
      subIngredients: [
        {
          name: "Strawberries",
          amount: 400,
          unit: "g",
          costPerUnit: 0.03,
          totalCost: 12,
        },
        {
          name: "Sugar",
          amount: 100,
          unit: "g",
          costPerUnit: 0.01,
          totalCost: 1,
        },
      ],
      recipe: "Blend 400g strawberries with 100g sugar until smooth",
    },
    {
      id: 29,
      name: "Honey Syrup",
      category: "House-made",
      isComplex: true,
      costPerBottle: 45,
      volume: 300,
      unit: "ml" as const,
      costPerUnit: 0.15, // 45 / 300
      estimatedVolume: 300,
      subIngredients: [
        {
          name: "Honey",
          amount: 150,
          unit: "g",
          costPerUnit: 0.08,
          totalCost: 12,
        },
        {
          name: "Hot Water",
          amount: 150,
          unit: "ml",
          costPerUnit: 0.001,
          totalCost: 0.15,
        },
      ],
      recipe: "Mix equal parts honey and hot water, stir until dissolved",
    },
    {
      id: 30,
      name: "Rosemary Infused Gin",
      category: "House-made",
      isComplex: true,
      costPerBottle: 320,
      volume: 700,
      unit: "ml" as const,
      costPerUnit: 0.457, // 320 / 700
      estimatedVolume: 700,
      subIngredients: [
        {
          name: "Gin",
          amount: 700,
          unit: "ml",
          costPerUnit: 0.4,
          totalCost: 280,
        },
        {
          name: "Rosemary",
          amount: 20,
          unit: "g",
          costPerUnit: 0.2,
          totalCost: 4,
        },
      ],
      recipe: "Infuse 700ml gin with 20g fresh rosemary for 24 hours, then strain",
    },
  ],
  drinks: [
    // Classic cocktails
    {
      id: 1,
      name: "Vodka Tonic",
      type: "Classic",
      price: 120,
      cost: 30,
      profit: 66, // (120 / 1.25) - 30
      active: true,
      recipe: "50 ml Vodka, 150 ml Tonic Water",
      created: "2023-01-15",
      menuHistory: ["Main Menu"],
      ice: "Cubes",
      preparationMethod: "build" as const,
    },
    {
      id: 2,
      name: "Gin & Tonic",
      type: "Classic",
      price: 130,
      cost: 32,
      profit: 72, // (130 / 1.25) - 32
      active: true,
      recipe: "50 ml Gin, 150 ml Tonic Water, 1 piece Lime",
      created: "2023-01-15",
      menuHistory: ["Main Menu"],
      ice: "Cubes",
      preparationMethod: "build" as const,
    },
    {
      id: 3,
      name: "Mojito",
      type: "Classic",
      price: 140,
      cost: 35,
      profit: 77, // (140 / 1.25) - 35
      active: true,
      recipe: "50 ml White Rum, 25 ml Lime Juice, 15 ml Simple Syrup, 6 piece Mint",
      created: "2023-01-20",
      menuHistory: ["Main Menu", "Summer Specials"],
      ice: "Crushed",
      preparationMethod: "build" as const,
    },
    {
      id: 4,
      name: "Cosmopolitan",
      type: "Classic",
      price: 150,
      cost: 40,
      profit: 80, // (150 / 1.25) - 40
      active: true,
      recipe: "40 ml Vodka, 15 ml Lime Juice, 30 ml Cranberry Juice, 10 ml Simple Syrup",
      created: "2023-02-01",
      menuHistory: ["Main Menu"],
      ice: "Cubes",
      preparationMethod: "shaken" as const,
    },
    {
      id: 5,
      name: "Margarita",
      type: "Classic",
      price: 145,
      cost: 42,
      profit: 74, // (145 / 1.25) - 42
      active: true,
      recipe: "50 ml Tequila, 25 ml Lime Juice, 15 ml Simple Syrup, 1 piece Lime",
      created: "2023-02-05",
      menuHistory: ["Main Menu", "Summer Specials"],
      ice: "Cubes",
      preparationMethod: "shaken" as const,
    },
    {
      id: 6,
      name: "Old Fashioned",
      type: "Classic",
      price: 160,
      cost: 45,
      profit: 83, // (160 / 1.25) - 45
      active: true,
      recipe: "60 ml Bourbon, 10 ml Simple Syrup, 3 ml Angostura Bitters, 1 piece Orange",
      created: "2023-02-10",
      menuHistory: ["Main Menu", "Winter Warmers"],
      ice: "Large Cube",
      preparationMethod: "stirred" as const,
    },
    {
      id: 7,
      name: "Negroni",
      type: "Classic",
      price: 155,
      cost: 43,
      profit: 81, // (155 / 1.25) - 43
      active: true,
      recipe: "30 ml Gin, 30 ml Campari, 30 ml Sweet Vermouth, 1 piece Orange",
      created: "2023-02-15",
      menuHistory: ["Main Menu", "Winter Warmers"],
      ice: "Large Cube",
      preparationMethod: "stirred" as const,
    },

    // Specialty cocktails
    {
      id: 8,
      name: "Strawberry Daiquiri",
      type: "Fruity",
      price: 160,
      cost: 45,
      profit: 83, // (160 / 1.25) - 45
      active: true,
      recipe: "50 ml White Rum, 25 ml Lime Juice, 20 ml Simple Syrup, 30 ml Strawberry Puree",
      created: "2023-02-20",
      menuHistory: ["Summer Specials"],
      ice: "Crushed",
      preparationMethod: "shaken" as const,
    },
    {
      id: 9,
      name: "Rosemary Gin Fizz",
      type: "Signature",
      price: 170,
      cost: 48,
      profit: 88, // (170 / 1.25) - 48
      active: true,
      recipe: "50 ml Rosemary Infused Gin, 25 ml Lemon Juice, 15 ml Simple Syrup, 60 ml Soda Water",
      created: "2023-03-01",
      menuHistory: ["Signature Cocktails"],
      ice: "Cubes",
      preparationMethod: "shaken" as const,
    },
    {
      id: 10,
      name: "Honey Whiskey Sour",
      type: "Signature",
      price: 165,
      cost: 47,
      profit: 85, // (165 / 1.25) - 47
      active: true,
      recipe: "50 ml Bourbon, 25 ml Lemon Juice, 20 ml Honey Syrup, 1 piece Lemon",
      created: "2023-03-05",
      menuHistory: ["Signature Cocktails", "Winter Warmers"],
      ice: "Cubes",
      preparationMethod: "shaken" as const,
    },
  ],
  activeMenuItems: [
    {
      id: 1,
      name: "Vodka Tonic",
      price: 120,
      cost: 30,
      active: true,
    },
    {
      id: 2,
      name: "Gin & Tonic",
      price: 130,
      cost: 32,
      active: true,
    },
    {
      id: 3,
      name: "Mojito",
      price: 140,
      cost: 35,
      active: true,
    },
    {
      id: 4,
      name: "Cosmopolitan",
      price: 150,
      cost: 40,
      active: true,
    },
    {
      id: 5,
      name: "Margarita",
      price: 145,
      cost: 42,
      active: true,
    },
    {
      id: 6,
      name: "Old Fashioned",
      price: 160,
      cost: 45,
      active: true,
    },
    {
      id: 7,
      name: "Negroni",
      price: 155,
      cost: 43,
      active: true,
    },
    {
      id: 8,
      name: "Strawberry Daiquiri",
      price: 160,
      cost: 45,
      active: true,
    },
    {
      id: 9,
      name: "Rosemary Gin Fizz",
      price: 170,
      cost: 48,
      active: true,
    },
    {
      id: 10,
      name: "Honey Whiskey Sour",
      price: 165,
      cost: 47,
      active: true,
    },
  ],
  menus: [
    {
      id: 1,
      name: "Main Menu",
      description: "Our standard cocktail selection",
      drinks: [1, 2, 3, 4, 5, 6, 7],
      active: true,
      created: "2023-01-15",
    },
    {
      id: 2,
      name: "Summer Specials",
      description: "Refreshing drinks for the summer season",
      drinks: [3, 5, 8],
      active: false,
      created: "2023-02-15",
    },
    {
      id: 3,
      name: "Winter Warmers",
      description: "Cozy cocktails for the colder months",
      drinks: [6, 7, 10],
      active: false,
      created: "2023-03-01",
    },
    {
      id: 4,
      name: "Signature Cocktails",
      description: "Our unique house specialties",
      drinks: [9, 10],
      active: false,
      created: "2023-03-10",
    },
  ],
}


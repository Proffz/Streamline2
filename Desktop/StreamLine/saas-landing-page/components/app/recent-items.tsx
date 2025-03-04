export function RecentItems() {
  const recentItems = [
    {
      id: 1,
      name: "Mojito",
      type: "Drink",
      updatedAt: "2 hours ago",
      cost: "$2.15",
      price: "$8.99",
    },
    {
      id: 2,
      name: "Gin & Tonic",
      type: "Drink",
      updatedAt: "Yesterday",
      cost: "$1.85",
      price: "$7.99",
    },
    {
      id: 3,
      name: "Lime Juice",
      type: "Ingredient",
      updatedAt: "2 days ago",
      cost: "$0.25/oz",
      price: "-",
    },
    {
      id: 4,
      name: "Old Fashioned",
      type: "Drink",
      updatedAt: "3 days ago",
      cost: "$2.75",
      price: "$10.99",
    },
    {
      id: 5,
      name: "Simple Syrup",
      type: "Ingredient",
      updatedAt: "1 week ago",
      cost: "$0.10/oz",
      price: "-",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 text-sm text-muted-foreground">
        <div>Name</div>
        <div>Type</div>
        <div>Updated</div>
        <div>Cost</div>
        <div>Price</div>
      </div>
      <div className="space-y-2">
        {recentItems.map((item) => (
          <div key={item.id} className="grid grid-cols-5 items-center rounded-lg border p-3 text-sm">
            <div className="font-medium">{item.name}</div>
            <div>{item.type}</div>
            <div>{item.updatedAt}</div>
            <div>{item.cost}</div>
            <div>{item.price}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


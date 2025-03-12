import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function RoadmapPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Product Roadmap</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Streamline Development Roadmap</CardTitle>
          <CardDescription>Our planned features and improvements for upcoming releases</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming">Upcoming Features</TabsTrigger>
              <TabsTrigger value="consideration">Under Consideration</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              <RoadmapItem
                title="Web Scraping for Best Prices"
                description="Automatically find the best prices for ingredients across multiple suppliers."
                priority="High"
              />

              <RoadmapItem
                title="API Integration with Suppliers"
                description="Direct integration with Martin & Servera, Svensk Cater, and Menigo for real-time pricing and inventory."
                priority="High"
              />

              <RoadmapItem
                title="POS/Cashier System Integration"
                description="Connect with popular POS systems to sync menu items, pricing, and sales data."
                priority="Medium"
              />

              <RoadmapItem
                title="Ingredient Optimization Suggestions"
                description="Smart recommendations for substituting ingredients with more cost-effective alternatives like foamers, superjuice, etc."
                priority="Medium"
              />

              <RoadmapItem
                title="Glass Inventory Management"
                description="Track glassware inventory, assign specific glasses to cocktails, and analyze breakage patterns."
                priority="Low"
              />

              <RoadmapItem
                title="Business Customization & White-labeling"
                description="Customize the application with your business branding and specific requirements."
                priority="Medium"
              />
            </TabsContent>

            <TabsContent value="consideration" className="space-y-4">
              <RoadmapItem
                title="Mobile Application"
                description="Native mobile apps for iOS and Android for on-the-go menu management."
                priority="Low"
              />

              <RoadmapItem
                title="AI-Powered Menu Suggestions"
                description="Use AI to suggest new menu items based on current inventory and market trends."
                priority="Low"
              />

              <RoadmapItem
                title="Customer Feedback Integration"
                description="Collect and analyze customer feedback on menu items to inform menu decisions."
                priority="Medium"
              />
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <RoadmapItem
                title="Basic Menu Calculator"
                description="Core functionality for calculating menu item costs and pricing."
                priority="Completed"
              />

              <RoadmapItem
                title="User Authentication"
                description="Secure login and user management system."
                priority="Completed"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

interface RoadmapItemProps {
  title: string
  description: string
  priority: "High" | "Medium" | "Low" | "Completed"
}

function RoadmapItem({ title, description, priority }: RoadmapItemProps) {
  const priorityColor = {
    High: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    Medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    Low: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    Completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  }[priority]

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={priorityColor}>
            {priority}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}


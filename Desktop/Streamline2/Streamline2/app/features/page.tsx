import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BarChart,
  ShoppingCart,
  CoffeeIcon,
  DollarSign,
  LineChart,
  CloudIcon,
  Settings,
  Users,
  Bell,
  Zap,
  PieChart,
  Calendar,
} from "lucide-react"

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful Features for Bar & Restaurant Owners
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Discover all the tools and features that make StreamLine the ultimate solution for optimizing your
                  menu pricing and profitability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Features Section */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Core Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Everything you need to optimize your menu
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform provides all the tools you need to calculate costs, set prices, and maximize profits.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {/* Feature 1 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Cost Analysis</h3>
                <p className="text-center text-muted-foreground">
                  Track ingredient costs and calculate exact profit margins for every menu item.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Ingredient Management</h3>
                <p className="text-center text-muted-foreground">
                  Manage your inventory and track price changes for all your ingredients.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <CoffeeIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Recipe Builder</h3>
                <p className="text-center text-muted-foreground">
                  Create and store all your drink recipes with precise measurements and costs.
                </p>
              </div>
              {/* Feature 4 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Price Optimization</h3>
                <p className="text-center text-muted-foreground">
                  Get recommendations for optimal pricing based on costs and target margins.
                </p>
              </div>
              {/* Feature 5 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Performance Reports</h3>
                <p className="text-center text-muted-foreground">
                  Generate detailed reports on menu performance and profitability.
                </p>
              </div>
              {/* Feature 6 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <CloudIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Cloud Storage</h3>
                <p className="text-center text-muted-foreground">
                  Access your data from anywhere with secure cloud storage and backups.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features Section */}
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Advanced Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Take your menu management to the next level
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Unlock advanced features to gain deeper insights and further optimize your operations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {/* Advanced Feature 1 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <PieChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Menu Analytics</h3>
                <p className="text-center text-muted-foreground">
                  Advanced analytics to identify your most profitable menu items and optimize your offerings.
                </p>
              </div>
              {/* Advanced Feature 2 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Custom Pricing Rules</h3>
                <p className="text-center text-muted-foreground">
                  Create custom pricing rules based on time of day, day of week, or special events.
                </p>
              </div>
              {/* Advanced Feature 3 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Team Collaboration</h3>
                <p className="text-center text-muted-foreground">
                  Collaborate with your team members with role-based access and permissions.
                </p>
              </div>
              {/* Advanced Feature 4 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Price Alerts</h3>
                <p className="text-center text-muted-foreground">
                  Get notified when ingredient prices change significantly, affecting your margins.
                </p>
              </div>
              {/* Advanced Feature 5 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Automated Pricing</h3>
                <p className="text-center text-muted-foreground">
                  Automatically adjust prices based on ingredient cost changes and target margins.
                </p>
              </div>
              {/* Advanced Feature 6 */}
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Seasonal Menu Planning</h3>
                <p className="text-center text-muted-foreground">
                  Plan and optimize seasonal menus based on ingredient availability and pricing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Plan Comparison
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Choose the right plan for your business
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Compare our plans to find the perfect fit for your bar or restaurant.
                </p>
              </div>
            </div>
            <div className="mt-12 overflow-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b">
                    <th className="p-4 font-medium">Feature</th>
                    <th className="p-4 text-center font-medium">Free</th>
                    <th className="p-4 text-center font-medium">Pro</th>
                    <th className="p-4 text-center font-medium">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Ingredient Management</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Recipe Builder</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Cost Analysis</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Price Optimization</td>
                    <td className="p-4 text-center">Limited</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Performance Reports</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center">Advanced</td>
                    <td className="p-4 text-center">Custom</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Cloud Storage</td>
                    <td className="p-4 text-center">1GB</td>
                    <td className="p-4 text-center">10GB</td>
                    <td className="p-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Team Members</td>
                    <td className="p-4 text-center">1</td>
                    <td className="p-4 text-center">5</td>
                    <td className="p-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Custom Pricing Rules</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Price Alerts</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">✓</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Automated Pricing</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Priority Support</td>
                    <td className="p-4 text-center">-</td>
                    <td className="p-4 text-center">Email</td>
                    <td className="p-4 text-center">24/7 Phone & Email</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-12 text-center">
              <Link href="/pricing">
                <Button size="lg">View Pricing Plans</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to get started?</h2>
                <p className="max-w-[700px] md:text-xl">
                  Try StreamLine free for 14 days and see how it can transform your menu management.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signin">
                  <Button size="lg" variant="secondary" className="px-8">
                    Start Your Free Trial
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


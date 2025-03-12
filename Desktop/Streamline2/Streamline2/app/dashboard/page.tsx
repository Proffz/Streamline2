import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CurrentMenu } from "@/components/app/current-menu"
import { DashboardCards } from "@/components/app/dashboard-cards"
import { FeedbackButton } from "@/components/feedback-button"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <Card className="col-span-12">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Welcome to Streamline</CardTitle>
            <CardDescription>Menu Calculator for Bars & Restaurants</CardDescription>
          </div>
          <FeedbackButton />
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Thank you for trying out our Menu Calculator! This application is currently in{" "}
            <strong>pre-alpha testing</strong>, which means some features might not work properly or are still under
            development. We're actively working to improve the experience and add new functionality.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Feel free to explore the app, create test menus, and experiment with the calculator. Your feedback is
            invaluable to us as we continue to refine and enhance this tool.
          </p>
        </CardContent>
      </Card>

      <DashboardCards />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Current Menu</CardTitle>
            <CardDescription>Your active menu items and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <CurrentMenu />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


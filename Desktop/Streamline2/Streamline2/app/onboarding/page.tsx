"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Check, ChevronRight, ChevronsRight, Store, Utensils, CoffeeIcon as Cocktail } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSkip = () => {
    setStep(totalSteps)
  }

  return (
    <div className="container max-w-5xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to StreamLine</h1>
        <p className="text-muted-foreground">Let's get your bar set up in just a few steps</p>
      </div>

      <div className="mb-8">
        <Progress value={(step / totalSteps) * 100} className="h-2" />
        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>Getting Started</span>
          <span>
            {step} of {totalSteps}
          </span>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Tell us about your bar</CardTitle>
            <CardDescription>This information helps us customize StreamLine for your specific needs</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="cocktail" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="cocktail">Cocktail Bar</TabsTrigger>
                <TabsTrigger value="restaurant">Restaurant Bar</TabsTrigger>
                <TabsTrigger value="nightclub">Nightclub</TabsTrigger>
              </TabsList>
              <TabsContent value="cocktail" className="mt-4 space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Cocktail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Cocktail Bar</h3>
                      <p className="text-sm text-muted-foreground">
                        Specialized in craft cocktails with a wide variety of spirits and ingredients
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="restaurant" className="mt-4 space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Utensils className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Restaurant Bar</h3>
                      <p className="text-sm text-muted-foreground">
                        Bar service alongside food with a focus on wine and popular cocktails
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="nightclub" className="mt-4 space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Store className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Nightclub</h3>
                      <p className="text-sm text-muted-foreground">
                        High-volume service with a focus on speed and efficiency
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack} disabled={step === 1}>
              Back
            </Button>
            <div>
              <Button variant="ghost" onClick={handleSkip} className="mr-2">
                Skip
              </Button>
              <Button onClick={handleNext}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Choose a template</CardTitle>
            <CardDescription>Start with a pre-configured setup or build from scratch</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div
                className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-primary ${selectedTemplate === "classic" ? "border-2 border-primary" : ""}`}
                onClick={() => setSelectedTemplate("classic")}
              >
                <div className="mb-3 flex justify-between">
                  <h3 className="font-medium">Classic Cocktails</h3>
                  {selectedTemplate === "classic" && <Check className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">25 classic cocktail recipes and 40+ common ingredients</p>
                <div className="mt-4 text-xs text-muted-foreground">Popular for traditional cocktail bars</div>
              </div>

              <div
                className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-primary ${selectedTemplate === "craft" ? "border-2 border-primary" : ""}`}
                onClick={() => setSelectedTemplate("craft")}
              >
                <div className="mb-3 flex justify-between">
                  <h3 className="font-medium">Craft Cocktails</h3>
                  {selectedTemplate === "craft" && <Check className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">35 modern craft cocktails with unique ingredients</p>
                <div className="mt-4 text-xs text-muted-foreground">Ideal for specialty cocktail bars</div>
              </div>

              <div
                className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-primary ${selectedTemplate === "blank" ? "border-2 border-primary" : ""}`}
                onClick={() => setSelectedTemplate("blank")}
              >
                <div className="mb-3 flex justify-between">
                  <h3 className="font-medium">Start from Scratch</h3>
                  {selectedTemplate === "blank" && <Check className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">Begin with an empty inventory and add your own items</p>
                <div className="mt-4 text-xs text-muted-foreground">Complete customization for your unique needs</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <div>
              <Button variant="ghost" onClick={handleSkip} className="mr-2">
                Skip
              </Button>
              <Button onClick={handleNext} disabled={!selectedTemplate}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Select your role</CardTitle>
            <CardDescription>We'll customize your dashboard based on your primary role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div
                className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-primary ${selectedTemplate === "owner" ? "border-2 border-primary" : ""}`}
                onClick={() => setSelectedTemplate("owner")}
              >
                <div className="mb-3 flex justify-between">
                  <h3 className="font-medium">Owner / Manager</h3>
                  {selectedTemplate === "owner" && <Check className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  Focus on financial reports, inventory costs, and staff management
                </p>
              </div>

              <div
                className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-primary ${selectedTemplate === "bartender" ? "border-2 border-primary" : ""}`}
                onClick={() => setSelectedTemplate("bartender")}
              >
                <div className="mb-3 flex justify-between">
                  <h3 className="font-medium">Bartender</h3>
                  {selectedTemplate === "bartender" && <Check className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  Quick access to recipes, inventory levels, and daily tasks
                </p>
              </div>

              <div
                className={`cursor-pointer rounded-lg border p-4 transition-all hover:border-primary ${selectedTemplate === "both" ? "border-2 border-primary" : ""}`}
                onClick={() => setSelectedTemplate("both")}
              >
                <div className="mb-3 flex justify-between">
                  <h3 className="font-medium">Both</h3>
                  {selectedTemplate === "both" && <Check className="h-5 w-5 text-primary" />}
                </div>
                <p className="text-sm text-muted-foreground">Full access to all features with customizable views</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
            <div>
              <Button variant="ghost" onClick={handleSkip} className="mr-2">
                Skip
              </Button>
              <Button onClick={handleNext}>
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>You're all set!</CardTitle>
            <CardDescription>Your bar is now configured and ready to go</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Check className="h-10 w-10 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-medium">StreamLine is ready for you</h3>
            <p className="mb-6 text-muted-foreground">
              We've set up your account with the options you selected. You can always change these settings later.
            </p>
            <div className="mx-auto max-w-md rounded-lg border bg-muted/50 p-4">
              <h4 className="mb-2 font-medium">What's next?</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Explore your customized dashboard</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Add your inventory items or use the template</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Create your first drink recipe</span>
                </li>
                <li className="flex items-start">
                  <Check className="mr-2 h-4 w-4 text-primary" />
                  <span>Invite your team members</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild size="lg">
              <Link href="/dashboard/customize">
                Go to Your Dashboard <ChevronsRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Need help?{" "}
          <a href="#" className="text-primary underline">
            Watch our tutorial video
          </a>{" "}
          or{" "}
          <a href="#" className="text-primary underline">
            contact support
          </a>
        </p>
      </div>
    </div>
  )
}


"use client"

import { Button } from "@/components/ui/button"
import { Zap, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart,
  ShoppingCart,
  CoffeeIcon,
  DollarSign,
  LineChart,
  CloudIcon,
  TwitterIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react"
import { useState, useEffect } from "react"

// Feature Slideshow Component
function FeatureSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/placeholder.svg?height=550&width=550&text=Dashboard+Screenshot",
      title: "Interactive Dashboard",
      description: "Get a complete overview of your menu performance, costs, and profits at a glance.",
    },
    {
      image: "/placeholder.svg?height=550&width=550&text=Menu+Management+Screenshot",
      title: "Menu Management",
      description: "Create and manage multiple menus with detailed cost analysis for each item.",
    },
    {
      image: "/placeholder.svg?height=550&width=550&text=Reports+Analytics+Screenshot",
      title: "Reports & Analytics",
      description: "Detailed reports and visualizations to help you make data-driven decisions.",
    },
    {
      image: "/placeholder.svg?height=550&width=550&text=Price+Simulation+Screenshot",
      title: "Price Simulation",
      description: "Simulate price changes and see the impact on your profits before implementing them.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full w-full">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            width={550}
            height={550}
            className="h-full w-full object-cover rounded-xl"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white rounded-b-xl">
            <h3 className="text-lg font-bold">{slide.title}</h3>
            <p className="text-sm">{slide.description}</p>
          </div>
        </div>
      ))}

      <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-primary" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">StreamLine</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/tips-and-tricks" className="text-sm font-medium hover:text-primary">
              Tips & Tricks
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary">
              About Us
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signin" className="hidden md:block">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Streamline your bar & maximize profits
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Optimize your menu pricing, track ingredient costs, and maximize profitability with our all-in-one
                    solution.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signin">
                    <Button size="lg" className="px-8">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline" className="px-8">
                      Learn More
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4 text-primary" />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-1 h-4 w-4 text-primary" />
                    <span>No credit card required</span>
                  </div>
                </div>
              </div>
              <div className="mx-auto aspect-video overflow-hidden rounded-xl sm:w-full lg:order-last">
                <FeatureSlideshow />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Key Features</div>
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

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Streamline your menu management in 3 simple steps
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
              <div className="flex flex-col items-center space-y-2 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Add Your Ingredients</h3>
                <p className="text-center text-muted-foreground">
                  Input your ingredients with costs and inventory levels.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Create Your Recipes</h3>
                <p className="text-center text-muted-foreground">Build your drink recipes with precise measurements.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Optimize Your Menu</h3>
                <p className="text-center text-muted-foreground">
                  Set prices, analyze profits, and optimize your menu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bars We Work With */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Our Partners</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Trusted by leading bars and restaurants
                </h2>
              </div>
            </div>
            <div className="mx-auto flex flex-wrap items-center justify-center gap-8 md:gap-12 py-8 grayscale opacity-70">
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="Bar Logo 1"
                className="h-12 w-auto"
              />
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="Bar Logo 2"
                className="h-12 w-auto"
              />
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="Bar Logo 3"
                className="h-12 w-auto"
              />
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="Bar Logo 4"
                className="h-12 w-auto"
              />
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="Bar Logo 5"
                className="h-12 w-auto"
              />
              <Image
                src="/placeholder.svg?height=60&width=120"
                width={120}
                height={60}
                alt="Bar Logo 6"
                className="h-12 w-auto"
              />
            </div>
          </div>
        </section>

        {/* Testimonials */}

        {/* Pricing Section */}
        {/* About Us Section */}
        <section id="about" className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">About Us</div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                    Our mission is to help bars and restaurants thrive
                  </h2>
                  <p className="text-muted-foreground md:text-xl">
                    StreamLine was founded in 2025 by a team of bar owners and tech enthusiasts who saw a need for
                    better menu management tools in the hospitality industry.
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    We understand the challenges of running a profitable bar or restaurant. That's why we've built a
                    platform that makes it easy to track costs, optimize pricing, and maximize profits.
                  </p>
                  <p className="text-muted-foreground">
                    Our team combines decades of experience in the hospitality industry with cutting-edge technology to
                    deliver a solution that's both powerful and easy to use.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signin">
                    <Button>Join Our Community</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="Team Photo"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to optimize your menu?</h2>
                <p className="max-w-[700px] md:text-xl">
                  Join thousands of bars and restaurants already using StreamLine to boost their profits.
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

      <footer className="w-full border-t bg-background py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">StreamLine</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Optimizing menu pricing and profitability for bars and restaurants since 2025.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <TwitterIcon className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <FacebookIcon className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <InstagramIcon className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  <LinkedinIcon className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} StreamLine. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">Made with ❤️ in Umeå, Sweden</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Clock, Tag, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Sample blog posts data
const featuredPosts = [
  {
    id: "optimizing-cocktail-costs",
    title: "5 Ways to Optimize Your Cocktail Costs Without Sacrificing Quality",
    excerpt: "Learn how to reduce your cocktail costs while maintaining the quality your customers expect.",
    image: "/placeholder.svg?height=400&width=600&text=Cocktail+Cost+Optimization",
    date: "May 15, 2023",
    readTime: "8 min read",
    author: "Elena Rodriguez",
    category: "Cost Management",
  },
  {
    id: "inventory-management",
    title: "Inventory Management Best Practices for Busy Bars",
    excerpt: "Streamline your inventory process and reduce waste with these proven techniques.",
    image: "/placeholder.svg?height=400&width=600&text=Inventory+Management",
    date: "June 2, 2023",
    readTime: "6 min read",
    author: "Marcus Johnson",
    category: "Inventory",
  },
  {
    id: "menu-engineering",
    title: "Menu Engineering: The Science of Profitable Menu Design",
    excerpt: "Use data-driven strategies to design menus that maximize profits and enhance customer experience.",
    image: "/placeholder.svg?height=400&width=600&text=Menu+Engineering",
    date: "April 28, 2023",
    readTime: "10 min read",
    author: "Sofia Davis",
    category: "Menu Design",
  },
]

const recentPosts = [
  {
    id: "seasonal-ingredients",
    title: "Leveraging Seasonal Ingredients to Boost Profits",
    excerpt:
      "How to use seasonal ingredients to create special menu items that customers love and increase your margins.",
    image: "/placeholder.svg?height=200&width=300&text=Seasonal+Ingredients",
    date: "July 10, 2023",
    readTime: "5 min read",
    author: "Hugo Svedjeland",
    category: "Ingredients",
  },
  {
    id: "staff-training",
    title: "Effective Staff Training Techniques for Better Service and Sales",
    excerpt: "Train your staff to provide exceptional service while maximizing sales opportunities.",
    image: "/placeholder.svg?height=200&width=300&text=Staff+Training",
    date: "July 5, 2023",
    readTime: "7 min read",
    author: "Elena Rodriguez",
    category: "Staff Management",
  },
  {
    id: "pricing-psychology",
    title: "The Psychology of Pricing: How to Set Prices That Sell",
    excerpt: "Understanding customer psychology to set prices that maximize both sales and profits.",
    image: "/placeholder.svg?height=200&width=300&text=Pricing+Psychology",
    date: "June 28, 2023",
    readTime: "9 min read",
    author: "Marcus Johnson",
    category: "Pricing",
  },
  {
    id: "bar-layout",
    title: "Optimizing Your Bar Layout for Efficiency and Sales",
    excerpt: "Design your bar layout to improve workflow, reduce waste, and increase sales.",
    image: "/placeholder.svg?height=200&width=300&text=Bar+Layout",
    date: "June 20, 2023",
    readTime: "6 min read",
    author: "Sofia Davis",
    category: "Operations",
  },
]

const popularCategories = [
  "Cost Management",
  "Inventory",
  "Menu Design",
  "Pricing",
  "Staff Management",
  "Operations",
  "Marketing",
  "Customer Experience",
]

export default function TipsAndTricksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">Tips & Tricks</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Expert advice and insights to help you run a more profitable and efficient bar
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Featured Articles</h2>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="cost">Cost Management</TabsTrigger>
                  <TabsTrigger value="operations">Operations</TabsTrigger>
                  <TabsTrigger value="menu">Menu Design</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      </div>
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                        <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-3 w-3" />
                          {post.author}
                        </div>
                        <Link href={`/tips-and-tricks/${post.id}`}>
                          <Button variant="outline" size="sm">
                            Read More
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="cost" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {featuredPosts
                    .filter((post) => post.category === "Cost Management")
                    .map((post) => (
                      <Card key={post.id} className="overflow-hidden">
                        <div className="aspect-video relative">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardHeader>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {post.readTime}
                            </span>
                          </div>
                          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                          <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <Link href={`/tips-and-tricks/${post.id}`}>
                            <Button variant="outline" size="sm">
                              Read More
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>

              {/* Similar TabsContent for operations and menu */}
              <TabsContent value="operations" className="mt-0">
                {/* Similar content structure */}
              </TabsContent>

              <TabsContent value="menu" className="mt-0">
                {/* Similar content structure */}
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
                <div className="space-y-8">
                  {recentPosts.map((post) => (
                    <div key={post.id} className="flex flex-col md:flex-row gap-6 border-b pb-8">
                      <div className="md:w-1/3 aspect-video relative">
                        <Image
                          src={post.image || "/placeholder.svg"}
                          alt={post.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Tag className="h-3 w-3" />
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {post.readTime}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="h-3 w-3" />
                            {post.author}
                          </div>
                          <Link href={`/tips-and-tricks/${post.id}`}>
                            <Button variant="outline" size="sm">
                              Read More
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-center">
                  <Button variant="outline">Load More Articles</Button>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <CardHeader>
                      <CardTitle>Subscribe to Our Newsletter</CardTitle>
                      <CardDescription>Get the latest tips and tricks delivered to your inbox</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <Button className="w-full">Subscribe</Button>
                      </form>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {popularCategories.map((category) => (
                          <Link
                            key={category}
                            href={`/tips-and-tricks/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                            className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-muted/80"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Need Help?</CardTitle>
                      <CardDescription>Our team is here to assist you</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-muted-foreground">
                        Have questions about running your bar more efficiently? Our experts are ready to help.
                      </p>
                      <Link href="/contact">
                        <Button variant="outline" className="w-full">
                          Contact Us
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to put these tips into action?
                </h2>
                <p className="max-w-[700px] md:text-xl">
                  StreamLine gives you the tools to implement these strategies and maximize your profits.
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


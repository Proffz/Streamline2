import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Clock, Tag, User, ArrowLeft, Share2, Bookmark, ThumbsUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// This would typically come from a CMS or database
const getBlogPost = (slug: string) => {
  // Sample blog post data
  return {
    id: "optimizing-cocktail-costs",
    title: "5 Ways to Optimize Your Cocktail Costs Without Sacrificing Quality",
    excerpt: "Learn how to reduce your cocktail costs while maintaining the quality your customers expect.",
    content: `
      <p>Running a successful bar means balancing quality with profitability. In today's competitive market, optimizing your cocktail costs is essential for maintaining healthy margins without compromising on the experience your customers expect.</p>
      
      <h2>1. Conduct Regular Inventory Analysis</h2>
      <p>The foundation of cost control is knowing exactly what you have and what you're using. Implement a rigorous inventory system that tracks:</p>
      <ul>
        <li>Weekly usage rates for each ingredient</li>
        <li>Variance between theoretical and actual usage</li>
        <li>Pour cost percentages for each cocktail</li>
      </ul>
      <p>By analyzing this data regularly, you can identify waste, over-pouring, or theft issues before they significantly impact your bottom line.</p>
      
      <h2>2. Optimize Your Recipes</h2>
      <p>Small adjustments to recipes can lead to significant cost savings without affecting taste:</p>
      <ul>
        <li>Reduce high-cost ingredients by 1/4 oz where possible</li>
        <li>Replace some premium spirits with quality mid-tier options in mixed drinks</li>
        <li>Use housemade infusions to add flavor complexity at lower costs</li>
      </ul>
      <p>Always conduct blind taste tests with your staff when making changes to ensure quality remains high.</p>
      
      <h2>3. Implement Strategic Pricing</h2>
      <p>Your pricing strategy should reflect both your costs and your market positioning:</p>
      <ul>
        <li>Use the ideal pour cost percentage method (typically 18-24% for cocktails)</li>
        <li>Price based on perceived value, not just cost-plus</li>
        <li>Create tiered pricing with good-better-best options</li>
      </ul>
      <p>Remember that customers are often willing to pay more for unique experiences and quality ingredients when they understand the value.</p>
      
      <h2>4. Reduce Waste Through Preparation Techniques</h2>
      <p>Modern bar techniques can help extend the life of perishable ingredients:</p>
      <ul>
        <li>Use citrus stock to extract maximum flavor from fruit</li>
        <li>Implement acid adjusting for consistent flavor with less fresh citrus</li>
        <li>Create compound syrups that combine multiple flavors</li>
        <li>Vacuum seal perishable ingredients to extend shelf life</li>
      </ul>
      <p>These techniques not only reduce waste but can also create unique flavor profiles that differentiate your cocktails.</p>
      
      <h2>5. Negotiate Better Supplier Deals</h2>
      <p>Your relationship with suppliers can significantly impact your costs:</p>
      <ul>
        <li>Consolidate orders with fewer suppliers to increase buying power</li>
        <li>Negotiate volume discounts for your most-used items</li>
        <li>Join buying groups with other local bars to access better pricing</li>
        <li>Consider direct relationships with local distilleries or producers</li>
      </ul>
      <p>Remember that suppliers value consistent, reliable customers—build relationships that benefit both parties.</p>
      
      <h2>Conclusion</h2>
      <p>Optimizing your cocktail costs doesn't mean compromising on quality. By implementing these strategies, you can maintain or even improve your offerings while increasing profitability. The key is to be systematic, data-driven, and creative in your approach.</p>
      
      <p>With StreamLine's cost analysis tools, you can easily track your pour costs, optimize recipes, and identify opportunities for improvement across your entire menu.</p>
    `,
    image: "/placeholder.svg?height=600&width=1200&text=Cocktail+Cost+Optimization",
    date: "May 15, 2023",
    readTime: "8 min read",
    author: "Elena Rodriguez",
    authorTitle: "Bar Operations Specialist",
    authorImage: "/placeholder.svg?height=100&width=100&text=ER",
    category: "Cost Management",
    relatedPosts: [
      {
        id: "inventory-management",
        title: "Inventory Management Best Practices for Busy Bars",
        excerpt: "Streamline your inventory process and reduce waste with these proven techniques.",
        image: "/placeholder.svg?height=200&width=300&text=Inventory+Management",
      },
      {
        id: "pricing-psychology",
        title: "The Psychology of Pricing: How to Set Prices That Sell",
        excerpt: "Understanding customer psychology to set prices that maximize both sales and profits.",
        image: "/placeholder.svg?height=200&width=300&text=Pricing+Psychology",
      },
    ],
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <article>
          {/* Hero Section */}
          <div className="w-full aspect-[21/9] relative">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
              <Link href="/tips-and-tricks" className="inline-flex items-center text-sm text-primary mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tips & Tricks
              </Link>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
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
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {post.author}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="container px-4 md:px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Social Sharing */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-full">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Like
                  </Button>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

                {/* Author Bio */}
                <div className="mt-12 pt-8 border-t flex items-center gap-4">
                  <Image
                    src={post.authorImage || "/placeholder.svg"}
                    alt={post.author}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{post.author}</h3>
                    <p className="text-muted-foreground">{post.authorTitle}</p>
                    <p className="mt-2">
                      Elena has over 15 years of experience in bar management and is passionate about helping bars
                      optimize their operations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Newsletter Signup */}
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

                  {/* Related Posts */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Related Articles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {post.relatedPosts.map((relatedPost) => (
                        <Link key={relatedPost.id} href={`/tips-and-tricks/${relatedPost.id}`} className="block group">
                          <div className="flex gap-4">
                            <div className="w-1/3 aspect-video relative">
                              <Image
                                src={relatedPost.image || "/placeholder.svg"}
                                alt={relatedPost.title}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                            <div className="w-2/3">
                              <h4 className="font-medium group-hover:text-primary line-clamp-2">{relatedPost.title}</h4>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{relatedPost.excerpt}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>

                  {/* CTA */}
                  <Card className="bg-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle>Ready to optimize your bar?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">
                        Put these tips into practice with StreamLine's powerful menu management tools.
                      </p>
                      <Link href="/signin">
                        <Button variant="secondary" className="w-full">
                          Start Free Trial
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* More Articles Section */}
        <section className="w-full py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">More Articles You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{/* More article cards would go here */}</div>
          </div>
        </section>
      </main>
    </div>
  )
}


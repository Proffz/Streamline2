import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">Our Story</h1>
                <p className="text-muted-foreground md:text-xl">
                  Founded in 2025, StreamLine was born from a simple observation: bar owners and managers spend too much
                  time on tedious calculations and not enough time creating amazing experiences.
                </p>
                <p className="text-muted-foreground md:text-xl mt-4">
                  Our founder, a former bar manager, was frustrated with the lack of specialized tools for the bar
                  industry. Most software was either too generic or too complex, failing to address the unique
                  challenges of drink costing and menu optimization.
                </p>
                <p className="text-muted-foreground md:text-xl mt-4">
                  StreamLine was created to solve these problems with an intuitive, purpose-built platform that helps
                  bars maximize profitability while maintaining quality and creativity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Mission</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  We're on a mission to empower bars to thrive by making the complex simple.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold">Simplify</h3>
                <p className="mt-4 text-muted-foreground">
                  We turn complex calculations and processes into simple, intuitive workflows that anyone can master.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold">Optimize</h3>
                <p className="mt-4 text-muted-foreground">
                  We help bars find the perfect balance between cost, price, and quality to maximize profitability.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-xl font-bold">Innovate</h3>
                <p className="mt-4 text-muted-foreground">
                  We continuously develop new features and insights to keep our customers ahead of the curve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to transform your bar?</h2>
                <p className="max-w-[700px] md:text-xl">
                  Join us on our mission to make bar management simpler, more efficient, and more profitable.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signin">
                  <Button size="lg" variant="secondary" className="px-8">
                    Get Started Today
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


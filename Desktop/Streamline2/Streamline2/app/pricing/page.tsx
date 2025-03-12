import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
                <h1 className="text-3xl font-bold tracking-tighter md:text-5xl">Simple, transparent pricing</h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for your business
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
              {/* Basic Plan */}
              <div className="flex flex-col rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-bold">Basic</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">299 kr</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">Perfect for small bars just getting started.</p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Up to 50 menu items</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Basic cost analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Ingredient management</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Email support</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 border-t">
                  <Link href="/signin">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
              {/* Pro Plan */}
              <div className="flex flex-col rounded-lg border shadow-sm relative">
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Most Popular
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">Pro</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">599 kr</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">For growing establishments with diverse menus.</p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Unlimited menu items</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Advanced cost analysis</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Price optimization</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Performance reports</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 border-t">
                  <Link href="/signin">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>
              {/* Enterprise Plan */}
              <div className="flex flex-col rounded-lg border shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">999 kr</span>
                    <span className="ml-1 text-muted-foreground">/month</span>
                  </div>
                  <p className="mt-4 text-muted-foreground">For large establishments with multiple locations.</p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Multi-location support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>API access</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Custom reporting</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      <span>Dedicated account manager</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col p-6 border-t">
                  <Link href="/signin">
                    <Button className="w-full">Contact Sales</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">Got questions? We've got answers.</p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 mt-12">
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold">Can I cancel my subscription anytime?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, you can cancel your subscription at any time. You'll continue to have access until the end of
                  your billing period.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold">Is there a free trial?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, we offer a 14-day free trial on all plans. No credit card required to get started.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold">Can I switch plans later?</h3>
                <p className="mt-2 text-muted-foreground">
                  You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing
                  cycle.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold">Do you offer discounts for annual billing?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, you can save 20% by choosing annual billing on any of our plans.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold">What payment methods do you accept?</h3>
                <p className="mt-2 text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans.
                </p>
              </div>
              <div className="rounded-lg border p-6">
                <h3 className="text-lg font-bold">Is my data secure?</h3>
                <p className="mt-2 text-muted-foreground">
                  Yes, we use industry-standard encryption and security practices to keep your data safe and secure.
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
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}


"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function AppHeader() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    // Clear the current user from localStorage
    localStorage.removeItem("currentUser")

    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })

    // Redirect to sign-in page
    router.push("/signin")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">StreamLine</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button variant="outline" onClick={handleLogout} className="ml-auto">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    // Valid credentials
    const validCredentials = [
      { email: "demo@streamline.com", password: "password123" },
      { email: "test@menuapp.com", password: "test123" },
      { email: "samuel@streamline.com", password: "samuel123" },
      { email: "hugo@streamline.com", password: "hugo123" }, // New login added
    ]

    setTimeout(() => {
      setIsLoading(false)

      const validUser = validCredentials.find((cred) => cred.email === email && cred.password === password)

      if (validUser) {
        // Store the logged-in user's email in localStorage
        localStorage.setItem("currentUser", validUser.email)

        // Clear any existing state for this user to force loading sample data
        localStorage.removeItem(`appState_${validUser.email}`)

        toast({
          title: "Success",
          description: "You have successfully signed in.",
        })

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Invalid email or password.",
        })
      }
    }, 1000)
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button disabled={isLoading}>{isLoading ? "Signing in..." : "Sign In"}</Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button
        variant="outline"
        disabled={isLoading}
        onClick={() => {
          setEmail("demo@streamline.com")
          setPassword("password123")
          onSubmit({ preventDefault: () => {} } as React.FormEvent)
        }}
      >
        Demo Account
      </Button>
    </div>
  )
}


"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()

  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onLoginSubmit = (data: LoginFormValues) => {
    // In a real app, you would authenticate with your backend here
    console.log("Login data:", data)

    // Show success message
    Swal.fire({
      title: "Success!",
      text: "You have been logged in successfully.",
      icon: "success",
      confirmButtonColor: "hsl(var(--primary))",
    }).then(() => {
      // Redirect based on user type (in a real app, this would come from your auth system)
      const userType = "patient" // Example, would come from auth response
      if (userType === "doctor") {
        router.push("/doctor/dashboard")
      } else {
        router.push("/patient/dashboard")
      }
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...loginForm.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {loginForm.formState.errors.email && (
              <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              {...loginForm.register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {loginForm.formState.errors.password && (
              <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="mt-3">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

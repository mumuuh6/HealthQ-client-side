"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type RegisterFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  userType: string
}

export default function RegisterPage() {
  const router = useRouter()

  const registerForm = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "patient",
    },
  })

  const onRegisterSubmit = (data: RegisterFormValues) => {
    // In a real app, you would register the user with your backend here
    console.log("Register data:", data)

    // Validate passwords match
    if (data.password !== data.confirmPassword) {
      Swal.fire({
        title: "Error!",
        text: "Passwords do not match.",
        icon: "error",
        confirmButtonColor: "hsl(var(--primary))",
      })
      return
    }

    // Show success message
    Swal.fire({
      title: "Success!",
      text: "Your account has been created successfully.",
      icon: "success",
      confirmButtonColor: "hsl(var(--primary))",
    }).then(() => {
      // Redirect to login page
      router.push("/login")
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...registerForm.register("name", {
                required: "Name is required",
              })}
            />
            {registerForm.formState.errors.name && (
              <p className="text-sm text-red-500">{registerForm.formState.errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-email">Email</Label>
            <Input
              id="register-email"
              type="email"
              placeholder="m@example.com"
              {...registerForm.register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {registerForm.formState.errors.email && (
              <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="register-password">Password</Label>
            <Input
              id="register-password"
              type="password"
              {...registerForm.register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {registerForm.formState.errors.password && (
              <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              {...registerForm.register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === registerForm.watch("password") || "Passwords do not match",
              })}
            />
            {registerForm.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="user-type">I am a</Label>
            <select
              id="user-type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...registerForm.register("userType")}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>
        </CardContent>
        <CardFooter className="mt-3">
          <Button type="submit" className="w-full">
            Create account
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

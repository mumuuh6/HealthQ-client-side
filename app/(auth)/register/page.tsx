"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"
import { toast } from "react-toastify";

import UseAxiosNormal from "@/app/hook/Instances/page"

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
const axiosInstanceNormal=UseAxiosNormal()
  const handleSignUp =async (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const form = (e.target as HTMLButtonElement).closest("form")
    if (form) {
      const formData = new FormData(form)
      // Collecting all form data
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
        userType: formData.get("userType") as string,
      }
      
      if (!data.name || !data.email || !data.password || !data.confirmPassword) {
        toast.error("Please fill in all required fields.");
        }
      if (data.password.length < 6) {
        toast.error("Password should be at least 6 characters.");
        return;
      }
      if (!/[A-Z]/.test(data.password)) {
        toast.error("Password must contain at least one uppercase letter.");
        return;
      }
      if (!/[a-z]/.test(data.password)) {
        toast.error("Password must contain at least one lowercase letter.");
        return;
      }
      if (!/[0-9]/.test(data.password)) {
        toast.error("Password must contain at least one number.");
        return;
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
        toast.error("Password must contain at least one special character (!@#$%^&* etc.).");
        return;
      }
      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
const userData={
  name: data.name,
  email: data.email,
  password: data.password,
  userType: data.userType,
  lastLoginTime:new Date().toISOString(),
  createdAt: new Date().toISOString(),
}

    try{
      const response =await axiosInstanceNormal.post("signup",userData);

      if(response?.data?.status){
        Swal.fire({
          title: "Success!",
          text: "You have been registered successfully.",
          icon: "success",
          confirmButtonColor: "hsl(var(--primary))",
        }).then(() => {
          // Redirect based on user type (in a real app, this would come from your auth system)
          if (data.userType === "doctor") {
            router.push("/doctor/dashboard")
          } else {
            router.push("/patient/dashboard")
          }
        })
      }
      else if(!response?.data?.status){
        Swal.fire({
          title: "Error!",
          text: response?.data?.message,
          icon: "error",
          confirmButtonColor: "hsl(var(--primary))",
        })
      }
      
    }
    catch(error){
      console.error("Error Signing Up:",error)
    }
    
    }}

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your information to create an account</CardDescription>
      </CardHeader>
      <form>
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
          <Button 
          onClick={handleSignUp}
          type="submit" 
          className="w-full">
            Create account
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

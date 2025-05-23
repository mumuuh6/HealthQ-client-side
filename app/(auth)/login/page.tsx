"use client"
import { useForm } from "react-hook-form"
import Link from "next/link"
import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import UseAxiosNormal from "@/app/Instances/page"
import { toast } from "react-toastify"
import { signIn } from "next-auth/react"

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginPage() {
  // const router = useRouter()
const axiosInstanceNormal=UseAxiosNormal()
  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

const handlecredentialsLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  console.log('l')
    const form = (e.target as HTMLButtonElement).closest("form")
    if (form) {
      const formData = new FormData(form)
      // Collecting all form data
      const data = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }
      
      if (!data.email || !data.password) {
        Swal.fire({
          title: "Error",
          text: "Please fill in all required fields.",
          icon: "error",
        })
        return
      }
      const userInformation={
        email:data.email,
        password:data.password,
        lastLoginTime:new Date().toISOString(),
      }
      try{
        const response =await axiosInstanceNormal.post(`/signin/${data?.email}`,userInformation)
      if (response?.data?.status && response.data.userInfo) {
        const userInfo = response.data.userInfo;
        console.log("User info:", userInfo);
        //manually sign the user in nextauth
        await signIn("credentials", {
          email: userInfo.email,
          password: userInfo.password,
          redirect: false,
        });
        // Redirect to the home page or any other page after successful sign-in
        toast.success(`${response.data.message}`);
      } else if (!response?.data?.status) {
        toast.error(`${response.data.message}`);
      }
      }
      catch(error){
        console.error("Error during login:", error)
        Swal.fire({
          title: "Error",
          text: "An error occurred during login.",
          icon: "error",
        })
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <form>
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
          <Button 
          onClick={handlecredentialsLogin}
          type="submit" 
          className="w-full">
            Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

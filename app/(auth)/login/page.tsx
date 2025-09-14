"use client"
import { useForm } from "react-hook-form"
import type React from "react"

import Link from "next/link"
import Swal from "sweetalert2"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import UseAxiosNormal from "@/app/hook/UseAxiosNormal"
import { toast } from "react-toastify"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, LogIn, Sparkles } from "lucide-react"
import { useState } from "react"

type LoginFormValues = {
  email: string
  password: string
}

export default function LoginPage() {
  const nav = useRouter()
  const axiosInstanceNormal = UseAxiosNormal()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const loginForm = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handlecredentialsLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const form = (e.target as HTMLButtonElement).closest("form")
    if (form) {
      const formData = new FormData(form)
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
        setIsLoading(false)
        return
      }

      const userInformation = {
        email: data.email,
        password: data.password,
        lastLoginTime: new Date().toISOString(),
      }

      try {
        const res = await axiosInstanceNormal.get(`/signin/${data.email}`)

        if (res?.data?.status) {
          const userInfo = res?.data?.userInfo

          await signIn("credentials", {
            email: userInformation?.email,
            password: userInformation?.password,
            redirect: false,
          })
          toast.success(`signin successful`)
          nav.push(`/`)
        } else if (!res?.data?.status) {
          console.error("Login failed")
          toast.error(`login failed`)
        }
      } catch (error) {
        console.error("Error during login:", error)
        Swal.fire({
          title: "Error",
          text: "An error occurred during login.",
          icon: "error",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center pb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-4"
          >
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                <LogIn className="w-8 h-8 text-primary-foreground" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-accent" />
              </motion.div>
            </div>
          </motion.div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>

        <form>
          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <div className="relative group">
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 group-hover:border-primary/50"
                  {...loginForm.register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              {loginForm.formState.errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {loginForm.formState.errors.email.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="w-4 h-4 text-primary" />
                  Password
                </Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-primary/80 transition-colors hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 group-hover:border-primary/50"
                  {...loginForm.register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {loginForm.formState.errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {loginForm.formState.errors.password.message}
                </motion.p>
              )}
            </motion.div>
          </CardContent>

          <CardFooter className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full"
            >
              <Button
                onClick={handlecredentialsLogin}
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </span>
                )}
              </Button>
            </motion.div>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}

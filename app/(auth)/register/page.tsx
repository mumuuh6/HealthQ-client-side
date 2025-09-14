"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"
import { useState } from "react"
import { toast } from "react-toastify"
import UseAxiosNormal from "@/app/hook/UseAxiosNormal"
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Sparkles, Shield, Stethoscope } from "lucide-react"

type RegisterFormValues = {
  name: string
  email: string
  password: string
  confirmPassword: string
  userType: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const registerForm = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      userType: "patient",
    },
  })

  const axiosInstanceNormal = UseAxiosNormal()

  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const form = (e.target as HTMLButtonElement).closest("form")
    if (form) {
      const formData = new FormData(form)
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
        userType: formData.get("userType") as string,
      }

      if (!data.name || !data.email || !data.password || !data.confirmPassword) {
        toast.error("Please fill in all required fields.")
        setIsLoading(false)
        return
      }

      if (data.password.length < 6) {
        toast.error("Password should be at least 6 characters.")
        setIsLoading(false)
        return
      }

      if (!/[A-Z]/.test(data.password)) {
        toast.error("Password must contain at least one uppercase letter.")
        setIsLoading(false)
        return
      }

      if (!/[a-z]/.test(data.password)) {
        toast.error("Password must contain at least one lowercase letter.")
        setIsLoading(false)
        return
      }

      if (!/[0-9]/.test(data.password)) {
        toast.error("Password must contain at least one number.")
        setIsLoading(false)
        return
      }

      if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
        toast.error("Password must contain at least one special character (!@#$%^&* etc.).")
        setIsLoading(false)
        return
      }

      if (data.password !== data.confirmPassword) {
        toast.error("Passwords do not match.")
        setIsLoading(false)
        return
      }

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        userType: data.userType,
        lastLoginTime: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      }

      try {
        const response = await axiosInstanceNormal.post("signup", userData)

        if (response?.data?.status) {
          Swal.fire({
            title: "Success!",
            text: "You have been registered successfully.",
            icon: "success",
            confirmButtonColor: "hsl(var(--primary))",
          }).then(() => {
            if (data.userType === "doctor") {
              router.push("/doctor/dashboard")
            } else {
              router.push("/patient/dashboard")
            }
          })
        } else if (!response?.data?.status) {
          Swal.fire({
            title: "Error!",
            text: response?.data?.message,
            icon: "error",
            confirmButtonColor: "hsl(var(--primary))",
          })
        }
      } catch (error) {
        console.error("Error Signing Up:", error)
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
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-primary-foreground" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
          </motion.div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Join HealthQ
          </CardTitle>
          <CardDescription className="text-muted-foreground">Create your account to get started</CardDescription>
        </CardHeader>

        <form>
          <CardContent className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-2"
            >
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </Label>
              <div className="relative group">
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 group-hover:border-primary/50"
                  {...registerForm.register("name", {
                    required: "Name is required",
                  })}
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              {registerForm.formState.errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {registerForm.formState.errors.name.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2"
            >
              <Label htmlFor="register-email" className="flex items-center gap-2 text-sm font-medium">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <div className="relative group">
                <Input
                  id="register-email"
                  type="email"
                  placeholder="m@example.com"
                  className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 group-hover:border-primary/50"
                  {...registerForm.register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              {registerForm.formState.errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {registerForm.formState.errors.email.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-2"
            >
              <Label htmlFor="register-password" className="flex items-center gap-2 text-sm font-medium">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </Label>
              <div className="relative group">
                <Input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 group-hover:border-primary/50"
                  {...registerForm.register("password", {
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
              {registerForm.formState.errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {registerForm.formState.errors.password.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="confirm-password" className="flex items-center gap-2 text-sm font-medium">
                <Shield className="w-4 h-4 text-primary" />
                Confirm Password
              </Label>
              <div className="relative group">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20 group-hover:border-primary/50"
                  {...registerForm.register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === registerForm.watch("password") || "Passwords do not match",
                  })}
                />
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {registerForm.formState.errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {registerForm.formState.errors.confirmPassword.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-2"
            >
              <Label htmlFor="user-type" className="flex items-center gap-2 text-sm font-medium">
                <Stethoscope className="w-4 h-4 text-primary" />I am a
              </Label>
              <div className="relative group">
                <select
                  id="user-type"
                  className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300 group-hover:border-primary/50"
                  {...registerForm.register("userType")}
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
                <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
              </div>
            </motion.div>
          </CardContent>

          <CardFooter className="pt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="w-full"
            >
              <Button
                onClick={handleSignUp}
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                  />
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    Create Account
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

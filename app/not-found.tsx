"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Home,
  ArrowLeft,
  Search,
  Calendar,
  Stethoscope,
  ShoppingCart,
  Phone,
  Mail,
  Clock,
} from "lucide-react"

export default function NotFound() {
  const [countdown, setCountdown] = useState(10)
  const router = useRouter()

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Redirect after countdown ends
  useEffect(() => {
    if (countdown === 0) {
      router.push("/")
    }
  }, [countdown, router])

  const quickLinks = [
    {
      title: "Home",
      description: "Return to homepage",
      href: "/",
      icon: Home,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Book Appointment",
      description: "Schedule a consultation",
      href: "/patient/book-appointment",
      icon: Calendar,
      color: "bg-accent/10 text-accent",
    },
    {
      title: "Medicines",
      description: "Browse medicine catalog",
      href: "/medicines",
      icon: Stethoscope,
      color: "bg-secondary/10 text-secondary-foreground",
    },
    {
      title: "Shopping Cart",
      description: "View your cart",
      href: "/cart",
      icon: ShoppingCart,
      color: "bg-chart-1/10 text-chart-1",
    },
  ]

  const supportOptions = [
    {
      title: "Contact Support",
      description: "Get help from our team",
      href: "/contact",
      icon: Phone,
      action: "Contact Us",
    },
    {
      title: "Email Support",
      description: "Send us an email",
      href: "mailto:support@healthq.com",
      icon: Mail,
      action: "Email Now",
    },
  ]

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* 404 Animation */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            <div className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
              404
            </div>
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Stethoscope className="w-12 h-12 md:w-16 md:h-16 text-white" />
              </div>
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground max-w-7xl mx-auto">
              Oops! The page you're looking for seems to have wandered off. Don’t
              worry, our medical team is here to help you find your way back to
              health.
            </p>
          </motion.div>

          {/* Auto Redirect Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="inline-block">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Redirecting to homepage in {countdown} seconds</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Go Home
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 bg-transparent"
              >
                <Link href="javascript:history.back()">
                  <ArrowLeft className="w-4 h-4" />
                  Go Back
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
          >
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <Link href={link.href}>
                    <CardContent className="p-6 text-center space-y-4">
                      <div
                        className={`w-12 h-12 rounded-full ${link.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}
                      >
                        <link.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {link.description}
                        </p>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="mt-16 space-y-6"
          >
            <div className="text-center">
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Need Help?
              </h2>
              <p className="text-muted-foreground">
                Our support team is here to assist you 24/7
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl mx-auto">
              {supportOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="hover:shadow-md transition-all duration-300">
                    <Link href={option.href}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <option.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground">
                              {option.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            {option.action}
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="mt-12 p-6 rounded-lg bg-muted/50 border border-border"
          >
            <div className="flex items-center justify-center gap-3 text-muted-foreground">
              <Search className="w-5 h-5" />
              <span className="text-sm">
                Looking for something specific? Try searching from our homepage
                or contact support.
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

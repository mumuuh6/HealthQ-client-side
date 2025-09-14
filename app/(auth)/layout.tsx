"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Clock, Heart, Shield, Users, Stethoscope, Activity } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Medical icons floating animation
const FloatingIcons = () => {
  const icons = [
    { Icon: Heart, delay: 0, x: 10, y: 20 },
    { Icon: Shield, delay: 0.5, x: 85, y: 15 },
    { Icon: Users, delay: 1, x: 15, y: 80 },
    { Icon: Stethoscope, delay: 1.5, x: 80, y: 75 },
    { Icon: Activity, delay: 2, x: 50, y: 10 },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/10"
          style={{ left: `${x}%`, top: `${y}%` }}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}
    </div>
  )
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const activeTab = pathname === "/register" ? "register" : "login"

  return (
    <div className=" relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/50 to-background">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-accent/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <FloatingParticles />

      {/* Floating medical icons */}
      <FloatingIcons />

      

      {/* Main content with enhanced animations */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl mx-auto p-4"
      >
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl blur-xl" />

        <div className="relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-2xl">
          <Tabs value={activeTab} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger
                  value="login"
                  asChild
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  <Link href="/login" className="flex items-center gap-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      Login
                    </motion.div>
                  </Link>
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  asChild
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  <Link href="/register" className="flex items-center gap-2">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      Register
                    </motion.div>
                  </Link>
                </TabsTrigger>
              </TabsList>
            </motion.div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "register" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
            >
              {children}
            </motion.div>
          </Tabs>
        </div>
      </motion.div>

      {/* Bottom decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-sm text-muted-foreground"
      >
        <p>Secure • Trusted • Healthcare</p>
        <motion.div
          className="flex justify-center gap-2 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {[Shield, Heart, Users].map((Icon, index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, delay: index * 0.2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Icon className="w-4 h-4 text-primary/60" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

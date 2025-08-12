"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const activeTab = pathname === "/register" ? "register" : "login"

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      {/* <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 font-semibold">
        <Clock className="h-6 w-6 text-primary" />
        <span>sHealthQ</span>
      </Link> */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Tabs value={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" asChild>
              <Link href="/login">Login</Link>
            </TabsTrigger>
            <TabsTrigger value="register" asChild>
              <Link href="/register">Register</Link>
            </TabsTrigger>
          </TabsList>
          {children}
        </Tabs>
      </motion.div>
    </div>
  )
}

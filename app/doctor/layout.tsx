"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isactive = (path: string) => pathname === path;

  return (
    <div>
        <header className="sticky top-0 z-10 flex h-16 justify-center items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col gap-4 py-4">
              
              <div className="flex flex-col gap-2">
                <Link
                  href="/doctor/dashboard"
                  className={`flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium ${isactive("/doctor/dashboard") ? "bg-muted" : ""} hover:bg-muted`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/doctor/schedule"
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted ${isactive("/doctor/schedule") ? "bg-muted" : ""}`}
                >
                  Schedule
                </Link>
                <Link
                  href="/doctor/patients"
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted ${isactive("/doctor/patients") ? "bg-muted" : ""}`}
                >
                  Patients
                </Link>
                <Link
                  href="/doctor/profile"
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted ${isactive("/doctor/profile") ? "bg-muted" : ""}`}
                >
                  Profile
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium">
          <Link href="/doctor/dashboard" className={`rounded-lg  px-3 py-2 hover:bg-muted ${isactive("/doctor/dashboard") ? "bg-muted" : ""}`}>
            Dashboard
          </Link>
          <Link href="/doctor/schedule" className={`rounded-lg px-3 py-2 hover:bg-muted ${isactive("/doctor/schedule") ? "bg-muted" : ""}`}>
            Schedule
          </Link>
          <Link href="/doctor/patients" className={`rounded-lg px-3 py-2 hover:bg-muted ${isactive("/doctor/patients") ? "bg-muted" : ""}`}>
            Patients
          </Link>
          <Link href="/doctor/profile" className={`rounded-lg px-3 py-2 hover:bg-muted ${isactive("/doctor/profile") ? "bg-muted" : ""}`}>
            Profile
          </Link>
        </nav>
        
      </header>
      <div>
        {children}
      </div>
    </div>
  )
}

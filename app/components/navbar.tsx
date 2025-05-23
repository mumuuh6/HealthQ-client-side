"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Clock, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/app/components/theme-toggle"
import { useSession } from "next-auth/react"
import UseAxiosNormal from "../Instances/page"

export function Navbar() {
  const pathname = usePathname()
  const session=useSession()
  console.log("from",session)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [role,setrole]=useState('');
  const axiosinstance=UseAxiosNormal();
  const fetchUserRole = async () => {
    try {
      const response = await axiosinstance.get(`/find/role/${session?.data?.user?.email}`);
      console.log("response",response.data.role)
      setrole(response.data.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };
  fetchUserRole();
  console.log("role",role)
  // Define navigation items
  const navItems = [
    { name: "Home", href: "/" },
    // { name: "Features", href: "/#features" },
    // { name: "How It Works", href: "/#how-it-works" },
    { name: "Contact", href: "/contact" },
    { name: "About Us", href: "/about" },
    {
      name: "Dashboard",
      href: role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard"
    }
    
    
  ]

  // Check if the current path matches the nav item
  const isActive = (path: string) => {
    if (path.startsWith("/#")) {
      return pathname === "/"
    }
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
            <Clock className="h-6 w-6 text-primary" />
          </motion.div>
          <span>HealthQ</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex justify-center items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) ? "text-primary" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex justify-center  items-center gap-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Sign up</Button>
          </Link>
        </div>

        {/* Mobile navigation */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between border-b py-4">
                <Link href="/" className="flex items-center gap-2 font-semibold" onClick={() => setIsMenuOpen(false)}>
                  <Clock className="h-6 w-6 text-primary" />
                  <span>HealthQ</span>
                </Link>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
              </div>

              <nav className="flex flex-col gap-4 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-2 py-1 text-lg font-medium transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto border-t py-6 flex flex-col gap-4">
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log in
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full">Sign up</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

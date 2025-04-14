import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/app/components/theme-provider"
import { Navbar } from "@/app/components/navbar"
import { Footer } from "@/app/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HealthQ - Smart Queue Management for Healthcare",
  description: "Streamline your patient flow, reduce wait times, and improve patient satisfaction with HealthQ.",
  icons: {
    icon:"/square-activity.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} cz-shortcut-listen="true">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="min-h-[calc(100vh-300px)] flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

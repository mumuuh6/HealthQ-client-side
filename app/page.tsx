"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, User, CheckCircle } from "lucide-react"
import Image from "next/image";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-5 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    Smart Queue Management for Healthcare
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px]  md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Streamline your patient flow, reduce wait times, and improve patient satisfaction with our
                    intelligent queue management system.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Link href="/register">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                
                
                <Image
                  alt="Queue Management Dashboard"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  src="/square-activity.png"
                  width={250}
                  height={50}
                />
              </motion.div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-5 lg:pt-12  bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need</h2>
                <p className="max-w-[900px]  md:text-xl">
                  Our platform offers a comprehensive solution for managing patient queues and appointments.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <motion.div
                className="flex flex-col items-center space-y-2 rounded-lg border p-6"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Online Appointment</h3>
                <p className="text-center ">
                  Allow patients to book appointments online, reducing phone calls and administrative work.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-2 rounded-lg border p-6"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Virtual Queue</h3>
                <p className="text-center ">
                  Patients can join a virtual queue remotely and arrive just in time for their appointment.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-2 rounded-lg border p-6"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <User className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Doctor Dashboard</h3>
                <p className="text-center ">
                  Doctors can view their schedule, manage patient flow, and update appointment status.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-2 rounded-lg border p-6"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Real-time Updates</h3>
                <p className="text-center ">
                  Patients receive real-time updates about their queue position and estimated wait time.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-2 rounded-lg border p-6"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Wait Time Analytics</h3>
                <p className="text-center ">
                  Track and analyze wait times to optimize scheduling and improve patient experience.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-2 rounded-lg border p-6"
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="rounded-full bg-primary p-3 text-primary-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Patient Portal</h3>
                <p className="text-center ">
                  Patients can view their appointment history, upcoming appointments, and manage their profile.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-5 lg:pt-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple Process</h2>
                <p className="max-w-[900px]  md:text-xl">
                  Our platform makes it easy for both patients and healthcare providers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <motion.div
                className="flex flex-col items-center space-y-2 rounded-lg border p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Book Appointment</h3>
                <p className="text-center ">
                  Patients book appointments online through the patient portal or mobile app.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-2 rounded-lg border p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Join Virtual Queue</h3>
                <p className="text-center ">
                  On the day of appointment, patients join the virtual queue from anywhere.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center space-y-2 rounded-lg border p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Get Notified</h3>
                <p className="text-center ">
                  Receive real-time updates and arrive just in time for your appointment.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-5 lg:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Get Started?</h2>
                <p className="max-w-[900px]  md:text-xl">
                  Join thousands of healthcare providers who are improving patient experience with HealthQ.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="w-full min-[400px]:w-auto">
                    Sign Up Now
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

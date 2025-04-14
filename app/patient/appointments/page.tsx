"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Menu, Bell, Plus, ChevronRight, Filter } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"

// Mock data for appointments
const appointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: new Date(2025, 3, 20), // April 20, 2025
    time: "10:00 AM",
    status: "upcoming",
    location: "Main Hospital, Room 302",
    notes: "Follow-up appointment for blood pressure monitoring",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: new Date(2025, 3, 25), // April 25, 2025
    time: "2:30 PM",
    status: "upcoming",
    location: "Medical Plaza, Suite 105",
    notes: "Annual skin check",
  },
  {
    id: 3,
    doctor: "Dr. Emily Wilson",
    specialty: "General Practitioner",
    date: new Date(2025, 3, 1), // April 1, 2025
    time: "9:15 AM",
    status: "completed",
    location: "Main Hospital, Room 210",
    notes: "Regular check-up",
  },
  {
    id: 4,
    doctor: "Dr. James Rodriguez",
    specialty: "Orthopedic Surgeon",
    date: new Date(2025, 2, 15), // March 15, 2025
    time: "11:30 AM",
    status: "completed",
    location: "Orthopedic Center, Room 405",
    notes: "Post-surgery follow-up",
  },
  {
    id: 5,
    doctor: "Dr. Lisa Martinez",
    specialty: "Neurologist",
    date: new Date(2025, 1, 10), // February 10, 2025
    time: "3:00 PM",
    status: "completed",
    location: "Neurology Center, Suite 200",
    notes: "Headache consultation",
  },
  {
    id: 6,
    doctor: "Dr. Robert Taylor",
    specialty: "Pulmonologist",
    date: new Date(2025, 0, 5), // January 5, 2025
    time: "1:45 PM",
    status: "completed",
    location: "Respiratory Clinic, Room 110",
    notes: "Breathing assessment",
  },
  {
    id: 7,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: new Date(2024, 11, 12), // December 12, 2024
    time: "11:00 AM",
    status: "completed",
    location: "Main Hospital, Room 302",
    notes: "Initial consultation",
  },
  {
    id: 8,
    doctor: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: new Date(2024, 10, 8), // November 8, 2024
    time: "10:30 AM",
    status: "cancelled",
    location: "Medical Plaza, Suite 105",
    notes: "Rash examination",
  },
]

export default function PatientAppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [sortBy, setSortBy] = useState("date-desc")

  // Filter appointments based on active tab
  const filteredAppointments = appointments.filter((appointment) => {
    if (activeTab === "upcoming") return appointment.status === "upcoming"
    if (activeTab === "completed") return appointment.status === "completed"
    if (activeTab === "cancelled") return appointment.status === "cancelled"
    return true
  })

  // Sort appointments based on selected sort option
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (sortBy === "date-asc") return a.date.getTime() - b.date.getTime()
    if (sortBy === "date-desc") return b.date.getTime() - a.date.getTime()
    if (sortBy === "doctor") return a.doctor.localeCompare(b.doctor)
    if (sortBy === "specialty") return a.specialty.localeCompare(b.specialty)
    return 0
  })

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Appointments</h1>
              <p className="">View and manage your healthcare appointments</p>
            </div>
            <Button asChild>
              <Link href="/patient/book-appointment">
                <Plus className="mr-2 h-4 w-4" />
                Book New Appointment
              </Link>
            </Button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Appointments</CardTitle>
                    <CardDescription>View your upcoming and past appointments</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 " />
                      <span className="text-sm  hidden sm:inline">Sort by:</span>
                    </div>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date-desc">Newest First</SelectItem>
                        <SelectItem value="date-asc">Oldest First</SelectItem>
                        <SelectItem value="doctor">Doctor Name</SelectItem>
                        <SelectItem value="specialty">Specialty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                  <div className="space-y-4">
                    {sortedAppointments.length > 0 ? (
                      sortedAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="rounded-full bg-primary/10 p-3">
                              <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{appointment.doctor}</p>
                                <Badge
                                  variant={
                                    appointment.status === "upcoming"
                                      ? "outline"
                                      : appointment.status === "completed"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className="text-xs"
                                >
                                  {appointment.status === "upcoming"
                                    ? "Upcoming"
                                    : appointment.status === "completed"
                                      ? "Completed"
                                      : "Cancelled"}
                                </Badge>
                              </div>
                              <p className="text-sm ">{appointment.specialty}</p>
                              <p className="text-sm">
                                {format(appointment.date, "EEEE, MMMM d, yyyy")} at {appointment.time}
                              </p>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0 flex flex-col md:items-end gap-2">
                            <p className="text-sm ">{appointment.location}</p>
                            <div className="flex gap-2">
                              {appointment.status === "upcoming" && (
                                <>
                                  <Button size="sm" variant="outline">
                                    Reschedule
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Cancel
                                  </Button>
                                </>
                              )}
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">View Details</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-muted p-3 mb-4">
                          <Calendar className="h-6 w-6 " />
                        </div>
                        <h3 className="font-medium mb-1">No Appointments</h3>
                        <p className="text-sm  mb-4">
                          You don't have any {activeTab} appointments
                        </p>
                        <Button asChild size="sm">
                          <Link href="/patient/book-appointment">Book an Appointment</Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

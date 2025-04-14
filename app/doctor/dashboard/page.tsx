"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, UserCheck, UserX, ChevronRight, Users } from "lucide-react"


// Mock data for queue and appointments
const queuePatients = [
  {
    id: 1,
    name: "John Smith",
    appointmentTime: "10:00 AM",
    waitTime: "5 minutes",
    status: "waiting",
    position: 1,
  },
  {
    id: 2,
    name: "Emily Johnson",
    appointmentTime: "10:15 AM",
    waitTime: "20 minutes",
    status: "waiting",
    position: 2,
  },
  {
    id: 3,
    name: "Michael Brown",
    appointmentTime: "10:30 AM",
    waitTime: "35 minutes",
    status: "waiting",
    position: 3,
  },
  {
    id: 4,
    name: "Sarah Davis",
    appointmentTime: "10:45 AM",
    waitTime: "50 minutes",
    status: "not_arrived",
    position: 4,
  },
]

const todayAppointments = [
  {
    id: 1,
    patient: "John Smith",
    time: "10:00 AM",
    type: "Follow-up",
    status: "checked_in",
  },
  {
    id: 2,
    patient: "Emily Johnson",
    time: "10:15 AM",
    type: "Consultation",
    status: "waiting",
  },
  {
    id: 3,
    patient: "Michael Brown",
    time: "10:30 AM",
    type: "Check-up",
    status: "waiting",
  },
  {
    id: 4,
    patient: "Sarah Davis",
    time: "10:45 AM",
    type: "Consultation",
    status: "scheduled",
  },
  {
    id: 5,
    patient: "Robert Wilson",
    time: "11:00 AM",
    type: "Follow-up",
    status: "scheduled",
  },
]

const upcomingAppointments = [
  {
    id: 6,
    patient: "Jennifer Lee",
    date: "Tomorrow",
    time: "9:00 AM",
    type: "New Patient",
  },
  {
    id: 7,
    patient: "David Martinez",
    date: "Tomorrow",
    time: "11:30 AM",
    type: "Follow-up",
  },
  {
    id: 8,
    patient: "Lisa Taylor",
    date: "Apr 16, 2025",
    time: "2:15 PM",
    type: "Consultation",
  },
]

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("today")
  const [currentPatient, setCurrentPatient] = useState(queuePatients[0])

  const handleNextPatient = () => {
    Swal.fire({
      title: "Complete current appointment?",
      text: "This will move to the next patient in the queue",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "hsl(var(--primary))",
      cancelButtonColor: "hsl(var(--muted))",
      confirmButtonText: "Yes, complete",
    }).then((result) => {
      if (result.isConfirmed) {
        // In a real app, you would update the queue in your backend
        setCurrentPatient(queuePatients[1])
        Swal.fire({
          title: "Next patient called",
          text: "Emily Johnson is now being called",
          icon: "success",
          confirmButtonColor: "hsl(var(--primary))",
        })
      }
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome, Dr. Roberts</h1>
            <p className="">Manage your patient queue and appointments</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="col-span-full lg:col-span-1"
            >
              <Card className="border-primary/20 h-full">
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    Current Patient
                  </CardTitle>
                  <CardDescription>Now serving</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {currentPatient ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/placeholder-user.jpg" alt={currentPatient.name} />
                          <AvatarFallback>
                            {currentPatient.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-medium">{currentPatient.name}</h3>
                          <p className="text-sm ">Appointment: {currentPatient.appointmentTime}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Appointment Type:</span>
                          <span className="font-medium">Follow-up</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Patient ID:</span>
                          <span className="font-medium">P-{currentPatient.id.toString().padStart(6, "0")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Time in consultation:</span>
                          <span className="font-medium">12 minutes</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={handleNextPatient} className="flex-1">
                          <UserCheck className="mr-2 h-4 w-4" />
                          Complete & Next
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <UserX className="mr-2 h-4 w-4" />
                          No Show
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="rounded-full bg-muted p-3 mb-4">
                        <Clock className="h-6 w-6 " />
                      </div>
                      <h3 className="font-medium mb-1">No Active Patient</h3>
                      <p className="text-sm  mb-4">You&apos;re not currently seeing any patient</p>
                      <Button>Call Next Patient</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-full lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Queue Status</CardTitle>
                  <CardDescription>Patients waiting to be seen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Users className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">Patients in queue: {queuePatients.length}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm ">Average wait time: 25 minutes</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {queuePatients.map((patient, index) => (
                        <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {patient.position}
                            </div>
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-xs ">Scheduled: {patient.appointmentTime}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">Wait: {patient.waitTime}</p>
                              <Badge
                                variant={patient.status === "waiting" ? "outline" : "secondary"}
                                className="text-xs"
                              >
                                {patient.status === "waiting" ? "Waiting" : "Not Arrived"}
                              </Badge>
                            </div>
                            {index === 0 && (
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Appointments</CardTitle>
                <CardDescription>Manage your schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="today">Today</TabsTrigger>
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  </TabsList>
                  <TabsContent value="today" className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">
                          Today,{" "}
                          {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm ">
                          Total: {todayAppointments.length} appointments
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {todayAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                              {appointment.time.replace(" AM", "").replace(" PM", "")}
                            </div>
                            <div>
                              <p className="font-medium">{appointment.patient}</p>
                              <p className="text-xs ">{appointment.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                appointment.status === "checked_in"
                                  ? "default"
                                  : appointment.status === "waiting"
                                    ? "outline"
                                    : "secondary"
                              }
                              className="text-xs"
                            >
                              {appointment.status === "checked_in"
                                ? "Checked In"
                                : appointment.status === "waiting"
                                  ? "In Queue"
                                  : "Scheduled"}
                            </Badge>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="upcoming" className="space-y-4">
                    <div className="space-y-2">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-sm font-medium">
                              {appointment.time.replace(" AM", "").replace(" PM", "")}
                            </div>
                            <div>
                              <p className="font-medium">{appointment.patient}</p>
                              <div className="flex items-center gap-1">
                                <p className="text-xs ">{appointment.date}</p>
                                <span className="text-xs ">•</span>
                                <p className="text-xs ">{appointment.type}</p>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

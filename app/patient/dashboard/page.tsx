"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { useSession } from "next-auth/react"
import UseAxiosNormal from "@/app/hook/UseAxiosNormal"
import { useQuery } from "@tanstack/react-query"
import { AppointmentDetailsModal } from "@/app/components/appointment-details-modal"

// // Mock data for appointments
// const upcomingAppointments = [
//   {
//     id: 1,
//     doctor: "Dr. Sarah Johnson",
//     specialty: "Cardiologist",
//     date: "2025-04-20",
//     time: "10:00 AM",
//     status: "confirmed",
//     queuePosition: 3,
//     estimatedWaitTime: "15 minutes",
//   },
//   {
//     id: 2,
//     doctor: "Dr. Michael Chen",
//     specialty: "Dermatologist",
//     date: "2025-04-25",
//     time: "2:30 PM",
//     status: "confirmed",
//     queuePosition: null,
//     estimatedWaitTime: null,
//   },
// ]

// const pastAppointments = [
//   {
//     id: 3,
//     doctor: "Dr. Emily Wilson",
//     specialty: "General Practitioner",
//     date: "2025-04-01",
//     time: "9:15 AM",
//     status: "completed",
//   },
//   {
//     id: 4,
//     doctor: "Dr. James Rodriguez",
//     specialty: "Orthopedic Surgeon",
//     date: "2025-03-15",
//     time: "11:30 AM",
//     status: "completed",
//   },
// ]
type Appointment = {
  _id: string
  doctor?: string | 'no name'
  specialty?: string
  date: string
  timeSlotId: number | string
  time: string
  status: "upcoming" | "completed" | "cancelled"
  location?: string
  notes: string
  estimatedWaitTime?: string
  queuePosition?: number
}
export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const { data: session } = useSession();
    const [selectedAppointment, setSelectedAppointment] = useState<any>(null)
const [isModalOpen, setIsModalOpen] = useState(false)
  const axiossecure = UseAxiosNormal();
  
  const handleViewDetails = (appointment: any) => {
    setSelectedAppointment(appointment)
    setIsModalOpen(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }
  const { data: upcomingAppointments = [] } = useQuery({
    queryKey: ['patientAppointment', session?.user?.email],
    queryFn: async () => {
      const res = await axiossecure.get(`/booked-appointments/${session?.user?.email}`);

      return res.data.data;
    },
    enabled: !!session?.user?.email,
  });
  const app = upcomingAppointments.find((app: Appointment) => app.queuePosition)
  //console.log('selectedAppointment', selectedAppointment)
  return (
    <div className="flex min-h-screen flex-col">

      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome, {session?.user?.name?.toUpperCase() || 'User'}</h1>
              <p className="">Manage your appointments and queue status</p>
            </div>
            <Button asChild>
              <Link href="/patient/book-appointment">Book New Appointment</Link>
            </Button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="border-primary/20">
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Active Queue Status
                </CardTitle>
                <CardDescription>Your current position in the queue</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {
                  app ? (
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-lg">
                        <span className="text-4xl font-bold text-primary">{app.queuePosition}</span>
                        <span className="text-sm ">Your Position</span>
                      </div>
                      <div className="space-y-4 flex-1">
                        <div>
                          <h3 className="font-medium">{app.doctor} - {app.specialty}</h3>
                          <p className="text-sm">
                            {new Date(app.date).toDateString() === new Date().toDateString()
                              ? `Today at ${app.timeSlotId}`
                              : `${new Date(app.date).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })} at ${app.timeSlotId}`}
                          </p>

                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Estimated wait time:</span>
                            <span className="font-medium">{app.estimatedWaitTime}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>People ahead of you:</span>
                            <span className="font-medium">2</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            Leave Queue
                          </Button>
                          <Button size="sm">Check In</Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center">
                      <div className="rounded-full bg-muted p-3 mb-4">
                        <Clock className="h-6 w-6 " />
                      </div>
                      <h3 className="font-medium mb-1">No Active Queue</h3>
                      <p className="text-sm  mb-4">You&apos;re not currently in any queue</p>
                      <Button asChild>
                        <Link href="/patient/appointments">View Your Appointments</Link>
                      </Button>
                    </div>
                  )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Your Appointments</CardTitle>
                <CardDescription>Manage your upcoming and past appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upcoming" className="space-y-4">
                    {upcomingAppointments.map((appointment: Appointment) =>
                      appointment.status !== 'completed' && (
                        <div key={appointment._id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="rounded-full bg-primary/10 p-3">
                              <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">{appointment.doctor}</h3>
                              <p className="text-sm ">{appointment.specialty}</p>
                              <p className="text-sm">
                                {new Date(appointment.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}{" "}
                                at {appointment.timeSlotId}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end justify-center gap-2">
                            <Badge variant={appointment.status === "upcoming" ? "outline" : "secondary"}>
                              {appointment.status === "upcoming" ? "Confirmed" : appointment.status}
                            </Badge>
                            <div className="flex gap-2">
                              {appointment.queuePosition === null ? (
                                <Button size="sm" variant="outline">
                                  Join Queue
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" disabled>
                                  In Queue
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                Reschedule
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                  <TabsContent value="past" className="space-y-4">
                    {upcomingAppointments.map((appointment: Appointment) =>
                      appointment.status === 'completed' && (
                        <div key={appointment._id} className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="rounded-full bg-muted p-3">
                              <Calendar className="h-6 w-6 " />
                            </div>
                            <div>
                              <h3 className="font-medium">{appointment.doctor}</h3>
                              <p className="text-sm ">{appointment.specialty}</p>
                              <p className="text-sm">
                                {new Date(appointment.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}{" "}
                                at {appointment.timeSlotId}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col md:items-end justify-center gap-2">
                            <Badge variant="secondary">Completed</Badge>
                            <Button size="sm" variant="outline" onClick={() => handleViewDetails(appointment)}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <AppointmentDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} appointment={selectedAppointment} />
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { format, addDays, startOfWeek, addWeeks, subWeeks, isSameDay } from "date-fns"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import UseAxiosNormal from "@/app/hook/UseAxiosNormal"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Working hours
const workingHours = [
  { day: "Monday", hours: "9:00 AM - 5:00 PM" },
  { day: "Tuesday", hours: "9:00 AM - 5:00 PM" },
  { day: "Wednesday", hours: "9:00 AM - 5:00 PM" },
  { day: "Thursday", hours: "9:00 AM - 5:00 PM" },
  { day: "Friday", hours: "9:00 AM - 3:00 PM" },
  { day: "Saturday", hours: "Closed" },
  { day: "Sunday", hours: "Closed" },
]

type Appointment = {
  id: string
  patient: string
  date: Date
  time: string
  type: string
  duration: string
  status: "confirmed" | "pending" | "canceled"
}

export default function DoctorSchedulePage() {
  const { data: session } = useSession()
  const axiossecure = UseAxiosNormal()

  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("day")
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["doctorAppointments", session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return []
      const res = await axiossecure.get(`/schedule/${session.user.email}`)
      return res.data.data.map((appt: any) => ({
        id: appt.id,
        patient: appt.patient,
        date: new Date(appt.date),
        time: appt.time,
        duration: appt.duration,
        type: appt.type,
        status: appt.status === "upcoming" ? "confirmed" : appt.status,
      }))
    },
    enabled: !!session?.user?.email,
  })
if (isLoading) return <div>Loading...</div>;
  // Filter appointments for day view
  const filteredAppointments = appointments.filter((appt:Appointment) =>
    view === "day" ? isSameDay(appt.date, date) : true
  )

  // Week view
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i))
  const handlePrevWeek = () => setWeekStart(subWeeks(weekStart, 1))
  const handleNextWeek = () => setWeekStart(addWeeks(weekStart, 1))

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
              <p>Manage your appointments and availability</p>
            </div>
            {/* <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Set Availability
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Appointment
              </Button>
            </div> */}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Calendar</CardTitle>
                    <CardDescription>View and manage your schedule</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={view} onValueChange={(v) => setView(v as "day" | "week" | "month")}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="View" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">Day</SelectItem>
                        <SelectItem value="week">Week</SelectItem>
                        <SelectItem value="month">Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="calendar" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                    {/* <TabsTrigger value="availability">Availability</TabsTrigger> */}
                  </TabsList>

                  {/* Calendar Tab */}
                  <TabsContent value="calendar" className="space-y-4">
                    {view === "day" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Button variant="outline" size="sm" onClick={() => setDate(addDays(date, -1))}>
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <div className="text-center">
                            <h3 className="text-lg font-medium">{format(date, "EEEE, MMMM d, yyyy")}</h3>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => setDate(addDays(date, 1))}>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid gap-2">
                          {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appt:Appointment) => (
                              <div
                                key={appt.id}
                                className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm text-center font-medium">
                                    {appt.time}
                                  </div>
                                  <div>
                                    <p className="font-medium">{appt.patient}</p>
                                    <div className="flex items-center gap-1 text-sm">
                                      <span>{appt.type}</span>
                                      <span>•</span>
                                      <span>{appt.duration}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">Confirmed</Badge>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                              <div className="rounded-full bg-muted p-3 mb-4">
                                <CalendarIcon className="h-6 w-6 " />
                              </div>
                              <h3 className="font-medium mb-1">No Appointments</h3>
                              <p className="text-sm mb-4">You don’t have any appointments scheduled for this day</p>
                              <Button size="sm">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Appointment
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {view === "week" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Button variant="outline" size="sm" onClick={handlePrevWeek}>
                            <ChevronLeft className="h-4 w-4" />
                          </Button>
                          <div className="text-center">
                            <h3 className="text-lg font-medium">
                              {format(weekStart, "MMM d")} - {format(addDays(weekStart, 4), "MMM d, yyyy")}
                            </h3>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleNextWeek}>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                          {weekDays.map((day, idx) => (
                            <div key={idx} className="text-center">
                              <div className="font-medium mb-2">{format(day, "EEE")}</div>
                              <div
                                className={`rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 ${
                                  isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : ""
                                }`}
                              >
                                {format(day, "d")}
                              </div>
                              <div className="space-y-1">
                                {appointments
                                  .filter((appt:Appointment) => isSameDay(appt.date, day))
                                  .map((appt:Appointment) => (
                                    <div key={appt.id} className="text-xs p-1 rounded bg-primary/10 text-primary truncate">
                                      {appt.time} - {appt.patient.split(" ")[0]}
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {view === "month" && (
                      <div className="space-y-4">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(newDate) => newDate && setDate(newDate)}
                          className="mx-auto"
                          classNames={{ day_today: "bg-primary text-primary-foreground" }}
                        />
                      </div>
                    )}
                  </TabsContent>

                  {/* List Tab */}
                  <TabsContent value="list" className="space-y-4">
                    {appointments
                      .sort((a:Appointment, b:Appointment) => a.date.getTime() - b.date.getTime())
                      .map((appt:Appointment) => (
                        <div
                          key={appt.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-medium">
                              {format(appt.date, "dd")}
                            </div>
                            <div>
                              <p className="font-medium">{appt.patient}</p>
                              <div className="flex items-center gap-1 text-sm">
                                <span>{format(appt.date, "EEE, MMM d")}</span>
                                <span>•</span>
                                <span>{appt.time}</span>
                                <span>•</span>
                                <span>{appt.type}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">Confirmed</Badge>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </TabsContent>

                  {/* Availability Tab */}
                  <TabsContent value="availability" className="space-y-4">
                    {workingHours.map((schedule, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-medium">
                            {schedule.day.substring(0, 3)}
                          </div>
                          <div>
                            <p className="font-medium">{schedule.day}</p>
                            <p className="text-sm">{schedule.hours}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    ))}
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

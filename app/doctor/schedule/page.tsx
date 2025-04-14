"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { CalendarIcon,  ChevronLeft, ChevronRight, Plus } from "lucide-react"

import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns"

// Mock data for schedule
const appointments = [
  {
    id: 1,
    patient: "John Smith",
    time: "9:00 AM",
    duration: "30 min",
    type: "Follow-up",
    status: "confirmed",
    date: new Date(2025, 3, 14), // April 14, 2025
  },
  {
    id: 2,
    patient: "Emily Johnson",
    time: "10:00 AM",
    duration: "45 min",
    type: "Consultation",
    status: "confirmed",
    date: new Date(2025, 3, 14), // April 14, 2025
  },
  {
    id: 3,
    patient: "Michael Brown",
    time: "11:30 AM",
    duration: "30 min",
    type: "Check-up",
    status: "confirmed",
    date: new Date(2025, 3, 14), // April 14, 2025
  },
  {
    id: 4,
    patient: "Sarah Davis",
    time: "2:00 PM",
    duration: "45 min",
    type: "New Patient",
    status: "confirmed",
    date: new Date(2025, 3, 14), // April 14, 2025
  },
  {
    id: 5,
    patient: "David Wilson",
    time: "9:30 AM",
    duration: "30 min",
    type: "Follow-up",
    status: "confirmed",
    date: new Date(2025, 3, 15), // April 15, 2025
  },
  {
    id: 6,
    patient: "Jennifer Lee",
    time: "11:00 AM",
    duration: "45 min",
    type: "Consultation",
    status: "confirmed",
    date: new Date(2025, 3, 15), // April 15, 2025
  },
  {
    id: 7,
    patient: "Robert Taylor",
    time: "1:30 PM",
    duration: "30 min",
    type: "Check-up",
    status: "confirmed",
    date: new Date(2025, 3, 16), // April 16, 2025
  },
  {
    id: 8,
    patient: "Lisa Martinez",
    time: "3:00 PM",
    duration: "45 min",
    type: "Follow-up",
    status: "confirmed",
    date: new Date(2025, 3, 16), // April 16, 2025
  },
]

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

export default function DoctorSchedulePage() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"day" | "week" | "month">("day")
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }))

  // Filter appointments for the selected date
  const filteredAppointments = appointments.filter((appointment) => {
    if (view === "day") {
      return (
        appointment.date.getDate() === date.getDate() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getFullYear() === date.getFullYear()
      )
    }
    return true
  })

  // Generate week days for week view
  const weekDays = Array.from({ length: 5 }, (_, i) => addDays(weekStart, i))

  const handlePrevWeek = () => {
    setWeekStart(subWeeks(weekStart, 1))
  }

  const handleNextWeek = () => {
    setWeekStart(addWeeks(weekStart, 1))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
              <p className="">Manage your appointments and availability</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Set Availability
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Appointment
              </Button>
            </div>
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
                    <Select value={view} onValueChange={(value) => setView(value as "day" | "week" | "month")}>
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
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                  </TabsList>
                  <TabsContent value="calendar" className="space-y-4">
                    {view === "day" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDate(new Date(date.setDate(date.getDate() - 1)))}
                          >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Previous Day</span>
                          </Button>
                          <div className="text-center">
                            <h3 className="text-lg font-medium">{format(date, "EEEE, MMMM d, yyyy")}</h3>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDate(new Date(date.setDate(date.getDate() + 1)))}
                          >
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next Day</span>
                          </Button>
                        </div>

                        <div className="grid gap-2">
                          {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment) => (
                              <div
                                key={appointment.id}
                                className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-medium">
                                    {appointment.time.replace(" AM", "").replace(" PM", "")}
                                  </div>
                                  <div>
                                    <p className="font-medium">{appointment.patient}</p>
                                    <div className="flex items-center gap-1 text-sm ">
                                      <span>{appointment.type}</span>
                                      <span>•</span>
                                      <span>{appointment.duration}</span>
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
                              <p className="text-sm  mb-4">
                                You don&apos;t have any appointments scheduled for this day
                              </p>
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
                            <span className="sr-only">Previous Week</span>
                          </Button>
                          <div className="text-center">
                            <h3 className="text-lg font-medium">
                              {format(weekStart, "MMM d")} - {format(addDays(weekStart, 4), "MMM d, yyyy")}
                            </h3>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleNextWeek}>
                            <ChevronRight className="h-4 w-4" />
                            <span className="sr-only">Next Week</span>
                          </Button>
                        </div>

                        <div className="grid grid-cols-5 gap-2">
                          {weekDays.map((day, index) => (
                            <div key={index} className="text-center">
                              <div className="font-medium mb-2">{format(day, "EEE")}</div>
                              <div
                                className={`rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 ${
                                  format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")
                                    ? "bg-primary text-primary-foreground"
                                    : ""
                                }`}
                              >
                                {format(day, "d")}
                              </div>
                              <div className="space-y-1">
                                {appointments
                                  .filter(
                                    (appointment) =>
                                      format(appointment.date, "yyyy-MM-dd") === format(day, "yyyy-MM-dd"),
                                  )
                                  .map((appointment) => (
                                    <div
                                      key={appointment.id}
                                      className="text-xs p-1 rounded bg-primary/10 text-primary truncate"
                                    >
                                      {appointment.time} - {appointment.patient.split(" ")[0]}
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
                          classNames={{
                            day_today: "bg-primary text-primary-foreground",
                          }}
                        />
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="list" className="space-y-4">
                    <div className="space-y-2">
                      {appointments
                        .sort((a, b) => a.date.getTime() - b.date.getTime())
                        .map((appointment) => (
                          <div
                            key={appointment.id}
                            className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-medium">
                                {format(appointment.date, "dd")}
                              </div>
                              <div>
                                <p className="font-medium">{appointment.patient}</p>
                                <div className="flex items-center gap-1 text-sm ">
                                  <span>{format(appointment.date, "EEE, MMM d")}</span>
                                  <span>•</span>
                                  <span>{appointment.time}</span>
                                  <span>•</span>
                                  <span>{appointment.type}</span>
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
                    </div>
                  </TabsContent>
                  <TabsContent value="availability" className="space-y-4">
                    <div className="space-y-2">
                      {workingHours.map((schedule, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-medium">
                              {schedule.day.substring(0, 3)}
                            </div>
                            <div>
                              <p className="font-medium">{schedule.day}</p>
                              <p className="text-sm ">{schedule.hours}</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit
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

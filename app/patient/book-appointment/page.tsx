"use client"

import { use, useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import {  ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import UseAxiosNormal from "@/app/Instances/page"
import axios from "axios"
// Mock data for doctors and time slots
const doctors = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", availableDays: [1, 3, 5] },
  { id: 2, name: "Dr. Michael Chen", specialty: "Dermatologist", availableDays: [2, 4] },
  { id: 3, name: "Dr. Emily Wilson", specialty: "General Practitioner", availableDays: [1, 2, 3, 4, 5] },
  { id: 4, name: "Dr. James Rodriguez", specialty: "Orthopedic Surgeon", availableDays: [1, 3, 5] },
]


const timeSlots = [
  { id: 1, time: "9:00 AM" },
  { id: 2, time: "9:30 AM" },
  { id: 3, time: "10:00 AM" },
  { id: 4, time: "10:30 AM" },
  { id: 5, time: "11:00 AM" },
  { id: 6, time: "11:30 AM" },
  { id: 7, time: "1:00 PM" },
  { id: 8, time: "1:30 PM" },
  { id: 9, time: "2:00 PM" },
  { id: 10, time: "2:30 PM" },
  { id: 11, time: "3:00 PM" },
  { id: 12, time: "3:30 PM" },
]

type AppointmentFormValues = {
  doctorId: number
  date: Date | undefined
  timeSlotId: number
  reason: string
  notes: string
}

export default function BookAppointmentPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null)
  const axiossecure=UseAxiosNormal();
  const form = useForm<AppointmentFormValues>({
    defaultValues: {
      doctorId: 0,
      date: undefined,
      timeSlotId: 0,
      reason: "",
      notes: "",
    },
  })

  const handleDoctorSelect = (doctorId: number) => {
    setSelectedDoctor(doctorId)
    form.setValue("doctorId", doctorId)
    setStep(2)
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    form.setValue("date", date)
    setStep(3)
  }

  const handleTimeSelect = (timeSlotId: number) => {
    setSelectedTimeSlot(timeSlotId)
    form.setValue("timeSlotId", timeSlotId)
    setStep(4)
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const onSubmit = async(data: AppointmentFormValues) => {
    // In a real app, you would submit the appointment data to your backend here
    console.log("Appointment data:", data)
    const res=await axiossecure.post('/book-appointment', data);
    if(res?.data?.data?.insertedId){
    // Show success message
    Swal.fire({
      title: "Appointment Booked!",
      text: "Your appointment has been scheduled successfully.",
      icon: "success",
      confirmButtonColor: "hsl(var(--primary))",
    }).then(() => {
      router.push("/patient/dashboard")
    })
    }

  }

  const selectedDoctorData = doctors.find((doctor) => doctor.id === selectedDoctor)
  const selectedTimeSlotData = timeSlots.find((slot) => slot.id === selectedTimeSlot)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 justify-center items-center gap-4 border-b bg-background px-4 sm:px-6">
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => router.push("/patient/dashboard")}>
            Cancel
          </Button>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight">Book an Appointment</h1>
            <p className="">Schedule a visit with one of our healthcare providers</p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted ",
                  )}
                >
                  1
                </div>
                <span className={step >= 1 ? "font-medium" : ""}>Select Doctor</span>
              </div>
              <div className="hidden sm:block w-10 h-0.5 bg-muted"></div>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted ",
                  )}
                >
                  2
                </div>
                <span className={step >= 2 ? "font-medium" : ""}>Select Date</span>
              </div>
              <div className="hidden sm:block w-10 h-0.5 bg-muted"></div>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted ",
                  )}
                >
                  3
                </div>
                <span className={step >= 3 ? "font-medium" : ""}>Select Time</span>
              </div>
              <div className="hidden sm:block w-10 h-0.5 bg-muted"></div>
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                    step >= 4 ? "bg-primary text-primary-foreground" : "bg-muted ",
                  )}
                >
                  4
                </div>
                <span className={step >= 4 ? "font-medium" : ""}>Details</span>
              </div>
            </div>
          </div>

          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select a Doctor</CardTitle>
                  <CardDescription>Choose a healthcare provider for your appointment</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors",
                        selectedDoctor === doctor.id && "border-primary bg-primary/5",
                      )}
                      onClick={() => handleDoctorSelect(doctor.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-muted p-2">
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
                            className="h-5 w-5"
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">{doctor.name}</p>
                          <p className="text-sm ">{doctor.specialty}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 " />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="mr-2 h-8 w-8 p-0" onClick={handlePrevStep}>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                    <div>
                      <CardTitle>Select a Date</CardTitle>
                      <CardDescription>
                        Choose an available date for your appointment with {selectedDoctorData?.name}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) => {
                      // Disable past dates
                      const isPastDate = date < new Date(new Date().setHours(0, 0, 0, 0))
                      // Disable weekends
                      const isWeekend = date.getDay() === 0 || date.getDay() === 6
                      // Disable dates not available for the selected doctor
                      const isNotAvailableForDoctor = selectedDoctorData
                        ? !selectedDoctorData.availableDays.includes(date.getDay())
                        : true

                      return isPastDate || isWeekend || isNotAvailableForDoctor
                    }}
                    className="mx-auto"
                  />
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="mr-2 h-8 w-8 p-0" onClick={handlePrevStep}>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                    <div>
                      <CardTitle>Select a Time</CardTitle>
                      <CardDescription>
                        Choose an available time slot for {selectedDoctorData?.name} on{" "}
                        {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {timeSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={cn(
                          "flex items-center justify-center p-3 rounded-lg border cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors",
                          selectedTimeSlot === slot.id && "border-primary bg-primary/5",
                        )}
                        onClick={() => handleTimeSelect(slot.id)}
                      >
                        <span className="font-medium">{slot.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 4 && (
              <Card>
                <CardHeader>
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="mr-2 h-8 w-8 p-0" onClick={handlePrevStep}>
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                    <div>
                      <CardTitle>Appointment Details</CardTitle>
                      <CardDescription>Provide additional information for your appointment</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm ">Doctor:</span>
                        <span className="text-sm font-medium">{selectedDoctorData?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm ">Date:</span>
                        <span className="text-sm font-medium">
                          {selectedDate && format(selectedDate, "EEEE, MMMM d, yyyy")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm ">Time:</span>
                        <span className="text-sm font-medium">{selectedTimeSlotData?.time}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <select
                        id="reason"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...form.register("reason", { required: true })}
                      >
                        <option value="">Select a reason</option>
                        <option value="check-up">Regular Check-up</option>
                        <option value="follow-up">Follow-up Appointment</option>
                        <option value="consultation">Consultation</option>
                        <option value="illness">Illness or Injury</option>
                        <option value="other">Other</option>
                      </select>
                      {form.formState.errors.reason && (
                        <p className="text-sm text-red-500">Please select a reason for your visit</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Please provide any additional information that might be helpful for your appointment"
                        className="min-h-[100px]"
                        {...form.register("notes")}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="mt-3">
                    <Button type="submit" className="w-full">
                      Book Appointment
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}

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
import { useSession } from "next-auth/react"
import UseAxiosNormal from "@/app/hook/UseAxiosNormal"
import { useQuery } from "@tanstack/react-query"
import { ConsultationModal } from "@/app/consultation-modal"

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
const suggestedTopics = [
  "BP",
  "Pulse",
  "Temperature",
  "Allergies",
  "Chief Complaint",
  "History of Patient Illness",
  "Follow-up Instruction",
  "Next Appointment",
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
type Appointment = {
  id: string
  patient: string
  time: string
  type: string
  meetlink: string
  status: "checked_in" | "waiting" | "scheduled" | "confirmed"
  date: Date // Important: backend should send date as Date
  duration?: string
}

type TranscriptData = {
  allergies: string
  bp: string
  chief_complaint: string
  followup_instruction: string
  history_of_patient_illness: string
  next_appointment: string
  pulse: string
  temperature: string
}

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("today")
  const [isConsultationModal, setIsConsultationModal] = useState(false)
  const [currentPatients, setCurrentPatient] = useState<(typeof queuePatients)[0] | null>(queuePatients[0])
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [account, setaccount] = useState<Appointment | null>(null)
  const [recordingAppointmentId, setRecordingAppointmentId] = useState<string | null>(null)
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null)
  const [currentAppointmentForModal, setCurrentAppointmentForModal] = useState<Appointment | null>(null)

  const { data: session } = useSession()
  const axiossecure = UseAxiosNormal()
  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["doctorAppointments", session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return []
      const res = await axiossecure.get(`/schedule/${session.user.email}`)
      // Convert date strings to Date objects
      return res.data.data.map((appt: Appointment) => ({
        ...appt,
        date: new Date(appt.date),
      }))
    },
    enabled: !!session?.user?.email,
  })
  const { data: currentPatient = [], isLoading: currentLoading } = useQuery({
    queryKey: ["currentAppointments", session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return []
      const res = await axiossecure.get(`/current-patient/${session.user.email}`)
      //console.log('currentPatientData',res.data)
      return res?.data?.data || null
    },
    enabled: !!session?.user?.email,
  })
  const { data: normalPatient = [], isLoading: normalLoading } = useQuery({
    queryKey: ["normalAppointments"],
    queryFn: async () => {
      const res = await axiossecure.get(`/findpatient/${currentPatient.id}`)
      console.log("currentPatientData", res.data)
      return res?.data || null
    },
    enabled: !!currentPatient?.id,
  })

  //console.log('currentPatient',currentPatient)
  //  const handleNextPatient = () => {
  //     Swal.fire({
  //       title: "Complete current appointment?",
  //       text: "This will take you to the consultation page to document the visit",
  //       icon: "question",
  //       showCancelButton: true,
  //       confirmButtonColor: "hsl(var(--primary))",
  //       cancelButtonColor: "hsl(var(--muted))",
  //       confirmButtonText: "Yes, complete consultation",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         // Navigate to consultation page
  //         router.push(`/doctor/consultation/${currentPatient.id}`)
  //       }
  //     })
  //   }

  const handleNextPatient = () => {
    Swal.fire({
      title: "Complete current appointment?",
      text: "This will open the consultation form to document the visit",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--primary)",
      cancelButtonColor: "var(--muted)",
      confirmButtonText: "Yes, complete consultation",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsConsultationModalOpen(true)
      }
    })
  }

  const handleConsultationComplete = (data: any) => {
    console.log("Consultation completed:", data)

    // Move to next patient
    const nextPatientIndex = queuePatients.findIndex((p) => p.id === currentPatients?.id) + 1
    if (nextPatientIndex < queuePatients.length) {
      setCurrentPatient(queuePatients[nextPatientIndex])
    } else {
      setCurrentPatient(null)
    }

    Swal.fire({
      title: "Consultation Completed!",
      text: "Patient consultation has been documented successfully",
      icon: "success",
      confirmButtonColor: "var(--primary)",
    })
  }
  const today = new Date()
  const todayAppointments = appointments.filter((appt: Appointment) => {
    return (
      appt.date.getDate() === today.getDate() &&
      appt.date.getMonth() === today.getMonth() &&
      appt.date.getFullYear() === today.getFullYear()
    )
  })

  const upcomingAppointments = appointments.filter((appt: Appointment) => {
    const apptDate = appt.date
    return apptDate > today
  })
  const handleJoinConsultation = (meet: string) => {
    if (meet) {
      window.open(meet, "_blank")
    }
  }
  const startRecording = async (appointment: Appointment) => {
    //setaccount(appointment)
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    //setIsConsultationModal(true);
    const mediaRecorder = new MediaRecorder(stream)
    const chunks: Blob[] = []
    setRecordingAppointmentId(appointment.id)

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" })
      setAudioBlob(blob)
      setRecording(false)
    }
    mediaRecorder.start()
    setRecording(true)
    setTimeout(
      () => {
        mediaRecorder.stop()
      },
      30 * 1000,
    )
  }

  const uploadTranscript = async () => {
    if (!audioBlob || !recordingAppointmentId) return Swal.fire("Error", "No recording available", "error")
    const formData = new FormData()
    formData.append(
      "audio",
      audioBlob,
      `${recordingAppointmentId}-${Date.now()}-consultation.webm`, // 🔑 tie filename to booking
    )

    try {
      const res = await axiossecure.post(`/upload-audio/${recordingAppointmentId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      // Show success message
      //Swal.fire("Success", "Transcript saved", "success")
      console.log(res.data)

      // Set transcript data and find the current appointment
      if (res.data.structuredData) {
        setTranscriptData(res.data.structuredData)
        const currentAppointment = appointments.find((appt: Appointment) => appt.id === recordingAppointmentId)
        if (currentAppointment) {
          setCurrentAppointmentForModal(currentAppointment)
          // Open consultation modal with transcript data
          setIsConsultationModal(true)
        }
      }
    } catch (err) {
      console.error(err)
      Swal.fire("Error", "Failed to upload transcript", "error")
    }
  }

  if (currentLoading || isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome, {session?.user?.name?.toUpperCase()}</h1>
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
                          <AvatarImage src="https://images.app.goo.gl/3wWrAmJDAEVYkPZy9" alt={currentPatient.name} />
                          <AvatarFallback>
                            {(currentPatient?.name ?? "")
                              .split(" ")
                              .map((n: string) => n[0])
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
                          <span className="font-medium">{currentPatient.appointmentType}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Patient ID:</span>
                          <span className="font-medium">P-{currentPatient.id}</span>
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
                        <Button variant="outline" className="flex-1 bg-transparent">
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
                        <span className="text-sm ">Total: {todayAppointments.length} appointments</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {todayAppointments.map((appointment: Appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="flex h-16 w-16 items-center justify-center text-center rounded-full bg-muted text-sm font-medium">
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

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleJoinConsultation(appointment.meetlink)}
                            >
                              Join Consultation
                            </Button>
                            {audioBlob && recordingAppointmentId === appointment.id && (
                              <Button className="bg-purple-500 text-white px-4 py-2 rounded" onClick={uploadTranscript}>
                                Upload Transcript
                              </Button>
                            )}

                            {!recording && (
                              <Button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => startRecording(appointment)}
                              >
                                Start Recording
                              </Button>
                            )}

                            {recording && recordingAppointmentId === appointment.id && (
                              <span className="text-red-500">Recording...</span>
                            )}

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
                      {upcomingAppointments.map((appointment: Appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="flex h-16 w-16 text-center items-center justify-center rounded-full bg-muted text-sm font-medium">
                              {appointment.time.replace(" AM", "").replace(" PM", "")}
                            </div>
                            <div>
                              <p className="font-medium">{appointment.patient}</p>
                              <div className="flex items-center gap-1">
                                <p className="text-xs ">{appointment.date.toLocaleDateString()}</p>
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

      {/* Regular consultation modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        patient={normalPatient}
        onComplete={handleConsultationComplete}
      />

      {/* Consultation modal with transcript data */}
      <ConsultationModal
        isOpen={isConsultationModal}
        onClose={() => {
          setIsConsultationModal(false)
          setTranscriptData(null)
          setCurrentAppointmentForModal(null)
        }}
        patient={currentAppointmentForModal}
        onComplete={handleConsultationComplete}
        transcriptData={transcriptData}
      />
    </div>
  )
}

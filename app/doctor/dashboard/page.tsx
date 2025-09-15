"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Calendar,
  Clock,
  UserCheck,
  UserX,
  ChevronRight,
  Users,
  Video,
  Maximize2,
  Minimize2,
  X,
  Mic,
  MicOff,
  Upload,
} from "lucide-react"
import { useSession } from "next-auth/react"
import UseAxiosNormal from "@/app/hook/UseAxiosNormal"
import { useQuery } from "@tanstack/react-query"
import { ConsultationModal } from "@/app/consultation-modal"

type Appointment = {
  id: string
  patient: string
  name?: string
  time: string
  appointmentTime?: string
  type: string
  meetlink: string
  waitTime?: string
  queuePosition?: number
  status: "checked_in" | "waiting" | "scheduled" | "confirmed"
  date: Date
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
  const [meetLink, setMeetLink] = useState<string | null>(null)
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [currentMeetingPatient, setCurrentMeetingPatient] = useState<string>("")
  const [currentMeetingAppointment, setCurrentMeetingAppointment] = useState<Appointment | null>(null)

  const [recording, setRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [recordingAppointmentId, setRecordingAppointmentId] = useState<string | null>(null)
  const [transcriptData, setTranscriptData] = useState<TranscriptData | null>(null)
  const [currentAppointmentForModal, setCurrentAppointmentForModal] = useState<Appointment | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)

  const { data: session } = useSession()
  const axiossecure = UseAxiosNormal()

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["doctorAppointments", session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return []
      const res = await axiossecure.get(`/schedule/${session.user.email}`)
      return res.data.data.map((appt: Appointment) => ({
        ...appt,
        date: new Date(appt.date),
      }))
    },
    enabled: !!session?.user?.email,
  })

  const {
    data: currentPatient = [],
    isLoading: currentLoading,
    refetch,
  } = useQuery({
    queryKey: ["currentAppointments", session?.user?.email],
    queryFn: async () => {
      if (!session?.user?.email) return []
      const res = await axiossecure.get(`/current-patient/${session.user.email}`)
      return res?.data?.data || null
    },
    enabled: !!session?.user?.email,
  })

  const currentPatientt = currentPatient?.currentPatient || null
  const queuePatientss = currentPatient?.queue || null

  const { data: normalPatient = [], isLoading: normalLoading } = useQuery({
    queryKey: ["normalAppointments"],
    queryFn: async () => {
      const res = await axiossecure.get(`/findpatient/${currentPatient.id}`)
      return res?.data || null
    },
    enabled: !!currentPatient?.id,
  })

  const handleNextPatient = (patientId: string) => {
    if (!currentPatient) return
    Swal.fire({
      title: "Complete current appointment?",
      text: "This will open the consultation form to document the visit",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "var(--primary)",
      cancelButtonColor: "var(--muted)",
      confirmButtonText: "Yes, complete consultation",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiossecure.post(`/queue/complete/${patientId}`)
        refetch()
      }
    })
  }

  const handleConsultationComplete = (data: any) => {
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

  const handleJoinConsultation = (meet: string, patientName: string, appointment: Appointment) => {
    if (meet) {
      setMeetLink(meet)
      setCurrentMeetingPatient(patientName)
      setCurrentMeetingAppointment(appointment)
      setIsMeetingModalOpen(true)
    }
  }

  const closeMeeting = () => {
    setMeetLink(null)
    setCurrentMeetingPatient("")
    setCurrentMeetingAppointment(null)
    setIsMeetingModalOpen(false)
    setIsFullscreen(false)
  }

  const startRecording = async (appointment: Appointment) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      const chunks: Blob[] = []
      setRecordingAppointmentId(appointment.id)

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" })
        setAudioBlob(blob)
        setRecording(false)
        stream.getTracks().forEach((track) => track.stop()) // Stop microphone access
      }
      mediaRecorder.start()
      setMediaRecorder(mediaRecorder)
      setRecording(true)
      setRecordingAppointmentId(appointment.id)
    } catch (error) {
      console.error("Error starting recording:", error)
      Swal.fire("Error", "Could not access microphone", "error")
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop()
      setMediaRecorder(null)
    }
  }

  const uploadTranscript = async () => {
    if (!audioBlob || !recordingAppointmentId) return Swal.fire("Error", "No recording available", "error")
    const formData = new FormData()
    formData.append("audio", audioBlob, `${recordingAppointmentId}-${Date.now()}-consultation.webm`)

    try {
      const res = await axiossecure.post(`/upload-audio/${recordingAppointmentId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      if (res.data.structuredData) {
        setTranscriptData(res.data.structuredData)
        const currentAppointment = appointments.find((appt: Appointment) => appt.id === recordingAppointmentId)
        if (currentAppointment) {
          setCurrentAppointmentForModal(currentAppointment)
          setIsConsultationModal(true)
        }
      }
      // Clear the audio blob after successful upload
      setAudioBlob(null)
      setRecordingAppointmentId(null)
    } catch (err) {
      console.error(err)
      Swal.fire("Error", "Failed to upload transcript", "error")
    }
  }

  if (currentLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="mx-auto max-w-6xl space-y-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome, {session?.user?.name?.toUpperCase()}</h1>
            <p className="text-muted-foreground">Manage your patient queue and appointments</p>
          </div>

          {/* Recording Status Bar - Always visible when recording */}
          {recording && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-700 font-medium">Recording in progress...</span>
                  </div>
                  <span className="text-sm text-red-600">
                    Patient: {appointments.find((a) => a.id === recordingAppointmentId)?.patient}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={stopRecording}
                    className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                  >
                    <MicOff className="mr-2 h-4 w-4" />
                    Stop Recording
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

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
                  {currentPatientt ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="https://images.app.goo.gl/3wWrAmJDAEVYkPZy9" alt={currentPatientt.name} />
                          <AvatarFallback>
                            {(currentPatientt?.name ?? "")
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-medium">{currentPatientt.patient}</h3>
                          <p className="text-sm text-muted-foreground">
                            Appointment: {currentPatientt.appointmentTime}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Appointment Type:</span>
                          <span className="font-medium">{currentPatientt.appointmentType}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Patient ID:</span>
                          <span className="font-medium">P-{currentPatientt.id}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Patient Name:</span>
                          <span className="font-medium">{currentPatientt?.name}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={() => handleNextPatient(currentPatientt.id)} className="flex-1">
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
                        <Clock className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="font-medium mb-1">No Active Patient</h3>
                      <p className="text-sm text-muted-foreground mb-4">You&apos;re not currently seeing any patient</p>
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
                        <span className="font-medium">Patients in queue: {queuePatientss?.length || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Average wait time: 25 minutes</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {queuePatientss?.map((patient: Appointment, index: number) => (
                        <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg border">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {patient.queuePosition}
                            </div>
                            <div>
                              <p className="font-medium">{patient.name}</p>
                              <p className="text-xs text-muted-foreground">Scheduled: {patient.appointmentTime}</p>
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
                        <span className="text-sm text-muted-foreground">
                          Total: {todayAppointments.length} appointments
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {todayAppointments.map((appointment: Appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                              {appointment.time.replace(" AM", "").replace(" PM", "")}
                            </div>
                            <div>
                              <p className="font-medium">{appointment.patient}</p>
                              <p className="text-sm text-muted-foreground">{appointment.type}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
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

                            {/* Recording Controls - Always visible */}
                            {!recording ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => startRecording(appointment)}
                                className="border-blue-300 text-blue-700 hover:bg-blue-50"
                              >
                                <Mic className="mr-2 h-4 w-4" />
                                Start Recording
                              </Button>
                            ) : recordingAppointmentId === appointment.id ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={stopRecording}
                                className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                              >
                                <MicOff className="mr-2 h-4 w-4" />
                                Stop Recording
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled className="opacity-50 bg-transparent">
                                <Mic className="mr-2 h-4 w-4" />
                                Recording Active
                              </Button>
                            )}

                            {/* Upload Transcript Button - Shows when recording is complete for this appointment */}
                            {audioBlob && !recording && recordingAppointmentId === appointment.id && (
                              <Button
                                size="sm"
                                onClick={uploadTranscript}
                                className="bg-purple-600 hover:bg-purple-700"
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Transcript
                              </Button>
                            )}

                            <Button
                              size="sm"
                              variant="default"
                              onClick={() =>
                                handleJoinConsultation(appointment.meetlink, appointment.patient, appointment)
                              }
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Video className="mr-2 h-4 w-4" />
                              Join Meeting
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="upcoming" className="space-y-4">
                    <div className="space-y-2">
                      {upcomingAppointments.map((appointment: Appointment) => (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-sm font-medium">
                              {appointment.time.replace(" AM", "").replace(" PM", "")}
                            </div>
                            <div>
                              <p className="font-medium">{appointment.patient}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{appointment.date.toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{appointment.type}</span>
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

      {/* Video Consultation Modal */}
      <Dialog open={isMeetingModalOpen} onOpenChange={setIsMeetingModalOpen}>
        <DialogContent className={`${isFullscreen ? "max-w-full w-full h-full" : "max-w-4xl w-full"} p-0`}>
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-green-600" />
                Video Consultation - {currentMeetingPatient}
              </DialogTitle>
              <div className="flex items-center gap-2">
                {/* Recording controls in modal header */}
                {currentMeetingAppointment && (
                  <>
                    {!recording ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startRecording(currentMeetingAppointment)}
                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        <Mic className="mr-2 h-4 w-4" />
                        Start Recording
                      </Button>
                    ) : recordingAppointmentId === currentMeetingAppointment.id ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={stopRecording}
                        className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                      >
                        <MicOff className="mr-2 h-4 w-4" />
                        Stop Recording
                      </Button>
                    ) : null}

                    {/* Upload button in modal */}
                    {audioBlob && !recording && recordingAppointmentId === currentMeetingAppointment.id && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={uploadTranscript}
                        className="border-purple-300 text-purple-700 hover:bg-purple-50 bg-transparent"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    )}
                  </>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="sm" onClick={closeMeeting}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className={`${isFullscreen ? "h-[calc(100vh-80px)]" : "h-[500px]"} w-full`}>
            {meetLink && (
              <iframe
                src={meetLink}
                className="w-full h-full border-0"
                allow="camera; microphone; fullscreen; display-capture; autoplay"
                title={`Video consultation with ${currentMeetingPatient}`}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

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

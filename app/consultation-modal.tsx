"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Calendar, Activity, Plus, Trash2, Save, FileText, Upload, X, Mic } from "lucide-react"
import UseAxiosNormal from "./hook/UseAxiosNormal"

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  patient: any
  onComplete: (data: any) => void
  transcriptData?: {
    allergies: string
    bp: string
    chief_complaint: string
    followup_instruction: string
    history_of_patient_illness: string
    next_appointment: string
    pulse: string
    temperature: string
  } | null
}

export function ConsultationModal({ isOpen, onClose, patient, onComplete, transcriptData }: ConsultationModalProps) {
  const [activeTab, setActiveTab] = useState("consultation")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const axiossecure = UseAxiosNormal()

  // Form states
  const [consultationData, setConsultationData] = useState({
    chiefComplaint: "",
    historyOfPresentIllness: "",
    physicalExamination: "",
    diagnosis: "",
    treatmentPlan: "",
    followUpInstructions: "",
    nextAppointment: "",
    additionalNotes: "",
  })

  const [prescriptions, setPrescriptions] = useState([
    { id: 1, medication: "", dosage: "", frequency: "", duration: "", instructions: "" },
  ])

  const [reports, setReports] = useState<File[]>([])

  // Auto-fill form when transcript data is available
  useEffect(() => {
    if (transcriptData) {
      setConsultationData({
        chiefComplaint: transcriptData.chief_complaint || "",
        historyOfPresentIllness: transcriptData.history_of_patient_illness || "",
        physicalExamination: `BP: ${transcriptData.bp || "Not mentioned"}, Pulse: ${transcriptData.pulse || "Not mentioned"}, Temperature: ${transcriptData.temperature || "Not mentioned"}`,
        diagnosis: "",
        treatmentPlan: "",
        followUpInstructions: transcriptData.followup_instruction || "",
        nextAppointment: transcriptData.next_appointment || "",
        additionalNotes: `Allergies: ${transcriptData.allergies || "None mentioned"}`,
      })
    }
  }, [transcriptData])

  const addPrescription = () => {
    const newId = Math.max(...prescriptions.map((p) => p.id)) + 1
    setPrescriptions([
      ...prescriptions,
      {
        id: newId,
        medication: "",
        dosage: "",
        frequency: "",
        duration: "",
        instructions: "",
      },
    ])
  }

  const removePrescription = (id: number) => {
    if (prescriptions.length > 1) {
      setPrescriptions(prescriptions.filter((p) => p.id !== id))
    }
  }

  const updatePrescription = (id: number, field: string, value: string) => {
    setPrescriptions(prescriptions.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setReports([...reports, ...files])
  }

  const removeReport = (index: number) => {
    setReports(reports.filter((_, i) => i !== index))
  }

  const handleSaveDraft = () => {
    // Save draft functionality
    console.log("Saving draft...", { consultationData, prescriptions, reports })
  }

  const handleCompleteConsultation = async () => {
    if (!consultationData.chiefComplaint || !consultationData.diagnosis) {
      alert("Please fill in the required fields (Chief Complaint and Diagnosis)")
      return
    }

    setIsSubmitting(true)

    try {
      // Structure data according to your database format
      const updatedData = {
        consultationNotes: {
          chiefComplaint: consultationData.chiefComplaint,
          historyOfPresentIllness: consultationData.historyOfPresentIllness,
          physicalExamination: consultationData.physicalExamination,
          diagnosis: consultationData.diagnosis,
          treatmentPlan: consultationData.treatmentPlan,
          followUpInstructions: consultationData.followUpInstructions,
          nextAppointment: consultationData.nextAppointment,
          additionalNotes: consultationData.additionalNotes,
        },
        prescriptions: prescriptions.filter((p) => p.medication),
        followUpDate: consultationData.nextAppointment,
      }

      console.log("Complete consultation data:", JSON.stringify(updatedData, null, 2))

      const response = await axiossecure.patch(`/update-consultation/${patient._id}`, updatedData)
      console.log("response", response)

      const completeData = {
        consultation: consultationData,
        prescriptions: prescriptions.filter((p) => p.medication),
        reports: reports,
        patientId: patient._id,
        completedAt: new Date().toISOString(),
      }

      onComplete(completeData)
      onClose()
    } catch (error) {
      console.error("Error completing consultation:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!patient) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-full w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Complete Consultation - {patient?.patientName || patient?.name}
            {transcriptData && (
              <Badge variant="secondary" className="ml-2">
                <Mic className="h-3 w-3 mr-1" />
                From Transcript
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {transcriptData && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-blue-800">
              <strong>Auto-filled from transcript:</strong> Some fields have been pre-populated based on the
              consultation recording. Please review and modify as needed.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          {/* Patient Info Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Patient Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder-user.jpg" alt={patient?.patientName || patient?.name} />
                    <AvatarFallback>
                      {(patient?.patientName || patient?.name || "")
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-sm sm:text-base">{patient?.patientName || patient?.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">ID: P-{patient?._id || patient?.id}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span>Age:</span>
                    <span>{patient?.age || "32 years"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gender:</span>
                    <span>{patient?.gender || "Male"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Blood Type:</span>
                    <span>O+</span>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="font-medium text-xs sm:text-sm mb-2 flex items-center gap-1">
                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                    Appointment
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p>Time: {patient?.timeSlotId || patient?.time}</p>
                    <p>Type: {patient?.Reason || patient?.type}</p>
                    <p>Duration: 15 minutes</p>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="font-medium text-xs sm:text-sm mb-2 flex items-center gap-1">
                    <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
                    Vitals{" "}
                    {transcriptData && (
                      <Badge variant="outline" className="text-xs">
                        From Transcript
                      </Badge>
                    )}
                  </h4>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>BP:</span>
                      <span>{transcriptData?.bp || "120/80"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pulse:</span>
                      <span>{transcriptData?.pulse || "72 bpm"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Temp:</span>
                      <span>{transcriptData?.temperature ? `${transcriptData.temperature}°F` : "98.6°F"}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <h4 className="font-medium text-xs sm:text-sm mb-2">Allergies</h4>
                  <div className="flex flex-wrap gap-1">
                    {transcriptData?.allergies && transcriptData.allergies !== "Not mentioned" ? (
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        {transcriptData.allergies}
                      </Badge>
                    ) : (
                      <>
                        <Badge variant="outline" className="text-xs sm:text-sm">
                          Penicillin
                        </Badge>
                        <Badge variant="outline" className="text-xs sm:text-sm">
                          Shellfish
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-4 gap-1 sm:gap-2">
                <TabsTrigger value="consultation">Consultation</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                {/* <TabsTrigger value="reports">Reports</TabsTrigger> */}
              </TabsList>

              <TabsContent value="consultation" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chiefComplaint">Chief Complaint *</Label>
                    <Textarea
                      id="chiefComplaint"
                      placeholder="Patient's main concern or reason for visit..."
                      value={consultationData.chiefComplaint}
                      onChange={(e) => setConsultationData({ ...consultationData, chiefComplaint: e.target.value })}
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="diagnosis">Diagnosis *</Label>
                    <Textarea
                      id="diagnosis"
                      placeholder="Primary and secondary diagnoses..."
                      value={consultationData.diagnosis}
                      onChange={(e) => setConsultationData({ ...consultationData, diagnosis: e.target.value })}
                      className="min-h-[80px]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="historyOfPresentIllness">History of Present Illness</Label>
                  <Textarea
                    id="historyOfPresentIllness"
                    placeholder="Detailed history of the current condition..."
                    value={consultationData.historyOfPresentIllness}
                    onChange={(e) =>
                      setConsultationData({ ...consultationData, historyOfPresentIllness: e.target.value })
                    }
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="physicalExamination">Physical Examination</Label>
                  <Textarea
                    id="physicalExamination"
                    placeholder="Physical examination findings..."
                    value={consultationData.physicalExamination}
                    onChange={(e) => setConsultationData({ ...consultationData, physicalExamination: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatmentPlan">Treatment Plan</Label>
                  <Textarea
                    id="treatmentPlan"
                    placeholder="Recommended treatment approach..."
                    value={consultationData.treatmentPlan}
                    onChange={(e) => setConsultationData({ ...consultationData, treatmentPlan: e.target.value })}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="followUpInstructions">Follow-up Instructions</Label>
                    <Textarea
                      id="followUpInstructions"
                      placeholder="Instructions for patient care..."
                      value={consultationData.followUpInstructions}
                      onChange={(e) =>
                        setConsultationData({ ...consultationData, followUpInstructions: e.target.value })
                      }
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nextAppointment">Next Appointment</Label>
                    <Input
                      id="nextAppointment"
                      type="date"
                      value={consultationData.nextAppointment}
                      onChange={(e) => setConsultationData({ ...consultationData, nextAppointment: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalNotes">Additional Notes</Label>
                  <Textarea
                    id="additionalNotes"
                    placeholder="Any additional observations or notes..."
                    value={consultationData.additionalNotes}
                    onChange={(e) => setConsultationData({ ...consultationData, additionalNotes: e.target.value })}
                    className="min-h-[80px]"
                  />
                </div>
              </TabsContent>

              <TabsContent value="prescriptions" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Prescriptions</h3>
                  <Button onClick={addPrescription} size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Medication
                  </Button>
                </div>

                <div className="space-y-4">
                  {prescriptions.map((prescription, index) => (
                    <Card key={prescription.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">Medication {index + 1}</CardTitle>
                          {prescriptions.length > 1 && (
                            <Button variant="ghost" size="sm" onClick={() => removePrescription(prescription.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Medication Name</Label>
                            <Input
                              placeholder="e.g., Amoxicillin"
                              value={prescription.medication}
                              onChange={(e) => updatePrescription(prescription.id, "medication", e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Dosage</Label>
                            <Input
                              placeholder="e.g., 500mg"
                              value={prescription.dosage}
                              onChange={(e) => updatePrescription(prescription.id, "dosage", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Frequency</Label>
                            <Select
                              value={prescription.frequency}
                              onValueChange={(value) => updatePrescription(prescription.id, "frequency", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="once-daily">Once daily</SelectItem>
                                <SelectItem value="twice-daily">Twice daily</SelectItem>
                                <SelectItem value="three-times-daily">Three times daily</SelectItem>
                                <SelectItem value="four-times-daily">Four times daily</SelectItem>
                                <SelectItem value="as-needed">As needed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Duration</Label>
                            <Input
                              placeholder="e.g., 7 days"
                              value={prescription.duration}
                              onChange={(e) => updatePrescription(prescription.id, "duration", e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Special Instructions</Label>
                          <Textarea
                            placeholder="e.g., Take with food, avoid alcohol..."
                            value={prescription.instructions}
                            onChange={(e) => updatePrescription(prescription.id, "instructions", e.target.value)}
                            className="min-h-[60px]"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* <TabsContent value="reports" className="space-y-4">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <h3 className="font-medium mb-1">Upload Medical Reports</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload lab results, X-rays, or other medical documents
                    </p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button asChild variant="outline">
                      <label htmlFor="file-upload" className="cursor-pointer">
                        Choose Files
                      </label>
                    </Button>
                  </div>

                  {reports.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Uploaded Reports</h4>
                      {reports.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => removeReport(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent> */}
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between pt-6 border-t gap-2 sm:gap-0">
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleSaveDraft}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
              <Button onClick={handleCompleteConsultation} disabled={isSubmitting}>
                {isSubmitting ? "Completing..." : "Complete Consultation"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

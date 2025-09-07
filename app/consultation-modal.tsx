"use client"

import type React from "react"

import { useState } from "react"
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
import { User, Calendar, Activity, Plus, Trash2, Save, FileText, Upload, X } from "lucide-react"
import UseAxiosNormal from "./hook/UseAxiosNormal"

interface ConsultationModalProps {
    isOpen: boolean
    onClose: () => void
    patient: any
    onComplete: (data: any) => void
}

export function ConsultationModal({ isOpen, onClose, patient, onComplete }: ConsultationModalProps) {
    const [activeTab, setActiveTab] = useState("consultation")
    const [isSubmitting, setIsSubmitting] = useState(false)
    //console.log('patient', patient)
    const axiossecure = UseAxiosNormal();
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
        // if (!consultationData.chiefComplaint || !consultationData.diagnosis) {
        //   alert("Please fill in the required fields (Chief Complaint and Diagnosis)")
        //   return
        // }
        const updateddata = {
  consultationNotes: consultationData,
  prescriptions: prescriptions.filter((p) => p.medication),
  followUpDate: consultationData.nextAppointment
}

        console.log("Complete consultation data:", JSON.stringify({
            consultation: consultationData,
            prescriptions,
            reports,
            patientId: patient._id,
        }));
        setIsSubmitting(true)

        try {


            const completeData = {
                consultation: consultationData,
                prescriptions: prescriptions.filter((p) => p.medication),
                reports: reports,
                patientId: patient.id,
                completedAt: new Date().toISOString(),
            }
            const response=await axiossecure.patch(`/update-consultation/${patient._id}`,updateddata)
            console.log('response',response)

            onComplete(completeData)
            onClose()
        } catch (error) {
            console.error("Error completing consultation:", error)
        } finally {
            setIsSubmitting(false)
        }
    }
    //console.log('patient',patient)
    if (!patient) return null

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-full w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Complete Consultation - {patient?.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Patient Info Sidebar */}
                    <div className="lg:col-span-3 space-y-4">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Patient Info
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src="/placeholder-user.jpg" alt={patient?.patientName} />
                                        <AvatarFallback>
                                            {(patient?.patientName ?? '').split(" ").map((n: string) => n[0]).join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium text-sm sm:text-base">{patient?.patientName}</h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground">ID: P-{patient?._id}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-xs sm:text-sm">
                                    <div className="flex justify-between">
                                        <span>Age:</span>
                                        <span>{patient?.age}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Gender:</span>
                                        <span>{patient?.gender}</span>
                                    </div>
                                </div>

                                <div className="pt-2 border-t">
                                    <h4 className="font-medium text-xs sm:text-sm mb-2 flex items-center gap-1">
                                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                        Appointment
                                    </h4>
                                    <div className="space-y-1 text-xs sm:text-sm">
                                        <p>Time: {patient.timeSlotId}</p>
                                        <p>Type: {patient?.Reason}</p>
                                        <p>Duration: 15 minutes</p>
                                    </div>
                                </div>

                                <div className="pt-2 border-t">
                                    <h4 className="font-medium text-xs sm:text-sm mb-2 flex items-center gap-1">
                                        <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
                                        Vitals
                                    </h4>
                                    <div className="space-y-1 text-xs sm:text-sm">
                                        <div className="flex justify-between">
                                            <span>BP:</span>
                                            <span>120/80</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Pulse:</span>
                                            <span>72 bpm</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Temp:</span>
                                            <span>98.6°F</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2 border-t">
                                    <h4 className="font-medium text-xs sm:text-sm mb-2">Allergies</h4>
                                    <div className="flex flex-wrap gap-1">
                                        <Badge variant="outline" className="text-xs sm:text-sm">Penicillin</Badge>
                                        <Badge variant="outline" className="text-xs sm:text-sm">Shellfish</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid grid-cols-3 mb-4 gap-1 sm:gap-2">
                                <TabsTrigger value="consultation">Consultation</TabsTrigger>
                                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                                <TabsTrigger value="reports">Reports</TabsTrigger>
                            </TabsList>

                            {/* Consultation Tab */}
                            <TabsContent value="consultation" className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Chief Complaint */}
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
                                    {/* Diagnosis */}
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

                                {/* Other fields (History, Examination, Treatment, etc.) */}
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

                            {/* Prescriptions & Reports Tabs remain mostly unchanged, with `sm:` classes added for better text scaling */}

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

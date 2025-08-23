"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Download, FileText, User, Building, Pill, CalendarPlus } from "lucide-react"
import Link from "next/link"
import { jsPDF } from "jspdf";

interface AppointmentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: any
}

export function AppointmentDetailsModal({ isOpen, onClose, appointment }: AppointmentDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("info")
const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  if (!appointment) return null

  
  const handleDownloadSummary = async () => {
    setIsGeneratingPDF(true)

    try {
      const pdf = new jsPDF()
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 20
      let yPosition = 30

      // Helper function to add text with word wrapping
      const addText = (text: string, x: number, y: number, maxWidth: number, fontSize = 12) => {
        pdf.setFontSize(fontSize)
        const lines = pdf.splitTextToSize(text, maxWidth)
        pdf.text(lines, x, y)
        return y + lines.length * fontSize * 0.4
      }

// ✅ Helper for page breaks
    const checkPageBreak = (neededSpace = 20) => {
      if (yPosition + neededSpace > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
    };
      // Header
      pdf.setFontSize(20)
      pdf.setFont("helvetica", "bold")
      pdf.text("HealthQ - Medical Appointment Summary", margin, yPosition)
      yPosition += 20

      // Patient Information (you might want to add patient data to the appointment object)
      checkPageBreak(40)
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Patient Information", margin, yPosition)
      yPosition += 10

      pdf.setFontSize(12)
      pdf.setFont("helvetica", "normal")
      pdf.text(`Patient Name: ${appointment.patientName}`, margin, yPosition)
      yPosition += 8
      pdf.text(`Patient email: ${appointment.email}`, margin, yPosition)
      yPosition += 15

      // Appointment Information
      checkPageBreak(50);
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "bold")
      pdf.text("Appointment Information", margin, yPosition)
      yPosition += 10

      pdf.setFontSize(12)
      pdf.setFont("helvetica", "normal")
      pdf.text(`Doctor: ${appointment.doctor}`, margin, yPosition)
      yPosition += 8
      pdf.text(`Doctor_Type: ${appointment.Doctor_Type}`, margin, yPosition)
      yPosition += 8
      
      pdf.text(`Date: ${new Date(appointment.date).toLocaleDateString()}`, margin, yPosition)
      yPosition += 8
      pdf.text(`Time: ${appointment.timeSlotId}`, margin, yPosition)
      yPosition += 8
      pdf.text(`Status: ${appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}`, margin, yPosition)
      yPosition += 15

      if (appointment.consultationSummary) {
        // Reason for Visit
        checkPageBreak(40);
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text("Reason for Visit", margin, yPosition)
        yPosition += 10

        pdf.setFontSize(12)
        pdf.setFont("helvetica", "normal")
        yPosition = addText(appointment.consultationSummary.ReasonForVisit, margin, yPosition, pageWidth - 2 * margin)
        yPosition += 10

        // Doctor's Notes
        checkPageBreak(40);
        pdf.setFontSize(14)
        pdf.setFont("helvetica", "bold")
        pdf.text("Doctor's Notes & Diagnosis", margin, yPosition)
        yPosition += 10

        pdf.setFontSize(12)
        pdf.setFont("helvetica", "normal")
        yPosition = addText(appointment.consultationSummary?.doctorNotes, margin, yPosition, pageWidth - 2 * margin)
        yPosition += 15

        // Prescribed Medications
        if (appointment.consultationSummary?.medications && appointment.consultationSummary.medications.length > 0) {
            checkPageBreak(50);
          pdf.setFontSize(16)
          pdf.setFont("helvetica", "bold")
          pdf.text("PRESCRIPTION:", margin, yPosition)
          yPosition += 15

          pdf.setFontSize(14)
          pdf.setFont("helvetica", "bold")
          pdf.text("Prescribed Medications:", margin, yPosition)
          yPosition += 10

          appointment.consultationSummary.medications.forEach((med: any, index: number) => {
            checkPageBreak(30);
            pdf.setFontSize(12)
            pdf.setFont("helvetica", "bold")
            pdf.text(`${index + 1}. ${med.name}`, margin, yPosition)
            yPosition += 8

            pdf.setFont("helvetica", "normal")
            pdf.text(`   Dosage: ${med.dosage}`, margin, yPosition)
            yPosition += 6

            if (med.instructions) {
              yPosition = addText(`   Instructions: ${med.instructions}`, margin, yPosition, pageWidth - 2 * margin)
              yPosition += 5
            }
            yPosition += 5
          })
        }

        // Follow-up Instructions
        if (appointment.consultationSummary.followUpInstructions) {
            checkPageBreak(40);
          yPosition += 10
          pdf.setFontSize(14)
          pdf.setFont("helvetica", "bold")
          pdf.text("Follow-up Instructions", margin, yPosition)
          yPosition += 10

          pdf.setFontSize(12)
          pdf.setFont("helvetica", "normal")
          yPosition = addText(
            appointment.consultationSummary.followUpInstructions,
            margin,
            yPosition,
            pageWidth - 2 * margin,
          )
        }
      }

//   const handleDownloadSummary = () => {
//     // In a real application, this would generate and download a PDF
//     alert("Downloading appointment summary as PDF...")
//   }
        // Footer
      checkPageBreak(30);
      pdf.setFontSize(10)
      pdf.setFont("helvetica", "normal")
      pdf.text("Generated by HealthQ - Digital Healthcare Platform", margin, pageHeight - 30)
      pdf.text(`Generated on: ${new Date().toLocaleString()}`, margin, pageHeight - 20)
      pdf.text("This is a computer-generated document and does not require a signature.", margin, pageHeight - 10)

      // Save the PDF
      const fileName = `HealthQ_Appointment_${appointment.patientName.replace(/\s+/g, "_")}_${new Date(appointment.date).toISOString().split("T")[0]}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Appointment Details
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="summary">Consultation</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant={appointment.status === "completed" ? "secondary" : "outline"}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Badge>
              <span className="text-sm ">
                {new Date(appointment.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">{appointment.doctor}</h3>
                  {/* <p className="text-sm text-muted-foreground">{appointment.Doctor_Type}</p> */}
                  {/* {appointment.doctorProfile && (
                    <Link href={appointment.doctorProfile} className="text-sm text-primary hover:underline">
                      View Doctor Profile
                    </Link>
                  )} */}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Department</h3>
                  <p className="text-sm">{appointment.Doctor_Type}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium">Time Details</h3>
                  <p className="text-sm">{appointment.timeSlotId}</p>
                  {appointment.queuePosition && <p className="text-sm">Queue Number: {appointment.queuePosition}</p>}
                  {appointment && (
                    <div className="text-sm">
                      <span>Predicted Wait: {appointment.estimatedWaitTime ||'null'}</span>
                      <span className="mx-2">•</span>
                      <span>Actual Wait: {appointment.ActualWaitTime ||'null'}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="summary" className="space-y-4">
            {appointment.consultationSummary ? (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Reason for Visit</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{appointment.consultationSummary.ReasonForVisit}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Doctor&apos;s Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{appointment.consultationSummary.doctorNotes}</p>
                  </CardContent>
                </Card>

                {appointment.consultationSummary.medications && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Pill className="h-4 w-4" />
                        Prescribed Medications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {appointment.consultationSummary.medications.map((med: any, index: number) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium">{med.name}</span> - {med.dosage}
                            {med.instructions && <p className="text-muted-foreground">{med.instructions}</p>}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {appointment.consultationSummary.followUpInstructions && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Follow-up Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{appointment.consultationSummary.followUpInstructions}</p>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium mb-1">No Consultation Summary Available</h3>
                <p className="text-sm text-muted-foreground">
                  The doctor hasn&#39;t provided a consultation summary for this appointment.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            {appointment.reports && appointment.reports.length > 0 ? (
              <div className="space-y-3">
                {appointment.reports.map((report: any, index: number) => (
                  <Card key={index}>
                    <CardContent className="p-4 flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{report.name}</h3>
                        <p className="text-sm text-muted-foreground">{report.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={report.url} target="_blank" rel="noopener noreferrer">
                            View
                          </a>
                        </Button>
                        {/* <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button> */}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium mb-1">No Reports Available</h3>
                <p className="text-sm text-muted-foreground">
                  There are no medical reports linked to this appointment.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <Button className="flex-1" onClick={handleDownloadSummary} disabled={isGeneratingPDF}>
            <Download className="h-4 w-4 mr-2" />
            {isGeneratingPDF ? "Generating PDF..." : "Download Summary"}
          </Button>
          {/* <Button className="flex-1 bg-transparent" variant="outline" asChild>
            <Link href={`/patient/book-appointment?followUp=true&doctorId=${appointment.doctorId}`}>
              <CalendarPlus className="h-4 w-4 mr-2" />
              Book Follow-up
            </Link>
          </Button> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { use, useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, ChevronRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useDoctors from "@/app/hook/useDoctors"

type Medication = {
  name: string;
  dosage: string;
  instructions: string;
};

type Report = {
  name: string;
  date: string;
  type: string;
};

type ConsultationSummary = {
  reasonForVisit: string;
  doctorNotes: string;
  medications: Medication[];
  followUpInstructions: string;
};

export type Patient = {
  _id: string;
  doctorId: string;
  date: string; // ISO date string
  timeSlotId: string;
  reason: string;
  notes: string;
  doctor: string;
  age: string;
  gender: string;
  specialty: string;
  status: string;
  email: string;
  consultationSummary: ConsultationSummary;
  reports: Report[];
  ActualWaitTime: string;
  estimatedWaitTime: string;
  queuePosition: string;
  patientName: string;
  lastVisit: string;
  nextAppointment: string;
};

// Mock data for patients
// const patients = [
//   {
//     id: "P-000001",
//     name: "John Smith",
//     age: 45,
//     gender: "Male",
//     lastVisit: "Apr 1, 2025",
//     nextAppointment: "Apr 14, 2025",
//     status: "active",
//     condition: "Hypertension",
//     email: "john.smith@example.com",
//     phone: "(555) 123-4567",
//   },
//   {
//     id: "P-000002",
//     name: "Emily Johnson",
//     age: 32,
//     gender: "Female",
//     lastVisit: "Mar 15, 2025",
//     nextAppointment: "Apr 15, 2025",
//     status: "active",
//     condition: "Diabetes Type 2",
//     email: "emily.johnson@example.com",
//     phone: "(555) 234-5678",
//   },
//   {
//     id: "P-000003",
//     name: "Michael Brown",
//     age: 28,
//     gender: "Male",
//     lastVisit: "Mar 20, 2025",
//     nextAppointment: "Apr 20, 2025",
//     status: "active",
//     condition: "Asthma",
//     email: "michael.brown@example.com",
//     phone: "(555) 345-6789",
//   },
//   {
//     id: "P-000004",
//     name: "Sarah Davis",
//     age: 52,
//     gender: "Female",
//     lastVisit: "Feb 28, 2025",
//     nextAppointment: "Apr 28, 2025",
//     status: "active",
//     condition: "Arthritis",
//     email: "sarah.davis@example.com",
//     phone: "(555) 456-7890",
//   },
//   {
//     id: "P-000005",
//     name: "David Wilson",
//     age: 39,
//     gender: "Male",
//     lastVisit: "Mar 10, 2025",
//     nextAppointment: null,
//     status: "inactive",
//     condition: "Migraine",
//     email: "david.wilson@example.com",
//     phone: "(555) 567-8901",
//   },
//   {
//     id: "P-000006",
//     name: "Jennifer Lee",
//     age: 41,
//     gender: "Female",
//     lastVisit: "Mar 5, 2025",
//     nextAppointment: "Apr 15, 2025",
//     status: "active",
//     condition: "Hypothyroidism",
//     email: "jennifer.lee@example.com",
//     phone: "(555) 678-9012",
//   },
//   {
//     id: "P-000007",
//     name: "Robert Taylor",
//     age: 65,
//     gender: "Male",
//     lastVisit: "Mar 25, 2025",
//     nextAppointment: "Apr 25, 2025",
//     status: "active",
//     condition: "Coronary Artery Disease",
//     email: "robert.taylor@example.com",
//     phone: "(555) 789-0123",
//   },
//   {
//     id: "P-000008",
//     name: "Lisa Martinez",
//     age: 29,
//     gender: "Female",
//     lastVisit: "Feb 15, 2025",
//     nextAppointment: null,
//     status: "inactive",
//     condition: "Anxiety",
//     email: "lisa.martinez@example.com",
//     phone: "(555) 890-1234",
//   },
// ]

export default function DoctorPatientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { doctorpatientinfo: patients } = useDoctors()
  //console.log('doctorinfo',JSON.stringify(patients, null, 2))
  // Filter patients based on search query and active tab
  const filteredPatients = patients.filter((patient: Patient) => {
    const matchesSearch =
      patient.patientName.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && patient.status === "active"
    if (activeTab === "inactive") return matchesSearch && patient.status === "inactive"

    return matchesSearch
  })

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
              <p className="">Manage your patient records</p>
            </div>
            {/* <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button> */}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>Patient List</CardTitle>
                    <CardDescription>View and manage your patients</CardDescription>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 " />
                    <Input
                      type="search"
                      placeholder="Search patients..."
                      className="pl-8 w-full md:w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All Patients</TabsTrigger>
                    {/* <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="inactive">Inactive</TabsTrigger> */}
                  </TabsList>
                  <div className="space-y-2">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient: Patient) => (
                        <div
                          key={patient._id}
                          className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border hover:border-primary/50 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                {patient?.patientName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{patient.patientName}</p>
                                <Badge
                                  variant={patient.status === "completed" ? "outline" : "secondary"}
                                  className="text-xs"
                                >
                                  {patient.status === "completed" ? "Completed" : "Upcoming"}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1 text-sm ">
                                <span>{patient._id}</span>
                                <span>•</span>
                                <span>
                                  {patient.age} • {patient.gender}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-0 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                            <div className="text-sm">
                              <div>
                                <span>
                                  Last Visit:{" "}
                                  {patient?.date
                                    ? new Date(patient.date) > new Date()
                                      ? "Didn’t Visited yet"
                                      : new Date(patient.date).toLocaleDateString("en-GB")
                                    : "Didn’t Visited yet"}
                                </span>

                              </div>
                              <div>
                                <span className="">Next: </span>
                                <span>{patient?.nextAppointment || "Not Scheduled"}</span>
                              </div>
                            </div>
                            {/* <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ChevronRight className="h-4 w-4" />
                              <span className="sr-only">View Patient</span>
                            </Button> */}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="rounded-full bg-muted p-3 mb-4">
                          <Search className="h-6 w-6 " />
                        </div>
                        <h3 className="font-medium mb-1">No Patients Found</h3>
                        <p className="text-sm  mb-4">No patients match your search criteria</p>
                        <Button size="sm" onClick={() => setSearchQuery("")}>
                          Clear Search
                        </Button>
                      </div>
                    )}
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

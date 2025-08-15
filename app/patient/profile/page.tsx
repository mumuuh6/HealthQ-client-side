"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSession } from "next-auth/react"


import UseAxiosNormal from "@/app/hook/UseAxiosNormal"
import Swal from "sweetalert2"
import usePatients from "@/app/hook/usePatient"




export default function PatientProfilePage() {
  const { data: session, status, update } = useSession();
  const axiossecure = UseAxiosNormal()
  const { patientinfo: patient, refetch } = usePatients();
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  // type PatientProfile = {
  //   name: string
  //   email: string
  //   phone: string
  //   dateOfBirth: string
  //   gender: string
  //   age?: number | string
  //   address: string
  //   emergencyContact?: {
  //     name?: string
  //     relationship?: string
  //     phone?: string
  //   }
  //   medicalInfo?: {
  //     allergies?: string
  //     medications?: string
  //     conditions?: string
  //     bloodType?: string
  //   }
  //   // insurance?: {
  //   //   provider?: string
  //   //   policyNumber?: string
  //   //   groupNumber?: string
  //   //   primaryHolder?: string
  //   // }
  //   [key: string]: any
  // }

  const [profile, setProfile] = useState({
  name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  age: "",
  address: "",
  emergencyContact: {
    name: "",
    relationship: "",
    phone: "",
  },
  medicalInfo: {
    allergies: "",
    medications: "",
    conditions: "",
    bloodType: "",
  },
  insurance: {
    provider: "",
    policyNumber: "",
    groupNumber: "",
    primaryHolder: "",
  },
})
  const isLoading = status === "loading";

  const calculateAge = (dob:string) => {
    console.log("Calculating age for date of birth:", dob);
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (isEditing && patient) {
      
      setProfile({
        ...patient,
        age: calculateAge(patient.dateOfBirth),
      })
    }
  }, [isEditing, patient]);
  if (isLoading) return <div>Loading...</div>;

  const handleSaveProfile = async () => {

    try {
      const res = await axiossecure.patch(`/profile/${session?.user?.email}`, profile);
      if (res?.data?.result?.modifiedCount > 0) {
        Swal.fire({
          title: "Profile Updated Successfully",
          icon: "success",
        });
        await update();
      }
      await refetch();
      setIsEditing(false)
    }
    catch (error) {
      console.error("Error saving profile:", error);

    }

  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-muted/40">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
              <p className="">Manage your personal information and settings</p>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveProfile}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="https://images.app.goo.gl/3wWrAmJDAEVYkPZy9" alt={profile?.name||''} />
                      <AvatarFallback className="text-2xl">
                        {profile?.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                      >
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload avatar</span>
                      </Button>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{patient.name}</CardTitle>
                    <CardDescription className="text-lg">Patient</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="medical">Medical Info</TabsTrigger>
                    {/* <TabsTrigger value="insurance">Insurance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="personal" className="space-y-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={profile?.name || ''}
                              placeholder={patient?.name}
                              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profile?.email}
                              placeholder={patient.email}
                              readOnly
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={profile?.phone}
                              placeholder={patient.phone}
                              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                              id="dob"
                              type="date"
                              value={profile?.dateOfBirth}
                              onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Gender</Label>
                          <RadioGroup
                            value={profile?.gender}
                            onValueChange={(value) => setProfile({ ...profile, gender: value })}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other">Other</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={profile?.address}
                            placeholder={patient.address}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="age">Age</Label>
                          <Input id="age"
                            value={profile?.age}
                            readOnly />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Emergency Contact</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="emergency-name">Name</Label>
                              <Input
                                id="emergency-name"
                                value={profile?.emergencyContact?.name}
                                placeholder={patient.emergencyContact?.name}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    emergencyContact: {
                                      ...profile.emergencyContact,
                                      name: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="emergency-relationship">Relationship</Label>
                              <Input
                                id="emergency-relationship"
                                value={profile?.emergencyContact?.relationship}
                                placeholder={patient.emergencyContact?.relationship}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    emergencyContact: {
                                      ...profile.emergencyContact,
                                      relationship: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="emergency-phone">Phone</Label>
                              <Input
                                id="emergency-phone"
                                value={profile?.emergencyContact?.phone}
                                placeholder={patient.emergencyContact?.phone}
                                onChange={(e) =>
                                  setProfile({
                                    ...profile,
                                    emergencyContact: {
                                      ...profile.emergencyContact,
                                      phone: e.target.value,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium">Contact Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm ">Email</p>
                              <p>{patient.email}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Phone</p>
                              <p>{patient.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Date of Birth</p>
                              <p>{new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                            </div>
                            <div>
                            <p className="text-sm">Gender</p>
                              <p>
                                {patient?.gender
                                  ? patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)
                                  : "Not Provided"}
                              </p>

                            </div>
                            <div>
                              <p className="text-sm ">Address</p>
                              <p>{patient.address}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Age</p>
                              <p>{patient.age || 'Birthdate not provided'}</p>
                            </div>
                          </div>

                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium">Emergency Contact</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm ">Name</p>
                              <p>{patient.emergencyContact?.name}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Relationship</p>
                              <p>{patient.emergencyContact?.relationship}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Phone</p>
                              <p>{patient.emergencyContact?.phone}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="medical" className="space-y-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="allergies">Allergies</Label>
                          <Textarea
                            id="allergies"
                            value={profile?.medicalInfo?.allergies}
                            placeholder={patient?.medicalInfo?.allergies || "None"}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                medicalInfo: { ...profile.medicalInfo, allergies: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="medications">Current Medications</Label>
                          <Textarea
                            id="medications"
                            value={profile?.medicalInfo?.medications}
                            placeholder={patient?.medicalInfo?.medications || "None"}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                medicalInfo: { ...profile.medicalInfo, medications: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="conditions">Medical Conditions</Label>
                          <Textarea
                            id="conditions"
                            value={profile?.medicalInfo?.conditions}
                            placeholder={patient.medicalInfo?.conditions || "None"}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                medicalInfo: { ...profile.medicalInfo, conditions: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="blood-type">Blood Type</Label>
                          <Select
                            value={profile?.medicalInfo?.bloodType}
                            onValueChange={(value) =>
                              setProfile({
                                ...profile,
                                medicalInfo: { ...profile.medicalInfo, bloodType: value },
                              })
                            }
                          >
                            <SelectTrigger id="blood-type">
                              <SelectValue placeholder="Select blood type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm ">Allergies</p>
                            <p>{patient?.medicalInfo?.allergies || "None"}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm ">Current Medications</p>
                            <p>{patient?.medicalInfo?.medications || "None"}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm ">Medical Conditions</p>
                            <p>{patient?.medicalInfo?.conditions || "None"}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm ">Blood Type</p>
                            <p>{patient?.medicalInfo?.bloodType || "Unknown"}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  {/* <TabsContent value="insurance" className="space-y-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="insurance-provider">Insurance Provider</Label>
                            <Input
                              id="insurance-provider"
                              value={profile.insurance?.provider}
                              placeholder={patient.insurance?.provider || "None"}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  insurance: { ...profile.insurance, provider: e.target.value },
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="policy-number">Policy Number</Label>
                            <Input
                              id="policy-number"
                              value={profile.insurance.policyNumber}
                              placeholder={patient.insurance?.policyNumber || "None"}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  insurance: { ...profile.insurance, policyNumber: e.target.value },
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="group-number">Group Number</Label>
                            <Input
                              id="group-number"
                              value={profile.insurance.groupNumber}
                              placeholder={patient.insurance?.groupNumber || "None"}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  insurance: { ...profile.insurance, groupNumber: e.target.value },
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="primary-holder">Primary Holder</Label>
                            <Input
                              id="primary-holder"
                              value={profile.insurance.primaryHolder}
                              placeholder={patient.insurance?.primaryHolder || "Self"}
                              onChange={(e) =>
                                setProfile({
                                  ...profile,
                                  insurance: { ...profile.insurance, primaryHolder: e.target.value },
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm ">Insurance Provider</p>
                              <p>{patient.insurance?.provider}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Policy Number</p>
                              <p>{patient.insurance?.policyNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Group Number</p>
                              <p>{patient.insurance?.groupNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Primary Holder</p>
                              <p>{patient.insurance?.primaryHolder}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent> */}
                  {/* <TabsContent value="security" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button>
                          <Lock className="mr-2 h-4 w-4" />
                          Update Password
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm ">
                        Add an extra layer of security to your account by enabling two-factor authentication.
                      </p>
                      <Button variant="outline">Enable 2FA</Button>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Privacy Settings</h3>
                      <p className="text-sm ">
                        Manage how your information is used and shared within the HealthQ platform.
                      </p>
                      <Button variant="outline">Manage Privacy Settings</Button>
                    </div>
                  </TabsContent> */}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  Upload, Save, Lock } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Mock patient profile data
const patientProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  dateOfBirth: "1985-06-15",
  gender: "male",
  address: "123 Main St, Apt 4B, New York, NY 10001",
  emergencyContact: {
    name: "Jane Doe",
    relationship: "Spouse",
    phone: "(555) 987-6543",
  },
  medicalInfo: {
    allergies: "Penicillin, Peanuts",
    medications: "Lisinopril 10mg daily, Atorvastatin 20mg daily",
    conditions: "Hypertension, High Cholesterol",
    bloodType: "O+",
  },
  insurance: {
    provider: "Blue Cross Blue Shield",
    policyNumber: "XYZ123456789",
    groupNumber: "GRP987654",
    primaryHolder: "Self",
  },
}

export default function PatientProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(patientProfile)

  const handleSaveProfile = () => {
    // In a real app, you would save the profile data to your backend here
    setIsEditing(false)
    // Show success message
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
                      <AvatarImage src="/placeholder-user.jpg" alt={profile.name} />
                      <AvatarFallback className="text-2xl">
                        {profile.name
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
                    <CardTitle className="text-2xl">{profile.name}</CardTitle>
                    <CardDescription className="text-lg">Patient</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="medical">Medical Info</TabsTrigger>
                    <TabsTrigger value="insurance">Insurance</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal" className="space-y-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              value={profile.name}
                              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={profile.email}
                              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={profile.phone}
                              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dob">Date of Birth</Label>
                            <Input
                              id="dob"
                              type="date"
                              value={profile.dateOfBirth}
                              onChange={(e) => setProfile({ ...profile, dateOfBirth: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Gender</Label>
                          <RadioGroup
                            value={profile.gender}
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
                            value={profile.address}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">Emergency Contact</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="emergency-name">Name</Label>
                              <Input
                                id="emergency-name"
                                value={profile.emergencyContact.name}
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
                                value={profile.emergencyContact.relationship}
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
                                value={profile.emergencyContact.phone}
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
                              <p>{profile.email}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Phone</p>
                              <p>{profile.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Date of Birth</p>
                              <p>{new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Gender</p>
                              <p>{profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1)}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm ">Address</p>
                            <p>{profile.address}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium">Emergency Contact</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm ">Name</p>
                              <p>{profile.emergencyContact.name}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Relationship</p>
                              <p>{profile.emergencyContact.relationship}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Phone</p>
                              <p>{profile.emergencyContact.phone}</p>
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
                            value={profile.medicalInfo.allergies}
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
                            value={profile.medicalInfo.medications}
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
                            value={profile.medicalInfo.conditions}
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
                            value={profile.medicalInfo.bloodType}
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
                            <p>{profile.medicalInfo.allergies || "None"}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm ">Current Medications</p>
                            <p>{profile.medicalInfo.medications || "None"}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm ">Medical Conditions</p>
                            <p>{profile.medicalInfo.conditions || "None"}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm ">Blood Type</p>
                            <p>{profile.medicalInfo.bloodType || "Unknown"}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="insurance" className="space-y-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="insurance-provider">Insurance Provider</Label>
                            <Input
                              id="insurance-provider"
                              value={profile.insurance.provider}
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
                              <p>{profile.insurance.provider}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Policy Number</p>
                              <p>{profile.insurance.policyNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Group Number</p>
                              <p>{profile.insurance.groupNumber}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Primary Holder</p>
                              <p>{profile.insurance.primaryHolder}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="security" className="space-y-6">
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

"use client"

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

// Mock doctor profile data
const doctorProfile = {
  name: "Dr. Sarah Roberts",
  specialty: "Cardiologist",
  email: "sarah.roberts@healthq.com",
  phone: "(555) 123-4567",
  address: "123 Medical Center Dr, Suite 456, New York, NY 10001",
  bio: "Dr. Sarah Roberts is a board-certified cardiologist with over 10 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and heart failure management.",
  education: [
    {
      degree: "Doctor of Medicine",
      institution: "Harvard Medical School",
      year: "2010",
    },
    {
      degree: "Residency in Internal Medicine",
      institution: "Massachusetts General Hospital",
      year: "2013",
    },
    {
      degree: "Fellowship in Cardiovascular Disease",
      institution: "Stanford University Medical Center",
      year: "2016",
    },
  ],
  certifications: [
    {
      name: "Board Certification in Cardiovascular Disease",
      issuer: "American Board of Internal Medicine",
      year: "2016",
    },
    {
      name: "Advanced Cardiac Life Support (ACLS)",
      issuer: "American Heart Association",
      year: "2023",
    },
  ],
}

export default function DoctorProfilePage() {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(doctorProfile)

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
                      <AvatarImage src="https://images.app.goo.gl/3wWrAmJDAEVYkPZy9" alt={profile.name} />
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
                    <CardDescription className="text-lg">{profile.specialty}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
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
                            <Label htmlFor="specialty">Specialty</Label>
                            <Input
                              id="specialty"
                              value={profile.specialty}
                              onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
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
                          <Label htmlFor="bio">Professional Bio</Label>
                          <Textarea
                            id="bio"
                            rows={5}
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                          />
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
                          </div>
                          <div>
                            <p className="text-sm ">Address</p>
                            <p>{profile.address}</p>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium">Professional Bio</h3>
                          <p>{profile.bio}</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="qualifications" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Education</h3>
                      {profile.education.map((edu, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{edu.degree}</p>
                              <p className="text-sm ">{edu.institution}</p>
                            </div>
                            <p className="text-sm">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                      {isEditing && (
                        <Button variant="outline" className="w-full">
                          Add Education
                        </Button>
                      )}
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Certifications</h3>
                      {profile.certifications.map((cert, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-medium">{cert.name}</p>
                              <p className="text-sm ">{cert.issuer}</p>
                            </div>
                            <p className="text-sm">{cert.year}</p>
                          </div>
                        </div>
                      ))}
                      {isEditing && (
                        <Button variant="outline" className="w-full">
                          Add Certification
                        </Button>
                      )}
                    </div>
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

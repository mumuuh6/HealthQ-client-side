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
import { Upload, Save} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import UseAxiosNormal from "@/app/hook/UseAxiosNormal"
import { useSession } from "next-auth/react"
import Swal from "sweetalert2"
import useDoctors from "@/app/hook/useDoctors"

const dayMap: Record<string, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};
const dayMapReverse: Record<number, string> = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  7: "Sunday",
};
// interface Education {
//                         degree: string;
//                         institution: string;
//                         year: string;
//                       }
// interface Certification {
//                         name: string;
//                         issuer: string;
//                         year: string;
//                       }
function getDayNamesFromNumbers(days: number[]) {
  return days
    .map(day => dayMapReverse[day])
    .filter(Boolean)
    .join(", ");
}
// Mock doctor profile data
const doctorProfile = {
  name: "",
  specialty: "",
  email: "",
  phone: "",
  address: "",
  availableDays: "",
  bio: "",
  // education: [
  //   {
  //     degree: "",
  //     institution: "",
  //     year: "",
  //   },
  //   {
  //     degree: "",
  //     institution: "",
  //     year: "",
  //   },
  //   {
  //     degree: "",
  //     institution: "",
  //     year: "",
  //   },
  // ],
  // certifications: [
  //   {
  //     name: "",
  //     issuer: "",
  //     year: "",
  //   },
  //   {
  //     name: "",
  //     issuer: "",
  //     year: "",
  //   },
  // ],
}

export default function DoctorProfilePage() {
  const axiossecure = UseAxiosNormal()
  const { doctorinfo:doctor, refetch } = useDoctors()
  //console.log("Doctor info:", doctor)
  const { data: session, update } = useSession()
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(doctorProfile)

  const handleSaveProfile = async () => {
    const daysArray = String(profile.availableDays || "")
      .split(",")
      .map(day => day.trim().toLowerCase())
      .map(day => dayMap[day])
      .filter(Boolean);
    const updatedProfile = {
      ...profile,
      availableDays: daysArray.length > 0 ? daysArray : [],
    }
    
    // In a real app, you would save the profile data to your backend here
    try {
      const res = await axiossecure.patch(`/profile/${session?.user?.email}`, updatedProfile);

      if (res?.data?.result?.modifiedCount > 0) {
        Swal.fire({
          title: "Profile Updated Successfully",
          icon: "success",
        });
        await update();
      }
       await refetch();
    }
    catch (error) {
      console.error("Error saving profile:", error);

    }
    setIsEditing(false)
    // Show success message
  }
  //console.log("Profile data:", JSON.stringify(profile, null, 2))
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
                      <AvatarImage src="https://images.app.goo.gl/3wWrAmJDAEVYkPZy9" alt={doctor?.name} />
                      <AvatarFallback className="text-2xl">
                        {doctor?.name ? doctor.name.
                          split(" ")
                          .map((n:string) => n[0])
                          .join(""):"NA"}
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
                    <CardTitle className="text-2xl">{doctor?.name}</CardTitle>
                    <CardDescription className="text-lg">{doctor?.specialty}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    {/* <TabsTrigger value="qualifications">Qualifications</TabsTrigger> */}
                    {/* <TabsTrigger value="security">Security</TabsTrigger> */}
                  </TabsList>
                  <TabsContent value="personal" className="space-y-6">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              placeholder={doctor.name}
                              value={profile?.name}
                              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="specialty">Specialty</Label>
                            <Input
                              id="specialty"
                              value={profile?.specialty}
                              placeholder={doctor.specialty}
                              onChange={(e) => setProfile({ ...profile, specialty: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder={doctor.email}
                              value={profile?.email}
                              readOnly
                              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              placeholder={doctor.phone}
                              value={profile?.phone}
                              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              placeholder={doctor.address}
                              value={profile?.address}
                              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="availableDays">Available Days</Label>
                            <Input
                              id="availableDays"
                              placeholder="e.g. Monday, Thursday, Saturday"
                              value={profile?.availableDays || ""}
                              onChange={(e) => setProfile({ ...profile, availableDays: e.target.value })}

                            />
                          </div>

                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Professional Bio</Label>
                          <Textarea
                            id="bio"
                            rows={5}
                            value={profile?.bio}
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
                              <p>{doctor.email}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Phone</p>
                              <p>{doctor.phone}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm ">Address</p>
                              <p>{doctor.address}</p>
                            </div>
                            <div>
                              <p className="text-sm ">Available Days</p>
                              <p>
                                {Array.isArray(doctor.availableDays)
                                  ? getDayNamesFromNumbers(doctor.availableDays)
                                  : profile?.availableDays
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium">Professional Bio</h3>
                          <p>{doctor.bio}</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  {/* <TabsContent value="qualifications" className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Education</h3>
                      {doctor?.education?.map((edu:Education, index:number) => (
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
                      {doctor?.certifications?.map((cert:Certification, index:number) => (
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

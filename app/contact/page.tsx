"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import Link from "next/link"
import Swal from "sweetalert2"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Mail, Phone, MapPin, HelpCircle } from "lucide-react"

type ContactFormValues = {
    name: string
    email: string
    subject: string
    message: string
}

export default function ContactPage() {
    const [activeTab, setActiveTab] = useState("general")

    const form = useForm<ContactFormValues>({
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    const onSubmit = (data: ContactFormValues) => {
        // In a real app, you would send this data to your backend
        console.log("Contact form data:", data)

        // Show success message
        Swal.fire({
            title: "Message Sent!",
            text: "Thank you for contacting us. We'll get back to you soon.",
            icon: "success",
            confirmButtonColor: "hsl(var(--primary))",
        }).then(() => {
            // Reset form
            form.reset()
        })
    }

    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1 py-5 lg:py-10 bg-muted/40">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col items-center text-center space-y-4 mb-12">
                        <motion.h1
                            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            Contact Us
                        </motion.h1>
                        <motion.p
                            className="max-w-[700px]  md:text-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Have questions or need assistance? We're here to help you.
                        </motion.p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}

                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Send Us a Message</CardTitle>
                                    <CardDescription>
                                        Fill out the form below and we'll get back to you as soon as possible.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent >
                                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-9">
                                        <TabsList className="mb-4 grid w-full grid-cols-3">
                                            <TabsTrigger value="general">General</TabsTrigger>
                                            <TabsTrigger value="support">Support</TabsTrigger>
                                            <TabsTrigger value="business">Business</TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="general" className="space-y-4">
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Name</Label>
                                                        <Input
                                                            id="name"
                                                            placeholder="Your name"
                                                            {...form.register("name", { required: "Name is required" })}
                                                        />
                                                        {form.formState.errors.name && (
                                                            <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                                                        )}
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="Your email"
                                                            {...form.register("email", {
                                                                required: "Email is required",
                                                                pattern: {
                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                    message: "Invalid email address",
                                                                },
                                                            })}
                                                        />
                                                        {form.formState.errors.email && (
                                                            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="subject">Subject</Label>
                                                    <Input
                                                        id="subject"
                                                        placeholder="What is this regarding?"
                                                        {...form.register("subject", { required: "Subject is required" })}
                                                    />
                                                    {form.formState.errors.subject && (
                                                        <p className="text-sm text-red-500">{form.formState.errors.subject.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="message">Message</Label>
                                                    <Textarea
                                                        id="message"
                                                        placeholder="Your message"
                                                        rows={5}
                                                        {...form.register("message", { required: "Message is required" })}
                                                    />
                                                    {form.formState.errors.message && (
                                                        <p className="text-sm text-red-500">{form.formState.errors.message.message}</p>
                                                    )}
                                                </div>
                                                <Button type="submit" className="w-full">
                                                    Send Message
                                                </Button>
                                            </form>
                                        </TabsContent>

                                        <TabsContent value="support" className="space-y-4">
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Name</Label>
                                                        <Input
                                                            id="name"
                                                            placeholder="Your name"
                                                            {...form.register("name", { required: "Name is required" })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="Your email"
                                                            {...form.register("email", { required: "Email is required" })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="subject">Support Topic</Label>
                                                    <select
                                                        id="subject"
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        {...form.register("subject", { required: "Topic is required" })}
                                                    >
                                                        <option value="">Select a topic</option>
                                                        <option value="account">Account Issues</option>
                                                        <option value="booking">Booking Problems</option>
                                                        <option value="technical">Technical Support</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="message">Describe Your Issue</Label>
                                                    <Textarea
                                                        id="message"
                                                        placeholder="Please provide details about your issue"
                                                        rows={5}
                                                        {...form.register("message", { required: "Message is required" })}
                                                    />
                                                </div>
                                                <Button type="submit" className="w-full">
                                                    Submit Support Request
                                                </Button>
                                            </form>
                                        </TabsContent>

                                        <TabsContent value="business" className="space-y-4">
                                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Name</Label>
                                                        <Input
                                                            id="name"
                                                            placeholder="Your name"
                                                            {...form.register("name", { required: "Name is required" })}
                                                        />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            placeholder="Your email"
                                                            {...form.register("email", { required: "Email is required" })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="subject">Business Inquiry</Label>
                                                    <select
                                                        id="subject"
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder: focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                        {...form.register("subject", { required: "Inquiry type is required" })}
                                                    >
                                                        <option value="">Select inquiry type</option>
                                                        <option value="partnership">Partnership Opportunities</option>
                                                        <option value="enterprise">Enterprise Solutions</option>
                                                        <option value="demo">Request a Demo</option>
                                                        <option value="pricing">Pricing Information</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="message">Message</Label>
                                                    <Textarea
                                                        id="message"
                                                        placeholder="Tell us about your business needs"
                                                        rows={5}
                                                        {...form.register("message", { required: "Message is required" })}
                                                    />
                                                </div>
                                                <Button type="submit" className="w-full">
                                                    Send Business Inquiry
                                                </Button>
                                            </form>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="space-y-8"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                    <CardDescription>Reach out to us through any of these channels</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-primary/10 p-3">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Email</h3>
                                            <p className="text-sm ">For general inquiries</p>
                                            <a href="mailto:info@healthq.com" className="text-primary hover:underline">
                                                info@healthq.com
                                            </a>
                                            <p className="text-sm  mt-2">For support</p>
                                            <a href="mailto:support@healthq.com" className="text-primary hover:underline">
                                                support@healthq.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-primary/10 p-3">
                                            <Phone className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Phone</h3>
                                            <p className="text-sm ">Customer Service</p>
                                            <a href="tel:+18001234567" className="text-primary hover:underline">
                                                +8801963175097
                                            </a>
                                            <p className="text-sm  mt-2">Technical Support</p>
                                            <a href="tel:+18009876543" className="text-primary hover:underline">
                                                +8801963175097
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="rounded-full bg-primary/10 p-3">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Office Location</h3>
                                            <p className="text-sm ">Headquarters</p>
                                            <p>RASG-1,Dattapara,Ashulia</p>
                                            <p>Dhaka,Bangladesh</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                        </motion.div>
                    </div>

                    <motion.div
                        className="mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}  >
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Frequently Asked Questions</CardTitle>
                                <CardDescription>Quick answers to common questions</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="font-medium flex items-center gap-2">
                                        <HelpCircle className="h-4 w-4 text-primary" />
                                        How do I book an appointment?
                                    </h3>
                                    <p className="text-sm  pl-6">
                                        You can book an appointment by logging into your account and navigating to the "Book Appointment"
                                        section. Follow the prompts to select a doctor, date, and time.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-medium flex items-center gap-2">
                                        <HelpCircle className="h-4 w-4 text-primary" />
                                        How do I join a virtual queue?
                                    </h3>
                                    <p className="text-sm  pl-6">
                                        On the day of your appointment, log in to your account and navigate to your upcoming appointments.
                                        Click on "Join Queue" for the relevant appointment.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-medium flex items-center gap-2">
                                        <HelpCircle className="h-4 w-4 text-primary" />
                                        How can healthcare providers sign up?
                                    </h3>
                                    <p className="text-sm  pl-6">
                                        Healthcare providers can sign up by contacting our business team through the Business Inquiry form
                                        or by calling our sales department.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-medium flex items-center gap-2">
                                        <HelpCircle className="h-4 w-4 text-primary" />
                                        Is my data secure?
                                    </h3>
                                    <p className="text-sm  pl-6">
                                        Yes, we take data security very seriously. All patient information is encrypted and stored
                                        securely in compliance with healthcare privacy regulations.
                                    </p>
                                </div>

                                <Link href="/faq" className="text-primary hover:underline flex items-center gap-1 text-sm mt-4">
                                    View all FAQs
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-4 w-4"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <motion.div
                        className="mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Our Location</CardTitle>
                                <CardDescription>Visit our headquarters</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="aspect-video w-full overflow-hidden rounded-md border">
                                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14591.013368853077!2d90.3274333!3d23.8983637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c25a71cf5873%3A0xd64e6f32619e3132!2sAshulia!5e0!3m2!1sen!2sbd!4v1744617844728!5m2!1sen!2sbd"
                                      width="100%"
                                      height="100%"
                                      style={{ border: 0 }}
                                      allowFullScreen
                                      loading="lazy"
                                      referrerPolicy="no-referrer-when-downgrade"
                                      title="HealthQ Headquarters Location"></iframe>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>
        </div>
    )
}

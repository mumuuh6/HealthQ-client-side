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
import {
  Mail,
  Phone,
  MapPin,
  HelpCircle,
  Send,
  MessageSquare,
  Headphones,
  Building2,
  Clock,
  ArrowRight,
} from "lucide-react"

type ContactFormValues = {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    Swal.fire({
      title: "Message Sent!",
      text: "Thank you for contacting us. We'll get back to you soon.",
      icon: "success",
      confirmButtonColor: "hsl(var(--primary))",
    }).then(() => {
      form.reset()
      setIsSubmitting(false)
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/3 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <main className="relative z-10 py-12 lg:py-12">
        <div className="container px-4 md:px-6 max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <MessageSquare className="h-4 w-4" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Have questions or need assistance? We're here to help you with your healthcare journey.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-12 lg:grid-cols-3"
          >
            {/* Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Send className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    Choose your inquiry type and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8 bg-muted/50">
                      <TabsTrigger value="general" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        General
                      </TabsTrigger>
                      <TabsTrigger value="support" className="flex items-center gap-2">
                        <Headphones className="h-4 w-4" />
                        Support
                      </TabsTrigger>
                      <TabsTrigger value="business" className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Business
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-6">
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="name" className="text-sm font-medium">
                              Full Name
                            </Label>
                            <Input
                              id="name"
                              placeholder="Enter your full name"
                              className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary"
                              {...form.register("name", { required: "Name is required" })}
                            />
                            {form.formState.errors.name && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-destructive"
                              >
                                {form.formState.errors.name.message}
                              </motion.p>
                            )}
                          </motion.div>
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-2"
                          >
                            <Label htmlFor="email" className="text-sm font-medium">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="your.email@example.com"
                              className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary"
                              {...form.register("email", {
                                required: "Email is required",
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Invalid email address",
                                },
                              })}
                            />
                            {form.formState.errors.email && (
                              <motion.p
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-sm text-destructive"
                              >
                                {form.formState.errors.email.message}
                              </motion.p>
                            )}
                          </motion.div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="subject" className="text-sm font-medium">
                            Subject
                          </Label>
                          <Input
                            id="subject"
                            placeholder="What is this regarding?"
                            className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary"
                            {...form.register("subject", { required: "Subject is required" })}
                          />
                          {form.formState.errors.subject && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-destructive"
                            >
                              {form.formState.errors.subject.message}
                            </motion.p>
                          )}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="space-y-2"
                        >
                          <Label htmlFor="message" className="text-sm font-medium">
                            Message
                          </Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us how we can help you..."
                            rows={6}
                            className="bg-background/50 border-muted-foreground/20 focus:border-primary resize-none"
                            {...form.register("message", { required: "Message is required" })}
                          />
                          {form.formState.errors.message && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-sm text-destructive"
                            >
                              {form.formState.errors.message.message}
                            </motion.p>
                          )}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Sending...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Send className="h-4 w-4" />
                                Send Message
                              </div>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                    </TabsContent>

                    <TabsContent value="support" className="space-y-6">
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="support-name">Full Name</Label>
                            <Input
                              id="support-name"
                              placeholder="Enter your full name"
                              className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary"
                              {...form.register("name", { required: "Name is required" })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="support-email">Email Address</Label>
                            <Input
                              id="support-email"
                              type="email"
                              placeholder="your.email@example.com"
                              className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary"
                              {...form.register("email", { required: "Email is required" })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="support-topic">Support Topic</Label>
                          <select
                            id="support-topic"
                            className="flex h-12 w-full rounded-md border border-muted-foreground/20 bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                          <Label htmlFor="support-message">Describe Your Issue</Label>
                          <Textarea
                            id="support-message"
                            placeholder="Please provide details about your issue..."
                            rows={6}
                            className="bg-background/50 border-muted-foreground/20 focus:border-primary resize-none"
                            {...form.register("message", { required: "Message is required" })}
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Submitting...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Headphones className="h-4 w-4" />
                              Submit Support Request
                            </div>
                          )}
                        </Button>
                      </form>
                    </TabsContent>

                    <TabsContent value="business" className="space-y-6">
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="business-name">Full Name</Label>
                            <Input
                              id="business-name"
                              placeholder="Enter your full name"
                              className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary"
                              {...form.register("name", { required: "Name is required" })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="business-email">Email Address</Label>
                            <Input
                              id="business-email"
                              type="email"
                              placeholder="your.email@example.com"
                              className="h-12 bg-background/50 border-muted-foreground/20 focus:border-primary"
                              {...form.register("email", { required: "Email is required" })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="business-inquiry">Business Inquiry</Label>
                          <select
                            id="business-inquiry"
                            className="flex h-12 w-full rounded-md border border-muted-foreground/20 bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                          <Label htmlFor="business-message">Message</Label>
                          <Textarea
                            id="business-message"
                            placeholder="Tell us about your business needs..."
                            rows={6}
                            className="bg-background/50 border-muted-foreground/20 focus:border-primary resize-none"
                            {...form.register("message", { required: "Message is required" })}
                          />
                        </div>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-12 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Sending...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4" />
                              Send Business Inquiry
                            </div>
                          )}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information Sidebar */}
            
            <motion.div variants={itemVariants}
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-0  shadow-xl bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl">Contact Information</CardTitle>
                  <CardDescription >Get in touch through any of these channels</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-accent/5 ">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-sm text-muted-foreground mb-2">General inquiries</p>
                      <a href="mailto:info@healthq.com" className="text-primary hover:underline">
                        info@healthq.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-3 mb-1">Support</p>
                      <a href="mailto:support@healthq.com" className="text-primary hover:underline">
                        support@healthq.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <p className="text-sm text-muted-foreground mb-2">Customer Service</p>
                      <a href="tel:+8801963175097" className="text-primary hover:underline">
                        +880 1963 175097
                      </a>
                      <p className="text-sm text-muted-foreground mt-3 mb-1">Technical Support</p>
                      <a href="tel:+8801963175097" className="text-primary hover:underline">
                        +880 1963 175097
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Location</h3>
                      <p className="text-sm text-muted-foreground mb-2">Headquarters</p>
                      <div className="text-sm">
                        <p>RASG-1, Dattapara, Ashulia</p>
                        <p>Dhaka, Bangladesh</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20"
          >
            <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm">
              <CardHeader className="text-center pb-8">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 mx-auto">
                  <HelpCircle className="h-4 w-4" />
                  FAQ
                </div>
                <CardTitle className="text-3xl mb-2">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-lg">
                  Quick answers to common questions about our services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {[
                    {
                      question: "How do I book an appointment?",
                      answer:
                        "You can book an appointment by logging into your account and navigating to the 'Book Appointment' section. Follow the prompts to select a doctor, date, and time.",
                    },
                    {
                      question: "How do I join a virtual queue?",
                      answer:
                        "On the day of your appointment, log in to your account and navigate to your upcoming appointments. Click on 'Join Queue' for the relevant appointment.",
                    },
                    {
                      question: "How can healthcare providers sign up?",
                      answer:
                        "Healthcare providers can sign up by contacting our business team through the Business Inquiry form or by calling our sales department.",
                    },
                    {
                      question: "Is my data secure?",
                      answer:
                        "Yes, we take data security very seriously. All patient information is encrypted and stored securely in compliance with healthcare privacy regulations.",
                    },
                  ].map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="p-6 rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 border border-muted/20"
                    >
                      <h3 className="font-semibold mb-3 flex items-start gap-3">
                        <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed pl-8">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center pt-6">
                  <Link
                    href="/faq"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group"
                  >
                    View all FAQs
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Location Map */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-16"
          >
            <Card className="border-0 shadow-2xl bg-card/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="text-center">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 mx-auto">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>
                <CardTitle className="text-3xl mb-2">Visit Our Office</CardTitle>
                <CardDescription className="text-lg">Find us at our headquarters in Dhaka, Bangladesh</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video w-full overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14591.013368853077!2d90.3274333!3d23.8983637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c25a71cf5873%3A0xd64e6f32619e3132!2sAshulia!5e0!3m2!1sen!2sbd!4v1744617844728!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="HealthQ Headquarters Location"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

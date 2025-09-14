"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  Users,
  Calendar,
  ArrowRight,
  Star,
  CheckCircle,
  TrendingUp,
  Heart,
  UserCheck,
  Stethoscope,
  Brain,
  PlayCircle,
  ChevronDown,
  Sparkles,
  Bot,
  ShoppingCart,
  FileText,
  Pill,
  MessageSquare,
  Headphones,
  Activity,
} from "lucide-react"

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, 50])

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      hospital: "City General Hospital",
      content:
        "HealthQ has revolutionized our patient flow. The AI-powered melanoma screening and voice transcription have saved us countless hours while improving patient care quality.",
      rating: 5,
      specialty: "Oncology",
      initials: "SJ",
    },
    {
      name: "Dr. Michael Chen",
      role: "Emergency Department Head",
      hospital: "Metropolitan Medical Center",
      content:
        "The real-time queue management and prescription system integration have made our emergency department 60% more efficient. Patients love the transparency.",
      rating: 5,
      specialty: "Emergency Medicine",
      initials: "MC",
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Practice Manager",
      hospital: "Wellness Clinic Network",
      content:
        "From appointment booking to consultation transcripts, HealthQ covers everything. The medicine database and cart system have streamlined our entire workflow.",
      rating: 5,
      specialty: "Family Medicine",
      initials: "ER",
    },
  ]

  const features = [
    {
      icon: Brain,
      title: "AI Melanoma Screening",
      description: "Advanced AI-powered skin cancer detection with instant analysis and professional recommendations.",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      link: "/melanoma-screening",
    },
    {
      icon: Headphones,
      title: "Voice Transcription",
      description: "Real-time consultation recording with AI-powered transcription and structured data extraction.",
      gradient: "from-purple-500 via-violet-500 to-indigo-500",
      link: "/doctor/dashboard",
    },
    {
      icon: Pill,
      title: "Medicine Database",
      description: "Comprehensive medicine catalog with detailed information, pricing, and prescription management.",
      gradient: "from-blue-500 via-sky-500 to-cyan-500",
      link: "/medicines",
    },
    {
      icon: ShoppingCart,
      title: "Smart Cart System",
      description: "Intelligent medicine ordering with prescription validation and seamless checkout experience.",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      link: "/cart",
    },
    {
      icon: Clock,
      title: "Real-Time Queue",
      description: "Live queue management with predictive wait times and instant patient notifications.",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      link: "/patient/dashboard",
    },
    {
      icon: FileText,
      title: "Digital Prescriptions",
      description: "Complete prescription management with PDF generation and patient history tracking.",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      link: "/doctor/dashboard",
    },
  ]

  const stats = [
    { icon: Users, label: "Active Patients", value: "50K+", color: "emerald", description: "Registered users" },
    { icon: Stethoscope, label: "Healthcare Providers", value: "2.5K+", color: "blue", description: "Trusted doctors" },
    { icon: Clock, label: "Time Saved", value: "2M+ hrs", color: "purple", description: "Reduced wait times" },
    { icon: Heart, label: "Satisfaction Rate", value: "98%", color: "pink", description: "Patient happiness" },
    { icon: Bot, label: "AI Screenings", value: "100K+", color: "cyan", description: "Melanoma checks" },
    { icon: TrendingUp, label: "Efficiency Boost", value: "60%", color: "orange", description: "Workflow improvement" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [testimonials.length])

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-10 flex items-center justify-center bg-gradient-to-br from-background via-card to-muted overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y: y1 }}
            className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        </div>

        <div className="container mx-auto max-w-7xl  relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                    <Sparkles className="w-4 h-4 mr-2" />
                    AI-Powered Healthcare Platform
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl lg:text-6xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                    HealthQ
                  </span>
                  <br />
                  <span className="text-foreground">The Future of</span>
                  <br />
                  <span className="text-muted-foreground">Healthcare</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-foreground leading-relaxed max-w-2xl"
                >
                  Revolutionary healthcare platform combining AI-powered melanoma screening, voice transcription, smart
                  queue management, and comprehensive medicine database - all in one seamless experience.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                {/* <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-4 rounded-xl text-lg font-semibold border-2 hover:bg-card transition-all duration-300 bg-transparent"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button> */}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-8 pt-4"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent border-4 border-background flex items-center justify-center text-white font-bold text-sm"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trusted by <span className="font-semibold text-foreground">10,000+</span> healthcare providers
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Dashboard Mockup */}
              <div className="relative z-10 bg-gradient-to-br from-card to-background rounded-3xl shadow-2xl border border-border/50 p-8">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">HealthQ Dashboard</h3>
                        <p className="text-sm text-muted-foreground">Real-time Healthcare Management</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">Live</Badge>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl p-4 border border-emerald-500/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Brain className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-medium">AI Screening</span>
                      </div>
                      <p className="text-2xl font-bold text-emerald-500">96%</p>
                      <p className="text-xs text-muted-foreground">Accuracy Rate</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl p-4 border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Headphones className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-medium">Voice AI</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-500">Real-time</p>
                      <p className="text-xs text-muted-foreground">Transcription</p>
                    </div>
                  </div>

                  {/* Queue Status */}
                  <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl p-4 border border-blue-500/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Current Queue</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        Position #3
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Estimated Wait</span>
                      <span className="text-lg font-bold text-blue-500">5 mins</span>
                    </div>
                  </div>

                  {/* Medicine Cart */}
                  <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-xl p-4 border border-orange-500/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5 text-orange-500" />
                        <span className="font-medium">Medicine Cart</span>
                      </div>
                      <span className="text-lg font-bold text-orange-500">3 items</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Feature Cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-12 -left-12 bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">AI Screening</p>
                    <p className="text-primary font-bold">96% Accuracy</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute -bottom-12 -right-6 bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Voice AI</p>
                    <p className="text-primary font-bold">Real-time</p>
                  </div>
                </div>
              </motion.div>

              {/* <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                className="absolute top-1/2 -right-28 bg-card/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Wait Time</p>
                    <p className="text-primary font-bold">3 mins</p>
                  </div>
                </div>
              </motion.div> */}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-card to-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Platform Impact</Badge>
            <h2 className="text-4xl font-bold mb-4">Transforming Healthcare Globally</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real numbers from real healthcare providers using HealthQ
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <Card className="p-8 border-2 hover:border-primary/20 transition-all duration-300 bg-gradient-to-br from-card to-background">
                  <CardContent className="p-0">
                    <div
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <stat.icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {stat.value}
                    </h3>
                    <p className="font-semibold text-foreground mb-1">{stat.label}</p>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Core Features</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need for
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}
                Modern Healthcare
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive suite of AI-powered tools designed to revolutionize patient care and healthcare management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Link href={feature.link}>
                  <Card className="h-full bg-gradient-to-br from-card to-background border-2 hover:border-primary/20 transition-all duration-300 overflow-hidden">
                    <CardContent className="p-8">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                      <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-muted to-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">How It Works</Badge>
            <h2 className="text-4xl font-bold mb-4">Simple Steps to Better Healthcare</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in minutes and transform your healthcare experience with our intuitive platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-24 left-1/8 right-1/8 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />

            {[
              {
                step: "01",
                title: "Register & Setup",
                description:
                  "Create your account and set up your healthcare profile with our guided onboarding process.",
                icon: UserCheck,
                color: "emerald",
              },
              {
                step: "02",
                title: "Book Appointment",
                description: "Schedule appointments with real-time availability and intelligent queue management.",
                icon: Calendar,
                color: "blue",
              },
              {
                step: "03",
                title: "AI-Powered Care",
                description:
                  "Experience AI melanoma screening, voice transcription, and smart medicine recommendations.",
                icon: Bot,
                color: "purple",
              },
              {
                step: "04",
                title: "Complete Care",
                description: "Receive digital prescriptions, track your health, and manage follow-up appointments.",
                icon: Heart,
                color: "pink",
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center relative"
              >
                <div
                  className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 flex items-center justify-center relative z-10 shadow-lg`}
                >
                  <step.icon className="w-12 h-12 text-white" />
                </div>
                <div
                  className={`absolute top-3 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-xl bg-${step.color}-100 dark:bg-${step.color}-900/20 flex items-center justify-center z-0`}
                >
                  <span className={`text-lg font-bold text-${step.color}-600 dark:text-${step.color}-400`}>
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-background to-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Testimonials</Badge>
            <h2 className="text-4xl font-bold mb-4">
              Trusted by Healthcare
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}
                Professionals
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what doctors and patients are saying about their HealthQ experience
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-card to-background border-2 border-border/50 shadow-2xl">
                <CardContent className="p-8 lg:p-12">
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-xl lg:text-2xl text-foreground mb-8 leading-relaxed font-medium">
                      "{testimonials[currentTestimonial].content}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-xl border-4 border-primary/20">
                        {testimonials[currentTestimonial].initials}
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-lg text-foreground">{testimonials[currentTestimonial].name}</p>
                        <p className="text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                        <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].hospital}</p>
                        <Badge className="mt-2 bg-primary/10 text-primary">
                          {testimonials[currentTestimonial].specialty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to Transform Your
              <br />
              <span className="text-primary-foreground/90">Healthcare Experience?</span>
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of healthcare providers who trust HealthQ for better patient management, AI-powered
              diagnostics, and seamless healthcare delivery.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-xl text-lg font-semibold bg-transparent"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Contact Sales
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-8 text-sm opacity-75">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                14-day free trial
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

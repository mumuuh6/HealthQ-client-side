"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Clock,
  Users,
  Heart,
  Shield,
  Target,
  Eye,
  Lightbulb,
  Calendar,
  Stethoscope,
  Building2,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Healthcare Facilities", value: "500+", icon: Building2 },
  { label: "Patients Served", value: "100K+", icon: Users },
  { label: "Average Wait Time Reduced", value: "60%", icon: Clock },
  { label: "Patient Satisfaction", value: "98%", icon: Heart },
]

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Care",
    description: "We put patients first, ensuring their comfort and convenience throughout their healthcare journey.",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your health data is protected with enterprise-grade security and HIPAA compliance.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously innovate to bring cutting-edge technology to healthcare management.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "We believe in fostering collaboration between patients, doctors, and healthcare staff.",
  },
]

const team = [
  {
    name: "Dr. Sarah Johnson",
    role: "Chief Medical Officer",
    image: "https://curae.com/wp-content/uploads/2018/03/AdobeStock_168113506-1-e1522461533266.jpeg",
    bio: "15+ years in healthcare technology and patient care optimization.",
    specialties: ["Healthcare IT", "Patient Experience", "Quality Improvement"],
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    image: "https://png.pngtree.com/png-clipart/20240220/original/pngtree-portrait-of-a-smiling-handsome-male-doctor-man-png-image_14366794.png",
    bio: "Former Google engineer with expertise in scalable healthcare systems.",
    specialties: ["System Architecture", "AI/ML", "Healthcare Analytics"],
  },
  {
    name: "Dr. Maria Rodriguez",
    role: "Head of Clinical Operations",
    image: "https://i.pinimg.com/originals/1b/52/fd/1b52fd81c2282b432b85dc6a8a01f13d.jpg",
    bio: "Emergency medicine physician turned healthcare innovator.",
    specialties: ["Emergency Medicine", "Workflow Optimization", "Clinical Training"],
  },
]

const milestones = [
  {
    year: "2020",
    title: "Company Founded",
    description: "Started with a vision to revolutionize healthcare queue management",
  },
  {
    year: "2021",
    title: "First 100 Clinics",
    description: "Reached our first major milestone of 100 healthcare facilities",
  },
  {
    year: "2022",
    title: "AI Integration",
    description: "Launched AI-powered wait time prediction and optimization",
  },
  {
    year: "2023",
    title: "National Expansion",
    description: "Expanded to serve healthcare facilities across the country",
  },
  {
    year: "2024",
    title: "100K+ Patients",
    description: "Served over 100,000 patients with improved healthcare experiences",
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Stethoscope className="h-4 w-4 mr-2" />
              Transforming Healthcare Since 2020
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About HealthQ
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to eliminate waiting rooms and transform healthcare experiences through intelligent
              queue management and seamless patient care coordination.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="text-center border-primary/20 hover:border-primary/40 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To revolutionize healthcare delivery by eliminating inefficiencies in patient flow management,
                    reducing wait times, and creating seamless experiences that allow healthcare providers to focus on
                    what matters most - patient care.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <Eye className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where healthcare is accessible, efficient, and stress-free for everyone. We envision a
                    future where patients spend their time healing rather than waiting, and healthcare providers can
                    deliver optimal care without operational barriers.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do and shape how we serve our healthcare partners and patients.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex justify-center mb-4">
                        <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold mb-3 text-center">{value.title}</h3>
                      <p className="text-sm text-muted-foreground text-center leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Leadership Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our diverse team combines deep healthcare expertise with cutting-edge technology experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src={member.image } alt={member.name} />
                        <AvatarFallback className="text-lg">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Specialties:</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a simple idea to transforming healthcare experiences across the nation.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold z-10">
                    {milestone.year}
                  </div>
                  <Card className="flex-1">
                    <CardContent className="pt-4">
                      <h3 className="text-lg font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Healthcare Experience?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                Join thousands of healthcare providers and patients who have already discovered the HealthQ difference.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="px-8">
                  <Mail className="h-5 w-5 mr-2" />
                  Get in Touch
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="px-8 bg-transparent">
                  <Calendar className="h-5 w-5 mr-2" />
                  Book a Demo
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>hello@healthq.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

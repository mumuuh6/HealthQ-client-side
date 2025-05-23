"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Info, Upload, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { analyzeSkinImage } from "./actions"

export default function MelanomaScreeningPage() {
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<{
    risk: "low" | "medium" | "high" | null
    confidence: number
    features: string[]
  } | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResult(null)
    }
  }

  const handleAnalyze = async () => {
    if (!selectedImage) return

    setIsAnalyzing(true)
    try {
      // In a real app, you would send the image to your backend for analysis
      const formData = new FormData()
      formData.append("image", selectedImage)

      // Call the server action to analyze the image
      const analysisResult = await analyzeSkinImage(formData)
      setResult(analysisResult)
    } catch (error) {
      console.error("Error analyzing image:", error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleReset = () => {
    setSelectedImage(null)
    setPreviewUrl(null)
    setResult(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
  }

  return (
    <div className="py-12 md:py-16 lg:py-20 bg-muted/40">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <motion.h1
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Melanoma Early Detection
          </motion.h1>
          <motion.p
            className="max-w-[700px] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Upload a clear image of your skin lesion for AI-powered analysis to check for early signs of melanoma.
          </motion.p>
        </div>

        <Alert className="mb-8 max-w-3xl mx-auto">
          <Info className="h-4 w-4" />
          <AlertTitle>Medical Disclaimer</AlertTitle>
          <AlertDescription>
            This tool is for educational purposes only and is not a substitute for professional medical advice,
            diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with
            any questions you may have regarding a medical condition.
          </AlertDescription>
        </Alert>

        <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Upload Skin Image</CardTitle>
                <CardDescription>
                  Please upload a clear, well-lit image of the skin lesion you're concerned about.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={cn(
                    "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center",
                    previewUrl ? "border-primary" : "border-muted-foreground/25",
                  )}
                >
                  {previewUrl ? (
                    <div className="relative w-full aspect-square max-w-xs mx-auto">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Skin lesion preview"
                        fill
                        className="object-contain rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="py-8">
                      <Upload className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your image here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, HEIC</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={cn(
                      "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                      previewUrl ? "pointer-events-none" : "",
                    )}
                    disabled={isAnalyzing}
                  />
                </div>

                {previewUrl && (
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleReset} disabled={isAnalyzing}>
                      Change Image
                    </Button>
                    <Button onClick={handleAnalyze} disabled={isAnalyzing || !selectedImage}>
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Image"
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  {result ? "AI-powered analysis of your skin lesion" : "Results will appear here after analysis"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="font-medium">Analyzing your image...</p>
                    <p className="text-sm text-muted-foreground mt-2">This may take a few moments</p>
                  </div>
                ) : result ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      {result.risk === "low" && (
                        <div className="rounded-full bg-green-500/10 p-3">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                        </div>
                      )}
                      {result.risk === "medium" && (
                        <div className="rounded-full bg-yellow-500/10 p-3">
                          <AlertTriangle className="h-6 w-6 text-yellow-500" />
                        </div>
                      )}
                      {result.risk === "high" && (
                        <div className="rounded-full bg-red-500/10 p-3">
                          <XCircle className="h-6 w-6 text-red-500" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-lg">
                          {result.risk === "low" && "Low Risk Detected"}
                          {result.risk === "medium" && "Medium Risk Detected"}
                          {result.risk === "high" && "High Risk Detected"}
                        </h3>
                        <p className="text-sm text-muted-foreground">Confidence: {result.confidence.toFixed(1)}%</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Detected Features:</h4>
                      <ul className="space-y-1">
                        {result.features.map((feature, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="rounded-full h-1.5 w-1.5 bg-primary mt-1.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Alert variant={result.risk === "high" ? "destructive" : "default"}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Next Steps</AlertTitle>
                      <AlertDescription>
                        {result.risk === "low" &&
                          "While the risk appears low, continue to monitor this spot for changes. If you notice any changes in size, shape, color, or if it becomes symptomatic, please consult a dermatologist."}
                        {result.risk === "medium" &&
                          "This lesion shows some concerning features. We recommend scheduling an appointment with a dermatologist for a professional evaluation."}
                        {result.risk === "high" &&
                          "This lesion shows several concerning features that may indicate melanoma. Please consult with a dermatologist as soon as possible for a professional evaluation."}
                      </AlertDescription>
                    </Alert>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Info className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium">No Analysis Yet</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload an image and click "Analyze Image" to get results
                    </p>
                  </div>
                )}
              </CardContent>
              {result && (
                <CardFooter className="flex flex-col text-sm text-muted-foreground">
                  <p className="text-center">
                    Remember: This is not a medical diagnosis. Always consult with a healthcare professional for proper
                    evaluation.
                  </p>
                </CardFooter>
              )}
            </Card>
          </motion.div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Tabs defaultValue="about">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="about">About Melanoma</TabsTrigger>
              <TabsTrigger value="signs">Warning Signs</TabsTrigger>
              <TabsTrigger value="prevention">Prevention</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="p-4 bg-card rounded-md mt-4 border">
              <h3 className="text-lg font-medium mb-2">What is Melanoma?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Melanoma is a serious form of skin cancer that begins in cells known as melanocytes. While it is less
                common than other types of skin cancer, it is more dangerous because of its ability to spread to other
                parts of the body if not caught early.
              </p>
              <p className="text-sm text-muted-foreground">
                Early detection is crucial for successful treatment. Regular skin checks and prompt attention to
                changing moles or new skin growths can help catch melanoma in its early stages.
              </p>
            </TabsContent>
            <TabsContent value="signs" className="p-4 bg-card rounded-md mt-4 border">
              <h3 className="text-lg font-medium mb-2">The ABCDE Rule</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Look for these warning signs in moles and skin lesions:
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>A - Asymmetry:</strong> One half doesn't match the other half.
                </li>
                <li>
                  <strong>B - Border:</strong> Irregular, ragged, notched, or blurred edges.
                </li>
                <li>
                  <strong>C - Color:</strong> Variation in color from one area to another.
                </li>
                <li>
                  <strong>D - Diameter:</strong> Larger than 6mm (about the size of a pencil eraser).
                </li>
                <li>
                  <strong>E - Evolving:</strong> Changes in size, shape, color, or elevation over time.
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="prevention" className="p-4 bg-card rounded-md mt-4 border">
              <h3 className="text-lg font-medium mb-2">Prevention Tips</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>Avoid sun exposure</strong> during peak hours (10am-4pm).
                </li>
                <li>
                  <strong>Wear sunscreen</strong> with SPF 30+ daily, even on cloudy days.
                </li>
                <li>
                  <strong>Cover up</strong> with clothing, wide-brimmed hats, and sunglasses.
                </li>
                <li>
                  <strong>Avoid tanning beds</strong> and sunlamps.
                </li>
                <li>
                  <strong>Perform regular skin checks</strong> and note any changes.
                </li>
                <li>
                  <strong>See a dermatologist yearly</strong> for a professional skin exam.
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

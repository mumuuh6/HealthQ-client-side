 "use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Pill,
  Building2,
  ShoppingCart,
  Heart,
  Share2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Shield,
  Clock,
  Thermometer,
} from "lucide-react"
import useMedicines from "@/app/hook/useMedicine"

export default function MedicineDetailPage() {
  const params = useParams()
  //console.log("params", params.slug)
  const router = useRouter()
//   const [medicine, setMedicine] = useState<any>(null)
  const [selectedUnit, setSelectedUnit] = useState(0)
  const [quantity, setQuantity] = useState(1)
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug
    const { PerMedicineInfo: medicine,isLoading } = useMedicines(slug)
    //console.log("Medicines", Medicines)
//   useEffect(() => {
//     const foundMedicine = Medicines.find((m) => m.slug === params.slug)
//     if (foundMedicine) {
//       setMedicine(foundMedicine)
//     }
//   }, [params.slug])
    if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading medicine details...</p>
      </div>
    )
  }
  if (!medicine) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Medicine not found</h1>
          <Button onClick={() => router.push("/medicines")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Medicines
          </Button>
        </div>
      </div>
    )
  }

  const selectedPrice = medicine.unit_prices[selectedUnit]
  const totalPrice = selectedPrice.price * quantity
  const discountedPrice = medicine.is_discountable
    ? medicine.discount_type === "Percentage"
      ? totalPrice - (totalPrice * medicine.discount_value) / 100
      : totalPrice - medicine.discount_value
    : totalPrice

const formatText = (text?: string) => {
  if (!text) return ""; // handle undefined

  // Remove HTML tags
  const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "");

  // Split by newlines and join with <br /> if needed
  return cleanText.split("\n").map((line, index, arr) => (
    <span key={index}>
      {line}
      {index < arr.length - 1 && <br />}
    </span>
  ));
};




  return (
    <div className="max-w-7xl container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => router.push("/medicines")} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Medicines
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Medicine Image */}
        <div className="space-y-4">
            
          <Card>
            <CardContent className="p-6">
              <div className="relative h-96 w-full">
                <Image
                  src={medicine?.medicine_image || "/placeholder.svg?height=400&width=400"}
                  alt={medicine?.medicine_name}
                  fill
                  sizes="(max-width: 640px) 100vw, 
         (max-width: 768px) 50vw, 
         (max-width: 1024px) 33vw, 
         20vw"
                  className="object-contain rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Medicine Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="text-3xl font-bold">{medicine?.medicine_name}</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-lg text-muted-foreground mb-2">{medicine?.generic_name}</p>
            <p className="text-sm text-muted-foreground mb-4">{medicine?.strength}</p>

            <div className="flex items-center gap-4 mb-4">
              <Badge variant={medicine?.rx_required ? "destructive" : "secondary"}>
                {medicine?.rx_required ? "Prescription Required" : "Over the Counter"}
              </Badge>
              <Badge variant="outline">
                <Pill className="h-3 w-3 mr-1" />
                {medicine?.category_name}
              </Badge>
              <div className="flex items-center gap-1">
                {medicine?.is_available ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">In Stock</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{medicine?.manufacturer_name}</span>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Therapeutic Class: {medicine?.full_details["Therapeutic Class"]}
              </span>
            </div>
          </div>

          {/* Pricing and Purchase */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Unit Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Select Unit:</label>
                <div className="grid grid-cols-1 gap-2">
                  {medicine?.unit_prices.map((unit: any, index: number) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedUnit === index ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedUnit(index)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{unit.unit}</span>
                        <span className="text-lg font-bold">৳{unit.price}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {unit.unit_size} piece{unit.unit_size > 1 ? "s" : ""}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity:</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                    +
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>৳{totalPrice}</span>
                </div>
                {medicine?.is_discountable && medicine?.discount_value > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Discount ({medicine?.discount_value}
                      {medicine?.discount_type === "Percentage" ? "%" : "৳"}):
                    </span>
                    <span>-৳{totalPrice - discountedPrice}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>৳{discountedPrice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Button className="w-full" size="lg" disabled={!medicine?.is_available}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                {medicine?.rx_required && (
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-800">Prescription required for this medicine?</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Medicine Information Tabs */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <Tabs defaultValue="indications" className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="indications">Uses</TabsTrigger>
              <TabsTrigger value="dosage">Dosage</TabsTrigger>
              <TabsTrigger value="pharmacology">How it Works</TabsTrigger>
              <TabsTrigger value="safety">Safety</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
            </TabsList>

            <TabsContent value="indications" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold">Indications & Uses</h3>
                </div>
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {formatText(medicine?.full_details.Indications)}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Mode of Action:</strong> {formatText(medicine?.full_details["Mode Of Action"])}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dosage" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">Dosage & Administration</h3>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 whitespace-pre-line">
                    {formatText(medicine?.full_details["Dosage And Administration"])}
                  </p>
                </div>
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <p className="text-sm text-amber-800">
                      Always follow your doctor's instructions or the package directions. Do not exceed the recommended
                      dose.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pharmacology" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold">Pharmacology</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{formatText(medicine?.full_details.Pharmacology)}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Drug Class</h4>
                    <p className="text-purple-700">{formatText(medicine?.full_details["Drug Classes"])}</p>
                  </div>
                  <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">Therapeutic Class</h4>
                    <p className="text-indigo-700">{formatText(medicine?.full_details["Therapeutic Class"])}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="safety" className="mt-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                    <h3 className="text-lg font-semibold">Side Effects</h3>
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-amber-800">{formatText(medicine?.full_details["Side Effects"])}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="h-5 w-5 text-red-500" />
                    <h3 className="text-lg font-semibold">Precautions & Warnings</h3>
                  </div>
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800">{formatText(medicine?.full_details["Precautions And Warnings"])}</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="h-5 w-5 text-pink-500" />
                    <h3 className="text-lg font-semibold">Pregnancy & Lactation</h3>
                  </div>
                  <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
                    <p className="text-pink-800">{formatText(medicine?.full_details["Pregnancy And Lactation"])}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interactions" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <h3 className="text-lg font-semibold">Drug Interactions</h3>
                </div>
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-orange-800 whitespace-pre-line">{formatText(medicine?.full_details.Interaction)}</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
                    <p className="text-sm text-red-800">
                      <strong>Important:</strong> Always inform your healthcare provider about all medications,
                      supplements, and herbal products you are taking.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="storage" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Thermometer className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold">Storage Conditions</h3>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-800">{formatText(medicine?.full_details["Storage Conditions"])}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 border rounded-lg text-center">
                    <Thermometer className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">Temperature</p>
                    <p className="text-xs text-gray-600">Below 30°C</p>
                  </div>
                  <div className="p-3 bg-gray-50 border rounded-lg text-center">
                    <Shield className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">Environment</p>
                    <p className="text-xs text-gray-600">Dry place</p>
                  </div>
                  <div className="p-3 bg-gray-50 border rounded-lg text-center">
                    <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-sm font-medium">Keep away</p>
                    <p className="text-xs text-gray-600">From children</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Related Medicines */}
      {medicine?.related_medicines && medicine?.related_medicines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Related Medicines</CardTitle>
            <p className="text-sm text-muted-foreground">
              Other medicines with the same generic name ({medicine?.generic_name})
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {medicine?.related_medicines.slice(0, 4).map((relatedMedicine: any) => (
  <Card
    key={relatedMedicine.id}
    className="h-full hover:shadow-md transition-shadow cursor-pointer"
  >
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={relatedMedicine.medicine_image || "/placeholder.svg?height=64&width=64"}
            alt={relatedMedicine.medicine_name}
            fill
            className="object-contain rounded"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm truncate">{relatedMedicine.medicine_name}</h4>
          <p className="text-xs text-muted-foreground truncate">{relatedMedicine.strength}</p>
          <p className="text-xs text-muted-foreground truncate">{relatedMedicine.manufacturer_name}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-bold">৳{relatedMedicine.unit_prices[0]?.price}</span>
            <Badge
              variant={relatedMedicine.is_available ? "secondary" : "destructive"}
              className="text-xs"
            >
              {relatedMedicine.is_available ? "Available" : "Out of Stock"}
            </Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
))}

            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

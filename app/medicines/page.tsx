 "use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Search, Pill } from "lucide-react"
import useMedicines from "../hook/useMedicine"
import { m } from "framer-motion"

type UnitPrice = {
  unit: string
  unit_size: number
  price: number
}

type Medicine = {
  _id: string
  id: number
  medicine_name: string
  category_name: string
  slug: string
  category_slug: string
  generic_name: string
  strength: string
  manufacturer_name: string
  discount_type: string
  discount_value: number
  is_discountable: boolean
  is_available: boolean
  medicine_image: string
  rx_required: boolean
  unit_prices: UnitPrice[]
}
type Categoryslug = {
  category_slug: string;
  // add other properties if needed
};
const ITEMS_PER_PAGE = 10

export default function MedicinesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { medicineinfo: Medicines = [], isMedicineLoading } = useMedicines()

  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  // Update currentPage from URL params (only on mount or when searchParams change)
  useEffect(() => {
    const page = Number(searchParams.get("page") || 1)
    setCurrentPage(page)
  }, [searchParams])

  // Filter medicines based on searchTerm and category
  const filteredMedicines = useMemo(() => {
    return Medicines.filter((medicine:Medicine) => {
      const matchesSearch =
        medicine.medicine_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.generic_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.manufacturer_name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        categoryFilter === "all" || medicine.category_slug.toLowerCase() === categoryFilter.toLowerCase()

      return matchesSearch && matchesCategory
    })
  }, [Medicines, searchTerm, categoryFilter])

  // Pagination calculations
const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE)
const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
const endIndex = startIndex + ITEMS_PER_PAGE
const currentMedicines = filteredMedicines.slice(startIndex, endIndex)

// Compute categories only after medicines are loaded
const categories: string[] = useMemo(() => {
  if (!Medicines) return ["all"];
  return ["all", ...Array.from(new Set(Medicines.map((m: Categoryslug) => m.category_slug))).map(String)];
}, [Medicines]);


if (isMedicineLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading medicines...</p>
      </div>
    )
  }
// Handle page changes
const handlePageChange = (page: number) => {
  if (page < 1 || page > totalPages) return
  setCurrentPage(page)
  router.push(`/medicines?page=${page}`)
}

const handleMedicineClick = (medicine: Medicine) => {
  router.push(`/medicines/${medicine.slug}`)
}

const getLowestPrice = (unitPrices: UnitPrice[]) => Math.min(...unitPrices.map((u) => u.price))

console.log('categories', categories)


  return (
    <div className="max-w-7xl container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Medicines</h1>
        <p className="text-muted-foreground">Browse our comprehensive collection of medicines</p>
      </div>

      {/* Search & Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search medicines, generic names, or manufacturers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "all" ? "All Categories" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Summary */}
      <div className="mb-4 text-sm text-muted-foreground">
        Showing {startIndex + 1}-{Math.min(endIndex, filteredMedicines.length)} of {filteredMedicines.length} medicines
      </div>

      {/* Medicines Grid */}
      {currentMedicines.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {currentMedicines.map((medicine:Medicine) => (
            <Card
              key={medicine._id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => handleMedicineClick(medicine)}
            >
              <CardHeader className="pb-3">
                <div className="relative h-32 w-full mb-3">
                  <Image
                    src={medicine.medicine_image || "/placeholder.svg"}
                    alt={medicine.medicine_name}
                    fill
                    sizes="(max-width: 640px) 100vw, 
         (max-width: 768px) 50vw, 
         (max-width: 1024px) 33vw, 
         20vw"
                    className="object-contain rounded-md"
                  />
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold line-clamp-1">{medicine.medicine_name}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-1">{medicine.generic_name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{medicine.strength}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant={medicine.rx_required ? "destructive" : "secondary"}>
                      {medicine.rx_required ? "Rx" : "OTC"}
                    </Badge>
                    {!medicine.is_available && (
                      <Badge variant="outline" className="text-xs">
                        Out of Stock
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Pill className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{medicine.category_name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">{medicine.manufacturer_name}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-primary">৳{getLowestPrice(medicine.unit_prices)}</span>
                      <span className="text-xs text-muted-foreground ml-1">onwards</span>
                    </div>
                    {medicine.is_discountable && medicine.discount_value > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        {medicine.discount_value}
                        {medicine.discount_type === "Percentage" ? "%" : "৳"} OFF
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Pill className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No medicines found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber = 0
              if (totalPages <= 5) pageNumber = i + 1
              else if (currentPage <= 3) pageNumber = i + 1
              else if (currentPage >= totalPages - 2) pageNumber = totalPages - 4 + i
              else pageNumber = currentPage - 2 + i

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNumber)}
                  className="w-10"
                >
                  {pageNumber}
                </Button>
              )
            })}
          </div>

          <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

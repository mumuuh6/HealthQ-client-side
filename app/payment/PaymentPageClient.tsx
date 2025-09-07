"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PaymentPageClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const status = searchParams.get("status")
  const transactionId = searchParams.get("transactionId")
  const amount = searchParams.get("amount")
  const message = searchParams.get("message")

  const renderContent = () => {
    switch (status) {
      case "success":
        return (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold text-green-700">Payment Successful</h2>
            <p>{message || "Your payment has been processed successfully."}</p>
            <p className="text-sm text-muted-foreground">Transaction ID: {transactionId}</p>
            <p className="text-lg font-semibold">Amount: ৳{amount}</p>
            <Button onClick={() => router.push("/")}>Go Home</Button>
          </div>
        )
      case "fail":
        return (
          <div className="text-center space-y-4">
            <XCircle className="w-16 h-16 text-red-500 mx-auto" />
            <h2 className="text-2xl font-bold text-red-700">Payment Failed</h2>
            <p>{message || "Unfortunately, your payment could not be completed."}</p>
            <p className="text-sm text-muted-foreground">Transaction ID: {transactionId}</p>
            <Button onClick={() => router.push("/cart")}>Try Again</Button>
          </div>
        )
      case "cancel":
        return (
          <div className="text-center space-y-4">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />
            <h2 className="text-2xl font-bold text-yellow-700">Payment Cancelled</h2>
            <p>{message || "You cancelled the payment process."}</p>
            <Button onClick={() => router.push("/cart")}>Go Back to Checkout</Button>
          </div>
        )
      default:
        return (
          <div className="text-center space-y-4">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto" />
            <h2 className="text-2xl font-bold">Invalid Payment Status</h2>
            <p>No valid status found in the URL.</p>
            <Button onClick={() => router.push("/medicines")}>Go Home</Button>
          </div>
        )
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Payment Status</CardTitle>
        </CardHeader>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </div>
  )
}

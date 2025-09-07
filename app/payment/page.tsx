import { Suspense } from "react"
import PaymentPageClient from "./PaymentPageClient"


export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <PaymentPageClient />
    </Suspense>
  )
}

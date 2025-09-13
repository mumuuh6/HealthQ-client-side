"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

import { ShoppingCart, Minus, Plus, Trash2, ArrowLeft, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"
import { useCart } from "../contexts/cart-context"
import UseAxiosNormal from "../hook/UseAxiosNormal"
import { useSession } from "next-auth/react"

export default function CartPage() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const {data:session}=useSession()
  const [isProcessing, setIsProcessing] = useState(false)
    const axiossecure=UseAxiosNormal()
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: newQuantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  const handleCheckout = async () => {
    console.log(state);
    try{
        
        const payload={
            itemsId : state.items.map(item =>item.id),
            status:"PENDING",
            name:session?.user?.name,
            email:session?.user?.email,
            amount:state.totalPrice+50
        }
        
    const response = await axiossecure.post('/cart', payload);
    console.log(response.data)
    if(response?.data?.paymentLink){
        return window.location.href = response.data.paymentLink;
        

    }
      // You can include additional order details here if needed    
    }
    catch(err){
      console.log(err); 
    }
    setIsProcessing(true)

    // Simulate payment processing
     await new Promise((resolve) => setTimeout(resolve, 2000))

    // Clear cart after successful purchase
     dispatch({ type: "CLEAR_CART" })

     setIsProcessing(false)

    // Show success message and redirect

    // alert("Order placed successfully! Thank you for your purchase.")
    router.push("/medicines")
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some medicines to your cart to get started</p>
          <Link href="/medicines">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/medicines">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Shopping Cart ({state.totalItems} items)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.selectedUnit.unit}`} className="flex gap-4 p-4 border rounded-lg">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.medicine_image || "/placeholder.svg?height=80&width=80"}
                      alt={item.medicine_name}
                      fill
                      className="object-contain rounded"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/medicines/${item.slug}`} className="hover:text-primary">
                      <h3 className="font-semibold truncate">{item.medicine_name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground truncate">{item.generic_name}</p>
                    <p className="text-sm text-muted-foreground">{item.strength}</p>
                    <p className="text-xs text-muted-foreground">{item.manufacturer_name}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline">{item.selectedUnit.unit}</Badge>
                      {item.rx_required && (
                        <Badge variant="destructive" className="text-xs">
                          Rx Required
                        </Badge>
                      )}
                      {!item.is_available && (
                        <Badge variant="secondary" className="text-xs">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <p className="font-bold">৳{item.selectedUnit.price * item.quantity}</p>
                    <p className="text-sm text-muted-foreground">৳{item.selectedUnit.price} each</p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal ({state.totalItems} items):</span>
                  <span>৳{state.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee:</span>
                  <span>৳50</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>৳{state.totalPrice + 50}</span>
                </div>
              </div>

              {/* Prescription Warning */}
              {state.items.some((item) => item.rx_required) && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Prescription Required</p>
                      <p className="text-xs text-amber-700">
                        Some items in your cart require a prescription. Please have your prescription ready.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Out of Stock Warning */}
              {state.items.some((item) => !item.is_available) && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800">Items Out of Stock</p>
                      <p className="text-xs text-red-700">Some items in your cart are currently out of stock.</p>
                    </div>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing || state.items.some((item) => !item.is_available)}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Secure checkout with SSL encryption
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface CartItem {
  id: number
  medicine_name: string
  generic_name: string
  strength: string
  manufacturer_name: string
  medicine_image: string
  selectedUnit: {
    unit: string
    unit_size: number
    price: number
  }
  quantity: number
  rx_required: boolean
  is_available: boolean
  slug: string
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.selectedUnit.unit === action.payload.selectedUnit.unit,
      )

      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item,
        )
      } else {
        // Add new item
        newItems = [...state.items, action.payload]
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.selectedUnit.price * item.quantity, 0)

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.selectedUnit.price * item.quantity, 0)

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: Math.max(1, action.payload.quantity) } : item,
      )
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce((sum, item) => sum + item.selectedUnit.price * item.quantity, 0)

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
      }

    case "LOAD_CART": {
      const totalItems = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = action.payload.reduce((sum, item) => sum + item.selectedUnit.price * item.quantity, 0)

      return {
        items: action.payload,
        totalItems,
        totalPrice,
      }
    }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("healthq-cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("healthq-cart", JSON.stringify(state.items))
  }, [state.items])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

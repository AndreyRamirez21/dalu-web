import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product } from '@/shared/types/product'

export interface CartItem {
  product: Product
  quantity: number
  size?: string | null
  color?: string | null
}

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, size?: string | null, color?: string | null) => void
  removeItem: (productId: string, size?: string | null, color?: string | null) => void
  updateQuantity: (productId: string, quantity: number, size?: string | null, color?: string | null) => void
  clearCart: () => void
  subtotal: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

// ✅ NUEVO: identifica un ítem único por producto + talla + color
function mismoItem(a: CartItem, productId: string, size?: string | null, color?: string | null) {
  return a.product.id === productId && (a.size ?? null) === (size ?? null) && (a.color ?? null) === (color ?? null)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  function addItem(product: Product, quantity = 1, size: string | null = null, color: string | null = null) {
    setItems((prev) => {
      const existing = prev.find((i) => mismoItem(i, product.id, size, color))
      if (existing) {
        return prev.map((i) =>
          mismoItem(i, product.id, size, color) ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { product, quantity, size, color }]
    })
  }

  function removeItem(productId: string, size: string | null = null, color: string | null = null) {
    setItems((prev) => prev.filter((i) => !mismoItem(i, productId, size, color)))
  }

  function updateQuantity(productId: string, quantity: number, size: string | null = null, color: string | null = null) {
    setItems((prev) =>
      prev.map((i) =>
        mismoItem(i, productId, size, color) ? { ...i, quantity: Math.max(1, quantity) } : i
      )
    )
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
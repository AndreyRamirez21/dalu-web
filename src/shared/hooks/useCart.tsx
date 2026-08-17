/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import type { Product } from '@/shared/types/product'
import { getProductsByIds } from '@/services/products'

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
  refreshPrices: () => Promise<void>
  subtotal: number
  itemCount: number
}

const CartContext = createContext<CartContextValue | undefined>(undefined)
const CART_STORAGE_KEY = 'dalu-cart'

function getStoredCart(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (!savedCart) return []

    const parsedCart: unknown = JSON.parse(savedCart)
    return Array.isArray(parsedCart) ? parsedCart as CartItem[] : []
  } catch {
    return []
  }
}

function mismoItem(a: CartItem, productId: string, size?: string | null, color?: string | null) {
  return a.product.id === productId && (a.size ?? null) === (size ?? null) && (a.color ?? null) === (color ?? null)
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(getStoredCart)
  const itemsRef = useRef(items)

  useEffect(() => {
    itemsRef.current = items
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const refreshPrices = useCallback(async () => {
    const currentItems = itemsRef.current
    if (currentItems.length === 0) return

    try {
      const currentProducts = await getProductsByIds([...new Set(currentItems.map((item) => item.product.id))])
      const productsById = new Map(currentProducts.map((product) => [product.id, product]))

      setItems((previousItems) =>
        previousItems.map((item) => {
          const currentProduct = productsById.get(item.product.id)
          return currentProduct ? { ...item, product: currentProduct } : item
        })
      )
    } catch {
      // Se conserva el precio almacenado si no hay conexión; el usuario puede reintentar al volver al carrito.
    }
  }, [])

  useEffect(() => {
    void refreshPrices()
  }, [refreshPrices])

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
    if (quantity < 1) {
      removeItem(productId, size, color)
      return
    }
    setItems((prev) =>
      prev.map((i) =>
        mismoItem(i, productId, size, color) ? { ...i, quantity } : i
      )
    )
  }

  function clearCart() {
    setItems([])
  }

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, refreshPrices, subtotal, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}

import type { LucideIcon } from 'lucide-react'

export interface ProductVariant {
  size: string
  stock: number
  priceAdjustment: number
}

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  category: 'pijamas' | 'pantuflas' | 'antifaces' | 'accesorios'
  colors: string[]
  sizes: string[]
  variants: ProductVariant[]
  images: string[]
  description?: string
  fabricType?: string
  featured?: boolean
  inStock: boolean
  reference: string
  collection?: string | null
  line: string | null

}

export interface CategoryTheme {
  cardBg: string
  badgeBg: string
  badgeIcon: string
  buttonBg: string
  buttonText: string
}

export interface Category {
  id: string
  slug: string
  name: string
  image: string
  description?: string
  icon?: LucideIcon
  theme?: CategoryTheme
}
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
  featured?: boolean
  inStock: boolean
  reference: string
  collection?: string | null

}

export interface Category {
  id: string
  slug: string
  name: string
  image: string
}

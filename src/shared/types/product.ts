export interface Product {
  id: string
  slug: string
  name: string
  price: number
  category: 'pijamas-short' | 'pijamas-pantalon' | 'pantuflas' | 'antifaces' | 'accesorios'
  colors: string[]
  sizes: ('S' | 'M' | 'L' | 'XL')[]
  images: string[]
  rating: number
  reviewCount: number
  description?: string
  featured?: boolean
}

export interface Category {
  id: string
  slug: string
  name: string
  image: string
}
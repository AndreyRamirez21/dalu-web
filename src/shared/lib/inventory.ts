import type { Product } from '@/shared/types/product'

export function getStockForSelection(product: Product, size?: string | null): number {
  if (product.variants.length === 0) return product.inStock ? 1 : 0

  const variant = product.variants.find((item) => item.size === size)
  return variant?.stock ?? 0
}

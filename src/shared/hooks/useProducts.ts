import { useQuery } from '@tanstack/react-query'
import {
  getFeaturedProducts,
  getProductBySlug,
  getProductsByCategories,
  getProductsByIds,
  getRelatedProducts,
  searchProducts,
} from '@/services/products'

export const productQueryKeys = {
  featured: ['products', 'featured'] as const,
  byCategories: (categories: string[]) => ['products', 'categories', categories] as const,
  bySlug: (slug: string) => ['products', 'detail', slug] as const,
  related: (category: string, productId: string) => ['products', 'related', category, productId] as const,
  favorites: (ids: string[]) => ['products', 'favorites', ids] as const,
  search: (query: string) => ['products', 'search', query] as const,
}

export function useFeaturedProducts() {
  return useQuery({ queryKey: productQueryKeys.featured, queryFn: getFeaturedProducts })
}

export function useProductsByCategories(categories: string[]) {
  return useQuery({
    queryKey: productQueryKeys.byCategories(categories),
    queryFn: () => getProductsByCategories(categories),
    enabled: categories.length > 0,
  })
}

export function useProduct(slug?: string) {
  return useQuery({
    queryKey: productQueryKeys.bySlug(slug ?? ''),
    queryFn: () => getProductBySlug(slug!),
    enabled: Boolean(slug),
  })
}

export function useRelatedProducts(category?: string, productId?: string) {
  return useQuery({
    queryKey: productQueryKeys.related(category ?? '', productId ?? ''),
    queryFn: () => getRelatedProducts(category!, productId!, 4),
    enabled: Boolean(category && productId),
  })
}

export function useFavoriteProducts(ids: string[]) {
  return useQuery({
    queryKey: productQueryKeys.favorites(ids),
    queryFn: () => getProductsByIds(ids),
    enabled: ids.length > 0,
  })
}

export function useProductSearch(query: string, enabled: boolean) {
  return useQuery({
    queryKey: productQueryKeys.search(query),
    queryFn: () => searchProducts(query, 6),
    enabled: enabled && query.length >= 2,
  })
}

import { supabase } from './supabaseClient'
import type { Product } from '@/shared/types/product'



interface VarianteWeb {
  talla: string
  stock: number
  ajuste_precio: number
}

interface ProductoWebRow {
  id: number
  referencia: string
  nombre: string
  slug: string
  categoria: string
  precio_venta_base: number
  imagen_url: string | null
  featured: boolean
  activo: boolean
  variantes_web: VarianteWeb[]
  coleccion: string | null
}

function mapProducto(row: ProductoWebRow): Product {
  const tallasConStock = (row.variantes_web || [])
    .filter((v) => v.stock > 0)
    .map((v) => v.talla)

  const stockTotal = (row.variantes_web || []).reduce((sum, v) => sum + v.stock, 0)

  return {
    id: String(row.id),
    slug: row.slug,
    name: row.nombre,
    price: row.precio_venta_base,
    category: row.categoria as Product['category'],
    colors: [],
    sizes: tallasConStock,
    images: row.imagen_url ? [row.imagen_url] : [],
    featured: row.featured,
    inStock: stockTotal > 0,
    reference: row.referencia,
    collection: row.coleccion ?? null,
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('productos_web')
    .select('*, variantes_web(talla, stock, ajuste_precio)')
    .eq('activo', true)
    .eq('featured', true)

  if (error) {
    console.error('Error al obtener productos destacados:', error)
    throw new Error('No se pudieron cargar los productos destacados.')
  }

  return (data || []).map(mapProducto)
}

export async function getProductsByCategories(categories: string[]): Promise<Product[]> {
  const { data, error } = await supabase
    .from('productos_web')
    .select('*, variantes_web(talla, stock, ajuste_precio)')
    .eq('activo', true)
    .in('categoria', categories)

  if (error) {
    console.error('Error al obtener productos por categoría:', error)
    throw new Error('No se pudieron cargar los productos de esta categoría.')
  }

  return (data || []).map(mapProducto)
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('productos_web')
    .select('*, variantes_web(talla, stock, ajuste_precio)')
    .eq('activo', true)
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Error al obtener producto:', error)
    throw new Error('No se pudo cargar este producto.')
  }

  return data ? mapProducto(data) : null
}

export async function getRelatedProducts(category: string, excludeId: string, limit = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from('productos_web')
    .select('*, variantes_web(talla, stock, ajuste_precio)')
    .eq('activo', true)
    .eq('categoria', category)
    .neq('id', Number(excludeId))
    .limit(limit)

  if (error) {
    console.error('Error al obtener productos relacionados:', error)
    throw new Error('No se pudieron cargar los productos relacionados.')
  }

  return (data || []).map(mapProducto)
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return []

  const { data, error } = await supabase
    .from('productos_web')
    .select('*, variantes_web(talla, stock, ajuste_precio)')
    .eq('activo', true)
    .in('id', ids)

  if (error) {
    console.error('Error al obtener productos favoritos:', error)
    throw new Error('No se pudieron cargar los productos favoritos.')
  }

  return (data || []).map(mapProducto)
}

export async function searchProducts(query: string, limit = 6): Promise<Product[]> {
  const { data, error } = await supabase
    .from('productos_web')
    .select('*, variantes_web(talla, stock, ajuste_precio)')
    .eq('activo', true)
    .ilike('nombre', `%${query}%`)
    .limit(limit)

  if (error) {
    console.error('Error al buscar productos:', error)
    throw new Error('No se pudieron buscar productos.')
  }

  return (data || []).map(mapProducto)
}

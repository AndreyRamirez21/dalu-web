import { supabase } from './supabaseClient'
import type { Product } from '@/shared/types/product'

interface VarianteWeb {
  talla: string
  disponible: boolean
  cantidad_maxima: number
}

interface ProductoWebRow {
  id: number
  referencia: string
  nombre: string
  slug: string
  categoria: string
  precio_venta_base: number
  imagen_url: string | null
  imagenes_urls: string[] | null
  featured: boolean
  activo: boolean
  variantes_web_publico: VarianteWeb[]
  coleccion: string | null
  descripcion: string | null
}

function mapProducto(row: ProductoWebRow): Product {
  const tallasConStock = (row.variantes_web_publico || [])
    .filter((v) => v.disponible)
    .map((v) => v.talla)

  const hayStock = (row.variantes_web_publico || []).some((v) => v.disponible)

  const galeria =
    row.imagenes_urls && row.imagenes_urls.length > 0
      ? row.imagenes_urls
      : row.imagen_url
        ? [row.imagen_url]
        : []

  return {
    id: String(row.id),
    slug: row.slug,
    name: row.nombre,
    price: row.precio_venta_base,
    category: row.categoria as Product['category'],
    colors: [],
    sizes: tallasConStock,
    variants: (row.variantes_web_publico || []).map((variant) => ({
      size: variant.talla,
      stock: Math.max(0, variant.cantidad_maxima),
      priceAdjustment: 0,
    })),
    images: galeria,
    featured: row.featured,
    inStock: hayStock,
    reference: row.referencia,
    collection: row.coleccion ?? null,
    description: row.descripcion?.trim() || undefined,
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('productos_web')
    .select('*, variantes_web_publico(talla, disponible, cantidad_maxima)')
    .eq('activo', true)
    .eq('coleccion_visible', true)
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
    .select('*, variantes_web_publico(talla, disponible, cantidad_maxima)')
    .eq('activo', true)
    .eq('coleccion_visible', true)
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
    .select('*, variantes_web_publico(talla, disponible, cantidad_maxima)')
    .eq('activo', true)
    .eq('coleccion_visible', true)
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
    .select('*, variantes_web_publico(talla, disponible, cantidad_maxima)')
    .eq('activo', true)
    .eq('coleccion_visible', true)
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
    .select('*, variantes_web_publico(talla, disponible, cantidad_maxima)')
    .eq('activo', true)
    .eq('coleccion_visible', true)
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
    .select('*, variantes_web_publico(talla, disponible, cantidad_maxima)')
    .eq('activo', true)
    .eq('coleccion_visible', true)
    .ilike('nombre', `%${query}%`)
    .limit(limit)

  if (error) {
    console.error('Error al buscar productos:', error)
    throw new Error('No se pudieron buscar productos.')
  }

  return (data || []).map(mapProducto)
}
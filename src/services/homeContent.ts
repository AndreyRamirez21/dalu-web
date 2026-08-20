import { supabase } from './supabaseClient'
import { categories as defaultCategories } from '@/data/categories'
import type { Category } from '@/shared/types/product'

const HOME_CONFIG_PATH = 'pagina-inicio/config.json'
const HOME_BUCKET = 'productos-imagenes'

export interface HomeCollection {
  mediaUrl: string
  mediaType: 'image' | 'video'
  eyebrow: string
  title: string
  description: string
  link: string
}

export interface HomeContent {
  hero: {
    title: string
    subtitle: string
    primaryLink: string
    slides: string[]
  }
  categories: Array<Category & { imageUrl?: string }>
  collection: HomeCollection
  video: {
    mediaUrl: string
    posterUrl: string
    title: string
    description: string
    link: string
  }
  featuredReferences: string[]
}

const fallbackContent: HomeContent = {
  hero: {
    title: 'Comodidad que te acompaña',
    subtitle: 'Pijamas, pantuflas y accesorios para tus mejores momentos.',
    primaryLink: '/pijamas',
    slides: ['/images/products/Pij10.webp', '/images/products/Pij9.webp', '/images/products/Pij11.webp', '/images/products/Pij4.webp'],
  },
  categories: defaultCategories,
  collection: {
    mediaUrl: '/images/products/Pij11.webp',
    mediaType: 'image',
    eyebrow: 'Colección del mes',
    title: 'Comodidad para quedarte un rato más',
    description: 'Descubre una selección especial de pijamas para tus momentos más tranquilos.',
    link: '/pijamas',
  },
  video: {
    mediaUrl: '/videos/hero-dalu.mp4',
    posterUrl: '/images/products/Pij11.webp',
    title: 'Momentos que se sienten como en casa',
    description: 'Descubre cómo se mueve Dalú en cada detalle.',
    link: '/pijamas',
  },
  featuredReferences: [],
}

function normalizeContent(value: Partial<HomeContent>): HomeContent {
  const hero = { ...fallbackContent.hero, ...value.hero }
  const categories = fallbackContent.categories.map((fallback, index) => {
    const saved = value.categories?.[index]
    return { ...fallback, ...saved, image: saved?.imageUrl || saved?.image || fallback.image }
  })
  return {
    hero: { ...hero, slides: hero.slides.filter(Boolean).length > 0 ? hero.slides.filter(Boolean) : fallbackContent.hero.slides },
    categories,
    collection: {
      ...fallbackContent.collection,
      ...value.collection,
      mediaType: 'image',
      mediaUrl: value.collection?.mediaType === 'image' && value.collection.mediaUrl ? value.collection.mediaUrl : fallbackContent.collection.mediaUrl,
    },
    // Compatibilidad con la primera versión del panel, que guardaba el video
    // dentro de `collection`.
    video: {
      ...fallbackContent.video,
      ...value.video,
      mediaUrl: value.video?.mediaUrl || (value.collection?.mediaType === 'video' ? value.collection.mediaUrl : fallbackContent.video.mediaUrl),
    },
    featuredReferences: Array.isArray(value.featuredReferences) ? value.featuredReferences : [],
  }
}

export async function getHomeContent(): Promise<HomeContent> {
  const { data, error } = await supabase.storage.from(HOME_BUCKET).download(HOME_CONFIG_PATH)
  if (error) {
    // La portada sigue funcionando con los recursos incluidos hasta que se publique
    // el primer cambio desde Electron.
    if (error.statusCode === '404' || error.message.toLowerCase().includes('not found')) return fallbackContent
    throw new Error('No se pudo cargar la configuración de la página de inicio.')
  }

  try {
    return normalizeContent(JSON.parse(await data.text()) as Partial<HomeContent>)
  } catch {
    throw new Error('La configuración de la página de inicio no tiene un formato válido.')
  }
}

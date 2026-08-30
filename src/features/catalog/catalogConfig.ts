export interface CatalogConfig {
  title: string
  description: string
  categories: string[]
  collectionFilters?: Array<{ label: string; value: string }>
  collection?: string
  collectionSlug?: string
}

export interface CollectionLink {
  label: string
  to: string
}

function normalizeCollection(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()
}

export function collectionToSlug(value: string) {
  return normalizeCollection(value).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export const catalogConfigBySlug: Record<string, CatalogConfig> = {
  pijamas: {
    title: 'Sleepwear',
    description:
      'Descubre nuestra colección de pijamas diseñadas para que te sientas cómoda, linda y segura siendo tú.',
    categories: ['pijamas'],
  },
  pantuflas: {
    title: 'Slippers',
    description: 'Suavidad y calidez para tus pies en cada paso, dentro y fuera de casa.',
    categories: ['pantuflas'],
  },
  antifaces: {
    title: 'Antifaces',
    description: 'Descansa mejor con nuestros antifaces suaves y elegantes.',
    categories: ['antifaces'],
  },
  regala: {
    title: 'Regala',
    description: 'Guarda tus productos en nuestras bolsas/cajas de regalo.',
    categories: ['regala'],
  },
  accesorios: {
    title: 'Accesorios',
    description: 'Los detalles que completan tu rutina de descanso.',
    categories: ['accesorios'],
    collectionFilters: [
      { label: 'Humidificadores', value: 'humidificadores' },
      { label: 'Fundas', value: 'fundas' },
      { label: 'Scrunchies', value: 'scrunchies' },
      { label: 'Rizadores', value: 'rizadores' },
      { label: 'Gorros en satín', value: 'gorros en satin' },
      { label: 'Lámparas', value: 'lamparas' },
      { label: 'Cuelleros', value: 'cuelleros' },
      { label: 'Varios', value: 'varios' },
    ],
  },
  'pijamas-essence': {
    title: 'Pijamas Essence',
    description: 'Descubre los diseños de nuestra colección de pijamas Essence.',
    categories: ['pijamas'],
    collection: 'Essence',
  },
  'pijamas-deluxe': {
    title: 'Pijamas Deluxe',
    description: 'Descubre los diseños de nuestra colección de pijamas Deluxe.',
    categories: ['pijamas'],
    collection: 'Deluxe',
  },
  humidificadores: { title: 'Humidificadores', description: 'Humidificadores para completar tu rutina de descanso.', categories: ['accesorios'], collection: 'humidificadores' },
  fundas: { title: 'Fundas', description: 'Fundas suaves para tus accesorios de descanso.', categories: ['accesorios'], collection: 'fundas' },
  scrunchies: { title: 'Scrunchies', description: 'Scrunchies cómodos para acompañar tu rutina.', categories: ['accesorios'], collection: 'scrunchies' },
  rizadores: { title: 'Rizadores', description: 'Rizadores para cuidar tu cabello mientras descansas.', categories: ['accesorios'], collection: 'rizadores' },
  'gorros-en-satin': { title: 'Gorros en satín', description: 'Gorros en satín para proteger tu cabello durante la noche.', categories: ['accesorios'], collection: 'gorros en satin' },
  lamparas: { title: 'Lámparas', description: 'Lámparas para crear un ambiente de descanso.', categories: ['accesorios'], collection: 'lamparas' },
  cuelleros: { title: 'Cuelleros', description: 'Cuelleros suaves para descansar con más comodidad.', categories: ['accesorios'], collection: 'cuelleros' },
  varios: { title: 'Varios', description: 'Otros accesorios para complementar tu rutina de descanso.', categories: ['accesorios'], collection: 'varios' },
}

export const sleepwearCollectionLinks: CollectionLink[] = [
  { label: 'Ver todos', to: '/pijamas' },
  { label: 'Essence', to: '/coleccion/pijamas-essence' },
  { label: 'Deluxe', to: '/coleccion/pijamas-deluxe' },
]

export function buildSleepwearCollectionLinks(collections: Array<string | null | undefined>): CollectionLink[] {
  const existing = new Set(sleepwearCollectionLinks.map((link) => normalizeCollection(link.label)))
  const dynamic = collections
    .filter((collection): collection is string => Boolean(collection?.trim()))
    .filter((collection) => {
      const normalized = normalizeCollection(collection)
      if (existing.has(normalized)) return false
      existing.add(normalized)
      return true
    })
    .map((collection) => ({
      label: collection.trim(),
      to: `/coleccion/pijamas-${collectionToSlug(collection)}`,
    }))

  return [...sleepwearCollectionLinks, ...dynamic]
}

export const accessoryCollectionLinks: CollectionLink[] = [
  { label: 'Ver todos', to: '/accesorios' },
  { label: 'Humidificadores', to: '/coleccion/humidificadores' },
  { label: 'Fundas', to: '/coleccion/fundas' },
  { label: 'Scrunchies', to: '/coleccion/scrunchies' },
  { label: 'Rizadores', to: '/coleccion/rizadores' },
  { label: 'Gorros en satín', to: '/coleccion/gorros-en-satin' },
  { label: 'Lámparas', to: '/coleccion/lamparas' },
  { label: 'Cuelleros', to: '/coleccion/cuelleros' },
  { label: 'Varios', to: '/coleccion/varios' },
  { label: 'Regala', to: '/coleccion/regala' },

]

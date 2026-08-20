import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ProductCard } from '@/shared/ui/components/ProductCard'
import { CatalogFilterDrawer } from './components/CatalogFilterDrawer'
import { type SortOption } from './components/SortDropdown'
import { catalogConfigBySlug, collectionToSlug } from './catalogConfig'
import { useProductsByCategories } from '@/shared/hooks/useProducts'

const ITEMS_PER_LOAD = 12

function normalizeCollection(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
}

export function CatalogPage() {
  const { categorySlug, collectionSlug } = useParams()
  const slug = categorySlug ?? collectionSlug
  const config = slug ? catalogConfigBySlug[slug] ?? (collectionSlug ? {
    title: `Pijamas ${collectionSlug.replace(/^pijamas-/, '').split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')}`,
    description: 'Descubre los diseños de esta colección especial de Dalú.',
    categories: ['pijamas'],
    collectionSlug,
  } : undefined) : undefined

  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedCollection, setSelectedCollection] = useState<string | null>(config?.collection ?? config?.collectionSlug ?? null)
  const [priceRange, setPriceRange] = useState<[number, number | null]>([0, null])
  const [sort, setSort] = useState<SortOption>('recientes')
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const { data: allProducts = [], isPending: cargando, isError: loadError, refetch } = useProductsByCategories(config?.categories ?? [])

  const maxPrice = useMemo(
    () => Math.max(0, ...allProducts.map((product) => product.price)),
    [allProducts]
  )

  const availableSizes = useMemo(() => {
    const set = new Set<string>()
    allProducts.forEach((p) => p.sizes.forEach((s) => set.add(s)))
    return Array.from(set).sort()
  }, [allProducts])

  const availableCollections = useMemo(() => {
    const set = new Set<string>()
    allProducts.forEach((p) => {
      if (p.collection) set.add(p.collection)
    })
    return Array.from(set)
  }, [allProducts])

  useEffect(() => {
    setSelectedCollection(config?.collection ?? config?.collectionSlug ?? null)
    setVisibleCount(ITEMS_PER_LOAD)
  }, [config?.collection, config?.collectionSlug, slug])

  const collectionOptions = useMemo(
    () => config?.collectionFilters ?? availableCollections.map((collection) => ({ label: collection, value: collection })),
    [availableCollections, config]
  )

  const filtered = useMemo(() => {
    let result = allProducts.filter(
      (p) => p.price >= priceRange[0] && (priceRange[1] === null || p.price <= priceRange[1])
    )

    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)))
    }

    if (selectedCollection) {
      result = result.filter((p) => p.collection && (
        normalizeCollection(p.collection) === normalizeCollection(selectedCollection) ||
        `pijamas-${collectionToSlug(p.collection)}` === selectedCollection
      ))
    }

    if (sort === 'recientes') result = [...result].sort((a, b) => Number(b.id) - Number(a.id))
    if (sort === 'precio-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'precio-desc') result = [...result].sort((a, b) => b.price - a.price)

    return result
  }, [allProducts, selectedSizes, selectedCollection, priceRange, sort])

  const visibleProducts = filtered.slice(0, visibleCount)
  const hayMasPorCargar = visibleCount < filtered.length

  // Observador de scroll: cuando el sentinel entra en pantalla, carga más
  useEffect(() => {
    if (!hayMasPorCargar) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, filtered.length))
        }
      },
      { rootMargin: '400px' } // empieza a cargar un poco antes de llegar al final
    )

    const el = sentinelRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [hayMasPorCargar, filtered.length])

  function toggleSize(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
  }

  function clearFilters() {
    setSelectedSizes([])
    setSelectedCollection(config?.collection ?? config?.collectionSlug ?? null)
    setPriceRange([0, null])
  }

  if (!config) {
    return (
      <div className="max-w-8xl mx-auto px-6 py-20 text-center">
        <p className="text-text-secondary">Categoría no encontrada.</p>
        <Link to="/" className="text-primary text-sm hover:underline mt-2 inline-block">
          Volver al inicio
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-8xl mx-auto px-6 py-10">
      <Helmet>
        <title>{config.title} | Dalú</title>
        <meta name="description" content={config.description} />
      </Helmet>
      <nav className="text-xs text-text-secondary mb-4">
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-text-primary">{config.title}</span>
      </nav>

      <h1 className="font-display text-3xl text-text-primary">{config.title}</h1>
      <p className="text-text-secondary text-sm mt-1 mb-8">{config.description}</p>

      <div>
        <div className="mb-6">
          <CatalogFilterDrawer
          availableSizes={availableSizes}
          selectedSizes={selectedSizes}
          onToggleSize={toggleSize}
          priceRange={priceRange}
          maxPrice={maxPrice}
          onChangePriceRange={setPriceRange}
          sort={sort}
          onChangeSort={setSort}
          resultCount={filtered.length}
          onClearFilters={clearFilters}
          />
        </div>

        <div>
          {!config.collection && !config.collectionSlug && collectionOptions.length > 0 && (
            <div className="flex gap-2 mb-6 flex-wrap">
              <button
                onClick={() => setSelectedCollection(null)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  selectedCollection === null
                    ? 'bg-primary-strong text-white'
                    : 'bg-surface border border-border text-text-primary hover:border-primary'
                }`}
              >
                Todos
              </button>
              {collectionOptions.map((collection) => (
                <button
                  key={collection.value}
                  onClick={() => setSelectedCollection(collection.value)}
                  className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-colors ${
                    selectedCollection === collection.value
                    ? 'bg-primary-strong text-white'
                      : 'bg-surface border border-border text-text-primary hover:border-primary'
                  }`}
                >
                  {collection.label}
                </button>
              ))}
            </div>
          )}

          {cargando ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                  <div className="rounded-2xl bg-surface shadow-sm aspect-[4/5] bg-primary-light" />
                  <div className="mt-3 space-y-2">
                    <div className="h-4 w-3/4 bg-border rounded" />
                    <div className="h-4 w-1/3 bg-border rounded" />
                    <div className="h-9 w-full bg-border rounded-full mt-2" />
                  </div>
                </div>
              ))}
            </div>
          ) : loadError ? (
            <div className="py-20 text-center">
              <p className="text-text-secondary text-sm">No pudimos cargar el catálogo. Revisa tu conexión e inténtalo de nuevo.</p>
              <button onClick={() => refetch()} className="mt-3 text-sm font-medium text-primary hover:underline">
                Reintentar
              </button>
            </div>
          ) : visibleProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <AnimatePresence initial={false}>
                  {visibleProducts.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (i % ITEMS_PER_LOAD) * 0.04 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Sentinel invisible: al entrar en pantalla, carga más productos */}
              {hayMasPorCargar && (
                <div ref={sentinelRef} className="flex justify-center py-10">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" />
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-text-secondary text-sm py-20 text-center">
              No hay productos que coincidan con los filtros seleccionados.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

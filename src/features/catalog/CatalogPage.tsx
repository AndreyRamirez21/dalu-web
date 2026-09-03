import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { m, AnimatePresence } from 'framer-motion'
import { ProductCard } from '@/shared/ui/components/ProductCard'
import { CatalogFilterDrawer } from './components/CatalogFilterDrawer'
import { type SortOption } from './components/SortDropdown'
import { catalogConfigBySlug, collectionToSlug } from './catalogConfig'
import { useProductsByCategories } from '@/shared/hooks/useProducts'
import { Canonical } from '@/shared/ui/components/Canonical'

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
    const config = useMemo(() => {
      if (!slug) return undefined
      return catalogConfigBySlug[slug] ?? (collectionSlug ? {
        title: `Pijamas ${collectionSlug.replace(/^pijamas-/, '').split('-').map((word) => word[0]?.toUpperCase() + word.slice(1)).join(' ')}`,
        description: 'Descubre los diseños de esta colección especial de Dalú.',
        categories: ['pijamas'],
        collectionSlug,
      } : undefined)
}, [slug, collectionSlug])

  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedFabricTypes, setSelectedFabricTypes] = useState<string[]>([])
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
      if (p.line) set.add(p.line)
      if (p.collection) set.add(p.collection)
    })
    return Array.from(set)
  }, [allProducts])

  const availableFabricTypes = useMemo(() => {
    const set = new Set<string>()
    allProducts.forEach((product) => {
      if (product.fabricType) set.add(product.fabricType)
    })
    return Array.from(set).sort()
  }, [allProducts])

useEffect(() => {
  setSelectedCollection(config?.collection ?? config?.collectionSlug ?? null)
  setVisibleCount(ITEMS_PER_LOAD)
}, [config])

  const collectionOptions = useMemo(
    () => config?.collectionFilters ?? availableCollections.map((collection) => ({ label: collection, value: collection })),
    [availableCollections, config]
  )

  const filtered = useMemo(() => {
    let result = allProducts.filter(
      (p) => p.price >= priceRange[0] && (priceRange[1] === null || p.price <= priceRange[1])
    )

        if (selectedSizes.length > 0) {
          const sizesSet = new Set(selectedSizes)
          result = result.filter((p) => p.sizes.some((s) => sizesSet.has(s)))
        }

        if (selectedFabricTypes.length > 0) {
          const fabricTypesSet = new Set(selectedFabricTypes)
          result = result.filter((p) => p.fabricType && fabricTypesSet.has(p.fabricType))
        }

    if (selectedCollection) {
      result = result.filter((p) => {
        const matchesLine =
          p.line &&
          (normalizeCollection(p.line) === normalizeCollection(selectedCollection) ||
            `pijamas-${collectionToSlug(p.line)}` === selectedCollection)

        const matchesCollection =
          p.collection &&
          (normalizeCollection(p.collection) === normalizeCollection(selectedCollection) ||
            `pijamas-${collectionToSlug(p.collection)}` === selectedCollection)

        return matchesLine || matchesCollection
      })
    }

    if (sort === 'recientes') result = [...result].sort((a, b) => Number(b.id) - Number(a.id))
    if (sort === 'precio-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'precio-desc') result = [...result].sort((a, b) => b.price - a.price)

    return result
  }, [allProducts, selectedSizes, selectedFabricTypes, selectedCollection, priceRange, sort])

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

  function toggleFabricType(fabricType: string) {
    setSelectedFabricTypes((prev) =>
      prev.includes(fabricType) ? prev.filter((type) => type !== fabricType) : [...prev, fabricType]
    )
  }

  function clearFilters() {
    setSelectedSizes([])
    setSelectedFabricTypes([])
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
    <div className="max-w-[88rem] mx-auto px-6 sm:px-8 lg:px-14 py-10">
        <title>{config.title} | Dalú</title>
        <meta name="description" content={config.description} />
        <Canonical />
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
          availableFabricTypes={availableFabricTypes}
          selectedFabricTypes={selectedFabricTypes}
          onToggleFabricType={toggleFabricType}
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
              {Array.from({ length: ITEMS_PER_LOAD }).map((_, i) => (
                <div key={i} className="min-h-[150px]">
                  <div className="rounded-none bg-surface aspect-[3/4] bg-primary-light" />
                  <div className="mt-3 space-y-3">
                    <div className="h-4 w-3/4 rounded bg-border" />
                    <div className="h-4 w-1/3 rounded bg-border" />
                    <div className="flex gap-2 pt-1">
                      <div className="h-9 w-10 rounded-lg bg-border" />
                      <div className="h-9 w-10 rounded-lg bg-border" />
                    </div>
                    <div className="h-10 w-full rounded-full bg-border" />
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 lg:gap-x-8">
                <AnimatePresence initial={false}>
                  {visibleProducts.map((product, i) => (
                    <m.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: (i % ITEMS_PER_LOAD) * 0.04 }}
                    >
                      <ProductCard product={product} />
                    </m.div>
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
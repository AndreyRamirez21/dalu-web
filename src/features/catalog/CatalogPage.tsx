import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductCard } from '@/shared/ui/components/ProductCard'
import { Pagination } from '@/shared/ui/components/Pagination'
import { FilterSidebar } from './components/FilterSidebar'
import { SortDropdown, type SortOption } from './components/SortDropdown'
import { getProductsByCategories } from '@/data/products'
import { catalogConfigBySlug } from './catalogConfig'

const PAGE_SIZE = 8

export function CatalogPage() {
  const { categorySlug } = useParams()
  const config = categorySlug ? catalogConfigBySlug[categorySlug] : undefined

  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([30000, 120000])
  const [sort, setSort] = useState<SortOption>('recientes')
  const [currentPage, setCurrentPage] = useState(1)

  const allProducts = useMemo(
    () => (config ? getProductsByCategories(config.categories) : []),
    [config]
  )

  const filtered = useMemo(() => {
    let result = allProducts.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    )

    if (selectedSizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)))
    }

    if (selectedColor) {
      result = result.filter((p) => p.colors.includes(selectedColor))
    }

    if (sort === 'precio-asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'precio-desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'rating') result = [...result].sort((a, b) => b.rating - a.rating)

    return result
  }, [allProducts, selectedSizes, selectedColor, priceRange, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function toggleSize(size: string) {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    )
    setCurrentPage(1)
  }

  function clearFilters() {
    setSelectedSizes([])
    setSelectedColor(null)
    setPriceRange([30000, 120000])
    setCurrentPage(1)
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
      <nav className="text-xs text-text-secondary mb-4">
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-text-primary">{config.title}</span>
      </nav>

      <h1 className="font-display text-3xl text-text-primary">{config.title}</h1>
      <p className="text-text-secondary text-sm mt-1 mb-8">{config.description}</p>

      <div className="flex flex-col md:flex-row gap-10">
        <FilterSidebar
          selectedSizes={selectedSizes}
          onToggleSize={toggleSize}
          selectedColor={selectedColor}
          onSelectColor={(c) => { setSelectedColor(c); setCurrentPage(1) }}
          priceRange={priceRange}
          onChangePriceRange={(r) => { setPriceRange(r); setCurrentPage(1) }}
          onClearFilters={clearFilters}
        />

        <div className="flex-1">
          <div className="flex justify-end mb-6">
            <SortDropdown value={sort} onChange={setSort} />
          </div>

          {paginated.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-text-secondary text-sm py-20 text-center">
              No hay productos que coincidan con los filtros seleccionados.
            </p>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
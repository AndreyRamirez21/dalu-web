import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react'
import { formatPrice } from '@/shared/lib/formatters'
import type { SortOption } from './SortDropdown'

interface CatalogFilterDrawerProps {
  availableSizes: string[]
  selectedSizes: string[]
  onToggleSize: (size: string) => void
  availableFabricTypes: string[]
  selectedFabricTypes: string[]
  onToggleFabricType: (fabricType: string) => void
  priceRange: [number, number | null]
  maxPrice: number
  onChangePriceRange: (range: [number, number | null]) => void
  sort: SortOption
  onChangeSort: (sort: SortOption) => void
  resultCount: number
  onClearFilters: () => void
}

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: 'recientes', label: 'Más recientes' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
]

export function CatalogFilterDrawer({
  availableSizes,
  selectedSizes,
  onToggleSize,
  availableFabricTypes,
  selectedFabricTypes,
  onToggleFabricType,
  priceRange,
  maxPrice,
  onChangePriceRange,
  sort,
  onChangeSort,
  resultCount,
  onClearFilters,
}: CatalogFilterDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [openSections, setOpenSections] = useState<string[]>([])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    function handleClose() {
      setIsOpen(false)
    }

    function handleBackdropClick(event: MouseEvent) {
      if (event.target === dialog) setIsOpen(false)
    }

    dialog.addEventListener('close', handleClose)
    dialog.addEventListener('click', handleBackdropClick)
    return () => {
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('click', handleBackdropClick)
    }
  }, [])

  function toggleSection(section: string) {
    setOpenSections((current) =>
      current.includes(section)
        ? current.filter((item) => item !== section)
        : [...current, section]
    )
  }

  function isSectionOpen(section: string) {
    return openSections.includes(section)
  }

  const currentMax = priceRange[1] ?? maxPrice

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-primary/20"
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
        Filtrar y ordenar <span className="text-text-secondary">{resultCount} resultados</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="filter-drawer-title"
        className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/45"
      >
        <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <h2 id="filter-drawer-title" className="text-xl font-semibold text-text-primary">Filtrar y ordenar</h2>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Cerrar filtros" className="p-1 text-text-primary">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6">
            <FilterSection title="Ordenar por" isOpen={isSectionOpen('sort')} onToggle={() => toggleSection('sort')}>
              <div className="space-y-3 pt-1">
                {sortOptions.map((option) => (
                  <label key={option.value} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                    <input type="radio" name="sort" value={option.value} checked={sort === option.value} onChange={() => onChangeSort(option.value)} className="h-4 w-4 accent-primary" />
                    {option.label}
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Tallas" isOpen={isSectionOpen('sizes')} onToggle={() => toggleSection('sizes')}>
              {availableSizes.length > 0 ? (
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 pt-1">
                  {availableSizes.map((size) => (
                    <label key={size} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                      <input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => onToggleSize(size)} className="h-4 w-4 accent-primary" />
                      {size}
                    </label>
                  ))}
                </div>
              ) : <p className="text-sm text-text-secondary">No hay tallas disponibles.</p>}
            </FilterSection>

            <FilterSection title="Tipo de tela" isOpen={isSectionOpen('fabric')} onToggle={() => toggleSection('fabric')}>
              {availableFabricTypes.length > 0 ? (
                <div className="space-y-3 pt-1">
                  {availableFabricTypes.map((fabricType) => (
                    <label key={fabricType} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                      <input type="checkbox" checked={selectedFabricTypes.includes(fabricType)} onChange={() => onToggleFabricType(fabricType)} className="h-4 w-4 accent-primary" />
                      {fabricType}
                    </label>
                  ))}
                </div>
              ) : <p className="text-sm text-text-secondary">No hay tipos de tela disponibles.</p>}
            </FilterSection>

            <FilterSection title="Rango de precio" isOpen={isSectionOpen('price')} onToggle={() => toggleSection('price')}>
              <div className="pt-2">
                <input
                  type="range"
                  min={0}
                  max={maxPrice}
                  step={1000}
                  value={currentMax}
                  disabled={maxPrice === 0}
                  onChange={(event) => onChangePriceRange([0, Number(event.target.value)])}
                  className="w-full accent-primary"
                  aria-label={`Precio máximo: ${formatPrice(currentMax)}`}
                />
                <div className="mt-2 flex justify-between text-sm text-text-secondary">
                  <span>{formatPrice(0)}</span>
                  <span>{formatPrice(currentMax)}</span>
                </div>
              </div>
            </FilterSection>
          </div>

          <div className="border-t border-border px-6 py-5">
            <p className="mb-3 text-xs text-text-secondary">Ordenar: {sortOptions.find((option) => option.value === sort)?.label}. {[selectedSizes.length && `${selectedSizes.length} talla(s)`, selectedFabricTypes.length && `${selectedFabricTypes.length} tipo(s) de tela`].filter(Boolean).join(' y ') || 'No se seleccionaron filtros.'}</p>
            <button type="button" onClick={() => setIsOpen(false)} className="w-full bg-primary-strong py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              Ver {resultCount} resultados
            </button>
            <button type="button" onClick={onClearFilters} className="mt-3 w-full text-sm font-medium text-primary underline underline-offset-4">Borrar todo</button>
          </div>
        </aside>
      </dialog>
    </>
  )
}

function FilterSection({ title, isOpen, onToggle, children }: { title: string; isOpen: boolean; onToggle: () => void; children: ReactNode }) {
  return (
    <section className="border-b border-border py-1">
      <button type="button" onClick={onToggle} aria-expanded={isOpen} className="flex w-full items-center justify-between py-5 text-left text-lg font-semibold text-text-primary">
        {title}
        <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      {isOpen && <div className="pb-5">{children}</div>}
    </section>
  )
}
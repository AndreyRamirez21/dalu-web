interface FilterSidebarProps {
  availableSizes: string[]
  selectedSizes: string[]
  onToggleSize: (size: string) => void
  priceRange: [number, number]
  onChangePriceRange: (range: [number, number]) => void
  onClearFilters: () => void
}

export function FilterSidebar({
  availableSizes,
  selectedSizes,
  onToggleSize,
  priceRange,
  onChangePriceRange,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <aside className="w-full md:w-64 shrink-0 space-y-8">
      {availableSizes.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm text-text-primary mb-3">Talla</h3>
          <div className="space-y-2">
            {availableSizes.map((size) => (
              <label key={size} className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => onToggleSize(size)}
                  className="accent-primary w-4 h-4"
                />
                {size}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-sm text-text-primary mb-3">Rango de precio</h3>
        <input
          type="range"
          min={0}
          max={200000}
          step={1000}
          value={priceRange[1]}
          onChange={(e) => onChangePriceRange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-text-secondary mt-1">
          <span>${priceRange[0].toLocaleString('es-CO')} COP</span>
          <span>${priceRange[1].toLocaleString('es-CO')} COP</span>
        </div>
      </div>

      <button
        onClick={onClearFilters}
        className="w-full border border-primary text-primary text-sm font-medium rounded-full py-2.5 hover:bg-primary-light transition-colors"
      >
        Limpiar filtros
      </button>
    </aside>
  )
}
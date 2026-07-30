interface FilterSidebarProps {
  selectedSizes: string[]
  onToggleSize: (size: string) => void
  selectedColor: string | null
  onSelectColor: (color: string | null) => void
  priceRange: [number, number]
  onChangePriceRange: (range: [number, number]) => void
  onClearFilters: () => void
}

const sizes = ['S', 'M', 'L', 'XL']
const colors = ['#82BBBD', '#F4A6B7', '#D9C6EA', '#EAD9BF', '#8C8C8C']

export function FilterSidebar({
  selectedSizes,
  onToggleSize,
  selectedColor,
  onSelectColor,
  priceRange,
  onChangePriceRange,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <aside className="w-full md:w-64 shrink-0 space-y-8">
      <div>
        <h3 className="font-semibold text-sm text-text-primary mb-3">Talla</h3>
        <div className="space-y-2">
          {sizes.map((size) => (
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

      <div>
        <h3 className="font-semibold text-sm text-text-primary mb-3">Color</h3>
        <div className="flex gap-2">
          {colors.map((color) => (
            <button
              key={color}
              aria-label={`Color ${color}`}
              onClick={() => onSelectColor(selectedColor === color ? null : color)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${
                selectedColor === color ? 'border-primary scale-110' : 'border-border'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm text-text-primary mb-3">Rango de precio</h3>
        <input
          type="range"
          min={30000}
          max={120000}
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
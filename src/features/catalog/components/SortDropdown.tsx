export type SortOption = 'recientes' | 'precio-asc' | 'precio-desc'

interface SortDropdownProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-text-secondary">Ordenar por:</span>
            <select
              value={value}
              onChange={(e) => onChange(e.target.value as SortOption)}
              aria-label="Ordenar productos por"
              className="border border-border rounded-full px-4 py-2 text-text-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
        <option value="recientes">Más recientes</option>
        <option value="precio-asc">Precio: menor a mayor</option>
        <option value="precio-desc">Precio: mayor a menor</option>
      </select>
    </div>
  )
}
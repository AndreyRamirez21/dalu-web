import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function QuantitySelector({ value, onChange, min = 1, max = 10 }: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center border border-border rounded-full">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-9 h-9 flex items-center justify-center text-text-primary hover:text-primary disabled:opacity-40 transition-colors"
        aria-label="Disminuir cantidad"
      >
        <Minus size={14} />
      </button>
      <span className="w-8 text-center text-sm font-medium">{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-9 h-9 flex items-center justify-center text-text-primary hover:text-primary disabled:opacity-40 transition-colors"
        aria-label="Aumentar cantidad"
      >
        <Plus size={14} />
      </button>
    </div>
  )
}
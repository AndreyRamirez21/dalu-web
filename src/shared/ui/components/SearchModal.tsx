import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { searchProducts } from '@/services/products'
import type { Product } from '@/shared/types/product'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
  const [buscando, setBuscando] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    setBuscando(true)
    const timeoutId = setTimeout(() => {
      searchProducts(query.trim(), 6).then((data) => {
        setResults(data)
        setBuscando(false)
      })
    }, 300) // debounce: espera 300ms sin escribir antes de buscar

    return () => clearTimeout(timeoutId)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative max-w-xl mx-auto mt-24 bg-surface rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search size={18} className="text-text-secondary shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 text-sm outline-none bg-transparent"
          />
          <button onClick={onClose} aria-label="Cerrar búsqueda" className="text-text-secondary hover:text-text-primary">
            <X size={18} />
          </button>
        </div>

        {query.trim().length >= 2 && (
          <div className="max-h-96 overflow-y-auto">
            {buscando ? (
              <p className="text-sm text-text-secondary text-center py-8">Buscando…</p>
            ) : results.length > 0 ? (
              results.map((product) => (
                <Link
                  key={product.id}
                  to={`/producto/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-primary-light transition-colors"
                >
                  {product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-contain bg-background shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary-light shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{product.name}</p>
                    <p className="text-xs text-text-secondary">
                      ${product.price.toLocaleString('es-CO')} COP
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-sm text-text-secondary text-center py-8">
                No encontramos productos que coincidan con "{query}"
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { useDebouncedValue } from '@/shared/hooks/useDebouncedValue'
import { useProductSearch } from '@/shared/hooks/useProducts'
import { formatPrice } from '@/shared/lib/formatters'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const onCloseRef = useRef(onClose)
  const debouncedQuery = useDebouncedValue(query.trim())
  const { data: results = [], isFetching, isError: searchError, refetch } = useProductSearch(debouncedQuery, isOpen)
  const buscando = query.trim().length >= 2 && (query.trim() !== debouncedQuery || isFetching)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

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
      onCloseRef.current()
    }

    function handleBackdropClick(event: MouseEvent) {
      if (event.target === dialog) onCloseRef.current()
    }

    dialog.addEventListener('close', handleClose)
    dialog.addEventListener('click', handleBackdropClick)
    return () => {
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('click', handleBackdropClick)
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      id="search-modal"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/40"
    >
      <div className="relative max-w-xl mx-auto mt-24 bg-surface rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
          <Search size={18} className="text-text-secondary shrink-0" />
          <span id="search-modal-title" className="sr-only">Buscar productos</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
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
            ) : searchError ? (
              <div className="text-center py-8">
                <p className="text-sm text-text-secondary">No pudimos realizar la búsqueda.</p>
                <button onClick={() => refetch()} className="mt-3 text-sm font-medium text-primary hover:underline">
                  Reintentar
                </button>
              </div>
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
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-contain bg-background shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary-light shrink-0" />
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{product.name}</p>
                    <p className="text-xs text-text-secondary">
                      {formatPrice(product.price)}
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
    </dialog>
  )
}
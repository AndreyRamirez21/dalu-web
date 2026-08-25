import { Link } from 'react-router-dom'
import { Heart, Package, X } from 'lucide-react'
import { useState } from 'react'
import type { Product } from '@/shared/types/product'
import { Button } from './Button'
import { useCart } from '@/shared/hooks/useCart'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { useToast } from '@/shared/hooks/useToast'
import { formatPrice } from '@/shared/lib/formatters'
import { getStockForSelection } from '@/shared/lib/inventory'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, items, openCartDrawer } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(product.id)
  const { showToast } = useToast()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const supportsQuickSizeSelection = product.category === 'pijamas' || product.category === 'pantuflas' || product.category === 'accesorios'
  const selectionLabel = product.category === 'accesorios' ? 'variante' : 'talla'
  const selectedVariant = product.variants.find((variant) => variant.size === selectedSize)
  const selectedStock = getStockForSelection(product, selectedSize)
  const selectedInCart = items.find(
    (item) => item.product.id === product.id && (item.size ?? null) === (selectedSize ?? null)
  )?.quantity ?? 0
  const canAddSelectedSize = Boolean(selectedVariant) && selectedStock > selectedInCart

  function addSelectedProduct() {
    if (!selectedSize || !addItem(product, 1, selectedSize)) {
      showToast(`Esta ${selectionLabel} ya no tiene unidades disponibles`)
      return
    }
    openCartDrawer()
  }

  return (
    <div className="group">
      <div className="relative overflow-hidden bg-surface">
        <Link to={`/producto/${product.slug}`}>
        {product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            width={640}
            height={800}
            loading="lazy"
            decoding="async"
            className={`w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105 ${
              !product.inStock ? 'opacity-50 grayscale' : ''
            }`}
            />
          ) : (
            <div className="w-full aspect-[3/4] bg-primary-light flex items-center justify-center">
              <Package size={40} className="text-primary/40" />
            </div>
          )}
        </Link>

        {!product.inStock && (
          <span className="absolute top-3 left-3 bg-text-primary/85 text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
            Agotado
          </span>
        )}

        <button
          onClick={() => toggleFavorite(product.id)}
          aria-label="Agregar a favoritos"
          className={`absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-sm transition-colors ${
            favorite ? 'text-danger' : 'hover:text-danger'
          }`}
        >
          <Heart size={16} className={favorite ? 'fill-danger' : ''} />
        </button>
      </div>

      <div className="mt-3 space-y-1">
        <Link to={`/producto/${product.slug}`}>
          <h3 className="text-sm font-medium text-text-primary hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        {product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 py-1">
            {product.colors.map((color) => (
              <span
                key={color}
                className="w-3.5 h-3.5 rounded-full border border-border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}

        <p className="text-sm font-semibold text-text-primary">
          {formatPrice(product.price)}
        </p>

        {supportsQuickSizeSelection && product.variants.length > 0 ? (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1.5" aria-label={`${selectionLabel}s de ${product.name}`}>
              {product.variants.map((variant) => {
                const isSoldOut = variant.stock <= 0
                const isSelected = selectedSize === variant.size

                return (
                  <button
                    key={variant.size}
                    onClick={() => setSelectedSize(variant.size)}
                    disabled={isSoldOut}
                    aria-label={isSoldOut ? `${selectionLabel} ${variant.size} agotada` : `Seleccionar ${selectionLabel} ${variant.size}`}
                    className={`relative min-w-9 h-9 px-2 rounded-lg border text-xs font-medium transition-colors ${
                      isSoldOut
                        ? 'border-border text-text-secondary/50 cursor-not-allowed'
                        : isSelected
                          ? 'border-primary-strong bg-primary-strong text-white'
                          : 'border-border text-text-primary hover:border-primary'
                    }`}
                  >
                    {variant.size}
                    {isSoldOut && <X size={14} strokeWidth={2.5} className="absolute inset-0 m-auto text-danger" aria-hidden="true" />}
                  </button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3"
              disabled={!canAddSelectedSize}
              onClick={addSelectedProduct}
            >
              {selectedSize ? 'Añadir al carrito' : `Selecciona una ${selectionLabel}`}
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-2"
            disabled={!product.inStock}
            onClick={() => {
              if (addItem(product)) openCartDrawer()
            }}
          >
            {product.inStock ? 'Agregar al carrito' : 'Agotado'}
          </Button>
        )}
      </div>
    </div>
  )
}

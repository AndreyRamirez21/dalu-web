import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import type { Product } from '@/shared/types/product'
import { Button } from './Button'
import { useCart } from '@/shared/hooks/useCart'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { useToast } from '@/shared/hooks/useToast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart()
    const { toggleFavorite, isFavorite } = useFavorites()
    const favorite = isFavorite(product.id)
    const { showToast } = useToast()

  return (
    <div className="group">
      <div className="relative rounded-2xl overflow-hidden bg-surface shadow-sm">
        <Link to={`/producto/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
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
        {product.rating && (
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <Star size={12} className="fill-warning text-warning" />
            <span>{product.rating}</span>
            <span>({product.reviewCount})</span>
          </div>
        )}

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
          ${product.price.toLocaleString('es-CO')} COP
        </p>

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={() => {
                addItem(product)
                showToast(`${product.name} agregado al carrito`)
              }}
            >
              Agregar al carrito
            </Button>
      </div>
    </div>
  )
}
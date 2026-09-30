import { Link } from 'react-router-dom'
import { Heart, Package } from 'lucide-react'
import type { Product } from '@/shared/types/product'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { formatPrice } from '@/shared/lib/formatters'
import { LazyImage } from './LazyImage'
import { QuickViewButton } from './QuickViewModal'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(product.id)
  const hasHoverImage = product.images.length > 1

  return (
    <article className="group/card">
      <div className="relative overflow-hidden bg-surface">
        <Link to={`/producto/${product.slug}`}>
        {product.images[0] ? (
          <div className="relative overflow-hidden">
            <LazyImage
              src={product.images[0]}
              alt={product.name}
              width={640}
              height={800}
              className={`w-full aspect-[3/4] object-cover transition-[opacity,transform] duration-500 ease-out group-hover/card:scale-105 ${
                !product.inStock ? 'opacity-50 grayscale' : ''
              } ${hasHoverImage ? 'group-hover/card:opacity-0' : ''}`}
            />

            {hasHoverImage && (
              <img
                src={product.images[1]}
                alt=""
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover scale-105 opacity-0 transition-[opacity,transform] duration-500 ease-out group-hover/card:scale-100 group-hover/card:opacity-100 ${
                  !product.inStock ? 'grayscale group-hover/card:!opacity-50' : ''
                }`}
              />
            )}
          </div>
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

        {product.inStock && (
          <button
            type="button"
            onClick={() => toggleFavorite(product.id)}
            aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            className={`absolute left-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow-sm transition-all hover:text-danger md:-translate-y-1 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100 ${
              favorite ? 'text-danger md:translate-y-0 md:opacity-100' : ''
            }`}
          >
            <Heart size={16} className={favorite ? 'fill-danger' : ''} />
          </button>
        )}

        {product.inStock && <QuickViewButton product={product} variant="eye" />}

        {product.inStock && (
          <QuickViewButton product={product} variant="quick-purchase" />
        )}
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

      </div>
    </article>
  )
}

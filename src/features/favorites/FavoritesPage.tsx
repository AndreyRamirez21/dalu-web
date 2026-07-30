import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { ProductCard } from '@/shared/ui/components/ProductCard'
import { Button } from '@/shared/ui/components/Button'
import { products } from '@/data/products'

export function FavoritesPage() {
  const { favoriteIds } = useFavorites()
  const favoriteProducts = products.filter((p) => favoriteIds.includes(p.id))

  if (favoriteProducts.length === 0) {
    return (
      <div className="max-w-8xl mx-auto px-6 py-20 text-center">
        <Heart size={40} className="text-primary mx-auto mb-4" />
        <h1 className="font-display text-3xl text-text-primary mb-3">Aún no tienes favoritos</h1>
        <p className="text-text-secondary mb-6">
          Explora nuestra colección y guarda tus piezas favoritas tocando el corazón.
        </p>
        <Link to="/pijamas">
          <Button size="lg">Ir al catálogo</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-8xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl text-text-primary">Mis favoritos</h1>
      <p className="text-text-secondary text-sm mt-1 mb-8">
        Tienes {favoriteProducts.length} producto{favoriteProducts.length > 1 ? 's' : ''} guardado
        {favoriteProducts.length > 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {favoriteProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
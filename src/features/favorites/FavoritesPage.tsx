import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { ProductCard } from '@/shared/ui/components/ProductCard'
import { Button } from '@/shared/ui/components/Button'
import { useFavoriteProducts } from '@/shared/hooks/useProducts'
import { Canonical } from '@/shared/ui/components/Canonical'

export function FavoritesPage() {
  const { favoriteIds, syncFavorites } = useFavorites()
  const { data: favoriteProducts = [], isPending, isError: loadError, isSuccess, refetch } = useFavoriteProducts(favoriteIds)
  const cargando = favoriteIds.length > 0 && isPending

  useEffect(() => {
    if (!isSuccess) return

    const activeIds = new Set(favoriteProducts.map((product) => product.id))
    if (favoriteIds.some((id) => !activeIds.has(id))) syncFavorites([...activeIds])
  }, [favoriteIds, favoriteProducts, isSuccess, syncFavorites])

  if (cargando) {
    return (
      <div className="max-w-8xl mx-auto px-6 py-20 text-center">
        <title>Mis favoritos | Dalú</title>
        <meta name="robots" content="noindex" />
        <Canonical />
        <p className="text-text-secondary">Cargando favoritos…</p>
      </div>
    )
  }

  if (loadError) {
    return (
      <div className="max-w-8xl mx-auto px-6 py-20 text-center">
        <title>Mis favoritos | Dalú</title>
        <meta name="robots" content="noindex" />
        <Canonical />
        <h1 className="font-display text-3xl text-text-primary mb-3">No pudimos cargar tus favoritos</h1>
        <p className="text-text-secondary">Revisa tu conexión e inténtalo de nuevo.</p>
        <button onClick={() => refetch()} className="mt-3 text-sm font-medium text-primary hover:underline">
          Reintentar
        </button>
      </div>
    )
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="max-w-8xl mx-auto px-6 py-20 text-center">
        <title>Mis favoritos | Dalú</title>
        <meta name="robots" content="noindex" />
        <Canonical />
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
      <title>Mis favoritos | Dalú</title>
      <meta name="robots" content="noindex" />
      <Canonical />
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
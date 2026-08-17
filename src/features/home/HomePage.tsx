import { Link } from 'react-router-dom'
import { Sparkles, Heart, Package } from 'lucide-react'
import { Button } from '@/shared/ui/components/Button'
import { CategoryCard } from '@/shared/ui/components/CategoryCard'
import { ProductCard } from '@/shared/ui/components/ProductCard'
import { Skeleton } from '@/shared/ui/components/Skeleton'
import { categories } from '@/data/categories'
import { useFeaturedProducts } from '@/shared/hooks/useProducts'
import { HeroCarousel } from './components/HeroCarousel'

export function HomePage() {
  const { data: featured = [], isPending: featuredLoading, isError: featuredError, refetch } = useFeaturedProducts()

  return (
    <div>
      {/* Hero */}
      <section className="max-w-8xl mx-auto px-6 py-8">
        <HeroCarousel
          images={[
            '/images/products/Pij10.webp',
            '/images/products/Pij9.webp',
            '/images/products/Pij11.webp',
            '/images/products/Pij4.webp',
          ]}
        >
          <div className="max-w-md">
            <span className="inline-flex items-center gap-2 bg-primary-strong text-white text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-5">
              ✨ Nueva colección
            </span>

            <h1 className="font-display text-3xl md:text-5xl leading-tight text-text-primary">
              Comodidad que <span className="text-primary italic">te acompaña</span>
            </h1>
            <p className="mt-4 text-text-secondary">
              Pijamas, pantuflas y accesorios para tus mejores momentos.
            </p>

            <div className="flex flex-wrap gap-4 mt-6">
              <Link to="/pijamas">
                <Button size="lg">Comprar ahora</Button>
              </Link>
              <a href="#categorias">
                <Button size="lg" variant="outline">Ver categorías</Button>
              </a>
            </div>

            <div className="flex gap-8 mt-10">
              <div className="flex flex-col items-center text-center gap-2 max-w-[100px]">
                <Sparkles size={22} className="text-primary" />
                <span className="text-xs font-medium text-text-secondary">Telas suaves y de calidad</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 max-w-[100px]">
                <Heart size={22} className="text-primary" />
                <span className="text-xs font-medium text-text-secondary">Diseños exclusivos</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 max-w-[100px]">
                <Package size={22} className="text-primary" />
                <span className="text-xs font-medium text-text-secondary">Envíos a todo Colombia</span>
              </div>
            </div>
          </div>
        </HeroCarousel>
      </section>

      {/* Categorías */}
      <section id="categorias" className="max-w-8xl mx-auto px-6 py-12">
        <h2 className="text-center font-display text-2xl text-text-primary mb-8">Categorías</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      {featuredLoading && (
        <section className="max-w-8xl mx-auto px-6 py-12" aria-labelledby="featured-heading" aria-busy="true">
          <h2 id="featured-heading" className="text-center font-display text-2xl text-text-primary mb-8">Productos destacados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} aria-hidden="true">
                <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
                <Skeleton className="h-4 w-3/4 mt-3" />
                <Skeleton className="h-4 w-1/2 mt-2" />
                <Skeleton className="h-9 w-full mt-3 rounded-full" />
              </div>
            ))}
          </div>
        </section>
      )}

      {!featuredLoading && featured.length > 0 && (
        <section className="max-w-8xl mx-auto px-6 py-12">
          <h2 className="text-center font-display text-2xl text-text-primary mb-8">Productos destacados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {!featuredLoading && featuredError && (
        <div className="max-w-8xl mx-auto px-6 pb-12 text-center">
          <p className="text-sm text-text-secondary">No pudimos cargar los productos destacados.</p>
          <button onClick={() => refetch()} className="mt-3 text-sm font-medium text-primary hover:underline">
            Reintentar
          </button>
        </div>
      )}
    </div>
  )
}

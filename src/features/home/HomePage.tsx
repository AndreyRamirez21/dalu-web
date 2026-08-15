import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Heart, Package } from 'lucide-react'
import { Button } from '@/shared/ui/components/Button'
import { CategoryCard } from '@/shared/ui/components/CategoryCard'
import { ProductCard } from '@/shared/ui/components/ProductCard'
import { categories } from '@/data/categories'
import { getFeaturedProducts } from '@/services/products'
import type { Product } from '@/shared/types/product'
import { HeroCarousel } from './components/HeroCarousel'

export function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    getFeaturedProducts().then(setFeatured)
  }, [])

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
            <span className="inline-flex items-center gap-2 bg-primary text-white text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-5">
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
              <Link to="/pijamas">
                <Button size="lg" variant="outline">Ver catálogo</Button>
              </Link>
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
      <section className="max-w-8xl mx-auto px-6 py-12">
        <h2 className="text-center font-display text-2xl text-text-primary mb-8">Categorías</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Productos destacados */}
      {featured.length > 0 && (
        <section className="max-w-8xl mx-auto px-6 py-12">
          <h2 className="text-center font-display text-2xl text-text-primary mb-8">Productos destacados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
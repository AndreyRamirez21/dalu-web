import { Link } from 'react-router-dom'
import { Button } from '@/shared/ui/components/Button'

export function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-8xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 bg-primary-light text-primary text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-5">
            Nuestra historia
          </span>
          <h1 className="font-display text-4xl leading-tight text-text-primary">
            Comodidad, diseño y amor en cada pieza
          </h1>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Dalú nació con una idea simple: que dormir y descansar sea un momento tan bonito como cualquier
            otro del día. Vendemos pijamas, pantuflas y accesorios pensados para acompañarte en tus
            momentos más íntimos, combinando telas suaves, diseños exclusivos y un toque femenino en cada detalle.
          </p>
        </div>
        <img
          src="https://picsum.photos/seed/about-dalu-1/700/800"
          alt="Historia de Dalú"
          className="rounded-3xl w-full aspect-[4/5] object-cover shadow-lg"
        />
      </section>



      {/* Galería */}
      <section className="max-w-8xl mx-auto px-6 py-16">
        <h2 className="text-center font-display text-2xl text-text-primary mb-8">
          Momentos Dalú
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src={`https://picsum.photos/seed/about-gallery-${i}/500/600`}
              alt={`Momento Dalú ${i}`}
              className="rounded-2xl w-full aspect-[4/5] object-cover"
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-light">
        <div className="max-w-8xl mx-auto px-6 py-16 text-center">
          <h2 className="font-display text-3xl text-text-primary mb-3">
            Encuentra tu pijama perfecta
          </h2>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Descubre nuestra colección completa y encuentra la pieza ideal para tus momentos de descanso.
          </p>
          <Link to="/pijamas">
            <Button size="lg">Ver catálogo</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
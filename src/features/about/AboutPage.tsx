import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/shared/ui/components/Button'

export function AboutPage() {
  return (
    <div>
      <Helmet>
        <title>Sobre nosotros | Dalú</title>
        <meta name="description" content="Conoce la historia de Dalú y nuestra selección de pijamas, pantuflas y accesorios para tus momentos de descanso." />
      </Helmet>
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
          src="/images/products/Aboutus.jpeg"
          alt="Historia de Dalú"
          width={1066}
          height={1600}
          className="rounded-3xl w-full aspect-[4/5] object-cover shadow-lg"
        />
      </section>



      {/* Galería */}
      <section className="max-w-8xl mx-auto px-6 py-16">
        <h2 className="text-center font-display text-2xl text-text-primary mb-8">
          Momentos Dalú
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '/images/products/Pij1.webp',
              '/images/products/Pij7.webp',
              '/images/products/Pij10.webp',
              '/images/products/Pij11.webp',
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Momento Dalú ${i + 1}`}
                width={640}
                height={800}
                className="rounded-2xl w-full aspect-[4/5] object-cover"
                loading="lazy"
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

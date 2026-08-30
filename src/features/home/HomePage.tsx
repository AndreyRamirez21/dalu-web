import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart, MapPin, MessageCircle, Package, Sparkles, Truck } from 'lucide-react'
import { m, useReducedMotion } from 'framer-motion'
import { Button } from '@/shared/ui/components/Button'
import { CategoryCard } from '@/shared/ui/components/CategoryCard'
import { ProductCard } from '@/shared/ui/components/ProductCard'
import { Skeleton } from '@/shared/ui/components/Skeleton'
import { categories } from '@/data/categories'
import { useFeaturedProducts } from '@/shared/hooks/useProducts'
import { useHomeContent } from '@/shared/hooks/useHomeContent'
import { HeroCarousel } from './components/HeroCarousel'
import { InstagramFeed } from './components/InstagramFeed'
import { VideoSection } from './components/VideoSection'
import { STORE_ADDRESS, WHATSAPP_URL } from '@/shared/constants/contact'
import { fallbackContent } from '@/services/homeContent'
import ResponsiveSpecularButton from '@/shared/ui/components/ResponsiveSpecularButton'
import MotoDelivery from "./components/icons/MotoDelivery";

export function HomePage() {
  const { data: featured = [], isPending: featuredLoading, isError: featuredError, refetch } = useFeaturedProducts()
  const { data: homeContent, isPending: homeContentLoading } = useHomeContent()
  const hero = homeContent?.hero
  const heroSlides = hero?.slides ?? fallbackContent.hero.slides
  const homeCategories = homeContent?.categories ?? categories
  const moments = homeContent?.moments
  const collection = homeContent?.collection
  const video = homeContent?.video
  const featuredProducts = homeContent?.featuredReferences.length
    ? [...featured].sort((a, b) => homeContent.featuredReferences.indexOf(a.reference) - homeContent.featuredReferences.indexOf(b.reference))
    : featured
  const reduceMotion = useReducedMotion()
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.55, ease: 'easeOut' as const },
      }

  return (
    <div>
            {/* Hero */}
            <section className="max-w-8xl mx-auto px-6 py-8">
                <HeroCarousel
                  key={heroSlides.join('\u0001')}
                  images={heroSlides}
                >
                <div className="max-w-md">
                  <span className="inline-flex items-center gap-2 bg-primary-strong text-white text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-5">
                     Nueva colección
                  </span>

                  <h1 className="font-display text-3xl md:text-5xl leading-tight text-text-primary">
                    <span className="sr-only">Dalú | Pijamas, Pantuflas y Accesorios — </span>
                    {homeContentLoading ? (
                      <Skeleton className="h-10 w-3/4" />
                    ) : (
                      hero?.title ?? 'Comodidad que te acompaña'
                    )}
                  </h1>
                  <p className="mt-4 text-text-secondary">
                    {homeContentLoading ? (
                      <Skeleton className="h-4 w-1/2 mt-2" />
                    ) : (
                      hero?.subtitle ?? 'Pijamas, pantuflas y accesorios para tus mejores momentos.'
                    )}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <Link to={hero?.primaryLink ?? '/pijamas'}>
                    <ResponsiveSpecularButton
                      size="lg"
                      radius={999}
                      tint="#5F9EA1"
                      tintOpacity={1}
                      textColor="#ffffff"
                      baseColor="#3F7376"
                      lineColor="#ffffff"
                      intensity={1.4}
                      shineSize={18}
                      shineFade={55}
                      thickness={1.8}
                      followMouse
                      proximity={350}
                      autoAnimate={false}
                      mobileClassName="inline-flex items-center justify-center rounded-full bg-[#3F7376] px-10 py-[18px] text-[1.15rem] font-medium leading-none tracking-[0.01em] text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-transform active:scale-[0.97]"
                    >
                      Comprar ahora
                    </ResponsiveSpecularButton>
                    </Link>
                        <a href="#categorias">
                          <ResponsiveSpecularButton
                            size="lg"
                            radius={999}
                            tint="#5F9EA1"
                            tintOpacity={0}
                            textColor="#3F7376"
                            baseColor="#82BBBD"
                            lineColor="#ffffff"
                            intensity={1.4}
                            shineSize={18}
                            shineFade={55}
                            thickness={1.8}
                            followMouse
                            proximity={350}
                            autoAnimate={false}
                            mobileClassName="inline-flex items-center justify-center rounded-full border-2 border-[#5F9EA1] bg-white px-10 py-[18px] text-[1.15rem] font-medium leading-none tracking-[0.01em] text-[#3F7376] transition-transform active:scale-[0.97]"                          >
                            Ver categorías
                          </ResponsiveSpecularButton>
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

      {/* Categorías — fondo distinto para marcar el primer "capítulo" del scroll,
          padding reducido porque es una sección de navegación rápida, no de contemplación */}
      <section id="categorias" className="bg-surface py-12 md:py-14">
        <div className="max-w-8xl mx-auto px-6">
          <m.div {...reveal} className="text-center mb-8">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-2">Explora Dalú</p>
            <h2 className="font-display text-2xl text-text-primary">
              <span className="sr-only">Pijamas, Pantuflas, Antifaces y Accesorios — </span>
              Categorías para cada momento
            </h2>
          </m.div>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {homeCategories.map((category, index) => (
              <m.div
                key={category.id}
                {...reveal}
                transition={reduceMotion ? undefined : { duration: 0.5, delay: index * 0.09, ease: 'easeOut' }}
              >
                <CategoryCard category={category} />
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compra por momento */}
      <section className="max-w-8xl mx-auto px-6 py-14">
        <m.div {...reveal} className="max-w-xl mb-8">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-2">{moments?.eyebrow ?? 'Encuentra tu favorito'}</p>
          <h2 className="font-display text-2xl text-text-primary">{moments?.title ?? 'Compra según tu momento'}</h2>
          <p className="text-sm text-text-secondary mt-2">{moments?.description ?? 'Pequeños detalles para sentirte bien, descansar y regalar comodidad.'}</p>
        </m.div>
        <div className="grid md:grid-cols-3 gap-5">
          {(moments?.cards ?? []).map((moment, index) => (
            <m.div
              key={moment.title}
              {...reveal}
              transition={reduceMotion ? undefined : { duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            >
              <Link to={moment.link} className="group relative block min-h-64 overflow-hidden rounded-2xl bg-primary-light">
                {moment.imageUrl ? (
                  <img
                    src={moment.imageUrl}
                    alt=""
                    width={640}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  // Respaldo visual cuando falta la imagen en Supabase: en vez de
                  // dejar el fondo plano, se ve intencional y no "roto"
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-primary/20 to-primary-strong/30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-display text-2xl">{moment.title}</h3>
                  <p className="text-sm text-white/90 mt-1 max-w-xs">{moment.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide mt-4">Explorar <ArrowUpRight size={15} /></span>
                </div>
              </Link>
            </m.div>
          ))}
        </div>
      </section>

      {/* Colección destacada — pieza de mayor impacto, se le deja más aire */}
      <section className="max-w-8xl mx-auto px-6 py-16 md:py-20">
        <m.div {...reveal} className="relative overflow-hidden rounded-3xl bg-primary-light min-h-[420px] md:min-h-[460px]">
          <img
            src={collection?.mediaUrl ?? '/images/products/Pij11.webp'}
            alt="Colección de pijamas Dalú"
            width={640}
            height={800}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
          <div className="relative flex min-h-[420px] md:min-h-[460px] items-end md:items-center p-8 md:p-16">
            <div className="max-w-md">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-3">{collection?.eyebrow ?? 'Colección del mes'}</p>
              <h2 className="font-display text-3xl md:text-5xl leading-tight text-text-primary">{collection?.title ?? 'Comodidad para quedarte un rato más'}</h2>
              <p className="text-text-secondary mt-4">{collection?.description ?? 'Descubre una selección especial de pijamas para tus momentos más tranquilos.'}</p>
              <Link to={collection?.link ?? '/pijamas'} className="inline-flex mt-6">
                <Button size="lg">Ver colección</Button>
              </Link>
            </div>
          </div>
        </m.div>
      </section>

      {/* Video */}
        <VideoSection
          videoSrc={video?.mediaUrl ?? '/videos/hero-dalu.mp4'}
          title={video?.title ?? 'Momentos que se sienten como en casa'}
          description={video?.description ?? 'Descubre cómo se mueve Dalú en cada detalle.'}
          to={video?.link ?? '/pijamas'}
          ctaLabel="Ver colección"
        />

      <InstagramFeed />

      {/* Productos destacados */}
      {featuredLoading && (
        <section className="max-w-8xl mx-auto px-6 py-14" aria-labelledby="featured-heading" aria-busy="true">
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

      {!featuredLoading && featuredProducts.length > 0 && (
        <section className="max-w-8xl mx-auto px-6 py-14">
          <m.div {...reveal} className="text-center mb-8">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-2">Favoritos de la semana</p>
            <h2 className="font-display text-2xl text-text-primary">Productos destacados</h2>
          </m.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <m.div
                key={product.id}
                {...reveal}
                transition={reduceMotion ? undefined : { duration: 0.5, delay: index * 0.09, ease: 'easeOut' }}
              >
                <ProductCard product={product} />
              </m.div>
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

      {/* Cierre: banner de WhatsApp como CTA principal en vez de perderse
          como una card más entre otras tres. Las 3 cards informativas quedan
          debajo, más compactas, como apoyo secundario. Todo sobre bg-surface
          para cerrar el home con un tono distinto al blanco puro. */}
      <section className="bg-surface py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-6">

          <m.a
            {...reveal}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden rounded-3xl bg-primary-strong px-8 py-10 md:px-14 md:py-14 text-center md:text-left"
          >
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10" />
            <div className="absolute -left-10 -bottom-20 h-48 w-48 rounded-full bg-white/10" />

            <div className="relative">
              <h2 className="font-display text-2xl md:text-4xl text-white leading-tight">¿Lista para tu momento Dalú?</h2>
              <p className="text-sm md:text-base text-white/85 mt-3 max-w-md">
                Escríbenos por WhatsApp y te ayudamos a encontrar tu pijama, pantuflas o accesorio ideal.
              </p>
            </div>

            <span className="relative inline-flex items-center gap-2 bg-white text-primary-strong font-semibold text-sm uppercase tracking-wide px-8 py-4 rounded-full transition-transform duration-300 group-hover:scale-[1.04] shrink-0">
              <MessageCircle size={18} />
              Chatear ahora
            </span>
          </m.a>

          <m.div {...reveal} className="grid md:grid-cols-3 gap-5 text-center mt-6">
            <Link to="/ubicacion" className="group rounded-2xl bg-background shadow-sm px-6 py-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <MapPin size={24} className="mx-auto text-primary mb-3" />
              <h3 className="font-display text-lg text-text-primary">Showroom</h3>
              <p className="text-sm text-text-secondary mt-1">{STORE_ADDRESS}</p>
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary mt-4 group-hover:underline">Ver ubicación</span>
            </Link>

            <Link to="/envios" className="group rounded-2xl bg-background shadow-sm px-6 py-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <Truck size={24} className="mx-auto text-primary mb-3" />
              <h3 className="font-display text-lg text-text-primary">Envíos a Colombia</h3>
              <p className="text-sm text-text-secondary mt-1">Llevamos tus pijamas Dalú hasta tu puerta.</p>
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary mt-4 group-hover:underline">Conocer envíos</span>
            </Link>

            <Link to="/envios" className="group rounded-2xl bg-background shadow-sm px-6 py-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <MotoDelivery size={24} className="mx-auto text-primary mb-3" />
              <h3 className="font-display text-lg text-text-primary">Domicilios en Buga</h3>
              <p className="text-sm text-text-secondary mt-1">Entregas el mismo día.</p>
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-primary mt-4 group-hover:underline">Conocer envíos</span>
            </Link>
          </m.div>

        </div>
      </section>
    </div>
  )
}
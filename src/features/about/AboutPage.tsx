import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/shared/ui/components/Button'
import { Canonical } from '@/shared/ui/components/Canonical'

export function AboutPage() {
  return (
    <div className="bg-[#fbfaf8] text-text-primary overflow-hidden">
      <Helmet>
        <title>Sobre nosotros | Dalú</title>
        <meta
          name="description"
          content="Conoce la historia de Dalú y nuestra selección de pijamas, pantuflas y accesorios para tus momentos de descanso."
        />
      </Helmet>

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[680px] lg:min-h-[720px] overflow-hidden">
        {/* Imagen de fondo */}
        <div className="absolute inset-0 lg:left-[34%]">
          <img
            src="/images/products/Aboutus2.jpeg"
            alt="Historia de Dalú"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Degradado que integra texto + imagen */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbfaf8] via-[#fbfaf8]/95 via-[45%] to-transparent lg:from-[#fbfaf8] lg:via-[#fbfaf8]/90 lg:to-transparent" />

        <div className="relative z-10 max-w-[1500px] mx-auto px-6 lg:px-12 min-h-[680px] lg:min-h-[720px] flex items-center">
          <div className="w-full lg:w-[58%] xl:w-[55%] py-20 lg:py-24">
            <span className="inline-flex items-center gap-2 text-[#79aaa8] text-xs font-semibold tracking-[0.18em] uppercase mb-6">
              <span className="w-8 h-px bg-[#79aaa8]" />
              Nuestra historia
              <span className="text-[#9dbfbd]">♥</span>
            </span>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-[68px] leading-[1.02] tracking-[-0.025em] text-[#292929] max-w-[700px]">
              Donde descansar también es una forma de quererte.
            </h1>

            <div className="mt-8 max-w-[650px]">
              <p className="text-[#59646b] text-base lg:text-[17px] leading-[1.9]">
                En Dalú creemos que el descanso también merece estilo. Seleccionamos pijamas, accesorios y pequeños detalles pensados para que cada momento de descanso se sienta cómodo, bonito y, sobre todo, muy tú.
              </p>
            </div>

            <div className="mt-9 flex items-center gap-5">
              <a
                href="#historia"
                className="inline-flex items-center gap-3 bg-[#7eaaa8] hover:bg-[#6f9b99] text-white px-7 py-3.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm"
              >
                Conoce nuestra historia
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>

          {/* Tarjeta flotante */}
          <div className="hidden lg:block absolute right-[7%] xl:right-[9%] top-1/2 -translate-y-1/2 w-[245px]">
            <div className="relative bg-white/95 backdrop-blur-sm rounded-[28px] p-8 shadow-[0_20px_60px_rgba(40,40,40,0.12)]">
              <div className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-[#8eb5b2] text-white flex items-center justify-center text-xl shadow-md">
                ♡
              </div>

              <div className="text-[#aac2c0] text-5xl font-serif leading-none mb-3">
                "
              </div>

              <p className="font-display text-2xl leading-[1.25] text-[#454545]">
                Donde descansar también es una forma de quererte.
              </p>

              <div className="mt-6 flex items-center gap-2 text-[#9bb9b7] text-sm">
                <span>♥</span>
                <span>Dalú</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HISTORIA
      ========================================================= */}
      <section
        id="historia"
        className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28"
      >
        <div className="bg-white rounded-[34px] shadow-[0_10px_50px_rgba(40,40,40,0.06)] overflow-hidden">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

            {/* Imagen */}
            <div className="relative min-h-[500px] lg:min-h-[720px]">
              <img
                src="/images/products/Aboutus.jpeg"
                alt="Historia de Dalú"
                width={1066}
                height={1600}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              {/* Badge */}
              <div className="absolute bottom-7 left-7">
                <div className="w-[120px] h-[120px] rounded-full bg-[#91b7b4]/95 backdrop-blur-sm flex items-center justify-center text-center text-white text-xs tracking-[0.12em] uppercase leading-relaxed rotate-[-8deg] shadow-lg">
                  <span>
                    Hecho
                    <br />
                    con amor
                    <br />
                    <span className="text-lg">♡</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Texto */}
            <div className="px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[#79aaa8] text-xs font-semibold tracking-[0.18em] uppercase">
                  Nuestra historia
                </span>
                <span className="w-10 h-px bg-[#d8e3e1]" />
              </div>

              <div className="space-y-6 text-[#59646b] text-[16px] leading-[1.9]">
                <p>
                  Dalú nació de algo tan sencillo como mi amor por dormir.
                  Siempre me ha encantado, pero con el tiempo descubrí que la
                  forma en la que descansamos también influye en cómo nos
                  sentimos.
                </p>

                <p>
                  No es lo mismo dormir con algo viejo y sin sentirte tú, que
                  hacerlo con una pijama que te encanta, una funda que cuide tu
                  cabello o levantarte y ponerte unas pantuflas que te hagan
                  sentir increíble.
                </p>

                <p>
                  También nació de mi amor por esas películas donde las amigas
                  se reúnen en pijama, de los momentos icónicos con pijamas de
                  satén y de esa sensación de convertir algo tan cotidiano como
                  dormir en un momento especial.
                </p>

                <p>
                  Pero descubrí algo aún más bonito: cada persona busca
                  sentirse bien de una manera diferente. Y ahí encontré el
                  corazón de Dalú.
                </p>

                <p>
                  Porque no se trata solamente de vender pijamas. Se trata de
                  seleccionar productos que hagan parte de pequeños rituales
                  para bajar el ritmo, reconectar contigo, disfrutar de tu
                  espacio y recordar que también mereces sentirte cómoda,
                  bonita y feliz.
                </p>

                <p>
                  Desde niña soñaba con tener una tienda. Me encantaba imaginar
                  qué productos tendría, elegirlos, prepararlos y pensar en la
                  felicidad de quien los recibiría. Hoy ese sueño tiene un
                  nombre: Dalú.
                </p>

                <p>
                  Dalú nació de sueños, pero también nació con el deseo de
                  acompañarte a cumplir los tuyos. Porque detrás de cada pedido
                  hay mucho más que una venta: hay ilusión, dedicación y una
                  persona que se emociona al elegir cada detalle y prepararlo
                  especialmente para ti.
                </p>

                <p>
                  Dalú es mi pequeño gran sueño hecho realidad. Y espero que,
                  con el tiempo, se convierta también en parte de los pequeños
                  momentos que hacen felices a muchas personas.
                </p>

                <p>
                  Porque al final, creemos en algo muy sencillo:
                </p>

                <p className="font-display text-2xl lg:text-3xl text-[#78a8a5] leading-tight">
                  Siendo tú, es la magia de Dalu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MOMENTOS DALÚ
      ========================================================= */}
      <section className="py-20 lg:py-28 bg-[#f3f5f2]">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#79aaa8] text-xs font-semibold tracking-[0.18em] uppercase">
                  Momentos Dalú
                </span>
                <span className="w-10 h-px bg-[#b8cfcd]" />
              </div>

              <h2 className="font-display text-4xl lg:text-5xl text-[#292929]">
                Pequeños momentos,
                <br />
                grandes sensaciones.
              </h2>
            </div>
          </div>

          {/* Galería asimétrica */}
          <div className="grid grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">

            <div className="col-span-2 lg:col-span-4">
              <div className="relative h-[420px] lg:h-[580px] rounded-[28px] overflow-hidden group">
                <img
                  src="/images/products/Pij1.webp"
                  alt="Momento Dalú"
                  width={640}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="col-span-1 lg:col-span-3">
              <div className="relative h-[300px] lg:h-[580px] rounded-[28px] overflow-hidden group">
                <img
                  src="/images/products/Pij7.webp"
                  alt="Momento Dalú"
                  width={640}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="col-span-1 lg:col-span-5 grid grid-rows-2 gap-4 lg:gap-5">
              <div className="relative h-[300px] lg:h-[280px] rounded-[28px] overflow-hidden group">
                <img
                  src="/images/products/Pij10.webp"
                  alt="Momento Dalú"
                  width={640}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="relative h-[300px] lg:h-[280px] rounded-[28px] overflow-hidden group">
                <img
                  src="/images/products/Pij11.webp"
                  alt="Momento Dalú"
                  width={640}
                  height={800}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#dceae8]">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/30" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-white/20" />

        <div className="relative max-w-[1000px] mx-auto px-6 py-24 lg:py-28 text-center">
          <span className="text-[#6e9c99] text-xs font-semibold tracking-[0.2em] uppercase">
            Dalú
          </span>

          <h2 className="font-display text-4xl lg:text-5xl text-[#292929] mt-4 mb-5">
            Encuentra tu pijama perfecta
          </h2>

          <p className="text-[#59646b] mb-8 max-w-[500px] mx-auto leading-relaxed">
            Descubre nuestra colección completa y encuentra la pieza ideal
            para tus momentos de descanso.
          </p>

          <Link to="/pijamas">
            <Button size="lg">
              Ver catálogo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
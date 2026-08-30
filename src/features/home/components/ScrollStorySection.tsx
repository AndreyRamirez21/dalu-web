import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import {
  AnimatePresence,
  m,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface StoryStep {
  eyebrow: string
  title: string
  description: string
  image: string
}

interface ScrollStorySectionProps {
  steps: StoryStep[]
  ctaLink?: string
  ctaLabel?: string
  sectionEyebrow?: string
  sectionTitle?: string
}

interface StoryItemProps {
  step: StoryStep
  index: number
  onActive: (index: number) => void
}

function StoryItem({
  step,
  index,
  onActive,
}: StoryItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const isInView = useInView(ref, {
    amount: 0.55,
  })

  useEffect(() => {
    if (isInView) {
      onActive(index)
    }
  }, [isInView, index, onActive])

  return (
    <m.div
      ref={ref}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 50,
            }
      }
      whileInView={
        reduceMotion
          ? {}
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        min-h-[75vh]
        flex
        flex-col
        justify-center
        border-t
        border-black/10
        py-16
        md:py-20
      "
    >
      {/* Número */}

      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-6">
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Categoría */}

      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-text-secondary mb-4">
        {step.eyebrow}
      </p>

      {/* Título */}

      <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-text-primary max-w-xl">
        {step.title}
      </h3>

      {/* Descripción */}

      <p className="text-base md:text-lg text-text-secondary leading-relaxed mt-6 max-w-md">
        {step.description}
      </p>
    </m.div>
  )
}

export function ScrollStorySection({
  steps,
  ctaLink = '/pijamas',
  ctaLabel = 'Descubrir la colección',
  sectionEyebrow = 'La experiencia Dalú',
  sectionTitle = 'Mucho más que ropa para dormir',
}: ScrollStorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const [activeIndex, setActiveIndex] = useState(0)

  const reduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  /* Movimiento muy suave de la imagen
     mientras el usuario recorre la sección */

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ['0%', '0%'] : ['-3%', '3%']
  )

  const activeStep = steps[activeIndex]

  /* Evita errores si no hay pasos */

  if (!steps.length) {
    return null
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-8xl mx-auto px-6">

        {/* =====================================================
            ENCABEZADO DE LA SECCIÓN
        ===================================================== */}

        <m.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 35,
                }
          }
          whileInView={
            reduceMotion
              ? {}
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 md:mb-24 max-w-3xl"
        >
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-4">
            {sectionEyebrow}
          </p>

          <h2 className="font-display text-4xl md:text-6xl leading-[1.05] text-text-primary">
            {sectionTitle}
          </h2>
        </m.div>


        {/* =====================================================
            GRID PRINCIPAL
        ===================================================== */}

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">


          {/* =====================================================
              IMAGEN STICKY
          ===================================================== */}

          <div className="lg:sticky lg:top-24">

            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-primary-light">

              {/* IMÁGENES CON TRANSICIÓN */}

              <AnimatePresence mode="wait">

                <m.img
                  key={activeStep.image}
                  src={activeStep.image}
                  alt={activeStep.title}
                  initial={
                    reduceMotion
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                          scale: 1.08,
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: imageY,
                  }}
                  exit={
                    reduceMotion
                      ? {
                          opacity: 0,
                        }
                      : {
                          opacity: 0,
                          scale: 1.04,
                        }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="
                    absolute
                    -inset-[8%]
                    h-[116%]
                    w-[116%]
                    max-w-none
                    object-cover
                  "
                />

              </AnimatePresence>


              {/* Overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />


              {/* Indicador */}

              <div className="absolute bottom-6 left-6 right-6 flex gap-2">

                {steps.map((_, index) => (

                  <m.div
                    key={index}
                    animate={{
                      opacity:
                        index === activeIndex
                          ? 1
                          : 0.35,
                      scaleX:
                        index === activeIndex
                          ? 1
                          : 0.7,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="
                      h-[2px]
                      flex-1
                      origin-left
                      rounded-full
                      bg-white
                    "
                  />

                ))}

              </div>

            </div>

          </div>


          {/* =====================================================
              TEXTOS QUE ACTIVAN LAS IMÁGENES
          ===================================================== */}

          <div>

            {steps.map((step, index) => (

              <StoryItem
                key={`${step.title}-${index}`}
                step={step}
                index={index}
                onActive={setActiveIndex}
              />

            ))}


            {/* =====================================================
                CTA FINAL
            ===================================================== */}

            <m.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 30,
                    }
              }
              whileInView={
                reduceMotion
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.3,
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-t border-black/10 pt-12"
            >

              <Link
                to={ctaLink}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-primary/30
                  px-7
                  py-4
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-primary
                  transition-all
                  duration-300
                  hover:bg-primary
                  hover:text-white
                "
              >
                {ctaLabel}

                <ArrowUpRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />

              </Link>

            </m.div>

          </div>

        </div>

      </div>
    </section>
  )
}


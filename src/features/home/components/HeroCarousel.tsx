import { useEffect, useState, type ReactNode } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroCarouselProps {
  images: string[]
  intervalMs?: number
  children?: ReactNode
}

export function HeroCarousel({ images, intervalMs = 4500, children }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [images.length, intervalMs])

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="group relative w-full min-h-[560px] md:h-[600px] rounded-3xl overflow-hidden shadow-lg">
      <AnimatePresence initial={false}>
        <m.img
          key={images[index]}
          src={images[index]}
          alt="Dalú"
          width={640}
          height={800}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority={index === 0 ? 'high' : 'auto'}
          loading="eager"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40 md:bg-gradient-to-r md:from-background md:via-background/70 md:to-transparent" />

      <div className="relative min-h-[560px] md:h-full flex items-end md:items-center px-6 md:px-16 py-8 md:py-0">
        {children}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            aria-label="Imagen anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-text-primary opacity-100 transition-colors duration-300 hover:bg-primary hover:text-white md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={goToNext}
            aria-label="Siguiente imagen"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-text-primary opacity-100 transition-colors duration-300 hover:bg-primary hover:text-white md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </div>
  )
}
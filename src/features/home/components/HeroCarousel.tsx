import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'

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

  return (
    <div className="relative w-full min-h-[560px] md:h-[600px] rounded-3xl overflow-hidden shadow-lg">
        {images.map((img, i) => (
          <motion.img
            key={img}
            src={img}
            alt="Dalú"
            initial={false}
            animate={{ opacity: i === index ? 1 : 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority={i === 0 ? 'high' : 'auto'}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}

      {/* Degradado: vertical en mobile (abajo hacia arriba), horizontal en desktop */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40 md:bg-gradient-to-r md:from-background md:via-background/70 md:to-transparent" />

      {/* Contenido superpuesto */}
      <div className="relative min-h-[560px] md:h-full flex items-end md:items-center px-6 md:px-16 py-8 md:py-0">
        {children}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-6 md:left-16 flex gap-2 z-10">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => setIndex(i)}
              aria-label={`Ver imagen ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-6 bg-primary' : 'w-1.5 bg-primary/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
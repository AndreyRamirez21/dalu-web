import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface HeroCarouselProps {
  images: string[]
  intervalMs?: number
  children?: ReactNode
}

export function HeroCarousel({ images, intervalMs = 4500, children }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(() => new Set())

  useEffect(() => {
    let cancelled = false
    const currentImage = images[index]
    if (!currentImage) return

    const nextImage = loadedImages.has(currentImage)
      ? images[(index + 1) % images.length]
      : undefined
    const imagesToLoad = nextImage ? [currentImage, nextImage] : [currentImage]

    imagesToLoad.forEach((src) => {
      if (loadedImages.has(src)) return
      const image = new Image()
      image.fetchPriority = src === currentImage ? 'high' : 'low'
      image.src = src
      image.onload = async () => {
        try {
          await image.decode?.()
        } catch {
          // Algunos navegadores rechazan decode() aunque la imagen ya esté lista.
        }
        if (!cancelled) {
          setLoadedImages((current) => new Set(current).add(src))
        }
      }
    })

    return () => {
      cancelled = true
    }
  }, [images, index, loadedImages])

  const goTo = useCallback((nextIndex: number) => {
    const nextImage = images[nextIndex]
    if (nextImage && loadedImages.has(nextImage)) setIndex(nextIndex)
  }, [images, loadedImages])

  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % images.length
      goTo(nextIndex)
    }, intervalMs)
    return () => clearInterval(timer)
  }, [goTo, images.length, index, intervalMs])

  const goToPrev = () => {
    goTo((index - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    goTo((index + 1) % images.length)
  }

  const currentImage = images[index]
  const hasCurrentImage = Boolean(currentImage && loadedImages.has(currentImage))

  return (
    <div className="group relative w-full min-h-[560px] md:h-[600px] rounded-3xl overflow-hidden shadow-lg">
      <AnimatePresence initial={false}>
        {hasCurrentImage && (
          <m.img
            key={currentImage}
            src={currentImage}
            alt="Dalú"
            width={640}
            height={800}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
        )}
      </AnimatePresence>
      {/* Overlay reducido: menos opacidad y el degradado cubre una franja
          más angosta, para que la foto se vea más nítida y menos "lavada" */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/100 via-background/25 to-transparent md:bg-gradient-to-r md:from-background/75 md:via-background/30 md:to-transparent" />

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
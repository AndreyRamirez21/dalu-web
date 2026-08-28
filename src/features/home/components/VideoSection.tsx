import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Pause } from 'lucide-react'
import { Button } from '@/shared/ui/components/Button'

interface VideoSectionProps {
  videoSrc: string
  posterSrc?: string
  title: string
  description?: string
  to?: string
  ctaLabel?: string
}

export function VideoSection({ videoSrc, posterSrc, title, description, to, ctaLabel }: VideoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // El video está lejos del primer pantallazo. Esperamos a que el usuario se
  // acerque para no competir con la imagen principal ni con el contenido inicial.
  useEffect(() => {
    const section = sectionRef.current
    if (!section || !('IntersectionObserver' in window)) {
      setShouldLoadVideo(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShouldLoadVideo(true)
        observer.disconnect()
      },
      // Lo preparamos al acercarse, sin competir con las imágenes de la portada.
      { rootMargin: '300px 0px' },
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // `canplay` solo garantiza unos pocos fotogramas y el video puede quedarse
  // sin búfer enseguida. Esperamos `canplaythrough` para iniciar la animación
  // cuando el navegador estima que puede reproducirla sin interrupciones.
  useEffect(() => {
    if (!isVideoReady || !videoRef.current) return
    void videoRef.current.play().catch(() => {
      // El botón de reproducción permite reintentar si el navegador bloquea el autoplay.
    })
  }, [isVideoReady])

  function togglePlay() {
    if (!shouldLoadVideo) {
      setShouldLoadVideo(true)
      return
    }

    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section ref={sectionRef} className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {shouldLoadVideo && (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onCanPlayThrough={() => setIsVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {(!shouldLoadVideo || !isVideoReady) && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          loading={shouldLoadVideo ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-8 md:p-16 text-white">
        <div className="max-w-lg">
          <h2 className="font-display text-3xl md:text-5xl leading-tight">{title}</h2>
          {description && <p className="mt-3 text-white/90">{description}</p>}
          {to && (
            <Link to={to} className="inline-flex mt-6">
              <Button size="lg">{ctaLabel ?? 'Ver más'}</Button>
            </Link>
          )}
        </div>
      </div>

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
        className="absolute bottom-6 right-6 w-11 h-11 rounded-full bg-white/90 flex items-center justify-center text-text-primary hover:bg-white transition-colors"
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
      </button>
    </section>
  )
}

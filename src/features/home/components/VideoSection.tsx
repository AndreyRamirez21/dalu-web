import { useRef, useState } from 'react'
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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  function togglePlay() {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <section className="relative w-full overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-[70vh] md:h-[85vh] object-cover"
      />

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
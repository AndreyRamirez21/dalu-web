import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Cloud, ImageOff } from 'lucide-react'

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
  zoomLevel?: number
}

export function ZoomableImage({ src, alt, className = '', zoomLevel = 2 }: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setError(false)

    // Si la imagen ya está cargada en caché del navegador al montar,
    // el evento onLoad puede no dispararse — lo detectamos manualmente.
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [src])

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setOrigin({ x, y })
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-primary-light cursor-zoom-in ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Cloud size={72} className="text-primary/50 animate-pulse" strokeWidth={1.25} />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageOff size={72} className="text-primary/40" strokeWidth={1.25} />
        </div>
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={640}
        height={800}
        loading="eager"
        fetchPriority="high"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full aspect-[3/4] object-cover transition-all duration-500 ease-out ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transform: isHovering ? `scale(${zoomLevel})` : 'scale(1)',
        }}
      />
    </div>
  )
}
import { useEffect, useRef, useState } from 'react'
import { Cloud, ImageOff } from 'lucide-react'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
}

export function LazyImage({ src, alt, className = '', width, height }: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
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

  return (
    <div className="relative w-full h-full overflow-hidden bg-primary-light">
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Cloud size={28} className="text-primary/50 animate-pulse" strokeWidth={1.5} />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <ImageOff size={28} className="text-primary/40" strokeWidth={1.5} />
        </div>
      )}

      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
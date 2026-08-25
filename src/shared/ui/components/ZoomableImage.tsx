import { useRef, useState, type MouseEvent } from 'react'

interface ZoomableImageProps {
  src: string
  alt: string
  className?: string
  zoomLevel?: number
}

export function ZoomableImage({ src, alt, className = '', zoomLevel = 2 }: ZoomableImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })

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
      className={`overflow-hidden bg-surface cursor-zoom-in ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        width={640}
        height={800}
        loading="eager"
        fetchPriority="high"
        className="w-full aspect-[3/4] object-cover transition-transform duration-150 ease-out"
        style={{
          transformOrigin: `${origin.x}% ${origin.y}%`,
          transform: isHovering ? `scale(${zoomLevel})` : 'scale(1)',
        }}
      />
    </div>
  )
}
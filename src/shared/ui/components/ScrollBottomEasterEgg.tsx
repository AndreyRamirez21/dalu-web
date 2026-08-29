import { useEffect, useRef } from 'react'

const RETURN_DELAY_MS = 180
const RETURN_DURATION_MS = 380

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

function animateScrollTo(target: number, duration: number) {
  const start = window.scrollY
  const distance = target - start
  const startTime = performance.now()

  function step(now: number) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeOutCubic(progress)

    window.scrollTo(0, start + distance * eased)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

export function ScrollBottomEasterEgg() {
  const eggRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<number | null>(null)
  const triggeredRef = useRef(false)

  useEffect(() => {
    const egg = eggRef.current

    if (!egg) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // El oso comenzó a aparecer en pantalla
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true

          // Pequeña pausa antes de regresar
          timeoutRef.current = window.setTimeout(() => {
            const el = eggRef.current

            if (!el) return

            const target = Math.max(
              0,
              el.offsetTop - window.innerHeight
            )

            animateScrollTo(target, RETURN_DURATION_MS)

            timeoutRef.current = null
          }, RETURN_DELAY_MS)
        }

        // Cuando el oso deja de estar visible,
        // permitimos que vuelva a activarse
        if (!entry.isIntersecting) {
          triggeredRef.current = false

          if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current)
            timeoutRef.current = null
          }
        }
      },
      {
        threshold: 0.05,
      }
    )

    observer.observe(egg)

    return () => {
      observer.disconnect()

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={eggRef}
      className="w-full flex items-center justify-center bg-surface pt-0 pb-12"    >
      <img
        src="/easter-egg.jpeg"
        alt="Mensaje sorpresa"
        className="max-w-[280px] md:max-w-sm"
      />
    </div>
  )
}
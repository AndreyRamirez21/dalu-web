import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

interface SizeGuideModalProps {
  open: boolean
  onClose: () => void
  image: string
  title?: string
}

const TRANSITION_MS = 300

export function SizeGuideModal({ open, onClose, image, title = 'Guía de medidas' }: SizeGuideModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  // "mounted": el <dialog> sigue abierto en el DOM (incluye el tiempo de la animación de salida)
  // "entered": el panel ya terminó de deslizarse a su posición final (controla el transform)
  const [mounted, setMounted] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) dialog.showModal()
      setMounted(true)
      // Esperamos un frame para que el navegador pinte el estado inicial (fuera de pantalla)
      // antes de activar la transición hacia la posición final.
      const raf = requestAnimationFrame(() => setEntered(true))
      return () => cancelAnimationFrame(raf)
    }

    setEntered(false)
    const timeout = setTimeout(() => {
      if (dialog.open) dialog.close()
      setMounted(false)
    }, TRANSITION_MS)
    return () => clearTimeout(timeout)
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(e) => {
        // Evita que Esc cierre el <dialog> de golpe; dejamos que el efecto anime la salida.
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        // El ::backdrop no dispara click en el propio <dialog>, así que
        // detectamos manualmente si el click fue fuera del panel.
        const rect = (e.target as HTMLDialogElement).getBoundingClientRect()
        const clickedInsideDialog =
          rect.top <= e.clientY &&
          e.clientY <= rect.top + rect.height &&
          rect.left <= e.clientX &&
          e.clientX <= rect.left + rect.width
        if (!clickedInsideDialog) onClose()
      }}
      className="m-0 h-full max-h-none w-full max-w-md p-0 bg-white shadow-2xl backdrop:bg-black/40"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 'auto',
        transform: entered ? 'translateX(0)' : 'translateX(100%)',
        transition: `transform ${TRANSITION_MS}ms ease-out`,
      }}
    >
      {mounted && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-border px-6 py-5 shrink-0">
            <h2 className="font-display text-lg uppercase tracking-wide text-text-primary">
              {title}
            </h2>
            <button
              onClick={onClose}
              aria-label="Cerrar guía de tallas"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-primary-light"
            >
              <X size={20} className="text-text-primary" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <img src={image} alt={title} className="h-auto w-full rounded-lg" />
          </div>
        </div>
      )}
    </dialog>
  )
}
import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: { to: string; label: string }[]
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const panelRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const panel = panelRef.current
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'

    const focusFirstElement = () => {
      const firstFocusable = panel?.querySelector<HTMLElement>(focusableSelector)
      firstFocusable?.focus()
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !panel) return

      const focusableElements = Array.from(panel.querySelectorAll<HTMLElement>(focusableSelector))
      if (focusableElements.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    focusFirstElement()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div id="mobile-menu" className="fixed inset-0 z-[100] md:hidden" role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />

      {/* Panel lateral */}
      <aside ref={panelRef} tabIndex={-1} className="absolute top-0 left-0 h-full w-72 bg-surface shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <h2 id="mobile-menu-title" className="font-display text-xl text-primary tracking-widest">DALÚ</h2>
          <button onClick={onClose} aria-label="Cerrar menú" className="text-text-primary">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col px-6 py-6 gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `py-3 text-base font-medium border-b border-border ${
                  isActive ? 'text-primary' : 'text-text-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  )
}

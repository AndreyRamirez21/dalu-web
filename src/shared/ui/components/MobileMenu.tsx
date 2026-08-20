import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown, X } from 'lucide-react'

export interface NavigationLink {
  to: string
  label: string
  children?: { to: string; label: string }[]
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: NavigationLink[]
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const panelRef = useRef<HTMLElement>(null)
  const [openSections, setOpenSections] = useState<string[]>([])

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
          {links.map((link) => {
            const isExpanded = openSections.includes(link.to)
            return (
              <div key={link.to} className="border-b border-border">
                <div className="flex items-center justify-between">
                  <NavLink to={link.to} onClick={onClose} className={({ isActive }) => `py-3 text-base font-medium ${isActive ? 'text-primary' : 'text-text-primary'}`}>
                    {link.label}
                  </NavLink>
                  {link.children && <button type="button" aria-label={`Ver colecciones de ${link.label}`} aria-expanded={isExpanded} onClick={() => setOpenSections((current) => current.includes(link.to) ? current.filter((section) => section !== link.to) : [...current, link.to])} className="p-2 text-text-secondary"><ChevronDown size={18} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} /></button>}
                </div>
                {link.children && isExpanded && <div className="pb-3 pl-3 flex flex-col">{link.children.map((child) => <NavLink key={child.to} to={child.to} onClick={onClose} className="py-2 text-sm text-text-secondary hover:text-primary">{child.label}</NavLink>)}</div>}
              </div>
            )
          })}
        </nav>
      </aside>
    </div>
  )
}

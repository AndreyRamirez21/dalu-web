import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: { to: string; label: string }[]
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] md:hidden">
      {/* Fondo oscuro */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel lateral */}
      <div className="absolute top-0 left-0 h-full w-72 bg-surface shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <span className="font-display text-xl text-primary tracking-widest">DALÚ</span>
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
      </div>
    </div>
  )
}
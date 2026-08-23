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
  const dialogRef = useRef<HTMLDialogElement>(null)
  const onCloseRef = useRef(onClose)
  const [openSections, setOpenSections] = useState<string[]>([])

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) {
      dialog.showModal()
    } else if (!isOpen && dialog.open) {
      dialog.close()
    }
  }, [isOpen])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    function handleClose() {
      onCloseRef.current()
    }

    function handleBackdropClick(event: MouseEvent) {
      if (event.target === dialog) onCloseRef.current()
    }

    dialog.addEventListener('close', handleClose)
    dialog.addEventListener('click', handleBackdropClick)
    return () => {
      dialog.removeEventListener('close', handleClose)
      dialog.removeEventListener('click', handleBackdropClick)
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      id="mobile-menu"
      aria-labelledby="mobile-menu-title"
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-black/40 md:hidden"
    >
      <aside className="absolute top-0 left-0 h-full w-72 bg-surface shadow-xl flex flex-col">
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
    </dialog>
  )
}
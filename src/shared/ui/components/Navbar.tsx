import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Menu, Heart, ChevronDown } from 'lucide-react'
import { useCart } from '@/shared/hooks/useCart'
import { MobileMenu, type NavigationLink } from './MobileMenu'
import { SearchModal } from './SearchModal'
import {
  accessoryCollectionLinks,
  buildSleepwearCollectionLinks,
  giftCollectionLinks,
} from '@/features/catalog/catalogConfig'
import { useProductsByCategories } from '@/shared/hooks/useProducts'
import logoDalu from '@/assets/logo-daluuu.webp'

const baseLinks: NavigationLink[] = [
  { to: '/', label: 'Inicio' },
  { to: '/pijamas', label: 'Sleepwear' },
  { to: '/pantuflas', label: 'Slippers' },
  { to: '/antifaces', label: 'Antifaces' },
  {
    to: '/accesorios',
    label: 'Accesorios',
    children: accessoryCollectionLinks,
  },
{to: '/regala', label: 'Regala',
  children: giftCollectionLinks,
},
]

export function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { pathname } = useLocation()

  const { data: pijamaProducts = [] } =
    useProductsByCategories(['pijamas'])

  // Detectar cuando el usuario comienza a hacer scroll.
  // Se usan dos umbrales distintos (hysteresis) en vez de uno solo:
  // así se evita que, al quedar el scroll justo en el límite, el estado
  // "scrolled" oscile rápidamente entre true/false y la barra "vibre".
  useEffect(() => {
    const SHOW_THRESHOLD = 24 // por debajo de esto, la barra siempre se muestra
    const HIDE_THRESHOLD = 80 // por encima de esto, la barra siempre se oculta

    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        const y = window.scrollY

        setScrolled((prev) => {
          if (y > HIDE_THRESHOLD) return true
          if (y < SHOW_THRESHOLD) return false
          return prev // dentro de la zona muerta: no cambia el estado
        })

        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const links = useMemo<NavigationLink[]>(
    () =>
      baseLinks.map((link) =>
        link.to === '/pijamas'
          ? {
              ...link,
              children: buildSleepwearCollectionLinks(
                pijamaProducts.map((product) => product.collection)
              ),
            }
          : link
      ),
    [pijamaProducts]
  )

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/75 backdrop-blur-lg shadow-sm'
          : 'bg-surface'
      }`}
    >
      {/* Barra superior */}
      <div
        className={`overflow-hidden bg-primary-strong text-white text-xs text-center transition-all duration-300 ${
          scrolled
            ? 'max-h-0 py-0 opacity-0'
            : 'max-h-9 py-2 px-4 opacity-100'
        }`}
      >
        Envíos a toda Colombia · Compra fácil por WhatsApp
      </div>

      {/* Navbar principal */}
      <div
        className={`border-b transition-colors duration-300 ${
          scrolled ? 'border-border/50' : 'border-border'
        }`}
      >
        <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-2.5 md:grid md:grid-cols-[1fr_auto_1fr]">

          {/* Logo + menú móvil */}
          <div className="flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden text-text-primary"
              aria-label="Abrir menú"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} />
            </button>

            <Link
              to="/"
              className="flex items-center group ml-3 md:ml-24"
            >
              <img
                src={logoDalu}
                alt="Dalú - Siendo tú"
                className="w-auto h-11 transition-all duration-300 group-hover:brightness-90 group-hover:scale-[1.03]"
              />
            </Link>
          </div>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center gap-8 justify-self-center">
            {links.map((link) => {
              const isActive =
                pathname === link.to ||
                Boolean(
                  link.children?.some(
                    (child) => pathname === child.to
                  )
                )

              return (
                <div
                  key={link.to}
                  className="relative group"
                >
                  <Link
                    to={link.to}
                    aria-current={
                      isActive ? 'page' : undefined
                    }
                    className={`flex items-center gap-1 text-sm font-medium transition-colors pb-1 border-b-2 ${
                      isActive
                        ? 'text-primary border-primary'
                        : 'text-text-primary border-transparent hover:text-primary'
                    }`}
                  >
                    {link.label}

                    {link.children && (
                      <ChevronDown
                        size={14}
                        aria-hidden="true"
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.children && (
                    <div
                      className="
                        absolute
                        left-0
                        top-full
                        pt-3
                        opacity-0
                        invisible
                        translate-y-1
                        pointer-events-none
                        transition-[opacity,transform]
                        duration-150
                        group-hover:opacity-100
                        group-hover:visible
                        group-hover:translate-y-0
                        group-hover:pointer-events-auto
                        group-focus-within:opacity-100
                        group-focus-within:visible
                        group-focus-within:translate-y-0
                        group-focus-within:pointer-events-auto
                      "
                    >
                      <div className="min-w-48 rounded-lg border border-border bg-surface p-2 shadow-lg">
                        {link.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={(e) =>
                              e.currentTarget.blur()
                            }
                            className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                              pathname === child.to
                                ? 'bg-primary-light text-primary'
                                : 'text-text-primary hover:bg-primary-light hover:text-primary'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-5 justify-self-end">
            {/* Buscar */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              aria-controls="search-modal"
              className="text-text-primary hover:text-primary transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Favoritos */}
            <Link
              to="/favoritos"
              aria-label="Favoritos"
              className="text-text-primary hover:text-primary transition-colors"
            >
              <Heart size={20} />
            </Link>

            {/* Carrito */}
            <Link
              to="/carrito"
              aria-label="Carrito"
              className="relative text-text-primary hover:text-primary transition-colors"
            >
              <ShoppingBag size={20} />

              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-strong text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={links}
      />

      {/* Modal de búsqueda */}
      <SearchModal
        key={searchOpen ? 'open' : 'closed'}
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </header>
  )
}
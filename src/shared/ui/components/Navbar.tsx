import { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, ShoppingBag, Menu, Heart, ChevronDown } from 'lucide-react'
import { useCart } from '@/shared/hooks/useCart'
import { MobileMenu, type NavigationLink } from './MobileMenu'
import { SearchModal } from './SearchModal'
import { accessoryCollectionLinks, buildSleepwearCollectionLinks } from '@/features/catalog/catalogConfig'
import { useProductsByCategories } from '@/shared/hooks/useProducts'
import logoDalu from '@/assets/logo-daluuu.png'

const baseLinks: NavigationLink[] = [
  { to: '/', label: 'Inicio' },
  { to: '/pijamas', label: 'Sleepwear' },
  { to: '/pantuflas', label: 'Slippers' },
  { to: '/antifaces', label: 'Antifaces' },
  { to: '/accesorios', label: 'Accesorios', children: accessoryCollectionLinks },
]

export function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  const { data: pijamaProducts = [] } = useProductsByCategories(['pijamas'])
  const links = useMemo<NavigationLink[]>(() => baseLinks.map((link) =>
    link.to === '/pijamas'
      ? { ...link, children: buildSleepwearCollectionLinks(pijamaProducts.map((product) => product.collection)) }
      : link
  ), [pijamaProducts])

  return (
    <header className="sticky top-0 z-50 bg-surface">
      <div className="bg-primary-strong text-white text-xs text-center py-2 px-4">
        Envíos a toda Colombia · Compra fácil por WhatsApp
      </div>

      <div className="border-b border-border">
        <div className="max-w-8xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4">
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

            <Link to="/" className="flex items-center group ml-24">
              <img
                src={logoDalu}
                alt="Dalú - Siendo tú"
                className="h-16 w-auto transition-all duration-300 group-hover:brightness-90 group-hover:scale-[1.03]"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 justify-self-center">
            {links.map((link) => {
              const isActive = pathname === link.to || Boolean(link.children?.some((child) => pathname === child.to))

              return (
                <div key={link.to} className="relative group">
                  <Link to={link.to} aria-current={isActive ? 'page' : undefined} className={`flex items-center gap-1 text-sm font-medium transition-colors pb-1 border-b-2 ${isActive ? 'text-primary border-primary' : 'text-text-primary border-transparent hover:text-primary'}`}>
                    {link.label}
                    {link.children && <ChevronDown size={14} aria-hidden="true" />}
                  </Link>
                  {link.children && (
                    <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-1 pointer-events-none transition-all duration-150 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto">
                      <div className="min-w-48 rounded-lg border border-border bg-surface p-2 shadow-lg">
                        {link.children.map((child) => (
                          <Link key={child.to} to={child.to} className={`block rounded-md px-3 py-2 text-sm transition-colors ${pathname === child.to ? 'bg-primary-light text-primary' : 'text-text-primary hover:bg-primary-light hover:text-primary'}`}>
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

          <div className="flex items-center gap-5 justify-self-end">
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
            <Link to="/favoritos" aria-label="Favoritos" className="text-text-primary hover:text-primary transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/carrito" aria-label="Carrito" className="relative text-text-primary hover:text-primary transition-colors">
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

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
      <SearchModal key={searchOpen ? 'open' : 'closed'} isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
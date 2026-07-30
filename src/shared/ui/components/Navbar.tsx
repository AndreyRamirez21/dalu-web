import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, User, ShoppingBag, Menu, Heart } from 'lucide-react'
import { useCart } from '@/shared/hooks/useCart'
import { MobileMenu } from './MobileMenu'
import { SearchModal } from './SearchModal'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/pijamas', label: 'Sleepwear' },
  { to: '/pantuflas', label: 'Slippers' },
  { to: '/antifaces', label: 'Antifaces' },
  { to: '/accesorios', label: 'Accesorios' },
]

export function Navbar() {
  const { itemCount } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-surface">
      <div className="bg-primary text-white text-xs text-center py-2 px-4">
        Envío gratis por compras superiores a $150.000 COP
      </div>

      <div className="border-b border-border">
        <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-text-primary"
            aria-label="Abrir menú"
          >
            <Menu size={22} />
          </button>

          <Link to="/" className="font-display text-2xl text-primary tracking-widest">
            DALÚ
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-text-primary hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className="text-text-primary hover:text-primary transition-colors"
            >
              <Search size={20} />
            </button>
            <Link to="/cuenta" aria-label="Cuenta" className="hidden sm:block text-text-primary hover:text-primary transition-colors">
              <User size={20} />
            </Link>
            <Link to="/favoritos" aria-label="Favoritos" className="hidden sm:block text-text-primary hover:text-primary transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/carrito" aria-label="Carrito" className="relative text-text-primary hover:text-primary transition-colors">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} links={links} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
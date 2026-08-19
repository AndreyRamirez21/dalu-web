import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, X } from 'lucide-react'
import { useCart } from '@/shared/hooks/useCart'
import { formatPrice } from '@/shared/lib/formatters'

export function CartDrawer() {
  const { items, subtotal, isCartDrawerOpen, closeCartDrawer } = useCart()

  useEffect(() => {
    if (!isCartDrawerOpen) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeCartDrawer()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isCartDrawerOpen, closeCartDrawer])

  if (!isCartDrawerOpen) return null

  return (
    <div className="fixed inset-0 z-[150]" role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
      <button className="absolute inset-0 bg-black/40" aria-label="Cerrar carrito" onClick={closeCartDrawer} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-sm bg-surface shadow-2xl flex flex-col">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 id="cart-drawer-title" className="font-display text-2xl text-text-primary">Carrito</h2>
          <button onClick={closeCartDrawer} aria-label="Cerrar carrito" className="text-text-secondary hover:text-text-primary">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size ?? 'sin-talla'}-${item.color ?? 'sin-color'}`} className="flex gap-4">
              {item.product.images[0] ? (
                <img src={item.product.images[0]} alt={item.product.name} className="h-20 w-16 rounded-lg object-cover bg-primary-light" />
              ) : (
                <div className="h-20 w-16 rounded-lg bg-primary-light" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{item.product.name}</p>
                {item.size && <p className="text-xs text-text-secondary mt-1">{item.product.category === 'accesorios' ? 'Variante' : 'Talla'}: {item.size}</p>}
                <p className="text-sm text-text-secondary mt-2">{item.quantity} × {formatPrice(item.product.price)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-6">
          <div className="flex justify-between font-semibold text-text-primary mb-4">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <Link to="/carrito" onClick={closeCartDrawer} className="flex items-center justify-center gap-2 w-full rounded-full bg-primary-strong text-white px-6 py-3 text-sm font-medium uppercase tracking-wide hover:bg-primary-strong-hover">
            <ShoppingBag size={17} />
            Ver carrito
          </Link>
        </div>
      </aside>
    </div>
  )
}

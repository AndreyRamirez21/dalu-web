import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowLeft, MessageCircle, Package } from 'lucide-react'
import { useCart } from '@/shared/hooks/useCart'
import { Button } from '@/shared/ui/components/Button'
import { WHATSAPP_URL } from '@/shared/constants/contact'
import { formatPrice } from '@/shared/lib/formatters'
import { getStockForSelection } from '@/shared/lib/inventory'

export function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, subtotal } = useCart()

  function buildWhatsappMessage() {
      const lines = items.map(
        (i) =>
          `• ${i.product.name} (Ref: ${i.product.reference}${i.size ? ` — ${i.product.category === 'accesorios' ? 'Variante' : 'Talla'}: ${i.size}` : ''}) x${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`
      )
      const message = [
        'Hola Dalú! Quiero confirmar mi pedido:',
        '',
        ...lines,
        '',
        `Total: ${formatPrice(subtotal)}`,
      ].join('\n')
      return encodeURIComponent(message)
    }

  const whatsappLink = `${WHATSAPP_URL}?text=${buildWhatsappMessage()}`

  if (items.length === 0) {
    return (
      <div className="max-w-8xl mx-auto px-6 py-20 text-center">
        <h1 className="font-display text-3xl text-text-primary mb-3">Tu carrito está vacío</h1>
        <p className="text-text-secondary mb-6">Explora nuestra colección y encuentra tu próxima pijama favorita.</p>
        <Link to="/pijamas">
          <Button size="lg">Ir al catálogo</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-8xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl text-text-primary">Carrito de compras</h1>
      <p className="text-text-secondary text-sm mt-1 mb-8">
        Tienes {items.length} producto{items.length > 1 ? 's' : ''} en tu carrito
      </p>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div>
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 text-xs font-semibold text-text-secondary uppercase pb-3 border-b border-border">
            <span>Producto</span>
            <span>Precio</span>
            <span>Cantidad</span>
            <span>Total</span>
            <span />
          </div>

            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size ?? 'sin-talla'}-${item.color ?? 'sin-color'}`}
                className="grid md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-5 border-b border-border"
              >
              <div className="flex items-center gap-4">
                <Link to={`/producto/${item.product.slug}`} className="shrink-0">
                  {item.product.images[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-primary-light flex items-center justify-center">
                      <Package size={24} className="text-primary/40" />
                    </div>
                  )}
                </Link>
                <div>
                  <Link
                    to={`/producto/${item.product.slug}`}
                    className="font-medium text-text-primary text-sm hover:text-primary hover:underline"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-text-secondary mt-1">
                    {item.size && <>{item.product.category === 'accesorios' ? 'Variante' : 'Talla'}: {item.size}</>}
                  </p>
                <button
                  onClick={() => removeItem(item.product.id, item.size, item.color)}
                  className="text-xs text-primary hover:underline mt-1"
                >
                  Eliminar
                </button>
                </div>
              </div>

              <span className="text-sm text-text-primary">
                {formatPrice(item.product.price)}
              </span>

              <div className="inline-flex items-center border border-border rounded-full w-fit">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.size, item.color)}
                  className="w-8 h-8 flex items-center justify-center text-text-primary hover:text-primary"
                  aria-label="Disminuir cantidad"
                >
                  <Minus size={12} />
                </button>
                <span className="w-7 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.size, item.color)}
                  disabled={item.quantity >= getStockForSelection(item.product, item.size)}
                  className="w-8 h-8 flex items-center justify-center text-text-primary hover:text-primary"
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={12} />
                </button>
              </div>

              <span className="text-sm font-semibold text-text-primary">
                {formatPrice(item.product.price * item.quantity)}
              </span>

                <button
                  onClick={() => removeItem(item.product.id, item.size, item.color)}
                  className="text-text-secondary hover:text-danger transition-colors"
                  aria-label="Eliminar producto"
                >
                  <Trash2 size={18} />
                </button>
            </div>
          ))}

          <div className="flex items-center justify-between mt-6">
            <Link to="/pijamas" className="flex items-center gap-2 text-sm text-primary hover:underline">
              <ArrowLeft size={16} />
              Seguir comprando
            </Link>
            <button
              onClick={clearCart}
              className="flex items-center gap-2 text-sm border border-border rounded-full px-4 py-2 text-text-secondary hover:border-danger hover:text-danger transition-colors"
            >
              <Trash2 size={14} />
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* Resumen */}
        <aside className="bg-surface rounded-2xl shadow-sm p-6 h-fit">
          <h2 className="font-semibold text-text-primary mb-5">Resumen del pedido</h2>

          <div className="flex justify-between text-sm text-text-secondary mb-3">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-text-secondary mb-4">
            <span>Envío</span>
            <span>Se calcula por WhatsApp</span>
          </div>

          <div className="flex justify-between font-semibold text-text-primary border-t border-border pt-4 mb-6">
            <span>Total</span>
            <span className="text-lg text-primary">{formatPrice(subtotal)}</span>
          </div>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebc59]">
              <MessageCircle size={18} />
              Continuar por WhatsApp
            </Button>
          </a>

          <p className="text-xs text-text-secondary text-center mt-3">
            Te atenderemos por WhatsApp para confirmar tu pedido, método de pago y envío.
          </p>
        </aside>
      </div>
    </div>
  )
}

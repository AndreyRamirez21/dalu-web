import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Eye, Package, ShoppingBag, X } from 'lucide-react'
import type { Product } from '@/shared/types/product'
import { useCart } from '@/shared/hooks/useCart'
import { useToast } from '@/shared/hooks/useToast'
import { formatPrice } from '@/shared/lib/formatters'
import { getStockForSelection } from '@/shared/lib/inventory'
import { QuantitySelector } from './QuantitySelector'

interface QuickViewModalProps {
  product: Product
  open: boolean
  onClose: () => void
}

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  const { addItem, items, openCartDrawer } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const firstAvailableSize = useMemo(
    () => product.variants.find((variant) => variant.stock > 0)?.size ?? null,
    [product]
  )
  const [selectedSize, setSelectedSize] = useState<string | null>(firstAvailableSize)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const requiresSelection = product.variants.length > 0
  const selectionLabel = product.category === 'accesorios' || product.category === 'antifaces' ? 'variante' : 'talla'

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, firstAvailableSize, onClose])

  if (!open) return null

  const stock = getStockForSelection(product, selectedSize)
  const alreadyInCart = items.find(
    (item) => item.product.id === product.id && (item.size ?? null) === (selectedSize ?? null)
  )?.quantity ?? 0
  const availableQuantity = Math.max(0, stock - alreadyInCart)
  const canAdd = product.inStock && (!requiresSelection || Boolean(selectedSize)) && availableQuantity > 0

  function addToCart(goToCart = false) {
    if (requiresSelection && !selectedSize) {
      showToast(`Selecciona una ${selectionLabel}`)
      return
    }
    if (!addItem(product, quantity, selectedSize)) {
      showToast(`No hay más unidades disponibles de esta ${selectionLabel}`)
      return
    }
    onClose()
    if (goToCart) {
      navigate('/carrito')
    } else {
      openCartDrawer()
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-text-primary/45 p-4 sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`quick-view-title-${product.id}`}
        className="relative grid w-full max-w-4xl max-h-[calc(100vh-2rem)] overflow-y-auto bg-white shadow-2xl md:grid-cols-[1.15fr_0.85fr]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar vista rápida"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-text-primary shadow-sm transition-colors hover:bg-white md:right-4 md:top-4"
        >
          <X size={22} />
        </button>

        <div className="group/gallery relative h-full min-h-72 md:min-h-[32rem] overflow-hidden bg-surface">
          {product.images[0] ? (
            <img
              src={product.images[selectedImage]}
              alt={`${product.name}, imagen ${selectedImage + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-primary/40">
              <Package size={48} />
            </div>
          )}
          {product.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setSelectedImage((current) => (current - 1 + product.images.length) % product.images.length)}
                aria-label="Ver foto anterior"
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-text-primary/30 bg-white/85 text-text-primary shadow-sm transition-colors hover:bg-white sm:opacity-0 sm:group-hover/gallery:opacity-100"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => setSelectedImage((current) => (current + 1) % product.images.length)}
                aria-label="Ver foto siguiente"
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-text-primary/30 bg-white/85 text-text-primary shadow-sm transition-colors hover:bg-white sm:opacity-0 sm:group-hover/gallery:opacity-100"
              >
                <ChevronRight size={22} />
              </button>
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/70 px-3 py-2">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Ver foto ${index + 1}`}
                    aria-current={selectedImage === index ? 'true' : undefined}
                    className={`h-2.5 w-2.5 rounded-full transition-transform ${
                      selectedImage === index ? 'scale-110 bg-primary-strong' : 'bg-text-primary/35 hover:bg-text-primary/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex min-h-0 flex-col p-6 sm:p-8">
          <p className="pr-10 text-xs font-medium uppercase tracking-[0.18em] text-text-secondary">Vista rápida</p>
          <h2 id={`quick-view-title-${product.id}`} className="mt-2 font-display text-2xl leading-tight text-text-primary sm:text-3xl">
            {product.name}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">Ref. {product.reference}</p>
          <div className="mt-5 flex items-baseline justify-between border-b border-border pb-5">
            <p className="text-2xl font-semibold text-text-primary">{formatPrice(product.price)}</p>
            <span className={product.inStock ? 'text-sm text-primary' : 'text-sm text-danger'}>
              {product.inStock ? 'Disponible' : 'Agotado'}
            </span>
          </div>

          {product.description && <p className="mt-5 text-sm leading-6 text-text-secondary">{product.description}</p>}

          {requiresSelection && (
            <div className="mt-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-text-primary">{selectionLabel}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const soldOut = variant.stock <= 0
                  const selected = selectedSize === variant.size
                  return (
                    <button
                      key={variant.size}
                      type="button"
                      disabled={soldOut}
                      onClick={() => {
                        setSelectedSize(variant.size)
                        setQuantity(1)
                      }}
                      className={`min-w-10 h-10 rounded-full border px-3 text-sm font-medium transition-colors ${
                        soldOut
                          ? 'cursor-not-allowed border-border text-text-secondary/40 line-through'
                          : selected
                            ? 'border-primary-strong bg-primary-strong text-white'
                            : 'border-border text-text-primary hover:border-primary'
                      }`}
                    >
                      {variant.size}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-sm font-semibold text-text-primary">Cantidad</span>
            <QuantitySelector value={quantity} onChange={setQuantity} max={Math.max(1, availableQuantity)} disabled={!canAdd} />
          </div>
          {availableQuantity > 0 && availableQuantity <= 3 && <p className="mt-2 text-xs text-text-secondary">Últimas unidades disponibles.</p>}

          <div className="mt-7 grid gap-3">
            <button
              type="button"
              disabled={!canAdd}
              onClick={() => addToCart(false)}
              className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary-strong px-5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-strong-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShoppingBag size={18} /> Agregar al carrito
            </button>
            <button
              type="button"
              disabled={!canAdd}
              onClick={() => addToCart(true)}
              className="min-h-12 rounded-full border border-text-primary px-5 text-sm font-semibold uppercase tracking-wide text-text-primary transition-colors hover:bg-text-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Comprar ahora
            </button>
            <Link onClick={onClose} to={`/producto/${product.slug}`} className="mt-1 text-center text-sm font-medium text-primary hover:underline">
              Ver detalles del producto <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>,
    document.body
  )
}

function QuickPurchaseModal({ product, open, onClose }: QuickViewModalProps) {
  const { addItem, items, openCartDrawer } = useCart()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const firstAvailableSize = useMemo(
    () => product.variants.find((variant) => variant.stock > 0)?.size ?? null,
    [product]
  )
  const [selectedSize, setSelectedSize] = useState<string | null>(firstAvailableSize)
  const [quantity, setQuantity] = useState(1)
  const requiresSelection = product.variants.length > 0
  const selectionLabel = product.category === 'accesorios' || product.category === 'antifaces' ? 'variante' : 'talla'

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  const stock = getStockForSelection(product, selectedSize)
  const alreadyInCart = items.find(
    (item) => item.product.id === product.id && (item.size ?? null) === (selectedSize ?? null)
  )?.quantity ?? 0
  const availableQuantity = Math.max(0, stock - alreadyInCart)
  const canAdd = product.inStock && (!requiresSelection || Boolean(selectedSize)) && availableQuantity > 0

  function addToCart(goToCart = false) {
    if (requiresSelection && !selectedSize) {
      showToast(`Selecciona una ${selectionLabel}`)
      return
    }
    if (!addItem(product, quantity, selectedSize)) {
      showToast(`No hay más unidades disponibles de esta ${selectionLabel}`)
      return
    }
    onClose()
    if (goToCart) {
      navigate('/carrito')
    } else {
      openCartDrawer()
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-text-primary/45 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`quick-purchase-title-${product.id}`}
        className="relative w-full max-w-md rounded-sm bg-white p-5 shadow-2xl sm:p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar compra rápida"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center text-text-primary transition-colors hover:text-primary"
        >
          <X size={24} />
        </button>

        <div className="flex gap-4 pr-8">
          <div className="h-28 w-24 shrink-0 overflow-hidden bg-surface sm:h-32 sm:w-28">
            {product.images[0] ? (
              <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-primary/40">
                <Package size={30} />
              </div>
            )}
          </div>
          <div className="min-w-0 pt-1">
            <h2 id={`quick-purchase-title-${product.id}`} className="font-display text-xl leading-tight text-text-primary sm:text-2xl">
              {product.name}
            </h2>
            <p className="mt-2 text-lg font-semibold text-text-primary">{formatPrice(product.price)}</p>
            <Link onClick={onClose} to={`/producto/${product.slug}`} className="mt-4 inline-flex text-sm font-medium text-primary hover:underline">
              Ver detalles <span className="ml-2" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {requiresSelection && (
          <div className="mt-6 border-t border-border pt-5 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-text-primary">{selectionLabel}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {product.variants.map((variant) => {
                const soldOut = variant.stock <= 0
                const selected = selectedSize === variant.size
                return (
                  <button
                    key={variant.size}
                    type="button"
                    disabled={soldOut}
                    onClick={() => {
                      setSelectedSize(variant.size)
                      setQuantity(1)
                    }}
                    className={`min-w-10 h-10 rounded-full border px-3 text-sm font-medium transition-colors ${
                      soldOut
                        ? 'cursor-not-allowed border-border text-text-secondary/40 line-through'
                        : selected
                          ? 'border-primary-strong bg-primary-strong text-white'
                          : 'border-border text-text-primary hover:border-primary'
                    }`}
                  >
                    {variant.size}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center justify-center gap-4">
          <span className="text-sm font-semibold text-text-primary">Cantidad</span>
          <QuantitySelector value={quantity} onChange={setQuantity} max={Math.max(1, availableQuantity)} disabled={!canAdd} />
        </div>
        {availableQuantity > 0 && availableQuantity <= 3 && <p className="mt-2 text-center text-xs text-text-secondary">Últimas unidades disponibles.</p>}

        <div className="mt-6 grid gap-3">
          <button
            type="button"
            disabled={!canAdd}
            onClick={() => addToCart(false)}
            className="flex min-h-12 items-center justify-center gap-2 rounded-md bg-primary-strong px-5 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary-strong-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag size={18} /> Agregar al carrito
          </button>
          <button
            type="button"
            disabled={!canAdd}
            onClick={() => addToCart(true)}
            className="min-h-12 rounded-md border border-text-primary px-5 text-sm font-semibold uppercase tracking-wide text-text-primary transition-colors hover:bg-text-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Comprar ahora
          </button>
        </div>
      </section>
    </div>,
    document.body
  )
}

interface QuickViewButtonProps {
  product: Product
  variant?: 'eye' | 'quick-purchase'
}

export function QuickViewButton({ product, variant = 'eye' }: QuickViewButtonProps) {
  const [open, setOpen] = useState(false)
  const [viewSession, setViewSession] = useState(0)
  const close = useCallback(() => setOpen(false), [])

  return (
    <>
      {variant === 'eye' ? (
        <button
          type="button"
          onClick={() => {
            setViewSession((session) => session + 1)
            setOpen(true)
          }}
          aria-label={`Vista rápida de ${product.name}`}
          className="group/quick-view absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-text-primary shadow-sm transition-all hover:bg-primary-strong hover:text-white md:translate-y-1 md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100"
        >
          <Eye size={19} />
          <span className="pointer-events-none absolute right-0 top-full mt-2 whitespace-nowrap rounded-md bg-text-primary px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover/quick-view:opacity-100">
            Vista previa
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            setViewSession((session) => session + 1)
            setOpen(true)
          }}
          aria-label={`Compra rápida de ${product.name}`}
          className="group/quick-purchase absolute inset-x-0 bottom-0 z-10 flex h-12 items-center justify-center gap-2 bg-text-primary px-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-all hover:bg-primary-strong md:translate-y-full md:opacity-0 md:group-hover/card:translate-y-0 md:group-hover/card:opacity-100"
        >
          <span className="group-hover/quick-purchase:hidden">Compra rápida</span>
          <ShoppingBag size={19} className="hidden group-hover/quick-purchase:block" aria-hidden="true" />
        </button>
      )}
      {variant === 'quick-purchase' ? (
        <QuickPurchaseModal key={viewSession} product={product} open={open} onClose={close} />
      ) : (
        <QuickViewModal key={viewSession} product={product} open={open} onClose={close} />
      )}
    </>
  )
}

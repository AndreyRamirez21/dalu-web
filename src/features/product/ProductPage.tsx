import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Heart, Package, ShieldCheck } from 'lucide-react'
import { Button } from '@/shared/ui/components/Button'
import { QuantitySelector } from '@/shared/ui/components/QuantitySelector'
import { Accordion } from '@/shared/ui/components/Accordion'
import { ProductCard } from '@/shared/ui/components/ProductCard'
import { getProductBySlug, getRelatedProducts } from '@/services/products'
import type { Product } from '@/shared/types/product'
import { useCart } from '@/shared/hooks/useCart'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { useToast } from '@/shared/hooks/useToast'

export function ProductPage() {
  const { slug } = useParams()
  const { addItem } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()

  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [cargando, setCargando] = useState(true)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

useEffect(() => {
  if (!slug) return
  setCargando(true)
  setRelated([])
  setSelectedImage(0)
  setSelectedColor(null)
  setSelectedSize(null)
  setQuantity(1)

  getProductBySlug(slug).then((p) => {
    setProduct(p)
    setCargando(false)

    if (p) {
      getRelatedProducts(p.category, p.id, 4).then(setRelated)
    }
  })
}, [slug])

if (cargando) {
  return (
    <div className="max-w-8xl mx-auto px-6 py-10 animate-pulse">
      {/* Breadcrumb fantasma */}
      <div className="h-3 w-40 bg-border rounded mb-6" />

      <div className="grid md:grid-cols-[80px_1fr_1fr_320px] gap-6">
        {/* Miniaturas fantasma */}
        <div className="hidden md:flex md:flex-col gap-3 order-2 md:order-1">
          <div className="w-20 h-20 rounded-xl bg-border" />
          <div className="w-20 h-20 rounded-xl bg-border" />
        </div>

        {/* Imagen grande fantasma */}
        <div className="order-1 md:order-2">
          <div className="rounded-2xl bg-primary-light aspect-[4/5]" />
        </div>

        {/* Info fantasma */}
        <div className="order-3 space-y-4">
          <div className="h-8 w-3/4 bg-border rounded" />
          <div className="h-7 w-1/3 bg-border rounded" />
          <div className="h-4 w-full bg-border rounded" />
          <div className="h-4 w-2/3 bg-border rounded" />
          <div className="pt-4 space-y-2">
            <div className="h-4 w-16 bg-border rounded" />
            <div className="flex gap-2">
              <div className="h-10 w-10 rounded-full bg-border" />
              <div className="h-10 w-10 rounded-full bg-border" />
              <div className="h-10 w-10 rounded-full bg-border" />
            </div>
          </div>
          <div className="h-12 w-full bg-border rounded-full mt-6" />
        </div>

        {/* Sidebar fantasma */}
        <div className="order-4 hidden md:block">
          <div className="h-14 w-full bg-border rounded-xl" />
          <div className="h-24 w-full bg-border rounded-2xl mt-6" />
        </div>
      </div>
    </div>
  )
}

  if (!product) {
    return (
      <div className="max-w-8xl mx-auto px-6 py-20 text-center">
        <p className="text-text-secondary">Producto no encontrado.</p>
        <Link to="/pijamas" className="text-primary text-sm hover:underline mt-2 inline-block">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  const favorite = isFavorite(product.id)

  return (
    <div className="max-w-8xl mx-auto px-6 py-10">
      <nav className="text-xs text-text-secondary mb-6">
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <span className="mx-2">›</span>
        <Link to="/pijamas" className="hover:text-primary">Sleepwear</Link>
        <span className="mx-2">›</span>
        <span className="text-text-primary">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-[80px_1fr_1fr_320px] gap-6">
        {/* Miniaturas */}
        {product.images.length > 1 && (
          <div className="flex md:flex-col gap-3 order-2 md:order-1">
            {product.images.map((img, i) => (
              <button
                key={img}
                onClick={() => setSelectedImage(i)}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-colors ${
                  selectedImage === i ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Imagen grande */}
        <div className="order-1 md:order-2" style={{ gridColumn: product.images.length > 1 ? undefined : 'span 2' }}>
          <div className="rounded-2xl overflow-hidden bg-surface shadow-sm">
            {product.images[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full aspect-[4/5] object-cover"
              />
            ) : (
              <div className="w-full aspect-[4/5] bg-primary-light flex items-center justify-center">
                <Package size={48} className="text-primary/40" />
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="order-3">
          <h1 className="font-display text-3xl text-text-primary">{product.name}</h1>

          <p className="text-2xl font-semibold text-text-primary mt-4">
            ${product.price.toLocaleString('es-CO')} COP
          </p>

          <div className="border-t border-border mt-6 pt-6">
            {product.colors.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-text-primary mb-2">Color</p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Color ${color}`}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === color ? 'border-primary scale-110' : 'border-border'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

                {product.sizes.length > 0 && (
                      <div className="mt-6">
                        <p className="text-sm font-semibold text-text-primary mb-2">Talla</p>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setSelectedSize(size)}
                              className={`min-w-10 h-10 px-3 rounded-full border text-sm font-medium transition-colors ${
                                selectedSize === size
                                  ? 'bg-primary text-white border-primary'
                                  : 'border-border text-text-primary hover:border-primary'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {!product.inStock && (
                      <div className="mt-6 bg-danger/10 border border-danger/20 rounded-xl px-4 py-3">
                        <p className="text-sm font-semibold text-danger">Producto agotado</p>
                        <p className="text-xs text-text-secondary mt-0.5">
                          Este producto no está disponible por el momento.
                        </p>
                      </div>
                    )}

                    <div className="mt-6">
                      <p className="text-sm font-semibold text-text-primary mb-2">Cantidad</p>
                      <QuantitySelector value={quantity} onChange={setQuantity} disabled={!product.inStock} />
                    </div>

                    <div className="flex gap-3 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full mt-2"
                      disabled={!product.inStock}
                      onClick={() => {
                        if (product.sizes.length > 0 && !selectedSize) {
                          showToast('Por favor selecciona una talla')
                          return
                        }
                        addItem(product, quantity, selectedSize)
                        showToast(`${product.name} agregado al carrito`)
                      }}
                    >
                      {product.inStock ? 'Agregar al carrito' : 'Agotado'}
                    </Button>
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        aria-label="Agregar a favoritos"
                        className={`w-14 h-14 flex items-center justify-center rounded-full border transition-colors shrink-0 ${
                          favorite ? 'text-danger border-danger' : 'border-border hover:text-danger hover:border-danger'
                        }`}
                      >
                        <Heart size={20} className={favorite ? 'fill-danger' : ''} />
                      </button>
                    </div>
                  </div>
                </div>

        {/* Sidebar derecha: acordeón + hecho con amor */}
        <div className="order-4">
          <Accordion
            items={[
              {
                icon: <ShieldCheck size={16} className="text-primary" />,
                title: 'Envíos y devoluciones',
                content: 'Envíos a todo Colombia. Cambios y devoluciones dentro de los primeros 15 días de compra.',
              },
            ]}
          />

          <div className="bg-primary-light rounded-2xl p-5 mt-6 flex items-start gap-3">
            <Heart size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-text-primary">Hecho con amor</p>
              <p className="text-xs text-text-secondary mt-1">
                Buscamos cada pieza pensando en tu comodidad y bienestar.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-center font-display text-2xl text-text-primary mb-8">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
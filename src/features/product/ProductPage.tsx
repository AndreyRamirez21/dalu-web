import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Heart, Package, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/shared/ui/components/Button'
import { QuantitySelector } from '@/shared/ui/components/QuantitySelector'
import { Accordion } from '@/shared/ui/components/Accordion'
import { ProductCard } from '@/shared/ui/components/ProductCard'
import { SizeGuideModal } from '@/shared/ui/components/SizeGuideModal'
import { useCart } from '@/shared/hooks/useCart'
import { useFavorites } from '@/shared/hooks/useFavorites'
import { useToast } from '@/shared/hooks/useToast'
import { categories } from '@/data/categories'
import { useProduct, useRelatedProducts } from '@/shared/hooks/useProducts'
import { formatPrice } from '@/shared/lib/formatters'
import { getStockForSelection } from '@/shared/lib/inventory'
import { ZoomableImage } from '@/shared/ui/components/ZoomableImage'
// Categoría de producto para la que aplica la guía de tallas.
const SIZE_GUIDE_CATEGORY = 'pijamas'

// Cada grupo mapea un conjunto de telas (coincidencia parcial, sin tildes/mayúsculas)
// a la imagen de guía de tallas que le corresponde. Agrega un grupo nuevo por cada
// tela que tenga su propia imagen.
const SIZE_GUIDE_IMAGES: { fabrics: string[]; image: string }[] = [
  { fabrics: ['durazno', 'polilicra'], image: '/GuiaTallas1.png' },
  { fabrics: ['satin', 'saten'], image: '/GuiaTallas2.png' },
]

function normalizeText(value?: string | null) {
  return (value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function getSizeGuideImage(fabricType?: string | null): string | null {
  const normalized = normalizeText(fabricType)
  const match = SIZE_GUIDE_IMAGES.find((group) =>
    group.fabrics.some((fabric) => normalized.includes(fabric))
  )
  return match?.image ?? null
}

export function ProductPage() {
  const { slug } = useParams()

  return <ProductPageContent key={slug ?? 'missing'} slug={slug} />
}

function ProductPageContent({ slug }: { slug?: string }) {
  const { addItem, items } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()

  const { data: product, isPending: cargando, isError: loadError, refetch } = useProduct(slug)
  const { data: related = [] } = useRelatedProducts(product?.category, product?.id)

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)

  if (cargando) {
    return (
      <div className="max-w-8xl mx-auto px-6 py-10 animate-pulse">
        {/* Breadcrumb fantasma */}
        <div className="h-3 w-40 bg-border rounded mb-6" />

        <div className="grid lg:grid-cols-[80px_1fr_1fr_320px] gap-6">
          {/* Miniaturas fantasma */}
          <div className="hidden lg:flex lg:flex-col gap-3 order-2 lg:order-1">
            <div className="w-20 h-20 rounded-xl bg-border" />
            <div className="w-20 h-20 rounded-xl bg-border" />
          </div>

          {/* Imagen grande fantasma */}
            <div className="order-1 lg:order-2">
              <div className="bg-primary-light aspect-[3/4]" />
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
          <div className="order-4 hidden lg:block">
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
        <p className="text-text-secondary">
          {loadError ? 'No pudimos cargar este producto. Revisa tu conexión e inténtalo de nuevo.' : 'Producto no encontrado.'}
        </p>
        {loadError && (
          <button onClick={() => refetch()} className="mt-3 text-sm font-medium text-primary hover:underline">
            Reintentar
          </button>
        )}
        <Link to="/pijamas" className="text-primary text-sm hover:underline mt-2 inline-block">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  const favorite = isFavorite(product.id)
  const productCategory = categories.find((category) => category.slug === product.category)
  const requiresSize = product.sizes.length > 0
  const selectionLabel = product.category === 'accesorios' ? 'variante' : 'talla'
  const stockForSelection = getStockForSelection(product, selectedSize)
  const inCartForSelection = items.find(
    (item) => item.product.id === product.id && (item.size ?? null) === (selectedSize ?? null)
  )?.quantity ?? 0
  const availableQuantity = Math.max(0, stockForSelection - inCartForSelection)
  const canSelectQuantity = product.inStock && (!requiresSize || Boolean(selectedSize)) && availableQuantity > 0

  const sizeGuideImage =
    product.category === SIZE_GUIDE_CATEGORY ? getSizeGuideImage(product.fabricType) : null

  return (
    <div className="max-w-8xl mx-auto px-6 py-10">
      <Helmet>
        <title>{product.name} | Dalú</title>
        <meta name="description" content={`${product.name} — ${formatPrice(product.price)}. Pijamas, pantuflas y accesorios Dalú.`} />
        <meta property="og:title" content={`${product.name} | Dalú`} />
        <meta property="og:description" content={`Descubre ${product.name} en Dalú.`} />
        {product.images[0] && <meta property="og:image" content={product.images[0]} />}
        <meta property="og:type" content="product" />

      </Helmet>

      <nav className="text-xs text-text-secondary mb-6">
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <span className="mx-2">›</span>
        <Link to={`/${product.category}`} className="hover:text-primary">
          {productCategory?.name ?? product.category}
        </Link>
        <span className="mx-2">›</span>
        <span className="text-text-primary">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[80px_1fr_1fr_320px]">
        {/* Miniaturas */}
        {product.images.length > 1 && (
          <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`Ver imagen ${i + 1} de ${product.name}`}
                    aria-current={selectedImage === i ? 'true' : undefined}
                    className={`w-16 h-16 lg:w-20 lg:h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-colors ${
                      selectedImage === i ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      width={80}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
          </div>
        )}

        {/* Imagen grande */}
        <div className={`order-1 lg:order-2 ${product.images.length > 1 ? '' : 'lg:col-span-2'}`}>
            <div className="group relative">
              {product.images[selectedImage] ? (
                  <ZoomableImage
                    src={product.images[selectedImage]}
                    alt={product.name}
                  />
              ) : (
                <div className="w-full aspect-[3/4] bg-primary-light flex items-center justify-center">
                  <Package size={48} className="text-primary/40" />
                </div>
              )}

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    aria-label="Imagen anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={20} className="text-text-primary" />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                    aria-label="Siguiente imagen"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={20} className="text-text-primary" />
                  </button>
                </>
              )}
            </div>
        </div>

        {/* Info */}
        <div className="order-3 min-w-0">
          <h1 className="font-display text-3xl text-text-primary">{product.name}</h1>

          <p className="text-2xl font-semibold text-text-primary mt-4">
            {formatPrice(product.price)}
          </p>

          {sizeGuideImage && (
            <button
              type="button"
              onClick={() => setShowSizeGuide(true)}
              className="mt-2 text-sm font-medium text-primary hover:underline"
            >
              Guía de tallas
            </button>
          )}

          <div className="border-t border-border mt-3 pt-4">
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

            {requiresSize && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-text-primary mb-2">{selectionLabel === 'variante' ? 'Variante' : 'Talla'}</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size)
                        setQuantity(1)
                      }}
                      className={`min-w-10 h-10 px-3 rounded-full border text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? 'bg-primary-strong text-white border-primary-strong'
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
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={Math.max(1, availableQuantity)}
                disabled={!canSelectQuantity}
              />
                {requiresSize && !selectedSize ? (
                  <p className="text-xs text-text-secondary mt-2">Selecciona una {selectionLabel} para ver las unidades disponibles.</p>
                ) : availableQuantity > 0 && availableQuantity <= 3 ? (
                  <p className="text-xs text-text-secondary mt-2">Últimas unidades disponibles.</p>
                ) : availableQuantity === 0 ? (
                  <p className="text-xs text-danger mt-2">No quedan unidades disponibles de esta talla.</p>
                ) : null}
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2"
                disabled={!canSelectQuantity}
                onClick={() => {
                  if (requiresSize && !selectedSize) {
                    showToast(`Por favor selecciona una ${selectionLabel}`)
                    return
                  }
                  if (!addItem(product, quantity, selectedSize)) {
                    showToast(`No hay más unidades disponibles de esta ${selectionLabel}`)
                    return
                  }
                  showToast(`${product.name} agregado al carrito`)
                }}
              >
                {!product.inStock ? 'Agotado' : 'Comprar'}
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

        {/* En celular este bloque se muestra debajo de la compra. */}
        <div className="order-4 min-w-0">
          <Accordion
            items={[
              ...(product.description ? [{
                icon: <Package size={16} className="text-primary" />,
                title: 'Descripción',
                content: product.description,
              }] : []),
              ...(product.fabricType ? [{
                icon: <Package size={16} className="text-primary" />,
                title: 'Tipo de tela',
                content: product.fabricType,
              }] : []),
              {
                icon: <ShieldCheck size={16} className="text-primary" />,
                title: 'Envíos y devoluciones',
                content: 'Envíos a todo Colombia. Se aceptan cambios dentro de los 3 días calendario posteriores a la compra.',
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

      {sizeGuideImage && (
        <SizeGuideModal
          open={showSizeGuide}
          onClose={() => setShowSizeGuide(false)}
          image={sizeGuideImage}
        />
      )}
    </div>
  )
}
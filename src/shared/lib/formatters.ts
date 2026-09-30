const colombianPesoFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function formatPrice(amount: number) {
  return colombianPesoFormatter.format(amount)
}

export function generarAltText(
  product: { name: string; fabricType?: string | null },
  selectedSize?: string | null
): string {
  const partes = [
    product.name,
    selectedSize ? `talla ${selectedSize}` : null,
    product.fabricType ? `tela ${product.fabricType}` : null,
  ].filter(Boolean)

  return `${partes.join(', ')} - Dalú`
}

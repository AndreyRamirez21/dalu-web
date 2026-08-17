const colombianPesoFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function formatPrice(amount: number) {
  return colombianPesoFormatter.format(amount)
}

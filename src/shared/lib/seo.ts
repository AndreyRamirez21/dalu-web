// URL base del sitio en producción. Cambia esto si el dominio cambia en el futuro.
export const SITE_URL = 'https://dalusiendotu.com'

/**
 * Construye una URL absoluta y canónica a partir de un path relativo.
 * Ej: buildCanonicalUrl('/pijamas/mi-producto') -> 'https://dalusiendotu.com/pijamas/mi-producto'
 */
export function buildCanonicalUrl(pathname: string): string {
  // Evita dobles slashes si pathname ya empieza con "/"
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${SITE_URL}${cleanPath}`
}
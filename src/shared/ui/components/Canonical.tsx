import { useLocation } from 'react-router-dom'
import { buildCanonicalUrl } from '@/shared/lib/seo'

/**
 * Inyecta <link rel="canonical"> y <meta property="og:url"> dinámicamente
 * según la ruta actual. Debe usarse DENTRO de un <Helmet> ya existente en
 * cada página (react-helmet-async fusiona automáticamente múltiples
 * bloques <Helmet> en el árbol, así que no reemplaza el resto de tus tags).
 *
 * Uso:
 *   <Helmet>
 *     <title>...</title>
 *     <Canonical />
 *   </Helmet>
 */
export function Canonical() {
  const location = useLocation()
  const url = buildCanonicalUrl(location.pathname)

  return (
    <>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
    </>
  )
}
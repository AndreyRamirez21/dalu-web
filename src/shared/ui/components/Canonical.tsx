import { useLocation } from 'react-router-dom'
import { buildCanonicalUrl } from '@/shared/lib/seo'

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
import { Link, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { legalContentBySlug } from './legalContent'

export function LegalPage() {
  const location = useLocation()
  const slug = location.pathname.replace('/', '')
  const content = legalContentBySlug[slug]

  if (!content) {
    return (
      <div className="max-w-8xl mx-auto px-6 py-20 text-center">
        <p className="text-text-secondary">Página no encontrada.</p>
        <Link to="/" className="text-primary text-sm hover:underline mt-2 inline-block">
          Volver al inicio
        </Link>
      </div>
    )
  }

  const hasImages = content.images && content.images.length > 0

  return (
    <div className={`mx-auto px-6 py-16 ${hasImages ? 'max-w-5xl' : 'max-w-3xl'}`}>
      <Helmet>
        <title>{content.title} | Dalú</title>
        <meta name="description" content={content.intro} />
      </Helmet>
      <nav className="text-xs text-text-secondary mb-6">
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-text-primary">{content.title}</span>
      </nav>

      <h1 className="font-display text-3xl text-text-primary mb-3">{content.title}</h1>
      <p className="text-text-secondary mb-10">{content.intro}</p>

      {hasImages && (
        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          {content.images!.map((img) => (
            <img
              key={img}
              src={img}
              alt={content.title}
              width={650}
              height={491}
              className="w-full rounded-2xl shadow-sm object-contain bg-surface"
            />
          ))}
        </div>
      )}

      {content.sections.length > 0 && (
        <div className="space-y-8">
          {content.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-semibold text-text-primary mb-2">{section.heading}</h2>
              <p className="text-sm text-text-secondary leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

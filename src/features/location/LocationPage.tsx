import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { ExternalLink, MapPin } from 'lucide-react'
import { Button } from '@/shared/ui/components/Button'
import { Canonical } from '@/shared/ui/components/Canonical'
import { STORE_ADDRESS, STORE_MAP_EMBED_URL, STORE_MAP_URL } from '@/shared/constants/contact'

export function LocationPage() {
  return (
    <div className="max-w-8xl mx-auto px-6 py-10 md:py-16">
      <Helmet>
        <title>Visítanos en Buga | Dalú</title>
        <meta name="description" content={`Encuentra a Dalú en ${STORE_ADDRESS}.`} />
        <Canonical />
      </Helmet>

      <nav className="text-xs text-text-secondary mb-6">
        <Link to="/" className="hover:text-primary">Inicio</Link>
        <span className="mx-2">›</span>
        <span className="text-text-primary">Ubicación</span>
      </nav>

      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-2">Ven a conocernos</p>
        <h1 className="font-display text-3xl md:text-4xl text-text-primary">Nuestra ubicación</h1>
      </div>

      <div className="grid lg:grid-cols-[340px_1fr] gap-6">
        <aside className="rounded-2xl bg-surface shadow-sm p-6 h-fit">
          <MapPin size={28} className="text-primary mb-4" />
          <h2 className="font-semibold text-text-primary">Dalú Buga</h2>
          <p className="text-sm text-text-secondary leading-relaxed mt-2">{STORE_ADDRESS}</p>
          <p className="text-sm text-text-secondary mt-5">Te esperamos para que encuentres tus favoritos en persona.</p>
          <a href={STORE_MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex mt-6">
            <Button size="sm" className="flex items-center gap-2">
              Abrir indicaciones
              <ExternalLink size={15} />
            </Button>
          </a>
        </aside>

        <div className="overflow-hidden rounded-2xl bg-primary-light shadow-sm min-h-[460px]">
            <iframe
              title="Mapa de la ubicación de Dalú en Buga"
              src={STORE_MAP_EMBED_URL}
              className="w-full h-full min-h-[460px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              allowFullScreen
            />
        </div>
      </div>
    </div>
  )
}
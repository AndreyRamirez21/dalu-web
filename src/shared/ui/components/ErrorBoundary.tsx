import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom'
import logoDalu from '@/assets/logo-daluuu.png'

export function ErrorBoundary() {
  const error = useRouteError()
  const is404 = isRouteErrorResponse(error) && error.status === 404

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-surface">
      <img
        src={logoDalu}
        alt="Dalú - Siendo tú"
        className="h-24 w-auto mb-8 opacity-90"
      />

      <h1 className="font-display text-3xl text-primary mb-3">
        {is404 ? 'Esta página no existe' : 'Tu internet se encuentra descansando'}
      </h1>

      <p className="text-text-secondary mb-8 max-w-sm">
        {is404
          ? 'Puede que el enlace esté roto o ya no esté disponible.'
          : 'Revisa tu conexión a internet e inténtalo de nuevo en unos momentos.'}
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => window.location.reload()}
          className="rounded-full border border-primary text-primary px-6 py-3 text-sm font-medium hover:bg-primary-light transition"
        >
          Reintentar
        </button>
        <Link
          to="/"
          className="rounded-full bg-primary-strong text-white px-6 py-3 text-sm font-medium hover:brightness-95 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
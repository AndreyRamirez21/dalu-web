import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getHomeContent, fallbackContent } from '@/services/homeContent'
import type { HomeContent } from '@/services/homeContent'

const CACHE_KEY = 'dalu:home-content:v1'

function readCachedContent(): { data: HomeContent; updatedAt: number } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { data: HomeContent; updatedAt: number }
    if (!parsed?.data?.hero?.slides?.length) return null
    return parsed
  } catch {
    // localStorage puede fallar en modo privado o si el JSON quedó corrupto.
    return null
  }
}

function writeCachedContent(data: HomeContent) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ data, updatedAt: Date.now() }))
  } catch {
    // No es crítico si falla — simplemente no habrá caché para la próxima visita.
  }
}

export function useHomeContent() {
  const cached = readCachedContent()

  const query = useQuery({
    queryKey: ['home-content'],
    queryFn: getHomeContent,
    staleTime: 5 * 60 * 1000,
    gcTime: 24 * 60 * 60 * 1000,
    // Primera visita sin caché: usa el fallback genérico mientras se resuelve la descarga.
    placeholderData: fallbackContent,
    // Visitas repetidas: arranca directamente con el último contenido real conocido.
    initialData: cached?.data,
    initialDataUpdatedAt: cached?.updatedAt,
  })

  // Cada vez que llega contenido fresco del bucket, lo guardamos para la próxima visita.
  useEffect(() => {
    if (query.data && query.data !== fallbackContent) {
      writeCachedContent(query.data)
    }
  }, [query.data])

  return query
}
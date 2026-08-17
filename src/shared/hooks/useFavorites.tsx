/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

interface FavoritesContextValue {
  favoriteIds: string[]
  toggleFavorite: (productId: string) => void
  isFavorite: (productId: string) => boolean
  syncFavorites: (activeIds: string[]) => void
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)
const FAVORITES_STORAGE_KEY = 'dalu-favorites'

function getStoredFavorites(): string[] {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!savedFavorites) return []

    const parsedFavorites: unknown = JSON.parse(savedFavorites)
    return Array.isArray(parsedFavorites) && parsedFavorites.every((id) => typeof id === 'string')
      ? parsedFavorites
      : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(getStoredFavorites)

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  function toggleFavorite(productId: string) {
    setFavoriteIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  function isFavorite(productId: string) {
    return favoriteIds.includes(productId)
  }

  const syncFavorites = useCallback((activeIds: string[]) => {
    const activeSet = new Set(activeIds)
    setFavoriteIds((prev) => {
      const next = prev.filter((id) => activeSet.has(id))
      return next.length === prev.length ? prev : next
    })
  }, [])

  return (
    <FavoritesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite, syncFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites debe usarse dentro de FavoritesProvider')
  return ctx
}

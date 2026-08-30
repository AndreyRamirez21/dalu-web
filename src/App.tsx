import { useEffect, useState } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { router } from '@/app/router'
import { CartProvider } from '@/shared/hooks/useCart'
import { FavoritesProvider } from '@/shared/hooks/useFavorites'
import { ToastProvider } from '@/shared/hooks/useToast'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { LogoPreloader } from '@/shared/ui/components/LogoPreloader'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [appReady, setAppReady] = useState(false)

  useEffect(() => {
    const onLoad = () => setAppReady(true)

    if (document.readyState === 'complete') {
      setAppReady(true)
    } else {
      window.addEventListener('load', onLoad)
      return () => window.removeEventListener('load', onLoad)
    }
  }, [])

  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <LogoPreloader isLoading={!appReady} colorClassName="text-[#82BBBD]" />
        <QueryProvider>
          <CartProvider>
            <FavoritesProvider>
              <ToastProvider>
                <RouterProvider router={router} />
              </ToastProvider>
            </FavoritesProvider>
          </CartProvider>
        </QueryProvider>
      </LazyMotion>
      <SpeedInsights />
      <Analytics />
    </HelmetProvider>
  )
}

export default App
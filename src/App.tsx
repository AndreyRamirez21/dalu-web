import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import { CartProvider } from '@/shared/hooks/useCart'
import { FavoritesProvider } from '@/shared/hooks/useFavorites'
import { ToastProvider } from '@/shared/hooks/useToast'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <HelmetProvider>
      <QueryProvider>
        <CartProvider>
          <FavoritesProvider>
            <ToastProvider>
              <RouterProvider router={router} />
            </ToastProvider>
          </FavoritesProvider>
        </CartProvider>
      </QueryProvider>
     <SpeedInsights />
    <Analytics />
   </HelmetProvider>
  )
}

export default App

import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import { CartProvider } from '@/shared/hooks/useCart'
import { FavoritesProvider } from '@/shared/hooks/useFavorites'
import { ToastProvider } from '@/shared/hooks/useToast'
import { QueryProvider } from '@/app/providers/QueryProvider'

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
    </HelmetProvider>
  )
}

export default App

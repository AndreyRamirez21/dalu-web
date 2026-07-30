import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'
import { CartProvider } from '@/shared/hooks/useCart'
import { FavoritesProvider } from '@/shared/hooks/useFavorites'
import { ToastProvider } from '@/shared/hooks/useToast'

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </FavoritesProvider>
    </CartProvider>
  )
}

export default App
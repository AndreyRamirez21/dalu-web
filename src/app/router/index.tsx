/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/app/layouts/RootLayout'
import { Loader } from '@/shared/ui/components/Loader'
import { ErrorBoundary } from '@/shared/ui/components/ErrorBoundary'

const HomePage = lazy(() => import('@/features/home/HomePage').then((m) => ({ default: m.HomePage })))
const CatalogPage = lazy(() => import('@/features/catalog/CatalogPage').then((m) => ({ default: m.CatalogPage })))
const ProductPage = lazy(() => import('@/features/product/ProductPage').then((m) => ({ default: m.ProductPage })))
const CartPage = lazy(() => import('@/features/cart/CartPage').then((m) => ({ default: m.CartPage })))
const AboutPage = lazy(() => import('@/features/about/AboutPage').then((m) => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('@/features/contact/ContactPage').then((m) => ({ default: m.ContactPage })))
const FavoritesPage = lazy(() => import('@/features/favorites/FavoritesPage').then((m) => ({ default: m.FavoritesPage })))
const LegalPage = lazy(() => import('@/features/legal/LegalPage').then((m) => ({ default: m.LegalPage })))
const LocationPage = lazy(() => import('@/features/location/LocationPage').then((m) => ({ default: m.LocationPage })))

function withSuspense(element: React.ReactNode) {
  return <Suspense fallback={<Loader />}>{element}</Suspense>
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: withSuspense(<HomePage />) },
      { path: 'producto/:slug', element: withSuspense(<ProductPage />) },
      { path: 'carrito', element: withSuspense(<CartPage />) },
      { path: 'nosotros', element: withSuspense(<AboutPage />) },
      { path: 'contacto', element: withSuspense(<ContactPage />) },
      { path: 'favoritos', element: withSuspense(<FavoritesPage />) },
      { path: 'ubicacion', element: withSuspense(<LocationPage />) },
      { path: 'envios', element: withSuspense(<LegalPage />) },
      { path: 'cambios', element: withSuspense(<LegalPage />) },
      { path: 'terminos', element: withSuspense(<LegalPage />) },
      { path: 'tallas', element: withSuspense(<LegalPage />) },
      { path: 'pagos', element: withSuspense(<LegalPage />) },
      { path: 'faq', element: withSuspense(<LegalPage />) },
      { path: 'coleccion/:collectionSlug', element: withSuspense(<CatalogPage />) },
      { path: ':categorySlug', element: withSuspense(<CatalogPage />) },
    ],
  },
])

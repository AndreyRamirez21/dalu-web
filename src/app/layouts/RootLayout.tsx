import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { Navbar } from '@/shared/ui/components/Navbar'
import { Footer } from '@/shared/ui/components/Footer'
import { WhatsAppFloatingButton } from '@/shared/ui/components/WhatsAppFloatingButton'
import { CartDrawer } from '@/shared/ui/components/CartDrawer'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

export function RootLayout() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-background flex flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFloatingButton />
        <CartDrawer />
      </div>
    </LazyMotion>
  )
}
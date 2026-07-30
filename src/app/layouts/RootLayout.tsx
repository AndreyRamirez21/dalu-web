import { Outlet } from 'react-router-dom'
import { Navbar } from '@/shared/ui/components/Navbar'
import { Footer } from '@/shared/ui/components/Footer'

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
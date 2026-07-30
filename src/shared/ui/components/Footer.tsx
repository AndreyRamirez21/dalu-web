import { Link } from 'react-router-dom'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

function WhatsappIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2zm5.8 14.16c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11a16.6 16.6 0 0 1-1.66-.61c-2.92-1.26-4.83-4.2-4.98-4.4-.15-.2-1.19-1.58-1.19-3.02 0-1.43.75-2.14 1.02-2.43.26-.29.58-.36.77-.36.19 0 .39 0 .55.01.18.01.42-.07.65.5.24.58.82 2.01.89 2.15.07.15.12.32.02.52-.1.2-.15.32-.29.5-.15.17-.31.39-.44.52-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.47.13.64-.08.17-.2.71-.83.9-1.11.19-.29.38-.24.63-.15.26.1 1.66.78 1.94.92.29.15.48.22.55.34.07.13.07.75-.18 1.44z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="bg-primary text-white">
        <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 px-6 py-10">
          <div>
            <p className="font-semibold">Envíos a todo Colombia</p>
            <p className="text-sm opacity-90">Rápidos, seguros y con amor.</p>
          </div>
          <div>
            <p className="font-semibold">Paga como prefieras</p>
            <p className="text-sm opacity-90">Transferencia, Nequi, Daviplata y más.</p>
          </div>
        </div>
      </div>

      <div className="bg-surface">
        <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 px-6 py-14">
          <div>
            <p className="font-display text-2xl text-primary tracking-widest mb-3">DALÚ</p>
            <p className="text-sm text-text-secondary">
              Buescamos cada pieza que combine comodidad, estilo y calidad para que te sientas increíble en cada momento.
            </p>
            <div className="flex gap-4 mt-4 text-text-primary">
              <a href="https://instagram.com/dalusiendotu" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Dalú" className="hover:text-primary transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://facebook.com/dalusiendotu" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Dalú" className="hover:text-primary transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://wa.me/573045507359" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp de Dalú" className="hover:text-primary transition-colors">
                <WhatsappIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4 text-text-primary">Información</p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/nosotros" className="hover:text-primary">Sobre nosotros</Link></li>
              <li><Link to="/envios" className="hover:text-primary">Políticas de envío</Link></li>
              <li><Link to="/cambios" className="hover:text-primary">Cambios y devoluciones</Link></li>
              <li><Link to="/terminos" className="hover:text-primary">Términos y condiciones</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm mb-4 text-text-primary">Ayuda</p>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link to="/contacto" className="hover:text-primary">Contacto</Link></li>
              <li><Link to="/tallas" className="hover:text-primary">Guía de tallas</Link></li>
              <li><Link to="/pagos" className="hover:text-primary">Métodos de pago</Link></li>
              <li><Link to="/faq" className="hover:text-primary">Preguntas frecuentes</Link></li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border text-center text-xs text-text-secondary py-5">
          © 2026 Dalú. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
import { Helmet } from 'react-helmet-async'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Accordion } from '@/shared/ui/components/Accordion'
import { WHATSAPP_URL } from '@/shared/constants/contact'

export function ContactPage() {
  return (
    <div className="max-w-8xl mx-auto px-6 py-16">
      <Helmet>
        <title>Contacto | Dalú</title>
        <meta name="description" content="Comunícate con Dalú por WhatsApp, correo o teléfono. Estamos aquí para ayudarte." />
      </Helmet>
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl text-text-primary">Contáctanos</h1>
        <p className="text-text-secondary mt-3 max-w-md mx-auto">
          ¿Tienes alguna pregunta? Estamos aquí para ayudarte con gusto.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 mb-16">
          <div className="flex items-start gap-4 bg-surface rounded-2xl p-5 shadow-sm">
            <MessageCircle size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-text-primary text-sm">WhatsApp</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-primary">
                Escríbenos directamente por WhatsApp
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-surface rounded-2xl p-5 shadow-sm">
            <Mail size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-text-primary text-sm">Correo electrónico</p>
              <a href="mailto:hola@dalu.com" className="text-sm text-text-secondary hover:text-primary">
                dlsiendotu@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-surface rounded-2xl p-5 shadow-sm">
            <Phone size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-text-primary text-sm">Teléfono</p>
              <p className="text-sm text-text-secondary">+57 304 550 7359</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-surface rounded-2xl p-5 shadow-sm">
            <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-text-primary text-sm">Ubicación</p>
              <p className="text-sm text-text-secondary">Colombia (Buga) — Envíos a todo el país</p>
            </div>
          </div>

      </div>

      <div className="max-w-2xl mx-auto">
        <h2 className="text-center font-display text-2xl text-text-primary mb-8">
          Preguntas frecuentes
        </h2>
        <Accordion
          items={[
            {
              icon: <MessageCircle size={16} className="text-primary" />,
              title: '¿Cuánto tarda el envío?',
              content: 'Dentro de Buga entregamos el mismo día o máximo en 24 horas hábiles. En ciudades principales tarda de 2 a 4 días hábiles y, en otras ciudades o zonas rurales, de 4 a 8 días hábiles.',
            },
            {
              icon: <MessageCircle size={16} className="text-primary" />,
              title: '¿Puedo cambiar o devolver un producto?',
              content: 'Se aceptan cambios dentro de los 3 días calendario posteriores a la compra. (Aplica solo en tallaje) *No aplica en prendas íntimas*.',
            },
            {
              icon: <MessageCircle size={16} className="text-primary" />,
              title: '¿Qué métodos de pago aceptan?',
              content: 'Aceptamos transferencia bancaria, Nequi y Daviplata. Para consultar otros medios de pago, escríbenos por WhatsApp.',
            },
            {
              icon: <MessageCircle size={16} className="text-primary" />,
              title: '¿Cómo sé qué talla elegir?',
              content: 'Cada producto cuenta con una guía de tallas detallada. Si tienes dudas, escríbenos por WhatsApp y te ayudamos a elegir.',
            },
          ]}
        />
      </div>
    </div>
  )
}
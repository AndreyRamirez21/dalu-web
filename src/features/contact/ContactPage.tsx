import { useState } from 'react'
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { Button } from '@/shared/ui/components/Button'
import { Accordion } from '@/shared/ui/components/Accordion'
import { useToast } from '@/shared/hooks/useToast'

const WHATSAPP_NUMBER = '573045507359'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const { showToast } = useToast()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    showToast('Tu mensaje fue enviado. Te responderemos pronto.')
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div className="max-w-8xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl text-text-primary">Contáctanos</h1>
        <p className="text-text-secondary mt-3 max-w-md mx-auto">
          ¿Tienes alguna pregunta? Estamos aquí para ayudarte con gusto.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Tu correo electrónico"
              required
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="¿En qué podemos ayudarte?"
              required
              rows={5}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button type="submit" size="lg" className="w-full">
              Enviar mensaje
            </Button>
          </form>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-surface rounded-2xl p-5 shadow-sm">
            <MessageCircle size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-text-primary text-sm">WhatsApp</p>
              <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener noreferrer" className="text-sm text-text-secondary hover:text-primary">
                Escríbenos directamente por WhatsApp
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-surface rounded-2xl p-5 shadow-sm">
            <Mail size={20} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-text-primary text-sm">Correo electrónico</p>
              <a href="mailto:hola@dalu.com" className="text-sm text-text-secondary hover:text-primary">
                hola@dalu.com
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
              <p className="text-sm text-text-secondary">Colombia — Envíos a todo el país</p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm h-48 bg-surface flex items-center justify-center">
            <img
              src="https://picsum.photos/seed/dalu-map/700/300"
              alt="Mapa de ejemplo"
              className="w-full h-full object-cover opacity-70"
            />
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
              content: 'Los envíos a todo Colombia tardan entre 1 y 3 días hábiles después de confirmado el pago.',
            },
            {
              icon: <MessageCircle size={16} className="text-primary" />,
              title: '¿Puedo cambiar o devolver un producto?',
              content: 'Sí, aceptamos cambios y devoluciones dentro de los primeros 15 días de compra, siempre que el producto esté sin uso y con sus etiquetas originales.',
            },
            {
              icon: <MessageCircle size={16} className="text-primary" />,
              title: '¿Qué métodos de pago aceptan?',
              content: 'Aceptamos transferencia bancaria, Nequi, Daviplata y tarjetas de crédito o débito.',
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
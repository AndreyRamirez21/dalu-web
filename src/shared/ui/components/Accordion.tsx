import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface AccordionItem {
  icon: ReactNode
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const buttonId = `accordion-button-${i}`
        const contentId = `accordion-content-${i}`

        return (
          <div key={item.title}>
            <button
              id={buttonId}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-4 text-left"
              aria-expanded={isOpen}
              aria-controls={contentId}
            >
              <span className="flex items-center gap-3 text-sm font-medium text-text-primary">
                {item.icon}
                {item.title}
              </span>
              <ChevronDown
                size={16}
                className={`text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <p id={contentId} role="region" aria-labelledby={buttonId} className="text-sm text-text-secondary pb-4 pr-6 leading-relaxed">
                {item.content}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

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
      {items.map((item, i) => (
        <div key={item.title}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-4 text-left"
          >
            <span className="flex items-center gap-3 text-sm font-medium text-text-primary">
              {item.icon}
              {item.title}
            </span>
            <ChevronDown
              size={16}
              className={`text-text-secondary transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
            />
          </button>
          {openIndex === i && (
            <p className="text-sm text-text-secondary pb-4 pr-6 leading-relaxed">
              {item.content}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
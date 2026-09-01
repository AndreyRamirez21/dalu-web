import type { Category } from '@/shared/types/product'
import { Shirt, Footprints, Moon, Flower2 } from 'lucide-react'

export const categories: Category[] = [
  {
    id: '1',
    slug: 'pijamas',
    name: 'Sleepwear',
    image: '/images/products/Pij8.webp',
    description: 'Pijamas cómodas para dormir y soñar.',
    icon: Shirt,
  },
  {
    id: '2',
    slug: 'pantuflas',
    name: 'Slippers',
    image: '/images/products/Pan1.webp',
    description: 'Comodidad que te acompaña en casa.',
    icon: Footprints,
  },
  {
    id: '3',
    slug: 'antifaces',
    name: 'Antifaces',
    image: '/images/products/Anti1.webp',
    description: 'Duerme mejor, donde sea que estés.',
    icon: Moon,
  },
  {
    id: '4',
    slug: 'accesorios',
    name: 'Accesorios',
    image: '/images/products/Acc1.webp',
    description: 'Detalles que hacen tu rutina nocturna aún mejor.',
    icon: Flower2,
  },
]
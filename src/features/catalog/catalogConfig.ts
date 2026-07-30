export interface CatalogConfig {
  title: string
  description: string
  categories: string[]
}

export const catalogConfigBySlug: Record<string, CatalogConfig> = {
  pijamas: {
    title: 'Pijamas',
    description:
      'Descubre nuestra colección de pijamas diseñadas para que te sientas cómoda, linda y segura en cada momento.',
    categories: ['pijamas-short', 'pijamas-pantalon'],
  },
  pantuflas: {
    title: 'Pantuflas',
    description: 'Suavidad y calidez para tus pies en cada paso, dentro y fuera de casa.',
    categories: ['pantuflas'],
  },
  antifaces: {
    title: 'Antifaces',
    description: 'Descansa mejor con nuestros antifaces suaves y elegantes.',
    categories: ['antifaces'],
  },
  accesorios: {
    title: 'Accesorios',
    description: 'Los detalles que completan tu rutina de descanso.',
    categories: ['accesorios'],
  },
}
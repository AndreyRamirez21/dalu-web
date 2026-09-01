import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Category } from '@/shared/types/product'
import { categories as localCategories } from '@/data/categories'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  // Respaldo: si la categoría viene de homeContent (Supabase) y no trae
  // icon/description (porque esos campos solo existen en el archivo local),
  // los completamos aquí por slug para que nunca falten.
  const localMatch = localCategories.find((c) => c.slug === category.slug)
  const Icon = typeof category.icon === 'function' ? category.icon : localMatch?.icon
  const description = category.description ?? localMatch?.description

  return (
    <Link
      to={`/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="relative">
        <div className="overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            width={640}
            height={800}
            loading="lazy"
            decoding="async"
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        {Icon && (
          <span className="absolute left-1/2 bottom-0 z-10 flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors duration-300 group-hover:border-primary-strong group-hover:bg-primary-strong">
            <Icon
              size={22}
              strokeWidth={1.5}
              className="text-primary-strong transition-colors duration-300 group-hover:text-white"
            />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-9 text-center">
        <p className="font-display text-xl text-text-primary md:text-2xl">
          {category.name}
        </p>
        {description && (
          <p className="mt-1.5 text-sm text-text-secondary leading-snug line-clamp-2">
            {description}
          </p>
        )}
        <span className="mt-auto inline-flex items-center justify-center gap-1.5 pt-4 text-xs font-semibold uppercase tracking-wide text-text-primary underline decoration-1 underline-offset-4 transition-colors group-hover:text-primary-strong">
          Ver todo
          <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
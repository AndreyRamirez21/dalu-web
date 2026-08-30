import { Link } from 'react-router-dom'
import type { Category } from '@/shared/types/product'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      to={`/${category.slug}`}
      className="group relative block overflow-hidden"
    >
      <img
        src={category.image}
        alt={category.name}
        width={640}
        height={800}
        loading="lazy"
        decoding="async"
        className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Gradiente solo en la franja inferior, para que el texto sea legible
          sin oscurecer toda la foto */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
        <p className="font-display text-xl md:text-2xl text-white leading-tight">
          {category.name}
        </p>
        <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-white/85 mt-1 group-hover:text-white group-hover:underline">
          Ver todo
        </span>
      </div>
    </Link>
  )
}
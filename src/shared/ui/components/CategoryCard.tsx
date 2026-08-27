import { Link } from 'react-router-dom'
import type { Category } from '@/shared/types/product'

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link to={`/${category.slug}`} className="group text-center block">
      <div className="rounded-2xl overflow-hidden bg-surface shadow-sm">
        <img
          src={category.image}
          alt={category.name}
          width={640}
          height={800}
          loading="lazy"
          decoding="async"
          className="w-full aspect-[4/5] object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="mt-3 text-sm font-semibold text-text-primary">{category.name}</p>
      <span className="text-xs text-primary hover:underline">VER TODO</span>
    </Link>
  )
}

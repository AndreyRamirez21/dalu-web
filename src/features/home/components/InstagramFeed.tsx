import { motion, useReducedMotion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getInstagramPosts } from '@/services/instagram'
import { INSTAGRAM_URL } from '@/shared/constants/contact'

export function InstagramFeed() {
  const reduceMotion = useReducedMotion()
  const { data: posts = [], isPending } = useQuery({
    queryKey: ['instagram-posts'],
    queryFn: getInstagramPosts,
    staleTime: 60 * 60 * 1000,
    retry: 1,
  })

  if (!isPending && posts.length === 0) return null

  return (
    <section className="max-w-8xl mx-auto px-6 py-12">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
        className="text-center mb-8"
      >
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary mb-2">La comunidad Dalú</p>
        <h2 className="font-display text-2xl text-text-primary">Descubre más en @dalusiendotu</h2>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline mt-3">
          <Camera size={17} />
          Seguir en Instagram
        </a>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 rounded-2xl overflow-hidden">
        {isPending
          ? Array.from({ length: 6 }, (_, index) => <div key={index} className="aspect-square bg-primary-light animate-pulse" />)
          : posts.map((post, index) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={post.caption ? `Abrir publicación: ${post.caption}` : 'Abrir publicación de Instagram'}
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
                className="group relative aspect-square overflow-hidden bg-primary-light"
              >
                <img src={post.imageUrl} alt={post.caption || 'Publicación de Instagram de Dalú'} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-black/35 group-hover:opacity-100">
                  <Camera size={24} />
                </span>
              </motion.a>
            ))}
      </div>
    </section>
  )
}

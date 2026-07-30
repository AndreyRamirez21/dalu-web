import type { Product } from '@/shared/types/product'

export const products: Product[] = [
{
  id: '1', slug: 'mint-love', name: 'Mint Love', price: 95000,
  category: 'pijamas-short', colors: ['#82BBBD', '#F4A6B7', '#D9C6EA'],
  sizes: ['S', 'M', 'L', 'XL'],
  images: [
    '/images/products/Pij1.jpeg',
    '/images/products/Pij2.jpeg',
    '/images/products/Pij3.jpeg',
  ],
  rating: 4.5, reviewCount: 12, featured: true,
},
  {
    id: '2', slug: 'pink-hearts', name: 'Pink Hearts', price: 95000,
    category: 'pijamas-short', colors: ['#F4A6B7', '#D9C6EA', '#82BBBD'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Pij12.jpg',
    '/images/products/Pij5.jpeg',
    '/images/products/Pij6.jpeg',
    ],
    rating: 4.2, reviewCount: 8, featured: true,
  },
  {
    id: '3', slug: 'sweet-dreams', name: 'Sweet Dreams', price: 98000,
    category: 'pijamas-short', colors: ['#EAD9BF', '#F4A6B7', '#82BBBD'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Pij7.jpeg',
    '/images/products/Pij8.jpeg',
    '/images/products/Pij9.jpeg',
    ],
    rating: 4.8, reviewCount: 15, featured: true,
  },
  {
    id: '4', slug: 'pantuflas-soft-mint', name: 'Pantuflas Soft Mint', price: 75000,
    category: 'pantuflas', colors: ['#82BBBD'], sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Pan2.jpg',

    ],
    rating: 4.3, reviewCount: 10, featured: true,
  },
  {
    id: '5', slug: 'lavender-soft', name: 'Lavender Soft', price: 95000,
    category: 'pijamas-short', colors: ['#D9C6EA', '#82BBBD'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Pij3.jpeg',
    '/images/products/Pij5.jpeg',
    '/images/products/Pij6.jpeg',
    ],
    rating: 4.4, reviewCount: 9,
  },
  {
    id: '6', slug: 'sky-mood', name: 'Sky Mood', price: 95000,
    category: 'pijamas-short', colors: ['#A9C9E8', '#82BBBD', '#D9C6EA'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Pij11.jpeg',
    '/images/products/Pij2.jpeg',
    '/images/products/Pij11.jpeg',
    ],
    rating: 4.1, reviewCount: 6,
  },
  {
    id: '7', slug: 'classic-dots', name: 'Classic Dots', price: 92000,
    category: 'pijamas-short', colors: ['#EAD9BF', '#111111', '#F4A6B7'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Pij9.jpeg',
    '/images/products/Pij8.jpeg',
    '/images/products/Pij10.jpeg',
    ],
    rating: 4.6, reviewCount: 11,
  },
  {
    id: '8', slug: 'night-romance', name: 'Night Romance', price: 98000,
    category: 'pijamas-short', colors: ['#111111', '#F4A6B7', '#D9C6EA'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Pij6.jpeg',
    '/images/products/Pij4.jpeg',
    '/images/products/Pij11.jpeg',
    ],
    rating: 4.7, reviewCount: 14,
  },
  {
    id: '9', slug: 'blush-love', name: 'Blush Love', price: 95000,
    category: 'pijamas-short', colors: ['#F4A6B7', '#EAD9BF', '#82BBBD'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Pij8.jpeg',
    '/images/products/Pij4.jpeg',
    '/images/products/Pij5.jpeg',
    ],
    rating: 4.3, reviewCount: 7,
  },

  {
    id: '10', slug: 'Pantufla', name: 'Pantufla', price: 60000,
    category: 'pantuflas', colors: ['#F4A6B7', '#EAD9BF', '#82BBBD'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Pan1.jpg',
    ],
    rating: 4.3, reviewCount: 7,

  },

  {
    id: '10', slug: 'Antifaz soft', name: 'Antifaz', price: 60000,
    category: 'antifaces', colors: ['#F4A6B7', '#EAD9BF', '#82BBBD'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Anti1.jpeg',
    ],
    rating: 4.3, reviewCount: 7,

  },
  {
    id: '11', slug: 'Gorro', name: 'Gorro', price: 60000,
    category: 'accesorios', colors: ['#F4A6B7', '#EAD9BF', '#82BBBD'],
    sizes: ['S', 'M', 'L', 'XL'],
    images: [
    '/images/products/Acc1.jpg',
    ],
    rating: 4.3, reviewCount: 7,

  },


]

export const getFeaturedProducts = () => products.filter((p) => p.featured)
export const getProductsByCategories = (categories: string[]) =>
  products.filter((p) => categories.includes(p.category))
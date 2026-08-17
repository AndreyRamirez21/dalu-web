import { readFile, writeFile } from 'node:fs/promises'

const siteUrl = (process.env.SITE_URL || 'https://dalu-web-alpha.vercel.app').replace(/\/$/, '')
const staticRoutes = [
  ['/', '1.0'],
  ['/pijamas', '0.8'],
  ['/pantuflas', '0.8'],
  ['/antifaces', '0.8'],
  ['/accesorios', '0.8'],
  ['/nosotros', '0.6'],
  ['/contacto', '0.6'],
  ['/envios', '0.5'],
  ['/cambios', '0.5'],
  ['/terminos', '0.5'],
  ['/tallas', '0.5'],
  ['/pagos', '0.5'],
  ['/faq', '0.5'],
]

function escapeXml(value) {
  return value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character])
}

async function loadEnvFile() {
  try {
    const envFile = await readFile('.env', 'utf8')
    for (const line of envFile.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '')
    }
  } catch {
    // Las variables pueden venir directamente del entorno de despliegue.
  }
}

async function getProductSlugs() {
  const url = process.env.VITE_SUPABASE_URL
  const key = process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.warn('Sitemap: no se encontraron credenciales de Supabase; se generaron solo las rutas estáticas.')
    return []
  }

  const response = await fetch(`${url}/rest/v1/productos_web?select=slug&activo=eq.true`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  })
  if (!response.ok) throw new Error(`Sitemap: Supabase respondió ${response.status}.`)

  const products = await response.json()
  return products
    .map((product) => product.slug)
    .filter((slug) => typeof slug === 'string' && slug.length > 0)
}

await loadEnvFile()
let productSlugs = []
try {
  productSlugs = await getProductSlugs()
} catch (error) {
  console.warn(`Sitemap: no se pudieron cargar productos; se generaron solo las rutas estáticas. ${error.message}`)
}
const urls = [
  ...staticRoutes.map(([path, priority]) => `  <url><loc>${siteUrl}${path}</loc><priority>${priority}</priority></url>`),
  ...productSlugs.map((slug) => `  <url><loc>${siteUrl}/producto/${escapeXml(slug)}</loc><priority>0.7</priority></url>`),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
await writeFile('public/sitemap.xml', sitemap)
console.log(`Sitemap generado con ${staticRoutes.length} rutas estáticas y ${productSlugs.length} productos.`)

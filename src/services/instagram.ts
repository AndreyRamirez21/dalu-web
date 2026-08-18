export interface InstagramPost {
  id: string
  imageUrl: string
  permalink: string
  caption: string
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const response = await fetch('/api/instagram')
  if (!response.ok) throw new Error('No se pudo cargar Instagram.')

  const payload: unknown = await response.json()
  if (!payload || typeof payload !== 'object' || !Array.isArray((payload as { data?: unknown }).data)) return []

  return (payload as { data: InstagramPost[] }).data
}

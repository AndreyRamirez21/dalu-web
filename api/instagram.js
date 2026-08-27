const GRAPH_API_VERSION = process.env.INSTAGRAM_GRAPH_API_VERSION || 'v25.0'
const CACHE_CONTROL = 'public, s-maxage=3600, stale-while-revalidate=86400'

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET')
    return response.status(405).json({ error: 'Método no permitido.' })
  }

  const accountId = process.env.INSTAGRAM_ACCOUNT_ID
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN

  if (!accountId || !accessToken) {
    return response.status(503).json({ error: 'El feed de Instagram no está configurado.' })
  }

  const params = new URLSearchParams({
    fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
    limit: '6',
    access_token: accessToken,
  })

  try {
    const instagramResponse = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${encodeURIComponent(accountId)}/media?${params}`
    )

    if (!instagramResponse.ok) {
      return response.status(502).json({ error: 'No se pudo obtener el feed de Instagram.' })
    }

    const payload = await instagramResponse.json()
    const media = Array.isArray(payload.data) ? payload.data : []
    const posts = media
      .map((item) => ({
        id: item.id,
        imageUrl: item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url,
        permalink: item.permalink,
        caption: typeof item.caption === 'string' ? item.caption : '',
      }))
      .filter((item) => item.id && item.imageUrl && item.permalink)
      .slice(0, 6)

    response.setHeader('Cache-Control', CACHE_CONTROL)
    return response.status(200).json({ data: posts })
  } catch {
    return response.status(502).json({ error: 'No se pudo obtener el feed de Instagram.' })
  }
}

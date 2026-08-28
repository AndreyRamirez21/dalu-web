import { createClient } from '@supabase/supabase-js'

export default async function handler(request, response) {
  // Solo Vercel Cron (o tú manualmente con el secret) puede llamar esto
  const authHeader = request.headers.authorization
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return response.status(401).json({ error: 'No autorizado.' })
  }

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )

  // 1. Lee el token actual
  const { data: row, error: fetchError } = await supabase
    .from('instagram_token')
    .select('access_token, expires_at')
    .eq('id', 1)
    .single()

  if (fetchError || !row) {
    return response.status(500).json({ error: 'No se encontró el token en Supabase.', details: fetchError })
  }

  // 2. Solo renueva si faltan 15 días o menos
  const daysUntilExpiry = (new Date(row.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)

  if (daysUntilExpiry > 15) {
    return response.status(200).json({
      skipped: true,
      message: `Aún faltan ${Math.round(daysUntilExpiry)} días, no se renueva todavía.`,
    })
  }

  // 3. Llama a Meta para renovar
  try {
    const refreshUrl = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${row.access_token}`
    const metaResponse = await fetch(refreshUrl)
    const metaData = await metaResponse.json()

    if (!metaData.access_token) {
      return response.status(502).json({ error: 'Falló la renovación en Meta.', details: metaData })
    }

    // 4. Guarda el nuevo token
    const expiresAt = new Date(Date.now() + metaData.expires_in * 1000)

    const { error: updateError } = await supabase
      .from('instagram_token')
      .update({
        access_token: metaData.access_token,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', 1)

    if (updateError) {
      return response.status(500).json({ error: 'Token renovado pero falló al guardar.', details: updateError })
    }

    return response.status(200).json({
      success: true,
      message: 'Token renovado correctamente.',
      expires_at: expiresAt.toISOString(),
    })
  } catch {
    return response.status(502).json({ error: 'No se pudo contactar a Meta para renovar.' })
  }
}
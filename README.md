# Dalú Web

Tienda web de Dalú para explorar pijamas, pantuflas, antifaces y accesorios, guardar favoritos y solicitar pedidos por WhatsApp.

## Requisitos

- Node.js 20 o superior
- Un proyecto de Supabase con la tabla o vista `productos_web` y su relación `variantes_web`

## Configuración local

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Copia `.env.example` como `.env` y completa sus valores:

   ```bash
   Copy-Item .env.example .env
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `VITE_SUPABASE_URL` | URL del proyecto Supabase usada por el cliente web. |
| `VITE_SUPABASE_ANON_KEY` | Clave pública anónima de Supabase. Nunca uses una service-role key. |
| `SITE_URL` | Dominio público, sin ruta final, usado al generar `public/sitemap.xml`. |
| `INSTAGRAM_ACCOUNT_ID` | ID de la cuenta profesional de Instagram. Solo se usa en el servidor. |
| `INSTAGRAM_ACCESS_TOKEN` | Token de Meta para leer las publicaciones de Instagram. Solo servidor; nunca uses el prefijo `VITE_`. |

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Vite en desarrollo. |
| `npm run build` | Genera el sitemap y compila la aplicación para producción. |
| `npm run lint` | Ejecuta ESLint. |
| `npm run preview` | Sirve la compilación de producción localmente. |

## Despliegue

Configura las tres variables de entorno en el proveedor de despliegue (por ejemplo, Vercel) y ejecuta `npm run build`. El build genera el sitemap con las rutas estáticas y, cuando Supabase esté disponible, una ruta por producto activo.

## Feed de Instagram

La función `api/instagram.js` consulta el API de Meta desde Vercel y expone únicamente las publicaciones que la página necesita. Su respuesta se almacena en la CDN durante una hora y puede servirse desactualizada por hasta un día mientras se actualiza, reduciendo llamadas a Meta.

Configura `INSTAGRAM_ACCOUNT_ID` e `INSTAGRAM_ACCESS_TOKEN` en Vercel para Production y Preview y realiza un nuevo despliegue. Para probar las funciones localmente, usa `vercel dev` con esas variables en tu entorno local; `npm run dev` solo sirve el frontend y no ejecuta las funciones de Vercel.

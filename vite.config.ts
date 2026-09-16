import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { sitemapRoutes } from './src/data/routes'

/**
 * Emits sitemap.xml and robots.txt into the production build.
 * The site URL comes from VITE_SITE_URL, or from Vercel's production URL
 * when the site is built on Vercel. Until a domain is configured a
 * clearly marked placeholder host is used.
 */
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'tlwc-seo-files',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        let out = html.replaceAll('%SITE_URL%', siteUrl.replace(/\/$/, ''))
        // Preload the critical latin font files so text does not reflow when fonts arrive.
        if (ctx.bundle) {
          const critical = [
            /bricolage-grotesque-latin-opsz-normal.*\.woff2$/,
            /instrument-sans-latin-wght-normal.*\.woff2$/,
            /instrument-serif-latin-400-italic.*\.woff2$/,
          ]
          const links = Object.keys(ctx.bundle)
            .filter((file) => critical.some((re) => re.test(file)))
            .map((file) => `    <link rel="preload" href="/${file}" as="font" type="font/woff2" crossorigin />`)
          if (links.length) out = out.replace('</head>', `${links.join('\n')}\n  </head>`)
        }
        return out
      },
    },
    generateBundle() {
      const base = siteUrl.replace(/\/$/, '')
      const today = new Date().toISOString().slice(0, 10)
      const urls = sitemapRoutes
        .map(
          (r) =>
            `  <url>\n    <loc>${base}${r.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`,
        )
        .join('\n')
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      const robots = `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const vercelHost = env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL
  const siteUrl =
    env.VITE_SITE_URL || (vercelHost ? `https://${vercelHost}` : 'https://your-domain.example')

  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
    define: {
      __SITE_URL__: JSON.stringify(siteUrl),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      target: 'es2022',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('/node_modules/')) return undefined
            if (/\/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react'
            if (id.includes('/node_modules/react-router/')) return 'router'
            if (/\/node_modules\/(framer-motion|motion-dom|motion-utils)\//.test(id)) return 'motion'
            return undefined
          },
        },
      },
    },
  }
})

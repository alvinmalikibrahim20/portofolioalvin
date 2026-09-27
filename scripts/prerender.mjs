import { readFile, writeFile, mkdir, rm } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { render } from '../dist-ssr/entry-server.js'
import { projects } from '../src/data/projects.js'
import { metadata } from '../src/seo.js'
import { siteConfig } from '../src/site.config.js'

const output = resolve('dist')
const template = await readFile(join(output, 'index.html'), 'utf8')
if (!template.includes('<div id="app"></div>')) throw new Error('Missing app placeholder')
const routes = ['/', ...projects.map(({ slug }) => '/work/' + slug + '/')]
const page = (path, contents) => template
  .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, () => metadata(path))
  .replace('<div id="app"></div>', () => '<div id="app" data-prerendered="true">' + contents + '</div>')
// Render sequentially: each route gets a fresh Vue application.
for (const route of [...routes, '/404/']) {
  const contents = await render(route)
  const destination = route === '/404/' ? output : resolve(output, '.' + route)
  await mkdir(destination, { recursive: true })
  await writeFile(join(destination, route === '/404/' ? '404.html' : 'index.html'), page(route, contents))
}
await writeFile(join(output, 'sitemap.xml'), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + routes.map(route => '<url><loc>' + siteConfig.origin + route + '</loc></url>').join('') + '</urlset>\n')
await writeFile(join(output, 'robots.txt'), 'User-agent: *\nAllow: /\nSitemap: ' + siteConfig.origin + '/sitemap.xml\n')
// Keep the original source CV, but do not publish its extra personal details.
await rm(join(output, 'cv', 'alvin-malik-ibrahim-cv.pdf'), { force: true })
console.log('Prerendered ' + routes.length + ' routes plus 404; sitemap and robots ready.')

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve('dist')
const routes = ['/', '/work/tunas-auction/', '/work/finance-operations/', '/work/racer-robot/']
const htmlFor = (route) => readFile(resolve(root, '.' + route, 'index.html'), 'utf8')

test('unknown pages have a dedicated noindex document and a route home', async () => {
  const html = await readFile(resolve(root, '404.html'), 'utf8')
  assert.match(html, /<h1[^>]*>Page not found<\/h1>/)
  assert.match(html, /name="robots" content="noindex,follow"/)
  assert.doesNotMatch(html, /rel="canonical"/)
  assert.match(html, /href="\/"/)
})

test('public CV and social preview exist, and the legacy private-detail CV is not published', async () => {
  await access(resolve(root, 'cv/Alvin-Malik-Ibrahim-Fullstack-Developer-CV.pdf'))
  await access(resolve(root, 'images/og-portfolio.png'))
  await assert.rejects(access(resolve(root, 'cv/alvin-malik-ibrahim-cv.pdf')))
})

test('visitors receive readable home content before JavaScript executes', async () => {
  const html = await htmlFor('/')
  assert.equal((html.match(/<h1\b/g) || []).length, 1, 'one visible primary heading')
  assert.ok((html.match(/<h2\b/g) || []).length >= 6, 'semantic section headings')
  assert.match(html, /href="https:\/\/wa\.me\/6289630523408/)
  assert.match(html, /href="\/work\/tunas-auction\/"/)
  assert.match(html, /<details\b/, 'navigation can open without JavaScript')
})

test('each shareable case study has unique content and a canonical matching its route', async () => {
  const titles = new Set()
  for (const route of routes) {
    const html = await htmlFor(route)
    assert.equal((html.match(/<h1\b/g) || []).length, 1, route)
    assert.ok(html.includes(`rel="canonical" href="https://alvinmalik.my.id${route}"`), route)
    titles.add(html.match(/<title>(.*?)<\/title>/s)?.[1])
    const graph = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])
    assert.ok(graph['@graph'].some((entry) => entry['@type'] === 'Person'))
    if (route !== '/') {
      for (const label of ['Problem', 'Solution', 'My role', 'Technical challenge', 'Result']) {
        assert.ok(html.includes(label), `${route}: ${label}`)
      }
    }
  }
  assert.equal(titles.size, routes.length)
})

test('crawler files describe only generated routes', async () => {
  const sitemap = await readFile(resolve(root, 'sitemap.xml'), 'utf8')
  const robots = await readFile(resolve(root, 'robots.txt'), 'utf8')
  assert.match(robots, /Sitemap: https:\/\/alvinmalik.my.id\/sitemap.xml/)
  assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length)
  for (const route of routes) assert.ok(sitemap.includes(`https://alvinmalik.my.id${route}`))
})

test('internal links and media resolve; pictures reserve layout space', async () => {
  for (const route of routes) {
    const html = await htmlFor(route)
    for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
      const path = match[1]
      await access(resolve(root, '.' + path, path.endsWith('/') ? 'index.html' : ''))
    }
    for (const img of html.matchAll(/<img\b[^>]*>/g)) {
      assert.match(img[0], /\bwidth="\d+"/)
      assert.match(img[0], /\bheight="\d+"/)
    }
    for (const anchor of html.matchAll(/href="(\/[^"#]*)?#([^"]+)"/g)) {
      const target = await htmlFor(anchor[1] || route)
      assert.ok(target.includes(`id="${anchor[2]}"`), `broken anchor ${anchor[0]}`)
    }
  }
})

test('published content contains no sample endorsements or invented proof placeholders', async () => {
  for (const route of routes) {
    const html = await htmlFor(route)
    assert.doesNotMatch(html, /\[Placeholder|\[Nama pemberi|\[Jabatan|2 slots|200\+ teachers|zero double-count incidents/i)
  }
})

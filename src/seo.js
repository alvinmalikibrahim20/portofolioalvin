import { profile, siteConfig } from './site.config.js'
import { findProject } from './data/projects.js'

export const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])

export function metadata(path) {
  const project = findProject(path)
  const missing = path !== '/' && !project
  const title = missing ? 'Page not found — Alvin Malik Ibrahim' : project
    ? project.title + ' — Alvin Malik Ibrahim'
    : 'Alvin Malik Ibrahim — Full-stack Developer'
  const description = project?.summary || 'Full-stack Developer in Indonesia working with Laravel, Vue, Nuxt and Flutter. Explore selected web, mobile and finance systems, and discuss your next project.'
  const url = siteConfig.origin + path
  const image = siteConfig.origin + '/images/og-portfolio.png'
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Person', '@id': siteConfig.origin + '/#person', name: profile.name, jobTitle: profile.role,
        url: siteConfig.origin + '/', image: siteConfig.origin + '/images/alvin.webp',
        sameAs: [profile.linkedin, profile.github],
        knowsAbout: ['Laravel', 'PHP', 'Vue.js', 'Nuxt', 'Flutter', 'REST API', 'MySQL', 'WordPress'] },
      { '@type': 'WebSite', '@id': siteConfig.origin + '/#website', url: siteConfig.origin + '/', name: profile.name },
      { '@type': project ? 'WebPage' : 'ProfilePage', '@id': url, url, name: title, description,
        isPartOf: { '@id': siteConfig.origin + '/#website' }, about: { '@id': siteConfig.origin + '/#person' } },
    ],
  }
  return [
    '<title>' + escapeHtml(title) + '</title>',
    '<meta name="description" content="' + escapeHtml(description) + '" />',
    '<meta name="author" content="' + profile.name + '" />',
    missing ? '<meta name="robots" content="noindex,follow" />' : '<link rel="canonical" href="' + escapeHtml(url) + '" />',
    ...Object.entries({ 'og:type': 'website', 'og:title': title, 'og:description': description,
      'og:url': url, 'og:image': image, 'og:image:width': '1200', 'og:image:height': '630',
      'og:image:alt': 'Alvin Malik Ibrahim — Full-stack Developer', 'og:site_name': profile.name })
      .map(([key, value]) => '<meta property="' + key + '" content="' + escapeHtml(value) + '" />'),
    '<meta name="twitter:card" content="summary_large_image" />',
    '<meta name="twitter:title" content="' + escapeHtml(title) + '" />',
    '<meta name="twitter:description" content="' + escapeHtml(description) + '" />',
    '<meta name="twitter:image" content="' + image + '" />',
    missing ? '' : '<script type="application/ld+json">' + JSON.stringify(graph).replace(/</g, '\\u003c') + '</script>',
  ].join('\n')
}

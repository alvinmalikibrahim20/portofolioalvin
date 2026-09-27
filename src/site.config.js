export const siteConfig = {
  origin: 'https://alvinmalik.my.id',
  copyrightYear: 2026,
  cvReady: true,
  cvPath: '/cv/Alvin-Malik-Ibrahim-Fullstack-Developer-CV.pdf',
  workExperienceReady: true,
  projectImagesReady: true,
}

export const profile = {
  name: 'Alvin Malik Ibrahim',
  role: 'Full-stack Developer',
  location: 'Indonesia · GMT+7',
  email: 'alvinmalikibrahim20@gmail.com',
  whatsapp: 'https://wa.me/6289630523408?text=' + encodeURIComponent("Hi Alvin, I found your portfolio. I'd like to discuss a project or a developer role."),
  linkedin: 'https://linkedin.com/in/alvin-malik-ibrahim',
  github: 'https://github.com/alvinmalik30',
  source: 'https://github.com/alvinmalikibrahim20/portofolioalvin',
}

// Add only real quotes with the author's permission. No sample endorsements.
export const testimonials = []
export const approvedTestimonials = () => testimonials.filter((item) =>
  item.permissionToPublish === true && [item.quote, item.name, item.role].every((value) =>
    typeof value === 'string' && value.trim() && !value.includes('[')))

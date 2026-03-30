<template>
  <section id="contact" class="py-32 relative overflow-hidden">
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-900/20 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute top-1/4 left-0 w-64 h-64 bg-purple-900/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="max-w-6xl mx-auto px-6">
      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-5">
          // contact.ts
        </div>
        <h2 class="section-title dark:text-white text-slate-900">
          Let's <span class="gradient-text">Work Together</span>
        </h2>
        <p class="dark:text-slate-400 text-slate-500 max-w-xl mx-auto">
          Have a project in mind? I'd love to hear about it. Send me a message and let's build something great.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-10">
        <div class="lg:col-span-2 space-y-6 reveal-left">
          <div>
            <h3 class="text-xl font-bold dark:text-white text-slate-900 mb-2">Get in touch</h3>
            <p class="dark:text-slate-400 text-slate-500 text-sm leading-relaxed">
              I'm currently available for freelance work and full-time opportunities. Let's talk!
            </p>
          </div>

          <div class="space-y-4">
            <a
              v-for="link in contactLinks"
              :key="link.label"
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              class="flex items-center gap-4 glass rounded-xl p-4 border dark:border-white/5 border-slate-200 dark:hover:border-indigo-500/25 hover:border-indigo-400/30 transition-all duration-300 hover:-translate-x-1 group"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                :class="link.iconBg"
              >
                <span v-html="link.icon"></span>
              </div>
              <div>
                <div class="text-xs dark:text-slate-500 text-slate-400 mb-0.5">{{ link.label }}</div>
                <div class="text-sm font-medium dark:text-slate-300 text-slate-700 dark:group-hover:text-white group-hover:text-indigo-600 transition-colors">{{ link.value }}</div>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-auto text-slate-600 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <div class="glass rounded-xl p-5 border dark:border-white/5 border-slate-200">
            <div class="flex items-center gap-2 mb-3">
              <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span class="text-sm font-medium dark:text-white text-slate-800">Currently Available</span>
            </div>
            <p class="dark:text-slate-400 text-slate-500 text-xs leading-relaxed">
              Open to freelance projects, full-time roles, and interesting collaborations.
              Response time: <span class="dark:text-white text-slate-800 font-medium">within 24 hours</span>.
            </p>
          </div>
        </div>

        <div class="lg:col-span-3 reveal-right">
          <form @submit.prevent="handleSubmit" class="glass rounded-2xl p-8 border dark:border-white/5 border-slate-200">
            <div class="grid sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-2">Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="John Doe"
                  required
                  class="w-full dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500/50 transition-all duration-300"
                />
              </div>
              <div>
                <label class="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-2">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  class="w-full dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500/50 transition-all duration-300"
                />
              </div>
            </div>

            <div class="mb-5">
              <label class="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-2">Subject</label>
              <input
                v-model="form.subject"
                type="text"
                placeholder="Project inquiry / Collaboration / Job offer"
                class="w-full dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500/50 transition-all duration-300"
              />
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium dark:text-slate-300 text-slate-700 mb-2">Message</label>
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="Tell me about your project, timeline, and budget..."
                required
                class="w-full dark:bg-white/5 bg-slate-50 border dark:border-white/10 border-slate-200 rounded-xl px-4 py-3 dark:text-white text-slate-900 dark:placeholder-slate-600 placeholder-slate-400 text-sm focus:outline-none focus:border-indigo-500/50 transition-all duration-300 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="sending || sent"
              class="w-full btn-primary text-white justify-center py-3.5 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <template v-if="sent">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Message Sent!
              </template>
              <template v-else-if="sending">
                <svg class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Sending...
              </template>
              <template v-else>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Message
              </template>
            </button>

            <p v-if="sent" class="text-center text-emerald-400 text-xs mt-3">
              Thanks! I'll get back to you within 24 hours. ✓
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const sending = ref(false)
const sent = ref(false)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const contactLinks = [
  {
    label: 'Email',
    value: 'alvinmalikibrahim20@gmail.com',
    href: 'mailto:alvinmalikibrahim20@gmail.com',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',
    iconBg: 'bg-blue-500/10 text-blue-400',
    external: false,
  },
  {
    label: 'GitHub',
    value: 'github.com/alvinmalik30',
    href: 'https://github.com/alvinmalik30',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>',
    iconBg: 'bg-slate-500/10 text-slate-400',
    external: true,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/alvin-malik-ibrahim',
    href: 'https://linkedin.com/in/alvin-malik-ibrahim',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    iconBg: 'bg-blue-600/10 text-blue-400',
    external: true,
  },
]

const handleSubmit = async () => {
  sending.value = true
  await new Promise((resolve) => setTimeout(resolve, 1500))
  sending.value = false
  sent.value = true
  setTimeout(() => {
    sent.value = false
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  }, 5000)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.1 }
  )
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach((el) => observer.observe(el))
})
</script>

# Portfolio improvement plan — 2026-09-26

## Brief and design

Implement the user's full request incrementally in the existing Vue 3/Vite site. Preserve the warm editorial design, serif/sans typography, A logo, responsive layout and subtle motion. Prioritize clarity for freelance clients and remote recruiters. Make the role, stack, work and contact action visible immediately. The supplied audit is a checklist to validate, not a source of new biographical facts or authorization to modify other accounts.

Architecture: retain existing section components. Add shared project data, reusable contact CTA, individual case study views and build-time Vue server rendering. Use normal links for page/anchor navigation, with hydration only for enhancements; retain Vite deployment to dist. No Nuxt migration, major dependency upgrade or custom client router is needed.

## Audit mapping before implementation

| Priority | Finding | Current classification | Action |
|---|---|---|---|
| Critical | Full-stack/Laravel/WordPress absent | Needs improvement | Use user-declared stack in positioning, skills and services; do not retroactively claim Laravel/WordPress in employer projects |
| Critical | Weak primary CTA | Needs improvement | Accent WhatsApp action in hero, work/services follow-ups and mobile sticky contact |
| Critical | GitHub cleanup | External recommendation | Keep legitimate profile/source links; no repository privacy changes |
| Critical | No testimonials | Not available | Remove sample quotes; accept only complete, consented data, no fabricated endorsements |
| High | Employer-first hero | Needs improvement | Name, role, core stack, portrait, credible project context; no invented experience count or availability slots |
| High | Shallow/duplicated work cards | Needs improvement | Three case studies; merge bidding into auction, grading/ERP into finance; label evidence accurately |
| High | Private screenshots, business metrics | Not available | Keep public screenshots with captions; use a clearly labeled high-level domain overview, no invented architecture or KPI |
| High | Empty HTML / project URLs | Missing | Prerender home and case pages using existing Vue server renderer; verify without JavaScript |
| High | English ATS CV | Needs inspection | Inspect existing PDF; make factual English CV if source data suffices, omit street address |
| Medium | Unranked stack / niche services | Needs improvement | Primary categories, supporting tools, practical service and engagement descriptions |
| Medium | Career/certificate presentation | Needs improvement | Selected software experience; official job title retained; relevant certification highlighted |
| Medium | PNGs / external fonts / CLS | Needs improvement | WebP derivatives, explicit dimensions, self-hosted fonts |
| Medium | Sticky navigation | Missing | Sticky accessible header, Work/Services/Experience/Skills/Contact, mobile menu |
| Medium | SEO/social preview | Partly correct | Keep canonical/Person; improve metadata, WebSite/ProfilePage, real sitemap/robots and 1200×630 OG |
| Low | Reduced motion missing | Already correct in CSS | Retain and also avoid forced JS smooth scrolling |
| Low | Hidden content on observer failure | Needs improvement | Visible by default, progressive motion enhancement with cleanup |
| Low | Heading hierarchy / contrast | Needs improvement | Semantic headings, darker muted color, readable chips, focus rings |
| Low | Dark/light / anti-gravity | Not present, not relevant | Do not add a new theme or visual gimmicks |
| Low | Blog/showcase repos/localization | Future recommendation | Need genuine content or separate application work, not invented demos |

## Ordered implementation tasks

- [x] 1. Critical: positioning, reusable CTA, services, skills, contact and navigation; preserve existing contact channels.
- [x] 2. High: shared project data, three detailed case studies, selected experience and credible copy. No team-size/backend/metrics guesses.
- [x] 3. High/medium: build-time rendered pages, metadata, sitemap, robots, social card, optimized assets and factual English CV.
- [x] 4. Low and verification: accessibility, reduced-motion and observer fallback; build/output tests; responsive browser checks; fresh review; audit result report.

## Files and contracts

- src/data/projects.js: three records with slug, title, period, problem, solution, role, challenge, result, stack, evidence; used by cards, pages and build.
- src/site.config.js: profile/contact/CV and empty testimonials; no invented pricing, slots, reply SLA or payment policies.
- src/components/*: retain section boundaries; ContactCta consumes a short label and existing WhatsApp link; accessible navigation works through native anchors/details.
- src/pages/CaseStudy.vue and src/App.vue: render known paths and honest not-found view; normal browser history through real links.
- src/entry-server.js, scripts/prerender.mjs, src/seo.js: render home and work routes, emit metadata and crawler files to dist; malformed/unknown paths never masquerade as a case study.
- tests/site.test.mjs: real rendered artifact checks for route content, internal links, metadata/canonicals, sitemap coverage, no placeholder endorsements, image dimensions and file references.
- scripts/prepare-assets.mjs: reproducible compression and social card generation; assets are committed.
- docs/portfolio-audit-results.md: resolved, not applicable and deferred items with evidence.

## Verification and review focus

Baseline: npm run build succeeds (2026-09-26); no existing test suite. New tests target static output and route behavior; no tests for copy wording or CSS implementation details.
Review focus: direct deep links/refresh; no-JS content and navigation; 320/390/768/1024/1440 px overflow and CTA occlusion; reduced motion/observer absence; accurate claims and consented testimonials; static Vercel compatibility.

## Execution record

Ruling: the user explicitly requests direct implementation with detailed requirements. Proceed with this recorded design and plan, without adding approval rounds from generic skill guidance.
Ruling: work in the existing clean checkout on a new codex branch; avoid moving the user's project into another directory. No concurrent local edits were present.
Ruling: retain Vue/Vite and add build-time rendering instead of migrating to Nuxt. This preserves deployment compatibility and minimizes dependencies; additional routes must be included in prerender generation.
Ruling: use user-declared Laravel/WordPress skills in services, not as unverified employment/project claims. No new counts, rates, slots, language-level claims, transaction guarantees or private evidence.

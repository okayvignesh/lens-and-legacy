/**
 * Lens & Legacy — single-site content.
 * Photography, film and event studio across three pillars:
 * Sports · Weddings · Special Occasions & Events.
 * Edit this file to change every word and image on the site.
 */

export const brand = {
  name: 'Lens & Legacy',
  tagline: 'Sports · Weddings · Special Occasions',
  email: 'studio@lensandlegacy.com',
  phone: '+91 90000 00000',
  locations: ['Kodagu', 'Bengaluru', 'Goa'],
}

export const nav = [
  { label: 'Sports', href: '#sports' },
  { label: 'Weddings', href: '#weddings' },
  { label: 'Occasions', href: '#occasions' },
  { label: 'Gallery', href: '#gallery' },
]

export const CTA_PRIMARY = 'Start a project'
export const CTA_WORK = 'View the gallery'

export const hero = {
  eyebrow: brand.tagline,
  headline: ['Every frame,', 'a legacy.'],
  sub: 'A photography, film and event studio for sport, weddings and every occasion in between.',
  meta: [
    { k: 'Est.', v: '2019' },
    { k: 'Based', v: 'Kodagu · Bengaluru · Goa' },
  ],
}

export type Pillar = {
  id: string
  index: string
  title: string
  eyebrow: string
  lead: string
  body: string[]
  image: string
}

export const pillars: Pillar[] = [
  {
    id: 'sports',
    index: '01',
    title: 'Sports',
    eyebrow: 'Media · Events · Digital · Sponsorships · Operations',
    lead: 'A young, purpose-driven sports media and event collective.',
    body: [
      'We cover the game end to end: photography, high-end video, drone, live streaming and real-time content.',
      'Alongside the camera, we handle sponsor activations, stage management, event logistics and the technology that connects them.',
      'We pioneered a video referral system at the Kodava Hockey Festival, and were early adopters of real-time photo delivery.',
    ],
    image: 'https://picsum.photos/seed/lens-legacy-sports-night/1400/1000',
  },
  {
    id: 'weddings',
    index: '02',
    title: 'Weddings',
    eyebrow: 'Photography · Cinema · Candid · Pre-Wedding · Celebrations',
    lead: 'We capture the feeling of a wedding, not just its schedule.',
    body: [
      'Photography, cinematic film, candid and traditional coverage, pre-wedding shoots and drone.',
      'We stay out of the way and bring back the day as it actually felt.',
      'Two people, two families, one story worth keeping.',
    ],
    image: 'https://picsum.photos/seed/lens-legacy-wedding-candid/1400/1000',
  },
  {
    id: 'occasions',
    index: '03',
    title: 'Special Occasions & Events',
    eyebrow: 'Engagements · Naming Ceremonies · Corporate · Podcasts · Institutions',
    lead: 'Creativity and energy for the moments that bring people together.',
    body: [
      'Engagements, naming ceremonies, corporate events, podcasts, schools, colleges and institutions.',
      'Photography, film, live streaming and social content, tailored to the occasion.',
      'From milestones to moments, we capture it all.',
    ],
    image: 'https://picsum.photos/seed/lens-legacy-corporate-stage/1400/1000',
  },
]

export type GalleryItem = {
  title: string
  category: string
  year: string
  image: string
}

export const gallery: GalleryItem[] = [
  { title: 'Final Whistle', category: 'Sports · Matchday', year: '2025', image: 'https://picsum.photos/seed/lg-final-whistle/1200/1500' },
  { title: 'The Tunnel', category: 'Sports · Media day', year: '2025', image: 'https://picsum.photos/seed/lg-tunnel/1600/1100' },
  { title: 'First Look', category: 'Wedding · Candid', year: '2025', image: 'https://picsum.photos/seed/lg-first-look/1200/1600' },
  { title: 'The Vow', category: 'Wedding · Ceremony', year: '2024', image: 'https://picsum.photos/seed/lg-the-vow/1600/1100' },
  { title: 'Naming Day', category: 'Special Occasion', year: '2024', image: 'https://picsum.photos/seed/lg-naming-day/1200/1400' },
  { title: 'On Stage', category: 'Corporate · Summit', year: '2024', image: 'https://picsum.photos/seed/lg-corporate-stage/1600/1000' },
  { title: 'Studio Mic', category: 'Podcast', year: '2023', image: 'https://picsum.photos/seed/lg-podcast/1200/1500' },
  { title: 'Graduation', category: 'Institution', year: '2023', image: 'https://picsum.photos/seed/lg-graduation/1600/1100' },
  { title: 'Golden Hour', category: 'Pre-Wedding', year: '2023', image: 'https://picsum.photos/seed/lg-golden-hour/1200/1600' },
]

export const stats = [
  { value: '400+', label: 'Weddings covered' },
  { value: '200+', label: 'Sports fixtures a year' },
  { value: '48h', label: 'Same-day teaser' },
  { value: '9', label: 'Cities on the call sheet' },
]

export const testimonial = {
  quote: 'They were invisible all day, and then handed us a film that made my father cry. That is the whole review.',
  name: 'Ana Ferreira',
  role: 'Bride',
  location: 'Coorg',
}

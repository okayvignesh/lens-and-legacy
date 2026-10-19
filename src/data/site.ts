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
    eyebrow: 'Sports Media · Sports Events · Digital · Sponsorships · Event Operations',
    lead:
      'A young, passionate and purpose-driven sports media and event solutions collective, redefining how sporting events are experienced, managed and remembered.',
    body: [
      'We bring together creativity, technology, media and seamless execution to deliver end-to-end solutions for sporting events, from the first whistle to the final celebration.',
      'Our expertise spans sports photography, high-end videography, drone coverage, live streaming, real-time content creation, social media management, digital marketing, branding, website and app development, technology integration, sponsor activations, stage management, event logistics and end-to-end sports event operations.',
      'Every solution is designed with one goal in mind: to amplify the sporting experience, engage audiences, strengthen sponsor visibility and create lasting digital memories.',
      'We don’t just capture sporting moments. We build digital ecosystems around sport.',
      'We pioneered the Video Referral System at the Kodava Hockey Festival, introducing technology that enhanced the match experience and brought greater transparency to community-level hockey. We were also among the early adopters of real-time photo delivery, so players, teams, fans and media could access event photographs instantly.',
      'From grassroots tournaments to large-scale sporting events, Lens & Legacy combines sport, storytelling, technology and execution to create experiences that go beyond the game.',
    ],
    image: 'https://picsum.photos/seed/lens-legacy-sports-night/1400/1000',
  },
  {
    id: 'weddings',
    index: '02',
    title: 'Weddings',
    eyebrow: 'Wedding Photography · Cinematic Films · Candid Moments · Pre-Wedding · Celebrations',
    lead:
      'A passionate, creative collective dedicated to capturing the beauty, emotions and stories that make every wedding truly unforgettable.',
    body: [
      'We believe every wedding has a story of its own, filled with love, laughter, cherished traditions, heartfelt emotions and moments shared with the people who matter most. Our approach is to capture these moments naturally and beautifully, creating memories that feel as authentic years later as they did on the day.',
      'Our expertise spans wedding photography, cinematic videography, candid photography, traditional photography, pre-wedding shoots, drone coverage, wedding films, reels and curated social media content, thoughtfully crafted to reflect the personality and essence of every couple and celebration.',
      'From the quiet moments before the ceremony to the laughter with loved ones, the rituals, the celebrations and everything in between, we focus on capturing the moments that often become the most treasured memories.',
      'We don’t simply document weddings. We tell stories of two people, two families, and a celebration that deserves to be remembered beautifully.',
    ],
    image: 'https://picsum.photos/seed/lens-legacy-wedding-candid/1400/1000',
  },
  {
    id: 'occasions',
    index: '03',
    title: 'Special Occasions & Events',
    eyebrow:
      'Engagements · Naming Ceremonies · Corporate Events · Podcasts · Schools · Colleges · Institutions & Special Occasions',
    lead: 'Creativity, storytelling and energy for the moments that bring people, communities and ideas together.',
    body: [
      'Our work spans engagements, naming ceremonies, corporate events, podcasts, school events, college events and special events, along with institutional gatherings, celebrations and experiences.',
      'From intimate family milestones to vibrant campus celebrations, corporate gatherings to engaging podcast productions, we capture the people, personalities, emotions, achievements and atmosphere that make every occasion unique.',
      'Our expertise includes photography, cinematic videography, candid coverage, traditional photography, drone visuals, live streaming, reels, social media content and creative event coverage, tailored to the character and purpose of every occasion.',
      'Whether it’s a couple beginning a new chapter, a child being welcomed into the world, a company bringing its people together, or students creating memories on campus, we capture the moments that deserve to be remembered.',
      'We don’t just cover occasions. We capture the energy, tell the story and turn moments into memories. From milestones to moments, from people to stories, we capture it all.',
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

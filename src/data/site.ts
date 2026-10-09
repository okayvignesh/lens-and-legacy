/**
 * Lens & Legacy, site content.
 * ─────────────────────────────────────────────────────────────
 * This is the ONLY file you need to edit to swap the template's
 * placeholder copy, imagery and details for the real thing.
 *
 * The studio runs three core pillars:
 *   01 SPORTS, media, events, digital, sponsorships, operations
 *   02 WEDDINGS, photography, films, candid, pre-wedding, celebrations
 *   03 SPECIAL OCCASIONS, engagements, naming, corporate, podcasts, schools,
 *                          colleges, institutions & special occasions
 */

export const brand = {
  name: 'Lens & Legacy',
  short: 'L&L',
  tagline: 'Sports · Weddings · Special Occasions',
  email: 'studio@lensandlegacy.com',
  phone: '+1 (415) 555-0142',
  locations: ['San Francisco', 'New York', 'Goa'],
}

export const nav = [
  { label: 'Gallery', href: '#gallery' },
  { label: 'What we do', href: '#services' },
  { label: 'Studio', href: '#studio' },
]

/** The one contact-intent label used everywhere. */
export const CTA_PRIMARY = 'Start a project'
/** The one portfolio-intent label used everywhere. */
export const CTA_WORK = 'View selected work'

export const hero = {
  eyebrow: brand.tagline,
  headline: ['Every frame', 'becomes a legacy.'],
  sub: 'A photography, film and event studio for sport, weddings and every occasion in between, covered end to end by one crew.',
  meta: [
    { k: 'Est.', v: '2012' },
    { k: 'Based', v: 'SF · NYC · Goa' },
    { k: 'Focus', v: 'Sport · Weddings · Events' },
  ],
}

export const marqueeWords = [
  'Sports Media',
  'Weddings',
  'Corporate Events',
  'Cinematic Films',
  'Podcasts',
  'Sponsorships',
  'Naming Ceremonies',
  'Institutions',
  'Celebrations',
]

/* ── The three core pillars ─────────────────────────────────── */

export type Category = {
  index: string
  title: string
  kicker: string
  blurb: string
  items: string[]
  image: string
}

export const categories: Category[] = [
  {
    index: '01',
    title: 'Sports',
    kicker: 'Media · Events · Digital · Sponsorships',
    blurb:
      'From the tunnel to the final whistle. We cover sport as a season, not a fixture, media days, matchdays, sponsor activations and the operations that hold it all together.',
    items: ['Sports Media', 'Sports Events', 'Digital', 'Sponsorships', 'Event Operations'],
    image: 'https://picsum.photos/seed/lens-legacy-sports-matchday/1400/1000',
  },
  {
    index: '02',
    title: 'Weddings',
    kicker: 'Photography · Cinema · Candid',
    blurb:
      'Two photographers and a film crew who disappear into the day. The vows, the half-second glances and the celebration that follows, kept exactly as it felt.',
    items: [
      'Wedding Photography',
      'Cinematic Films',
      'Candid Moments',
      'Pre-Wedding',
      'Celebrations',
    ],
    image: 'https://picsum.photos/seed/lens-legacy-wedding-vows/1400/1000',
  },
  {
    index: '03',
    title: 'Special Occasions & Events',
    kicker: 'Corporate · Podcasts · Institutions',
    blurb:
      'Engagements, naming ceremonies, corporate stages, podcasts, schools and institutions, covered with the same craft we bring to a wedding, and delivered on schedule.',
    items: [
      'Engagements',
      'Naming Ceremonies',
      'Corporate Events',
      'Podcasts',
      'Schools',
      'Colleges',
      'Institutions',
      'Special Occasions',
    ],
    image: 'https://picsum.photos/seed/lens-legacy-corporate-stage/1400/1000',
  },
]

/* ── What we do, in detail ──────────────────────────────────── */

export type Service = {
  index: string
  title: string
  blurb: string
  tags: string[]
  image: string
}

export const services: Service[] = [
  {
    index: '01',
    title: 'Sports Media',
    blurb:
      'Media days, signings, press and content days, shot and edited for the same-day cycle.',
    tags: ['Media days', 'Same-day', 'Press-ready'],
    image: 'https://picsum.photos/seed/lens-legacy-sports-media/1400/1000',
  },
  {
    index: '02',
    title: 'Sports Events & Operations',
    blurb:
      'Multi-cam matchday coverage and the event operations that keep a fixture running to time.',
    tags: ['Multi-cam', 'Matchday', 'Operations'],
    image: 'https://picsum.photos/seed/lens-legacy-stadium-night/1400/1000',
  },
  {
    index: '03',
    title: 'Sponsorships & Digital',
    blurb:
      'Sponsor activations, athlete stories and the digital cutdowns that carry them across platforms.',
    tags: ['Activations', 'Vertical', 'Social'],
    image: 'https://picsum.photos/seed/lens-legacy-sponsor-digital/1400/1000',
  },
  {
    index: '04',
    title: 'Wedding Photography',
    blurb:
      'Two photographers, zero interruptions. We read the room and let the day keep its own shape.',
    tags: ['Full day', 'Candid', 'Heirloom album'],
    image: 'https://picsum.photos/seed/lens-legacy-wedding-day/1400/1000',
  },
  {
    index: '05',
    title: 'Cinematic Films',
    blurb:
      'Concept, direction and an edit that makes people feel something, then act.',
    tags: ['Concept', 'Direction', 'Sound'],
    image: 'https://picsum.photos/seed/lens-legacy-wedding-film/1400/1000',
  },
  {
    index: '06',
    title: 'Events, Podcasts & Institutions',
    blurb:
      'Engagements, naming ceremonies, corporate stages, podcasts, schools and colleges, covered like a broadcast.',
    tags: ['Corporate', 'Podcasts', 'Institutions'],
    image: 'https://picsum.photos/seed/lens-legacy-podcast-studio/1400/1000',
  },
]

/* ── Selected work ──────────────────────────────────────────── */

export type Project = {
  title: string
  category: string
  year: string
  image: string
}

export const work: Project[] = [
  {
    title: 'State of Play',
    category: 'Sports · Media',
    year: '2025',
    image: 'https://picsum.photos/seed/lens-legacy-work-sports-media/1200/1600',
  },
  {
    title: 'Matchday',
    category: 'Sport · Event',
    year: '2025',
    image: 'https://picsum.photos/seed/lens-legacy-work-matchday/1200/1600',
  },
  {
    title: 'Ana & Teo',
    category: 'Wedding · Sonoma',
    year: '2025',
    image: 'https://picsum.photos/seed/lens-legacy-work-vineyard-wedding/1200/1600',
  },
  {
    title: 'The Long Table',
    category: 'Celebration · Food & Wine',
    year: '2024',
    image: 'https://picsum.photos/seed/lens-legacy-work-long-table/1200/1600',
  },
  {
    title: 'Halo Instruments',
    category: 'Corporate · Launch',
    year: '2024',
    image: 'https://picsum.photos/seed/lens-legacy-work-product-launch/1200/1600',
  },
  {
    title: 'Nights at Aria',
    category: 'Podcast & Live',
    year: '2023',
    image: 'https://picsum.photos/seed/lens-legacy-work-concert-lights/1200/1600',
  },
]

/* ── Gallery, the full archive ─────────────────────────────── */

export const gallery: Project[] = [
  {
    title: 'Final Whistle',
    category: 'Sports · Matchday',
    year: '2025',
    image: 'https://picsum.photos/seed/lens-gallery-final-whistle/1200/1500',
  },
  {
    title: 'The Tunnel',
    category: 'Sports · Media day',
    year: '2025',
    image: 'https://picsum.photos/seed/lens-gallery-tunnel/1600/1100',
  },
  {
    title: 'First Look',
    category: 'Wedding · Candid',
    year: '2025',
    image: 'https://picsum.photos/seed/lens-gallery-first-look/1200/1600',
  },
  {
    title: 'The Vow',
    category: 'Wedding · Ceremony',
    year: '2024',
    image: 'https://picsum.photos/seed/lens-gallery-the-vow/1600/1100',
  },
  {
    title: 'Naming Day',
    category: 'Special Occasion',
    year: '2024',
    image: 'https://picsum.photos/seed/lens-gallery-naming-day/1200/1400',
  },
  {
    title: 'On Stage',
    category: 'Corporate · Summit',
    year: '2024',
    image: 'https://picsum.photos/seed/lens-gallery-corporate-stage/1600/1000',
  },
  {
    title: 'Studio Mic',
    category: 'Podcast',
    year: '2023',
    image: 'https://picsum.photos/seed/lens-gallery-podcast-mic/1200/1500',
  },
  {
    title: 'Graduation',
    category: 'Institution',
    year: '2023',
    image: 'https://picsum.photos/seed/lens-gallery-graduation/1600/1100',
  },
  {
    title: 'Golden Hour',
    category: 'Pre-Wedding',
    year: '2023',
    image: 'https://picsum.photos/seed/lens-gallery-golden-hour/1200/1600',
  },
]

/* ── Studio ─────────────────────────────────────────────────── */

export const studio = {
  kicker: 'The studio',
  headline: 'We don’t just take pictures. We keep the evidence of a life well lived.',
  body: 'Lens & Legacy began with a single rangefinder and a stubborn belief: that a photograph is not a souvenir, it is an heirloom. Twelve years on, we run photo, film and live event crews across three cities, covering sport, weddings and every occasion in between, small enough to disappear into the room and equipped enough to bring back everything.',
  signature: 'Rhea & Dev, founders',
  stats: [
    { value: '12', label: 'Years behind the lens' },
    { value: '400+', label: 'Weddings covered' },
    { value: '200+', label: 'Sports fixtures a year' },
    { value: '9', label: 'Countries on the call sheet' },
  ],
  image: 'https://picsum.photos/seed/lens-legacy-studio-crew/1200/1500',
}

export const process = [
  {
    step: '01',
    title: 'The brief',
    body: 'A conversation, not a form. We learn the people, the light and what the day has to remember.',
  },
  {
    step: '02',
    title: 'Pre-production',
    body: 'Crew, kit, permits, run-of-show. Everything that lets the shoot day feel effortless.',
  },
  {
    step: '03',
    title: 'Shoot day',
    body: 'We move quiet and cover everything, the big beats and the half-second glances between them.',
  },
  {
    step: '04',
    title: 'Edit & delivery',
    body: 'Culling, colour, sound and delivery in every format you need. The archive is yours, forever.',
  },
]

export const testimonials = [
  {
    quote:
      'They were invisible all day and then handed us a film that made my father cry. That is the whole review.',
    name: 'Ana Ferreira',
    role: 'Bride',
    location: 'Sonoma',
  },
  {
    quote:
      'Our launch film outperformed the paid campaign. The studio understood the product better than we did.',
    name: 'Marcus Cole',
    role: 'Head of Brand',
    location: 'New York',
  },
  {
    quote:
      'Three days of conference, one crew, footage in our hands by morning. We have never worked with anyone this calm.',
    name: 'Priya Nair',
    role: 'Event Director',
    location: 'Singapore',
  },
]

export const stats = [
  { value: '4.9/5', label: 'from 180+ couples' },
  { value: '48h', label: 'same-day teaser' },
  { value: '100%', label: 'originals returned' },
]

export const clients = [
  'NORTHBOUND FC',
  'AESOP',
  'MONOCLE',
  'HALO',
  'ARIA HALL',
  'FIELD NOTES',
  'TERROIR',
]

export const faqs = [
  {
    q: 'What kinds of jobs do you take on?',
    a: 'Three things, done properly: sport (media, events, digital, sponsorships and event operations), weddings (photography, cinematic films, candid and pre-wedding), and special occasions, engagements, naming ceremonies, corporate events, podcasts, schools, colleges and institutions.',
  },
  {
    q: 'How far in advance should we book?',
    a: 'Weddings typically book 9–14 months out; sports seasons are planned a quarter ahead, and corporate or event work 4–8 weeks is usually enough. If your date is close, ask anyway, we hold a few slots open every season.',
  },
  {
    q: 'How many people will be on the day?',
    a: 'Most weddings run with a lead photographer and a second shooter, plus a film unit if you have booked motion. Sports and events scale from two to eight crew depending on the run-of-show.',
  },
  {
    q: 'Do we get the original files?',
    a: 'Yes. You receive the full-resolution originals and all graded edits. Nothing is held back and nothing disappears when the gallery closes.',
  },
  {
    q: 'How fast is delivery?',
    a: 'A same-day teaser at most events, a preview gallery within 72 hours, and the complete edit within three to four weeks. Sport and brand films follow an agreed post schedule.',
  },
]

export const footerLinks = [
  {
    heading: 'Studio',
    links: ['Gallery', 'What we do', 'Studio', 'Journal'],
  },
  {
    heading: 'Sports',
    links: ['Sports Media', 'Sports Events', 'Digital', 'Sponsorships'],
  },
  {
    heading: 'Celebrations',
    links: ['Weddings', 'Cinematic Films', 'Corporate Events', 'Podcasts'],
  },
]

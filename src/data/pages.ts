import type { GalleryItem } from './site'

export type PageKey = 'sports' | 'weddings' | 'events'

export type PageService = { title: string; blurb: string; image: string }

export type PageData = {
  key: PageKey
  name: string
  kicker: string
  theme: string
  nav: { label: string; href: string }[]
  hero: {
    eyebrow: string
    headline: string[]
    sub: string
    image: string
    meta: { k: string; v: string }[]
  }
  intro: { lead: string; body: string[] }
  services: PageService[]
  stats: { value: string; label: string }[]
  gallery: GalleryItem[]
  testimonial: { quote: string; name: string; role: string }
  cta: { headline: string[]; sub: string }
}

const img = (seed: string, w = 1400, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const pages: Record<PageKey, PageData> = {
  sports: {
    key: 'sports',
    name: 'Sports',
    kicker: 'Sports Media · Sports Events · Digital · Sponsorships · Event Operations',
    theme: 'theme-sports',
    nav: [
      { label: 'Work', href: '#work' },
      { label: 'What we do', href: '#services' },
      { label: 'Approach', href: '#approach' },
    ],
    hero: {
      eyebrow: 'Sports media & event operations',
      headline: ['Built for', 'matchday.'],
      sub: 'From the first whistle to the final celebration, we cover sport as a season, not a fixture.',
      image: img('lg-sports-hero-stadium', 1800, 1200),
      meta: [
        { k: 'Fixtures / year', v: '200+' },
        { k: 'Crew', v: '2–8' },
        { k: 'Same-day', v: '48h' },
      ],
    },
    intro: {
      lead: 'A young, passionate and purpose-driven sports media and event solutions collective.',
      body: [
        'We bring together creativity, technology, media and seamless execution to deliver end-to-end solutions for sporting events, from the first whistle to the final celebration.',
        'Our expertise spans sports photography, high-end videography, drone coverage, live streaming, real-time content, social media, digital marketing, branding, sponsor activations, stage management, event logistics and end-to-end sports event operations.',
        'We pioneered the Video Referral System at the Kodava Hockey Festival, and were among the early adopters of real-time photo delivery, so players, teams, fans and media could access photographs instantly.',
        'From grassroots tournaments to large-scale events, we combine sport, storytelling, technology and execution to create experiences that go beyond the game.',
      ],
    },
    services: [
      { title: 'Sports Media', blurb: 'Media days, signings and content days, shot and delivered for the same-day cycle.', image: img('lg-sports-media-day', 1000, 1200) },
      { title: 'Sports Events', blurb: 'Multi-cam matchday coverage built around the run-of-show, not the other way round.', image: img('lg-sports-matchday', 1000, 1200) },
      { title: 'Digital & Social', blurb: 'Real-time verticals, reels and story cuts that keep the season in the feed.', image: img('lg-sports-digital', 1000, 1200) },
      { title: 'Sponsorships', blurb: 'Activations that give partners visibility without getting in the way of the game.', image: img('lg-sports-sponsor', 1000, 1200) },
      { title: 'Event Operations', blurb: 'Stage, logistics, accreditation and the quiet work that makes a fixture run to time.', image: img('lg-sports-ops', 1000, 1200) },
      { title: 'Aerial & Broadcast', blurb: 'Drone, live streaming and broadcast feeds for the moments a ground camera cannot reach.', image: img('lg-sports-aerial', 1000, 1200) },
    ],
    stats: [
      { value: '200+', label: 'Fixtures a year' },
      { value: '48h', label: 'Same-day teaser' },
      { value: '2–8', label: 'Crew on the ground' },
      { value: '9', label: 'Cities on the call sheet' },
    ],
    gallery: [
      { title: 'Final Whistle', category: 'Matchday', year: '2025', image: img('lg-sports-g1', 1200, 1500) },
      { title: 'The Tunnel', category: 'Media day', year: '2025', image: img('lg-sports-g2', 1600, 1100) },
      { title: 'Under Lights', category: 'Night fixture', year: '2024', image: img('lg-sports-g3', 1200, 1600) },
      { title: 'From Above', category: 'Aerial', year: '2024', image: img('lg-sports-g4', 1600, 1000) },
      { title: 'The Bench', category: 'Candid', year: '2024', image: img('lg-sports-g5', 1200, 1500) },
      { title: 'Full Time', category: 'Celebration', year: '2023', image: img('lg-sports-g6', 1600, 1100) },
    ],
    testimonial: {
      quote: 'The Video Referral System changed how our festival is run. Cleaner calls, happier teams, better stories.',
      name: 'Kodava Hockey Festival',
      role: 'Event Committee',
    },
    cta: {
      headline: ['Let’s cover', 'your season.'],
      sub: 'Send us the fixture list, the venue and the story you want told. We’ll come back with a crew and a plan.',
    },
  },

  weddings: {
    key: 'weddings',
    name: 'Weddings',
    kicker: 'Wedding Photography · Cinematic Films · Candid Moments · Pre-Wedding · Celebrations',
    theme: 'theme-weddings',
    nav: [
      { label: 'Story', href: '#story' },
      { label: 'What we do', href: '#services' },
      { label: 'Gallery', href: '#work' },
    ],
    hero: {
      eyebrow: 'Wedding photography & film',
      headline: ['The day,', 'kept.'],
      sub: 'Two photographers, a film crew, and the quiet attention a wedding deserves.',
      image: img('lg-weddings-hero-portrait', 1400, 1700),
      meta: [
        { k: 'Weddings', v: '400+' },
        { k: 'Rated', v: '4.9 / 5' },
        { k: 'Preview', v: '72h' },
      ],
    },
    intro: {
      lead: 'A passionate, creative collective dedicated to capturing the beauty, emotions and stories that make every wedding unforgettable.',
      body: [
        'Every wedding has a story of its own, filled with love, laughter, cherished traditions and the people who matter most. We capture it naturally, so it feels as authentic years later as it did on the day.',
        'Our work spans wedding photography, cinematic videography, candid and traditional photography, pre-wedding shoots, drone coverage, wedding films, reels and curated social content.',
        'From the quiet moments before the ceremony to the laughter with loved ones, we focus on the moments that become the most treasured memories.',
        'We don’t simply document weddings. We tell the story of two people, two families, and a celebration that deserves to be remembered beautifully.',
      ],
    },
    services: [
      { title: 'Wedding Photography', blurb: 'A lead photographer and a second shooter, moving quietly through the day.', image: img('lg-weddings-photo', 1000, 1200) },
      { title: 'Cinematic Films', blurb: 'A film that keeps the vows, the glances and the sound of the room.', image: img('lg-weddings-film', 1000, 1200) },
      { title: 'Candid Moments', blurb: 'The half-second glances and the laughter between the formalities.', image: img('lg-weddings-candid', 1000, 1200) },
      { title: 'Pre-Wedding', blurb: 'A slower session, a place you love, and the two of you without a schedule.', image: img('lg-weddings-prewedding', 1000, 1200) },
      { title: 'Traditional Coverage', blurb: 'Every ritual, every side of the family, covered with the same care.', image: img('lg-weddings-traditional', 1000, 1200) },
      { title: 'Celebrations', blurb: 'Mehndi, sangeet, the afterparty, and the morning after.', image: img('lg-weddings-celebration', 1000, 1200) },
    ],
    stats: [
      { value: '400+', label: 'Weddings covered' },
      { value: '4.9/5', label: 'From 180+ couples' },
      { value: '72h', label: 'Preview gallery' },
      { value: '100%', label: 'Originals returned' },
    ],
    gallery: [
      { title: 'First Look', category: 'Candid', year: '2025', image: img('lg-weddings-g1', 1200, 1600) },
      { title: 'The Vow', category: 'Ceremony', year: '2025', image: img('lg-weddings-g2', 1600, 1100) },
      { title: 'Golden Hour', category: 'Pre-Wedding', year: '2024', image: img('lg-weddings-g3', 1200, 1600) },
      { title: 'The Long Table', category: 'Celebration', year: '2024', image: img('lg-weddings-g4', 1600, 1000) },
      { title: 'Her People', category: 'Candid', year: '2024', image: img('lg-weddings-g5', 1200, 1500) },
      { title: 'Last Dance', category: 'Afterparty', year: '2023', image: img('lg-weddings-g6', 1600, 1100) },
    ],
    testimonial: {
      quote: 'They were invisible all day, and then handed us a film that made my father cry. That is the whole review.',
      name: 'Ana Ferreira',
      role: 'Bride, Coorg',
    },
    cta: {
      headline: ['Your story,', 'beautifully kept.'],
      sub: 'Tell us the date and the place. We’ll send availability, a crew and a clear number.',
    },
  },

  events: {
    key: 'events',
    name: 'Special Occasions & Events',
    kicker: 'Engagements · Naming Ceremonies · Corporate Events · Podcasts · Schools · Colleges · Institutions',
    theme: 'theme-events',
    nav: [
      { label: 'Events', href: '#services' },
      { label: 'Approach', href: '#approach' },
      { label: 'Gallery', href: '#work' },
    ],
    hero: {
      eyebrow: 'Occasions, institutions & stages',
      headline: ['Every occasion,', 'covered.'],
      sub: 'Engagements, naming ceremonies, corporate stages, podcasts and institutions, covered end to end.',
      image: img('lg-events-hero-stage', 1600, 1100),
      meta: [
        { k: 'Events', v: '300+' },
        { k: 'Delivery', v: '48h' },
        { k: 'Cities', v: '9' },
      ],
    },
    intro: {
      lead: 'Creativity, storytelling and energy for the moments that bring people, communities and ideas together.',
      body: [
        'Our work spans engagements, naming ceremonies, corporate events, podcasts, school and college events, institutional gatherings and special occasions.',
        'From intimate family milestones to vibrant campus celebrations and corporate stages, we capture the people, personalities and atmosphere that make an occasion unique.',
        'Our expertise includes photography, cinematic videography, candid coverage, drone visuals, live streaming, reels and social content, tailored to the character of every event.',
        'Whether it is a couple beginning a new chapter, a child being welcomed into the world, a company bringing its people together, or students creating memories on campus, we capture the moments that deserve to be remembered.',
      ],
    },
    services: [
      { title: 'Engagements & Naming', blurb: 'The small, intimate ceremonies that start a family story.', image: img('lg-events-engagement', 1000, 1200) },
      { title: 'Corporate Events', blurb: 'Summits, launches and town halls, covered like a broadcast.', image: img('lg-events-corporate', 1000, 1200) },
      { title: 'Podcasts', blurb: 'Multi-cam studio capture, clean sound and clip-ready verticals.', image: img('lg-events-podcast', 1000, 1200) },
      { title: 'Schools & Colleges', blurb: 'Graduations, festivals and campus days, covered with energy.', image: img('lg-events-campus', 1000, 1200) },
      { title: 'Institutions', blurb: 'Convocation, foundation days and the milestones of an institution.', image: img('lg-events-institution', 1000, 1200) },
      { title: 'Live Streaming', blurb: 'Reliable multi-cam streams for the people who could not be in the room.', image: img('lg-events-stream', 1000, 1200) },
    ],
    stats: [
      { value: '300+', label: 'Occasions covered' },
      { value: '48h', label: 'Teaser turnaround' },
      { value: '9', label: 'Cities covered' },
      { value: '100%', label: 'Originals returned' },
    ],
    gallery: [
      { title: 'Naming Day', category: 'Family', year: '2025', image: img('lg-events-g1', 1200, 1500) },
      { title: 'On Stage', category: 'Corporate', year: '2025', image: img('lg-events-g2', 1600, 1100) },
      { title: 'Studio Mic', category: 'Podcast', year: '2024', image: img('lg-events-g3', 1200, 1600) },
      { title: 'Graduation', category: 'Institution', year: '2024', image: img('lg-events-g4', 1600, 1000) },
      { title: 'Campus Night', category: 'College', year: '2024', image: img('lg-events-g5', 1200, 1500) },
      { title: 'The Room', category: 'Corporate', year: '2023', image: img('lg-events-g6', 1600, 1100) },
    ],
    testimonial: {
      quote: 'Three days of conference, one crew, footage in our hands by morning. We have never worked with anyone this calm.',
      name: 'Priya Nair',
      role: 'Event Director, Bengaluru',
    },
    cta: {
      headline: ['Let’s make', 'it memorable.'],
      sub: 'Tell us the occasion, the room and the people. We’ll bring the crew and the plan.',
    },
  },
}

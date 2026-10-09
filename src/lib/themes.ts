export type ThemeId = 'aurora' | 'reel' | 'chrome' | 'nocturne' | 'atelier'

export type ThemeMeta = {
  id: ThemeId
  index: string
  name: string
  kicker: string
  concept: string
  summary: string
  family: string
  mood: string[]
  palette: { name: string; hex: string; role: string }[]
  type: { display: string; body: string; displayNote: string }
  motion: { intensity: number; notes: string }
  signature: string[]
  themeClass: string
  accent: string
  preview: string
}

export const themes: ThemeMeta[] = [
  {
    id: 'aurora',
    index: '01',
    name: 'Aurora',
    kicker: 'Glass · aurora · dark',
    concept:
      'A near-black stage with fine texture, real glass and a single spring-mint accent. A lit 3D camera and a pool of cursor light carry the page. Modern, quiet, expensive.',
    summary: 'Refined dark glass with a lit 3D camera and cursor light.',
    family: 'Modern premium / glass',
    mood: ['Calm', 'Luminous', 'Cinematic', 'Engineered'],
    palette: [
      { name: 'Stage', hex: '#06070A', role: 'Background' },
      { name: 'Panel', hex: '#0B0E12', role: 'Surface' },
      { name: 'Frost', hex: '#EDEFF2', role: 'Text' },
      { name: 'Ash', hex: '#9AA2AB', role: 'Secondary' },
      { name: 'Mint', hex: '#7DE0C0', role: 'Accent' },
      { name: 'Rose', hex: '#B05A72', role: 'Orb' },
    ],
    type: {
      display: 'Cabinet Grotesk',
      body: 'Satoshi',
      displayNote: 'A tight, slightly quirky grotesk, confident without shouting.',
    },
    motion: { intensity: 6, notes: 'Cursor light, glass reveals, a camera that follows the pointer. Nothing bounces.' },
    signature: ['Fine texture', 'Frosted glass', 'Lit 3D camera', 'Cursor light'],
    themeClass: 'theme-aurora',
    accent: '#7DE0C0',
    preview: 'https://picsum.photos/seed/lens-legacy-aurora/900/600',
  },
  {
    id: 'reel',
    index: '02',
    name: 'Reel',
    kicker: 'Cinematic · editorial · dark',
    concept:
      'A dark cinematic editorial in the language of a film call sheet: oversized uppercase display, monospaced camera metadata, numbered chapters and kinetic type. Built to feel like a cutting room.',
    summary: 'Dark cinematic editorial with mono metadata and kinetic type.',
    family: 'Cinematic / editorial',
    mood: ['Cinematic', 'Technical', 'Bold', 'Analogue'],
    palette: [
      { name: 'Room', hex: '#0A0A0B', role: 'Background' },
      { name: 'Reel', hex: '#101011', role: 'Surface' },
      { name: 'Bone', hex: '#EDEAE3', role: 'Text' },
      { name: 'Ash', hex: '#9A968E', role: 'Secondary' },
      { name: 'REC', hex: '#E5484D', role: 'Accent' },
      { name: 'Glow', hex: '#F2E9DA', role: 'Light' },
    ],
    type: {
      display: 'Panchang',
      body: 'Satoshi',
      displayNote: 'Bold geometric display, set in wide uppercase.',
    },
    motion: { intensity: 7, notes: 'Kinetic marquees, number-led reveals, a rolling hover on links.' },
    signature: ['Uppercase display', 'Mono metadata', 'Numbered chapters', 'Kinetic marquee'],
    themeClass: 'theme-reel',
    accent: '#E5484D',
    preview: 'https://picsum.photos/seed/lens-legacy-reel/900/600',
  },
  {
    id: 'chrome',
    index: '03',
    name: 'Chrome Precision',
    kicker: 'Technical · engineered · light',
    concept:
      'A precision-instrument direction. Silver-white, graphite, machined chrome and monospaced specifications. The camera becomes a product; the page becomes a spec sheet worth reading.',
    summary: 'Cold technical product design with a chrome lens and mono specs.',
    family: 'Product / threeui',
    mood: ['Precise', 'Cool', 'Confident', 'Ordered'],
    palette: [
      { name: 'Silver', hex: '#ECEEF1', role: 'Background' },
      { name: 'Graphite', hex: '#14161A', role: 'Text' },
      { name: 'Steel', hex: '#575D68', role: 'Secondary' },
      { name: 'Signal', hex: '#E8452C', role: 'Accent' },
      { name: 'Chrome', hex: '#C9CDD2', role: 'Metal' },
      { name: 'White', hex: '#FFFFFF', role: 'Surface' },
    ],
    type: {
      display: 'Switzer',
      body: 'Switzer',
      displayNote: 'Neutral grotesk with tight tracking, paired with monospaced specs.',
    },
    motion: { intensity: 6, notes: 'Mechanical reveals and a rotating chrome lens. Engineered, never bouncy.' },
    signature: ['Chrome 3D lens', 'Mono readouts', 'Hairline grid', 'Spec cards'],
    themeClass: 'theme-chrome',
    accent: '#E8452C',
    preview: 'https://picsum.photos/seed/lens-legacy-chrome/900/600',
  },
  {
    id: 'nocturne',
    index: '04',
    name: 'Nocturne',
    kicker: 'Immersive · cinematic · dark',
    concept:
      'An immersive night narrative. Deep ocean-ink, a luminous ice accent, full-bleed chapters and a glass aperture that gathers the light around a rotating typographic ring.',
    summary: 'Full-bleed dark narrative with a glass aperture and rotating ring.',
    family: 'Immersive / Awwwards',
    mood: ['Immersive', 'Nocturnal', 'Luminous', 'Filmic'],
    palette: [
      { name: 'Ocean', hex: '#070B12', role: 'Background' },
      { name: 'Abyss', hex: '#0C131D', role: 'Surface' },
      { name: 'Frost', hex: '#E8EEF3', role: 'Text' },
      { name: 'Depth', hex: '#8A97A6', role: 'Secondary' },
      { name: 'Ice', hex: '#5FD8FF', role: 'Accent' },
      { name: 'Glow', hex: '#A6ECFF', role: 'Light' },
    ],
    type: {
      display: 'Clash Display',
      body: 'Satoshi',
      displayNote: 'Oversized grotesk used as image, widely tracked.',
    },
    motion: { intensity: 9, notes: 'Full-bleed chapters, parallax, a rotating ring, pinned reveals.' },
    signature: ['Glass aperture', 'Rotating type ring', 'Full-bleed chapters', 'Parallax'],
    themeClass: 'theme-nocturne',
    accent: '#5FD8FF',
    preview: 'https://picsum.photos/seed/lens-legacy-nocturne/900/600',
  },
  {
    id: 'atelier',
    index: '05',
    name: 'Atelier',
    kicker: 'Editorial · portfolio · light',
    concept:
      'A bold editorial portfolio for the studio. Full-bleed portraiture with corner crop marks, a grotesk headline spliced with an italic serif, a numbered service grid on a grainy black block, and light/dark storytelling sections.',
    summary: 'Editorial portfolio with crop-mark frames and a grotesk + italic-serif mix.',
    family: 'Portrait / editorial',
    mood: ['Bold', 'Cinematic', 'Editorial', 'Confident'],
    palette: [
      { name: 'Bone', hex: '#EFEFEC', role: 'Background' },
      { name: 'Ink', hex: '#0E0E0E', role: 'Text / dark blocks' },
      { name: 'Cream', hex: '#E4C89A', role: 'Serif accent' },
      { name: 'Stone', hex: '#6B6B68', role: 'Secondary' },
      { name: 'White', hex: '#FFFFFF', role: 'Surface' },
      { name: 'Graphite', hex: '#2A2A28', role: 'Cards' },
    ],
    type: {
      display: 'Switzer',
      body: 'Satoshi',
      displayNote: 'Tight grotesk for poster headlines, spliced with an italic serif accent.',
    },
    motion: { intensity: 5, notes: 'Parallax portraits, underline reveals, an unfolding header.' },
    signature: ['Crop-mark frames', 'Grotesk + italic serif', 'Dark service grid', 'Full-bleed portraits'],
    themeClass: 'theme-atelier',
    accent: '#0E0E0E',
    preview: 'https://picsum.photos/seed/lens-legacy-atelier/900/600',
  },
]

export const themeById = (id: ThemeId) => themes.find((t) => t.id === id)!

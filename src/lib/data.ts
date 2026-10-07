/**
 * Indian Creative Star Season 02 — Data & Exhibition Catalogue
 * Inspired by NGMA (National Gallery of Modern Art) curatorial precision
 * and Julia Morgan ceramics studio contemporary editorial layout.
 */

export type Art = { src: string; pos: string; zoom: number };
const H = "/art/hero.jpg", P = "/art/painting.jpg", M = "/art/mixed.jpg";

export const art = {
  hero: { src: H, pos: "50% 38%", zoom: 1.08 },
  painting: { src: P, pos: "49% 50%", zoom: 1.38 },
  photography: { src: H, pos: "28% 30%", zoom: 2.1 },
  digital: { src: H, pos: "62% 80%", zoom: 1.9 },
  craft: { src: H, pos: "78% 82%", zoom: 2.4 },
  sketch: { src: P, pos: "34% 72%", zoom: 2.4 },
  mixed: { src: M, pos: "50% 42%", zoom: 1.5 },
  mixedDetail: { src: M, pos: "70% 50%", zoom: 2.6 },
  skyDetail: { src: P, pos: "55% 25%", zoom: 2.2 },
} satisfies Record<string, Art>;

export type Category = {
  code: string;
  slug: string;
  name: string;
  hindi: string;
  blurb: string;
  fee: number;
  rule: string;
  medium: string;
  art: Art;
};

export const categories: Category[] = [
  {
    code: "01",
    slug: "painting",
    name: "Painting & Drawing",
    hindi: "चित्रकला",
    blurb: "Canvas, handmade paper, ink, mineral pigment — any tactile surface.",
    fee: 499,
    rule: "Original work photographed flat in even light. JPG/PNG/WebP, up to 10 MB.",
    medium: "Oil, Acrylic, Gouache, Watercolour, Ink",
    art: art.painting,
  },
  {
    code: "02",
    slug: "photography",
    name: "Photography",
    hindi: "छायाचित्र",
    blurb: "A decisive frame capturing contemporary Indian life, light, and geometry.",
    fee: 499,
    rule: "Single unmanipulated frame or minimal darkroom grade. High-res export.",
    medium: "Documentary, Portrait, Architecture, Fine Art",
    art: art.photography,
  },
  {
    code: "03",
    slug: "digital-art",
    name: "Digital Art & Design",
    hindi: "डिजिटल कला",
    blurb: "Illustration, typography, concept art, and contemporary visual identities.",
    fee: 499,
    rule: "Original creator export. Strictly no generative AI prompts or AI synthesis.",
    medium: "Vector, Digital Painting, 3D Render, Typographic Poster",
    art: art.digital,
  },
  {
    code: "04",
    slug: "craft",
    name: "Craft & Textile",
    hindi: "शिल्प व वस्त्र",
    blurb: "Living traditions reimagined: handloom, clay, metalwork, and fiber arts.",
    fee: 499,
    rule: "Clear full-view photograph of the finished object plus one macro detail shot.",
    medium: "Weaving, Ceramic, Wood, Metal, Natural Dye",
    art: art.craft,
  },
  {
    code: "05",
    slug: "sketch",
    name: "Sketch & Illustration",
    hindi: "रेखाचित्र",
    blurb: "Intimate line work, graphic storytelling, editorial drawings, and character studies.",
    fee: 499,
    rule: "Evenly lit scan or raw photograph of physical sketchbook/drawing page.",
    medium: "Pen & Ink, Graphite, Charcoal, Pastel",
    art: art.sketch,
  },
  {
    code: "06",
    slug: "mixed-media",
    name: "Mixed Media & Collage",
    hindi: "मिश्रित माध्यम",
    blurb: "Where disparate materials, reclaimed ephemera, and cross-disciplinary ideas collide.",
    fee: 499,
    rule: "Specify primary materials in one line; photograph showing depth and texture.",
    medium: "Paper Collage, Assemblage, Fabric, Gold Leaf",
    art: art.mixed,
  },
];

export type ExhibitionPiece = {
  title: string;
  artist: string;
  location: string;
  cat: string;
  year: string;
  medium: string;
  ratio: string;
  curatorialNote: string;
  art: Art;
};

export const exhibitionWorks: ExhibitionPiece[] = [
  {
    title: "Monsoon Over the Valley",
    artist: "Aanya Sharma",
    location: "Jaipur, Rajasthan",
    cat: "Painting & Drawing",
    year: "2026",
    medium: "Oil and mineral pigments on Belgian linen",
    ratio: "4 / 5",
    curatorialNote: "An expressive study of impending rainfall across the Aravalli foothills. Sharma utilizes aggressive palette-knife impasto and deep indigo washes to contrast the parched vermilion soil against humid storm clouds.",
    art: art.painting,
  },
  {
    title: "Portrait in Paper",
    artist: "Kabir Sen",
    location: "Kolkata, West Bengal",
    cat: "Mixed Media",
    year: "2026",
    medium: "Hand-torn handmade paper, natural gum & gouache",
    ratio: "3 / 4",
    curatorialNote: "Sen deconstructs traditional Indian figurative portraiture through layered paper collage. The woman’s silhouette is rendered in high-contrast vermilion, forest green, and gold foils that mirror vintage handloom borders.",
    art: art.hero,
  },
  {
    title: "Threads & Sacred Loom",
    artist: "Devrath Patel",
    location: "Ahmedabad, Gujarat",
    cat: "Craft & Textile",
    year: "2026",
    medium: "Handspun Ahimsa silk, madder root dye, raw brass wire",
    ratio: "4 / 5",
    curatorialNote: "Patel merges indigenous Patola weaving geometric discipline with modern structural relief. The work engages the viewer through tactile rhythmic warp tensions and vegetable dyes aged in brass vats.",
    art: art.craft,
  },
  {
    title: "Gold Leaf & Earth Study",
    artist: "Meera Nambiar",
    location: "Kochi, Kerala",
    cat: "Mixed Media",
    year: "2026",
    medium: "Kerala river clay, natural pigments & 24k gold leaf on teak panel",
    ratio: "1 / 1",
    curatorialNote: "A quiet meditation on temple mural pigments and organic topography. The tactile leafing catches incidental ambient light, evoking time-worn sanctum walls surviving monsoon cycles.",
    art: art.mixed,
  },
];

export const juliaMorganBadges = [
  {
    num: "28",
    unit: "States",
    label: "Pan-India participant footprint spanning all regions and craft clusters.",
  },
  {
    num: "06",
    unit: "Categories",
    label: "Dedicated disciplines covering classical fine art to contemporary digital forms.",
  },
  {
    num: "100%",
    unit: "Double-blind",
    label: "Unbiased peer jury evaluation evaluated purely on artistic merit.",
  },
  {
    num: "₹5L",
    unit: "Endowment",
    label: "Total creator grants, publication catalog, and national gallery showcase.",
  },
];

export const masterDiscoverArtists = [
  "Amrita Sher-Gil",
  "Raja Ravi Varma",
  "Jamini Roy",
  "Nandalal Bose",
  "Gaganendranath Tagore",
  "Sailoz Mookherjea",
  "Zarina Hashmi",
  "Gulam Mohammed Sheikh",
  "Arpita Singh",
  "Nasreen Mohamedi",
];

export const faqs = [
  {
    q: "Who is eligible to participate in Season 02?",
    a: "Indian Creative Star is open to all Indian citizens and residents of any age. Creators under 18 years of age can participate seamlessly with parent or legal guardian consent provided in Step 2 of registration.",
  },
  {
    q: "How does the double-blind judging process work?",
    a: "All juror evaluation is double-blind: judges review only the high-resolution artwork, title, and medium statement. Participant names, age, location, and biographical details are concealed during scoring to eliminate bias.",
  },
  {
    q: "What format and size should my artwork submission be?",
    a: "We accept JPG, PNG, and WebP files up to 10 MB. Photograph physical paintings, sketches, and craft items flat, front-on, in natural even daylight. Digital artwork should be exported at minimum 3000px resolution.",
  },
  {
    q: "What if my network drops during upload or payment?",
    a: "The platform features resilient client-side draft preservation. Your form fields and draft state remain cached safely in your browser. You can retry uploads or payment anytime without restarting.",
  },
  {
    q: "Will every participant receive a verified certificate?",
    a: "Yes. Every registered participant who submits eligible work receives an official verifiable digital Certificate of Participation authenticated with a unique cryptographic verification ID.",
  },
  {
    q: "Are generative AI artworks allowed?",
    a: "No. ICS Season 02 celebrates genuine human craftsmanship, technical skill, and artistic expression. Entries generated using prompt-based generative AI systems are disqualified.",
  },
];

export const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Delhi NCR",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const catBySlug = (s: string) => categories.find((c) => c.slug === s);

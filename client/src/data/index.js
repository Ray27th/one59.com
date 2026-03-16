export const products = [
  {
    id: 1, name: "Aura Sofa", category: "Sofas", price: "S$1,099", originalPrice: "S$1,299",
    desc: "Cloud-soft 3-seater in warm oat boucle. Low-profile arms, solid oak feet.",
    color: "#D4B896", shape: "sofa", tags: ["Boucle", "3-Seater"],
    bg: "linear-gradient(145deg, #F5EFE6 0%, #EDE0CC 100%)",
    image: "/images/aura-sofa.webp", badge: "Best Seller",
  },
  {
    id: 2, name: "Drift Lounge Chair", category: "Sofas", price: "S$549",
    desc: "Sculptural reading chair with deep sage velvet and solid oak frame.",
    color: "#7A9E7E", shape: "chair", tags: ["Velvet", "Statement"],
    bg: "linear-gradient(145deg, #EDF0EC 0%, #C8DCC8 100%)",
    image: "/images/drift-lounge-chair.webp", badge: "Ships Fast",
  },
  {
    id: 3, name: "Cove Dining Table", category: "Tables", price: "S$879",
    desc: "Solid ash wood, subtly curved edge, matte finish. Seats 6 comfortably.",
    color: "#BFA75D", shape: "table", tags: ["Ash Wood", "6-Seater"],
    bg: "linear-gradient(145deg, #F0EBE2 0%, #E0D0BC 100%)",
    image: "/images/cove-dining-table.webp",
  },
  {
    id: 4, name: "Lune Bed Frame", category: "Beds", price: "S$899", originalPrice: "S$1,099",
    desc: "Low-profile platform bed in walnut veneer with padded cream headboard.",
    color: "#8B6E52", shape: "bed", tags: ["Platform", "Walnut"],
    bg: "linear-gradient(145deg, #EDE8E0 0%, #D8CCBC 100%)",
    image: "/images/lune-bed-frame.webp", badge: "Sale",
  },
  {
    id: 5, name: "Halo Side Table", category: "Tables", price: "S$299",
    desc: "Minimalist marble-top side table with a slender solid brass stem.",
    color: "#C4B8A8", shape: "sidetable", tags: ["Marble", "Brass"],
    bg: "linear-gradient(145deg, #F5F2EE 0%, #EDE8E0 100%)",
    image: "/images/halo-side-table.webp", badge: "Ships Fast",
  },
  {
    id: 6, name: "Nest Shelving Unit", category: "Storage", price: "S$649",
    desc: "Open shelving in blackened oak. Asymmetric layout, clean silhouette.",
    color: "#6B5E52", shape: "shelf", tags: ["Oak", "Open Shelf"],
    bg: "linear-gradient(145deg, #EAE4DC 0%, #DDD5C8 100%)",
    image: "/images/nest-shelving.webp",
  },
  {
    id: 7, name: "Arc Floor Lamp", category: "Lighting", price: "S$379", originalPrice: "S$449",
    desc: "Brushed brass arc lamp with a woven rattan shade. 182 cm floor-standing.",
    color: "#C4A864", shape: "sidetable", tags: ["Brass", "Rattan"],
    bg: "linear-gradient(145deg, #F8F2E4 0%, #EEE0C0 100%)",
    image: "/images/arc-floor-lamp.webp", badge: "Sale",
  },
  {
    id: 8, name: "Origin Dining Chair", category: "Tables", price: "S$329",
    desc: "Woven seagrass seat with solid beech frame. Sold as a pair.",
    color: "#A89278", shape: "chair", tags: ["Seagrass", "Set of 2"],
    bg: "linear-gradient(145deg, #EEE8DE 0%, #E4D8C8 100%)",
    image: "/images/origin-dining-chair.webp", badge: "New",
  },
];

export const testimonials = [
  {
    name: "Priya T.", location: "Singapore", rating: 5,
    quote: "I was hesitant about the sofa colour. The visualizer showed me exactly how it would look — I ordered the same day.",
    product: "Aura Sofa",
  },
  {
    name: "Marcus L.", location: "Kuala Lumpur", rating: 5,
    quote: "Moved into a new condo and furnished the entire living room. The AI tool made it completely effortless.",
    product: "Cove Dining Table",
  },
  {
    name: "Aisha M.", location: "Jakarta", rating: 5,
    quote: "It felt like having an interior designer in my pocket. Minimal, beautiful, and actually useful.",
    product: "Lune Bed Frame",
  },
];

export const roomCategories = [
  { name: "Living Room", desc: "Sofas, armchairs & coffee tables", image: "/images/aura-sofa.webp" },
  { name: "Bedroom", desc: "Beds, nightstands & wardrobes", image: "/images/lune-bed-frame.webp" },
  { name: "Dining Room", desc: "Tables, chairs & sideboards", image: "/images/cove-dining-table.webp" },
  { name: "Home Office", desc: "Desks, shelving & task seating", image: "/images/nest-shelving.webp" },
  { name: "Outdoor", desc: "Garden seating & terrace pieces", image: "/images/halo-side-table.webp" },
];

export const bundles = [
  {
    name: "First Home Starter",
    contents: ["Sofa", "Coffee Table", "TV Console"],
    hook: "Move in ready. Under $1,200.",
    desc: "A complete living room set curated for your first home — a plush sofa, minimal coffee table, and a low-profile TV console, all in warm neutral tones.",
    price: "S$1,199",
    originalPrice: "S$1,549",
    accent: "#D4B896",
    bg: "#FDFAF5",
    image: "/images/first-home-starter.webp",
    sizes: ["Studio / 1-Room", "Standard / 2-Room", "Spacious / 3-Room+"],
  },
  {
    name: "WFH Setup",
    contents: ["Desk", "Ergonomic Chair", "Shelf"],
    hook: "Your home office, done.",
    desc: "Everything you need to work from home in style — a solid wood desk, ergonomic task chair, and an open shelving unit for storage and display.",
    price: "S$899",
    originalPrice: "S$1,149",
    accent: "#7A9E7E",
    bg: "#F4F7F4",
    image: "/images/home-office-setup.webp",
    sizes: ["Minimal Desk", "Standard Workstation", "Corner Setup"],
  },
  {
    name: "Bedroom Reset",
    contents: ["Bed Frame", "Mattress", "Bedside Table"],
    hook: "Sleep better by Friday.",
    desc: "A full bedroom foundation — low-profile platform bed in walnut veneer, a pocket-spring mattress, and a paired bedside table with brass handle.",
    price: "S$1,499",
    originalPrice: "S$1,899",
    accent: "#8B6E52",
    bg: "#FAF8F5",
    image: "/images/Bedroom-Reset.webp",
    sizes: ["Single", "Queen", "King"],
  },
];
export const products = [
  {
    id: 1, sku: "ONE59-CHR-001", catalogType: "drop", name: "Basic Folding Chair", category: "Chairs", price: "S$29",
    desc: "Simple steel folding chair. Lightweight and stackable.",
    color: "#8B9D8A", shape: "chair", tags: ["Steel", "Foldable"],
    bg: "linear-gradient(145deg, #E8EDE8 0%, #D4DCD4 100%)",
    image: "/images/folding-chair.webp", badge: "Best Seller",
  },
  {
    id: 2, sku: "ONE59-STO-001", catalogType: "evergreen", name: "Cube Storage Bin", category: "Storage", price: "S$15",
    desc: "Fabric storage cube with handles. Fits standard shelving units.",
    color: "#C4B8A8", shape: "box", tags: ["Fabric", "Modular"],
    bg: "linear-gradient(145deg, #F5F2EE 0%, #E8E4DC 100%)",
    image: "/images/cube-bin.webp", badge: "Ships Fast",
  },
  {
    id: 3, sku: "ONE59-TBL-001", catalogType: "drop", name: "Laptop Desk Table", category: "Tables", price: "S$49",
    desc: "Compact laptop desk frame. Works well on top of your table.",
    color: "#A89278", shape: "table", tags: ["Adjustable", "Compact"],
    bg: "linear-gradient(145deg, #F0EBE2 0%, #E0D0BC 100%)",
    image: "/images/laptop-desk.webp", badge: "New",
  },
  {
    id: 4, sku: "ONE59-STO-002", catalogType: "evergreen", name: "Wall Shelf", category: "Storage", price: "S$35",
    desc: "Simple wall-mounted shelf. Pine wood finish.",
    color: "#BFA75D", shape: "shelf", tags: ["Wall-Mount", "Pine"],
    bg: "linear-gradient(145deg, #EDE8E0 0%, #D8CCBC 100%)",
    image: "/images/wall-shelf.webp",
  },
  {
    id: 5, sku: "ONE59-CHR-002", catalogType: "evergreen", name: "Plastic Stool", category: "Chairs", price: "S$12",
    desc: "Durable plastic stool. Multiple colors available.",
    color: "#7A9E7E", shape: "stool", tags: ["Plastic", "Lightweight"],
    bg: "linear-gradient(145deg, #EDF0EC 0%, #C8DCC8 100%)",
    image: "/images/plastic-stool.webp", badge: "Ships Fast",
  },
  {
    id: 6, sku: "ONE59-STO-003", catalogType: "evergreen", name: "Shoe Rack 3-Tier", category: "Storage", price: "S$39",
    desc: "Three-tier shoe rack. Holds up to 9 pairs.",
    color: "#6B5E52", shape: "shelf", tags: ["3-Tier", "Entryway"],
    bg: "linear-gradient(145deg, #EAE4DC 0%, #DDD5C8 100%)",
    image: "/images/shoe-rack.webp",
  },
  {
    id: 7, sku: "ONE59-LGT-001", catalogType: "drop", name: "LED Desk Lamp", category: "Lighting", price: "S$25",
    desc: "Adjustable LED desk lamp with USB charging port.",
    color: "#C4A864", shape: "lamp", tags: ["LED", "USB"],
    bg: "linear-gradient(145deg, #F8F2E4 0%, #EEE0C0 100%)",
    image: "/images/desk-lamp.webp", badge: "Sale",
  },
  {
    id: 8, sku: "ONE59-LIV-001", catalogType: "drop", name: "Floor Cushion", category: "Living", price: "S$19",
    desc: "Large floor cushion with removable cover. Meditation or seating.",
    color: "#D4B896", shape: "cushion", tags: ["Floor", "Removable"],
    bg: "linear-gradient(145deg, #F5EFE6 0%, #EDE0CC 100%)",
    image: "/images/floor-cushion.webp", badge: "New",
  },
  {
    id: 9, sku: "ONE59-TBL-002", catalogType: "evergreen", name: "Bamboo Tray Table", category: "Tables", price: "S$45",
    desc: "Foldable bamboo tray table. Breakfast or serving.",
    color: "#C9A961", shape: "table", tags: ["Bamboo", "Foldable"],
    bg: "linear-gradient(145deg, #F2ECE2 0%, #E4D8C8 100%)",
    image: "/images/tray-table.webp",
  },
  {
    id: 10, sku: "ONE59-STO-004", catalogType: "evergreen", name: "Coat Rack Stand", category: "Storage", price: "S$55",
    desc: "Freestanding coat rack with 8 hooks. Solid wood.",
    color: "#8B6E52", shape: "rack", tags: ["Wood", "Entryway"],
    bg: "linear-gradient(145deg, #EDE8E0 0%, #D8CCBC 100%)",
    image: "/images/coat-rack.webp", badge: "Best Seller",
  },
  {
    id: 11, sku: "ONE59-DEC-001", catalogType: "evergreen", name: "Mirror", category: "Decor", price: "S$42",
    desc: "Wall mirror with aluminum frame. Modern minimalist.",
    color: "#A8A8A8", shape: "mirror", tags: ["Mirror", "Wall"],
    bg: "linear-gradient(145deg, #F0F0F0 0%, #E0E0E0 100%)",
    image: "/images/wall-mirror.webp",
  },
  {
    id: 12, sku: "ONE59-BED-001", catalogType: "evergreen", name: "Bedside Table", category: "Beds", price: "S$65",
    desc: "Simple bedside table with one drawer. White finish.",
    color: "#E8E8E8", shape: "table", tags: ["Drawer", "Bedroom"],
    bg: "linear-gradient(145deg, #F8F8F8 0%, #ECECEC 100%)",
    image: "/images/bedside-table.webp", badge: "Ships Fast",
  },
];

export const storePolicy = {
  priceCapNote: "Under S$159 per item",
  gstNote: "GST included in displayed prices",
  deliveryNote: "Mainland Singapore delivery in 3 to 5 days",
  returnsNote: "7-day returns, with customer-paid change-of-mind return delivery",
  supportNote: "Instagram DM first, email fallback available, replies within 24 hours",
  modalNote: "GST included · mainland Singapore delivery in 3 to 5 days · 7-day returns, with customer-paid change-of-mind return delivery",
};

export const trustPoints = [
  { stat: "UNDER S$159", label: "PER ITEM, ALWAYS" },
  { stat: "GST INCLUDED", label: "IN DISPLAYED PRICES" },
  { stat: "3 TO 5 DAYS", label: "MAINLAND SG DELIVERY" },
  { stat: "7-DAY RETURNS", label: "CHANGE-OF-MIND IS CUSTOMER-PAID" },
];

export const promoBannerText = "UNDER S$159 PER ITEM · GST INCLUDED · MAINLAND SG DELIVERY IN 3 TO 5 DAYS";

export const testimonialsSummary = "REAL MAINLAND SG CUSTOMER NOTES";

export const testimonials = [
  {
    name: "Jenny L.", location: "Toa Payoh", rating: 5,
    quote: "The price on site was the price I paid — GST was already in, and the cube bins showed up at my flat in a few days.",
    product: "Cube Storage Bin",
  },
  {
    name: "Marcus T.", location: "Jurong West", rating: 5,
    quote: "I asked a question over Instagram DM and got a reply the same day. The laptop desk feels far more expensive than it is.",
    product: "Laptop Desk Table",
  },
  {
    name: "Farah N.", location: "Bedok", rating: 5,
    quote: "Delivery across mainland Singapore was straightforward, and the wall shelf looked exactly right in our new place.",
    product: "Wall Shelf",
  },
];

export const roomCategories = [
  { name: "Living", desc: "Stools, cushions, small tables", image: "/images/floor-cushion.webp" },
  { name: "Bedroom", desc: "Bedside tables, storage, mirrors", image: "/images/bedside-table.webp" },
  { name: "Dining", desc: "Folding chairs, tray tables", image: "/images/folding-chair.webp" },
  { name: "Home Office", desc: "Desks, lamps, shelving", image: "/images/laptop-desk.webp" },
  { name: "Storage", desc: "Bins, racks, organizers", image: "/images/cube-bin.webp" },
];

export const bundles = [
  {
    name: "Room Starter Pack",
    contents: ["Storage Bin x4", "Wall Shelf", "Floor Cushion"],
    hook: "Everything you need. Under $100.",
    desc: "Start your room from zero — four stackable storage bins, a wall shelf for display, and a comfy floor cushion. All for less than a dinner date.",
    price: "S$99",
    originalPrice: "S$135",
    accent: "#8B9D8A",
    bg: "#F4F8F4",
    image: "/images/room-starter.webp",
    sizes: ["1-Room", "2-Room", "3-Room+"],
  },
  {
    name: "WFH Basic Setup",
    contents: ["Laptop Desk", "LED Lamp", "Storage Bin"],
    hook: "Work from home. Done.",
    desc: "A simple laptop desk, adjustable LED lamp, and a storage bin for your cables. Everything you need to work without breaking the bank.",
    price: "S$89",
    originalPrice: "S$115",
    accent: "#7A9E7E",
    bg: "#F4F7F4",
    image: "/images/wfh-basic.webp",
    sizes: ["Minimal", "Standard", "Corner"],
  },
  {
    name: "Entryway Reset",
    contents: ["Shoe Rack", "Coat Rack", "Mirror"],
    hook: "First impressions, sorted.",
    desc: "Your entryway deserves better than piled shoes. This trio — shoe rack, coat stand, and wall mirror — makes every guest go 'wow'.",
    price: "S$136",
    originalPrice: "S$175",
    accent: "#8B6E52",
    bg: "#FAF8F5",
    image: "/images/entryway-reset.webp",
    sizes: ["Compact", "Standard", "Wide"],
  },
];

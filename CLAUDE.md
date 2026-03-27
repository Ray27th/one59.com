# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Context

This repo is **Livora** — a furniture e-commerce platform being evolved into **one59**, a Singapore-based furniture brand where every item is priced at or below SGD $159. The full product specification is in `one59.md`. When building new features, treat that document as the source of truth for product decisions.

---

## Architecture

Two independent apps that must run simultaneously in development:

```
livora/
├── client/          # React 19 + Vite 7 (frontend)
│   └── src/
│       ├── App.jsx              # Root — owns modal state, cart, wishlist
│       ├── data/index.js        # All product + bundle data (static, no DB yet); also exports ROOM_PRESETS and badgeColor
│       ├── utils.js             # Shared utilities: fetchImgBase64
│       ├── theme.js             # Design token constants (COL_DARK, COL_ORANGE, FONT_HEAD, SHADOW, etc.)
│       ├── components/          # Modals, Navbar, HeroCarousel, RoomVisualizer, icons
│       │   └── sections/        # Page sections (NewArrivals, CuratedBundles, etc.)
│       └── ui/                  # Reusable primitives (AnimateIn, ProductImage)
├── server/          # Node.js + Express 5 (API backend)
│   └── server.js    # All API routes — single file
└── one59.md         # Full PRD for the one59 product
```

The client proxies API calls to the server. In development both processes run separately; in production Vercel serves the client static build (`client/dist`) and the server is deployed independently.

---

## Commands

### Client (run from `client/`)
```bash
npm run dev        # Vite dev server (default: localhost:5173)
npm run build      # Production build → client/dist
npm run lint       # ESLint
npm run preview    # Serve the production build locally
```

### Server (run from `server/`)
```bash
npm run dev        # nodemon — auto-restarts on changes
npm start          # node server.js — production
```

Server listens on **port 8080**.

### Environment
Create `server/.env` (must be in `server/`, not the repo root):
```
GEMINI_API_KEY=your_key_here
```

---

## Key Architectural Patterns

### State lives in App.jsx
`detailProduct`, `detailBundle`, `cartCount`, `wishlist`, and `toastItem` all live in `App.jsx` and are passed down as props. There is no global state library. Modals are conditionally rendered from `App.jsx` and receive `onClose`, `onAddToCart`, and `onOpenDetail` callbacks.

### Data is static
All products and bundles are defined in `client/src/data/index.js` as plain arrays. `ROOM_PRESETS` and `badgeColor` are also exported from this file — do not redeclare them locally in components. There is no database or CMS yet.

### Shared utilities
`client/src/utils.js` exports `fetchImgBase64(url)` — fetches an image URL and returns `{ base64, mimeType }`. Import from here, do not inline fetch logic in components.

### All styles are inline
The entire codebase uses React inline styles — no CSS modules, no Tailwind, no styled-components. The design system is:
- Dark: `#1A1A1A`, Orange: `#FF6B35`, White: `#FFFFFF`, Light: `#F5F5F5`
- Font: `'Arial Black', Arial, sans-serif` for headings/labels; `Arial, sans-serif` for body
- Borders: `2px solid #1A1A1A` with `6px` or `8px` border-radius
- Box shadows: offset style (`4px 4px 0px #1A1A1A`)
- Design tokens are in `client/src/theme.js`

### one59 brand rules (apply to all UI/copy)
- Price is the hero — the S$159 cap is the value signal, not a sale
- No MSRP strikethroughs or "was/now" pricing anywhere
- Factory-direct story: "no middlemen" is the key narrative
- All copy should reinforce: "this price is too good to be real"

### AI Visualisation pipeline
Two-step process in `server/server.js`:
1. **Vision analysis** — `gemini-2.5-flash` via `ai.models.generateContent()` with `inlineData` image parts → returns detailed text description of the furniture piece
2. **Image generation** — `gemini-2.0-flash-preview-image-generation` via `ai.models.generateContent()` with `config: { responseModalities: ["IMAGE"] }` → returns base64 image

Both use `@google/genai` SDK (`GoogleGenAI`). The old `@google/generative-ai` SDK is not used.

### API endpoints
- **`POST /api/generate-image`** — full pipeline: vision analysis → image generation. Accepts `additionalProducts[]` for bundle visualisation.
- **`POST /api/visualize`** — text-only Gemini endpoint (legacy/utility use).

### Custom bundle system (ProductDetailModal)
Users can add recommended products to a "bundle" via `bundleAddOns` state. When `bundleAddOns.length > 0`:
- The AI visualiser button label changes to "AI BUNDLE VISUALIZER" with an item count badge
- The per-recommendation "Visualize This Item" button is hidden
- The `generate()` call includes all bundle items as `additionalProducts` for the server

### Vercel deployment
`vercel.json` only builds and serves the client. The server is deployed separately. API calls from the client use relative `/api/...` paths which work in local dev via Vite proxy.

---

## one59 Features To Build (from PRD)

- **Central inventory API** — `POST /api/inventory/reserve|confirm|release`, `GET /api/inventory/:id` — shared stock layer across TikTok, Shopee, and website channels
- **Drops system** — products grouped into timed drop events with states (`upcoming` → `live` → `ended`), countdown timers, and hybrid "X viewing" presence counter (real WebSocket with a minimum floor)
- **Full checkout** — PayNow/PayLah, Stripe (card), GrabPay, Atome/hoolah BNPL
- **Optional user accounts** — guest checkout always available; accounts add order history + drop notifications
- **Custom admin panel** — non-dev staff UI for products, drops, inventory, orders, and fulfilment status

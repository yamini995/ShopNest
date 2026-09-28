# ShopNest Design System

A restrained, human-crafted design constitution for a production e-commerce store.

## 1. Palette
- **Backgrounds**: `#FFFFFF` (pure canvas) and `#F7F7F5` (warm off-white section background).
- **Text**: `#1A1A1A` (primary text, headings, prices), `#5C5C5C` (secondary descriptions, metadata, labels).
- **Borders**: `#E5E5E2` (1px clean structural dividers).
- **Brand Teal**: `#0F766E` (strictly reserved for primary action buttons, active states, links, and selected tags).
- **Accent Orange**: `#F97316` (strictly reserved for sale/discount badges and "Buy now" instant action).
- **Prohibitions**: No gradients, no purple/indigo/violet, no glassmorphism or background blurs.

## 2. Typography
- **Typeface**: `Manrope` (Google Fonts).
- **Scale**:
  - `12px`: Small metadata, delivery dates, review counts, input hints.
  - `14px`: Secondary buttons, body text, filter items, specs table.
  - `15px / 16px`: Product titles, standard body text, input fields.
  - `20px`: Section headings, subheadings, drawer titles.
  - `28px`: Page titles, PDP main titles.
  - `40px`: Large display banners.
- **Hierarchy**: Product names are 14–15px, medium weight, clamped to 2 lines. Current prices are bold and the most prominent visual element on any card. Left-aligned by default.

## 3. Shapes & Surfaces
- **Radii**:
  - Inputs & Buttons: `6px`.
  - Cards: `8px`.
  - Avatars / Badges: Circular or `4-6px`.
- **Depth**: Flat with clean 1px `#E5E5E2` borders instead of drop shadows. Only floating modals, dropdowns, and toast messages receive a subtle `0 4px 12px rgba(0,0,0,0.06)` shadow.
- **Card Discipline**: No card-inside-card nests. No decorative blobs, abstract patterns, or floating elements.

## 4. Spacing Grid
- Built on an 8px base increment: `8px`, `16px`, `24px`, `32px`, `48px`, `64px`.
- Page max-width: `1240px` with `16px` side padding on mobile (`24px` on tablet/desktop).
- Dense, purposeful retail merchandising with zero artificial whitespace padding.

## 5. Iconography & Media
- **Icon Set**: Lucide Icons exclusively, `strokeWidth={1.5}`, `20px` default standard size. No emojis.
- **Product Photography**: Light neutral canvas with `object-contain`, fixed 1:1 square ratio. Automatic fallback on image failure.
- **Hero Banner**: Plain 2-column layout pairing a tangible promotional proposition with an authentic product image and a single direct CTA.

## 6. Copy & Microcopy
- Authentic, clear store language: "Free delivery over ₹499", "Returns within 7 days", "Only 3 left in stock".
- Action verbs on all buttons: "Add to cart", "Buy now", "Place order", "Track order".
- Prohibited buzzwords: "Elevate", "Unleash", "Seamless", "Discover the future", "Your one-stop shop".

## 7. Motion & Accessibility
- Strict timing: `150ms` transitions for hover color shifts; `200ms` fade for drawers and overlays; `active:translate-y-[1px]` for tactile button click feel.
- Keyboard accessibility: Visible focus ring `focus-visible:ring-2 focus-visible:ring-[#0F766E] focus-visible:ring-offset-2`.
- Minimum tap targets: `44px` on touch viewports.

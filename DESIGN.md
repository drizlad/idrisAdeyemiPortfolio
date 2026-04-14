# Idris Adeyemi Portfolio — Design Spec

> Source: Figma file `qzM7WTNLA9FjzHREPtAALf` · node `5854-478` · Extracted via Figma MCP

---

## 1. Design Tokens

### Colors

| Token | Value |
|---|---|
| `text/base/primary` | `#14151a` |
| `text/base/secondary` | `rgba(15, 19, 36, 0.6)` |
| `background/surface/default` | `#ffffff` |
| `background/surface/neutral` | `#f7f7f8` |
| `background/button/secondary` | `#ffffff` |
| `border/action/normal` | `#dee0e3` |

### Typography

| Token | Value |
|---|---|
| Font family | `Inter` |
| Weight regular | `400` |
| Weight medium | `500` |
| Weight semibold | `600` |
| Weight extrabold | `800` |
| Caption size | `14px` |
| Caption line-height | `20px` |
| Caption letter-spacing | `-0.1px` |

### Border Radii

| Usage | Value |
|---|---|
| `measurements/radius/lg` | `10px` |
| Profile card outer | `16px` |
| Profile card inner body | `10px` |
| Tag / badge | `7px` |
| Toggle container | `6px` |
| Project card | `10px` |
| Button | `6px` |
| Image inner | `8px` |

### Shadows

| Token | Value |
|---|---|
| `Shadows/xs` drop | `0 1px 2px rgba(20, 21, 26, 0.05)` |
| `Shadows/xs` inner | `inset 0 -1px 1px rgba(0, 0, 0, 0.10)` |

---

## 2. Tag / Badge Colors

All tags share the same container styles:

```
background:    #ffffff
border:        1px solid #dee0e3
border-radius: 7px
padding:       6px 10px
font-family:   Inter Regular (400)
```

| Tag | Text Color | Font Size | Letter Spacing |
|---|---|---|---|
| Product Designer | `#c300e5` | `14px` | default |
| Fintech | `#0c3aff` | `16px` | `-0.48px` |
| Design System | `#00e599` | `16px` | `-0.48px` |
| Framer. | `#ff6f15` | `16px` | `-0.48px` |

---

## 3. Component Specs

### NavBar

```
container:     border: 1px solid #dee0e3
               border-radius: 8px
               background: #ffffff
               position: absolute
               top: 18px, right: 32px
               z-index: 10

layout:        display: flex
               each link: flex-1, items-center, justify-center
               divider: border-right 1px solid #dee0e3 between each link

link text:     font-family: Inter Regular (400)
               font-size: 14px
               color: rgba(15, 19, 36, 0.6)
               letter-spacing: -0.42px
               padding: 7px 18px
               text-decoration: none

hover:         background: #f5f5f5
               transition: background 150ms ease-in-out
```

---

### ProfileCard

```
outer:         background: #ffffff
               border: 1px solid #dee0e3
               border-radius: 16px
               padding: 6px
               position: absolute
               bottom: 32px, left: 32px
               z-index: 10
               width: fit-content
               min-width: 380px

header bar:    height: 32px
               padding: 0 8px
               display: flex, align-items: center
               text "Details": Inter Regular, 16px, #14151a

inner body:    background: #f7f7f8
               border: 1px solid #dee0e3
               border-radius: 10px
               padding: 8px 8px 12px 8px
               display: flex, flex-direction: column
               justify-content: space-between
               flex: 1

name:          font-family: Inter Medium (500)
               font-size: 24px
               color: #000000

tags row:      display: flex, flex-wrap: wrap
               gap: 4px
               margin-top: 16px
```

---

### MagneticFieldPattern (Hero Background)

```
concept:       A full-coverage grid of small arrow elements that each
               independently rotate in real time to point toward the cursor,
               creating a living magnetic field effect across the entire hero.
               Every element acts like a compass needle pulled toward the mouse.

component:     <MagneticFieldPattern /> — self-contained React component.
               Renders inside the hero as an absolute inset-0 layer.

implementation:
  - Render a 2D grid of <span> or <div> elements tiling the full hero area
  - Parent hero section fires onMouseMove → stores cursor {x, y} in a useRef
  - On each requestAnimationFrame tick:
      for each element:
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const angle = Math.atan2(cursorY - cy, cursorX - cx)
        el.style.transform = `rotate(${angle}rad)`
  - Cancel rAF loop on component unmount

element:       A bold open arrow matching the wheregiantsroam.com reference —
               large, sparse, hand-drawn feel. NOT a filled arrowhead.
               Rendered as an inline SVG per grid cell.

               SVG viewBox: "0 0 40 40", width: 40px, height: 40px
               Arrow drawn pointing right by default (→):
                 - shaft:     line from (4, 20) to (36, 20)
                 - head top:  line from (36, 20) to (24, 10)
                 - head bot:  line from (36, 20) to (24, 30)
               stroke: #f0a0c0
               stroke-width: 2.5
               stroke-linecap: round
               stroke-linejoin: round
               fill: none
               opacity: 0.7 at rest

               Rotation applied via CSS transform on the <svg> element itself.

grid spacing:  80px between element centers (horizontal and vertical)
               Sparse grid — matches the large airy arrow field in the reference.
               Fill the full hero width × height.
               Use CSS grid: grid-template-columns: repeat(auto-fill, 80px)
               with each cell display: flex, align-items: center, justify-content: center

transition:    CSS on each element: transition: transform 80ms ease-out
               Gives a smooth magnetic-snap feel without hard snapping

fallback:      Initial load / no cursor: all elements at rotate(0deg)
               Touch devices: render static, no rotation

z-index:       0 — behind NavBar (z-10) and ProfileCard (z-10)
pointer-events: none — all clicks pass through to hero content
```

---

### PortfolioToggle

```
container:     display: inline-flex   ← shrink-wraps to content
               border: 1px solid #dee0e3
               border-radius: 6px
               overflow: hidden
               background: #ffffff

placement:     centered above the project grid
               wrapper: display: flex, justify-content: center
               margin-bottom: 32px

each option:   padding: 8px 28px
               font-family: Inter Regular (400)
               font-size: 13px
               cursor: pointer
               border-right: 1px solid #d5d5d5  (between options, not on last)

active:        background: #111111
               color: #ffffff

inactive:      background: #ffffff
               color: #333333

interaction:   onClick swap active/inactive between the two options
               transition: background-color, color — 150ms ease-in-out

options:       "Ai built portfolio"  (default active)
               "View pre ai portfolio"
```

---

### ProjectCard

```
container:     background: #ffffff
               border: 1px solid #dee0e3
               border-radius: 10px
               overflow: hidden
               display: flex, flex-direction: column

image area:    height: 300px
               padding: 16px
               background: #f4f4f2
               border-bottom: 1px solid #ececec

  image inner: width: 100%, height: 100%
               border-radius: 8px
               object-fit: cover
               src: project.gridImage  ← from existing project data file

info area:     padding: 18px 20px 20px
               display: flex, flex-direction: column

title:         Inter SemiBold (600), 15px, #111111, mb: 6px

description:   Inter Regular (400), 13px, #666666
               line-height: 1.5, mb: 16px, flex: 1

button — active project:
               label: project.buttonLabel
               border: 1px solid #d0d0d0, border-radius: 6px
               padding: 7px 14px, font-size: 13px, color: #333333
               background: #ffffff
               hover: background #f5f5f5, transition 150ms

button — coming soon:
               label: "Coming Soon"
               border: 1px solid #e0e0e0, border-radius: 6px
               padding: 7px 14px, font-size: 13px, color: #999999
               cursor: not-allowed, no hover state

data source:   Import from existing project data file.
               Map over the array → render one <ProjectCard /> per entry.
               Expected data shape per entry:
                 {
                   title:       string
                   description: string
                   gridImage:   string   ← displayed in card image area
                   buttonLabel: string
                   href?:       string
                   comingSoon:  boolean
                 }
```

---

### Footer (CTA + NameBanner)

The footer is one unified section with two stacked parts:
1. A centered CTA block (label + pill button)
2. The oversized name bleeding out below it

---

#### FooterCTA

```
concept:       A large full-width pill button that lets visitors either open
               their email client to contact Idris, OR copy his email address
               to clipboard — depending on which part they interact with.

section layout:
               width: 100vw
               background: #ffffff
               display: flex, flex-direction: column
               align-items: center
               padding-top: 64px
               padding-bottom: 0

label above button:
               text: "Open to a full time role or any exciting project"
               font-family: Inter Regular (400)
               font-size: 14px
               color: #14151a  (text/base/primary)
               text-align: center
               margin-bottom: 20px

pill button:
               width: calc(100% - 200px)   ← 100px margin left + right
               max-width: calc(100vw - 200px)
               height: 96px
               background: #CC00FF  (magenta/electric purple from image)
               border-radius: 9999px  (full pill)
               border: none
               display: flex
               align-items: center
               justify-content: center
               gap: 16px
               cursor: pointer
               position: relative

email text:
               text: "drizlad@gmail.com"
               font-family: Inter Medium (500)
               font-size: clamp(24px, 3vw, 40px)
               color: #ffffff
               letter-spacing: -0.5px

copy icon:
               clipboard / copy SVG icon
               size: 28px × 28px
               color: #ffffff
               positioned immediately to the right of the email text
               has its own click zone (see interactions below)

hover state (whole button):
               background: #BB00EE  (slightly darker purple)
               transition: background 200ms ease-in-out
               transform: scale(1.01)
               transition: transform 200ms ease-in-out

active/press:  transform: scale(0.99)
```

---

#### Button Interactions — Two Distinct Actions

```
ACTION 1 — Click anywhere on the pill button (except the copy icon):
  behavior:    Opens the visitor's default email client
  method:      window.location.href = "mailto:drizlad@gmail.com"
  subject:     optional pre-fill, e.g. ?subject=Hello%20Idris

ACTION 2 — Click the copy icon only:
  behavior:    Copies "drizlad@gmail.com" to the clipboard silently
  method:      navigator.clipboard.writeText("drizlad@gmail.com")
  feedback:    Icon swaps to a checkmark (✓) for 2000ms, then reverts
               No alert, no toast — icon-only feedback keeps it clean

  implementation note:
    Wrap the copy icon in a <button> or <span> with:
      onClick={(e) => {
        e.stopPropagation()   ← prevent firing the mailto on the parent
        navigator.clipboard.writeText("drizlad@gmail.com")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}

  copy icon states:
    default:   clipboard icon, color #ffffff
    copied:    checkmark icon (✓), color #ffffff
    transition: opacity 150ms ease-in-out on icon swap
```

---

#### NameBanner

```
concept:       "Idris Adeyemi" rendered at a massive scale, sitting flush
               below the CTA. The text is wider than the viewport and bleeds
               off both sides — it is NOT centered, it starts from the left
               edge of the page and simply overflows to the right.
               The containing section uses overflow: hidden to clip the bleed.

placement:     Directly below the FooterCTA, no gap/padding between them.
               The pill button sits above, the name bleeds out below.

text:          "Idris Adeyemi"
font-size:     clamp(100px, 15vw, 200px)
font-weight:   800 (Extra Bold)
letter-spacing: -4px
line-height:   0.9
color:         #111111
white-space:   nowrap
display:       block

container:     width: 100vw
               overflow: hidden          ← clips left and right bleed
               padding: 24px 0 0 0       ← tight top spacing from CTA
               background: #ffffff
               (no padding-left — text starts at or near the left viewport edge)
```

---

## 4. Page Layout

```
page root:     width: 100vw
               overflow-x: hidden
               background: #ffffff

section order:
  1. Hero          ← 100vw full bleed
  2. Projects      ← max-width 1112px, centered
  3. Footer        ← CTA pill button + oversized name bleed

────────────────────────────────────────────────────────────────
SECTION 1 — Hero
────────────────────────────────────────────────────────────────

  width:         100vw — NO max-width, NO centering wrapper
  min-height:    560px
  position:      relative
  overflow:      hidden
  background:    #ffffff

  children — exactly 3, nothing else:

    1. <MagneticFieldPattern />
          position: absolute, inset: 0
          z-index: 0
          pointer-events: none

    2. <NavBar />
          position: absolute
          top: 18px, right: 32px
          z-index: 10

    3. <ProfileCard />
          position: absolute
          bottom: 32px, left: 32px
          z-index: 10

  ⚠ Toggle and project cards do NOT live inside the hero section.

────────────────────────────────────────────────────────────────
SECTION 2 — Projects (toggle + cards)
────────────────────────────────────────────────────────────────

  outer shell:   width: 100vw
                 background: #ffffff
                 display: flex, justify-content: center
                 padding: 48px 0 64px

  inner wrapper: max-width: 1112px
                 width: 100%
                 padding: 0 24px   ← gutters on smaller screens

  layout:
    ┌──────────────────────────────────────────┐
    │      <PortfolioToggle />  (centered)      │  mb: 32px
    ├──────────────────────────────────────────┤
    │  <ProjectCard />       <ProjectCard />   │
    │  <ProjectCard />       <ProjectCard />   │  2-col grid, gap: 28px
    └──────────────────────────────────────────┘

  toggle wrapper:  display: flex, justify-content: center, mb: 32px
  project grid:    display: grid, grid-template-columns: 1fr 1fr, gap: 28px

────────────────────────────────────────────────────────────────
SECTION 3 — Footer (CTA + NameBanner)
────────────────────────────────────────────────────────────────

  width:         100vw
  background:    #ffffff
  overflow:      hidden   ← clips the name bleed
  padding-top:   64px
  padding-bottom: 0

  layout (top to bottom):
    ┌──────────────────────────────────────────────────────────┐
    │   "Open to a full time role or any exciting project"     │  label, centered, 14px
    │                                                          │  mb: 20px
    │   ╔══════════════════════════════════════════════════╗   │
    │   ║   drizlad@gmail.com   □                         ║   │  pill button
    │   ╚══════════════════════════════════════════════════╝   │  h: 96px, bg: #CC00FF
    │      ← 100px margin →                  ← 100px margin → │  full width minus 200px
    │                                                          │
    │  Idris Adeyemi                                           │  oversized name
    │  (bleeds off right edge)                                 │  no padding, clips at edges
    └──────────────────────────────────────────────────────────┘

  pill button:   width: calc(100vw - 200px)
                 margin: 0 100px
                 height: 96px
                 border-radius: 9999px
                 background: #CC00FF
                 display: flex, align-items: center, justify-content: center

  name banner:   padding: 24px 0 0 0
                 overflow: hidden
                 text starts at or near left edge of viewport
                 font-size: clamp(100px, 15vw, 200px), weight 800
```

---

## 5. Responsive / Mobile Behaviour

> Breakpoint used throughout: `sm` = `640px` (Tailwind default).
> Everything below applies at `max-width: 639px` unless stated otherwise.
> Toggle and ProjectCard scale proportionally — no special mobile overrides needed.

---

### Hero Section — mobile

```
width:          100vw (unchanged)
min-height:     100svh  ← full screen height on mobile so arrows fill the view
background:     #f5f5f5 or #ffffff (match desktop)

layout change:  children stack differently on mobile:

  <MagneticFieldPattern />   position: absolute inset-0  (unchanged)

  <NavBar />                 position: absolute
                             top: 16px, right: 20px      ← tighter on mobile

  <ProfileCard />            position: absolute
                             bottom: 24px
                             left: 20px, right: 20px     ← 20px margins both sides
                             width: calc(100% - 40px)    ← fills width minus margins
                             min-width: unset            ← override the 380px desktop min
```

---

### MagneticFieldPattern — mobile

```
arrow element:  SVG viewBox unchanged ("0 0 40 40")
                width: 20px, height: 20px   ← half the desktop size (was 40×40)
                stroke-width: 2px           ← slightly thinner at small size
                all other SVG path coords unchanged (just scaled via width/height)
                opacity: 0.7 (unchanged)

grid spacing:   40px between element centers (was 80px on desktop)
                Use: grid-template-columns: repeat(auto-fill, 40px)
                Result: denser grid of smaller arrows — matches the screenshot

padding:        The pattern grid itself gains no padding.
                BUT the hero section has padding: 0 20px on mobile.
                Since the pattern is absolute inset-0 it still fills edge-to-edge.

touch devices:  No rotation interaction (no cursor on touch).
                All arrows render at rotate(0deg) — pointing right by default.
                Static pattern only.
```

---

### ProfileCard — mobile

```
From the screenshot, the card is full-width with 20px margins on each side.
The inner content reflows naturally — no layout changes needed inside the card.

position:       absolute, bottom: 24px
left:           20px
right:          20px
width:          calc(100% - 40px)
min-width:      unset   ← removes the 380px desktop constraint

name:           font-size scales down naturally — no override needed
                Inter Medium, 24px (unchanged, fits fine at full card width)

tags row:       flex-wrap: wrap (unchanged) — tags reflow to 2 columns naturally
```

---

### Footer CTA — mobile

```
From the screenshot: the pill button is full width with 20px left/right margins,
the email text is smaller, and the button does NOT bleed or overflow.

label:          "Open to a full time role or any exciting project"
                font-size: 13px (was 14px desktop)
                text-align: center
                padding: 0 20px   ← prevent label text from touching edges

pill button:    width: calc(100% - 40px)   ← full width minus 20px each side
                margin: 0 20px             ← 20px left + right (was 100px desktop)
                height: 72px               ← shorter than desktop 96px
                border-radius: 9999px      ← stays full pill
                background: #CC00FF        ← unchanged

email text:     font-size: 16px            ← reduced from desktop clamp(24px…40px)
                font-weight: 500
                color: #ffffff
                letter-spacing: -0.3px

copy icon:      size: 20px × 20px          ← slightly smaller than desktop 28px
                color: #ffffff

hover/press:    same as desktop — scale(1.01) on hover, scale(0.99) on press
click actions:  unchanged — mailto on button, clipboard copy on icon
```

---

### NameBanner — mobile

```
font-size:      clamp(56px, 15vw, 100px)   ← smaller floor so it fits at 375px
                but still bleeds off the right edge intentionally
letter-spacing: -2px                       ← reduced from desktop -4px
padding:        16px 0 0 20px              ← 20px left indent matches section gutters
overflow:       hidden (unchanged)
```

---

### Breakpoint Summary Table

| Element | Desktop (≥640px) | Mobile (<640px) |
|---|---|---|
| Arrow SVG size | 40×40px | 20×20px |
| Arrow grid spacing | 80px | 40px |
| Arrow stroke-width | 2.5px | 2px |
| Arrow interaction | rotate toward cursor | static, rotate(0deg) |
| Hero min-height | 560px | 100svh |
| NavBar position | top:18px right:32px | top:16px right:20px |
| ProfileCard position | bottom:32px left:32px, min-w:380px | bottom:24px left:20px right:20px, min-w:unset |
| CTA pill margin | `margin: 0 100px` | `margin: 0 20px` |
| CTA pill height | 96px | 72px |
| CTA email font-size | clamp(24px,3vw,40px) | 16px |
| CTA copy icon size | 28×28px | 20×20px |
| NameBanner font-size | clamp(100px,15vw,200px) | clamp(56px,15vw,100px) |
| NameBanner letter-spacing | -4px | -2px |
| PortfolioToggle | proportional (no change) | proportional (no change) |
| ProjectCard grid | 2 columns | proportional (no change) |

---

## 6. Interaction States

| Element | State | Style |
|---|---|---|
| NavBar link | hover | `background: #f5f5f5` |
| NavBar link | press | `background: #ebebeb` |
| MagneticFieldPattern element | mouse move | `rotate(angle)` toward cursor · `80ms ease-out` |
| MagneticFieldPattern | no cursor / initial | all elements `rotate(0deg)` |
| Toggle option | active | `background: #111111` · `color: #ffffff` |
| Toggle option | inactive | `background: #ffffff` · `color: #333333` |
| ProjectCard button (active) | hover | `background: #f5f5f5` |
| ProjectCard button (coming soon) | any | `cursor: not-allowed` · no visual change |
| Footer CTA pill | hover | `background: #BB00EE` · `transform: scale(1.01)` · `200ms ease-in-out` |
| Footer CTA pill | press | `transform: scale(0.99)` |
| Footer CTA pill | click (not on icon) | `window.location.href = "mailto:drizlad@gmail.com"` |
| Footer copy icon | click | copy email to clipboard · swap to ✓ icon for 2000ms · `e.stopPropagation()` |
| Footer copy icon | copied state | checkmark icon · `opacity` fade 150ms |
| Default transition | — | `transition-colors duration-150 ease-in-out` |

---

## 7. Tailwind Config Extensions

Add to `tailwind.config.js` under `theme.extend`:

```js
theme: {
  extend: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    colors: {
      'border-action':   '#dee0e3',
      'surface-neutral': '#f7f7f8',
      'text-primary':    '#14151a',
      'text-secondary':  'rgba(15, 19, 36, 0.6)',
      'tag-purple':      '#c300e5',
      'tag-blue':        '#0c3aff',
      'tag-green':       '#00e599',
      'tag-orange':      '#ff6f15',
    },
    borderRadius: {
      'card-outer': '16px',
      'card-inner': '10px',
      'tag':        '7px',
      'toggle':     '6px',
    },
    boxShadow: {
      'xs': '0 1px 2px rgba(20,21,26,0.05), inset 0 -1px 1px rgba(0,0,0,0.10)',
    },
    fontSize: {
      'caption': ['14px', { lineHeight: '20px', letterSpacing: '-0.1px' }],
    },
    maxWidth: {
      'projects': '1112px',
    },
  },
},
```

---

## 8. Suggested Component File Structure

```
src/
├── components/
│   ├── NavBar.tsx                  ← Behance / Dribble / Linkedin links
│   ├── ProfileCard.tsx             ← Details card with name + skill tags
│   ├── MagneticFieldPattern.tsx    ← Arrow grid with real-time cursor rotation
│   ├── PortfolioToggle.tsx         ← "Ai built" / "View pre AI" tab switcher
│   ├── ProjectCard.tsx             ← Card with gridImage + title + desc + button
│   ├── FooterCTA.tsx               ← Pill button: mailto + clipboard copy
│   └── NameBanner.tsx              ← Oversized "Idris Adeyemi" bleed text
├── data/
│   └── projects.ts                 ← Existing project data file (import as-is)
├── app/ (or pages/)
│   └── page.tsx                    ← Composes: Hero → Projects → Footer
└── styles/
    └── globals.css                 ← Inter font import + base reset
```

---

## 9. Font Setup

**Option A — Google Fonts (globals.css)**

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');

body {
  font-family: 'Inter', sans-serif;
}
```

**Option B — Next.js font optimization (layout.tsx)**

```ts
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '800'],
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
```

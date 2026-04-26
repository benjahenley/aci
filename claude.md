# OCS structural teardown → ACI Facility Management

> What we're stealing: layout patterns, components, hierarchy, motion.
> What we're replacing: colors (OCS warm cream + orange + navy → ACI bone + red + charcoal).
> What we're discarding: the OCS-specific imagery and copy.

---

## The recipe in one sentence

A **light, warm, low-contrast canvas** with one **single sharp accent color** used only on CTAs / arrows / underlines / hover states, asymmetric editorial sections, and **carousels with rounded image cards** that re-balance their sizes when you advance them.

That's the whole formula. The rest is just discipline.

---

## ACI palette (replacing OCS's)

```css
:root {
  /* Surface */
  --aci-bone:        #F7F4EE;   /* dominant page background, warm off-white */
  --aci-paper:       #FFFFFF;   /* card backgrounds, lifts off bone */
  --aci-tint:        #FBEEEE;   /* very pale red wash — the "section block" surface */
  --aci-card-dark:   #1A1A1A;   /* news/article card background */

  /* Brand */
  --aci-red:         #E8262A;   /* primary accent — CTAs, arrows, underlines */
  --aci-red-hover:   #C71F23;   /* CTA hover */
  --aci-red-soft:    #F8C9CA;   /* progress-bar trail, subtle states */
  --aci-charcoal:    #1A1A1A;   /* logo dark, headings, body emphasis */

  /* Ink */
  --aci-ink:         #2A2A2A;   /* body copy */
  --aci-ink-mute:    #7A7A7A;   /* off-state headlines, metadata */
  --aci-hairline:    #E8E2D6;   /* dividers, bullet separators */
}
```

> **Important constraint:** ACI's red is more saturated than OCS's orange. To avoid a "red site,"
> red must stay a **point accent**, never a field. Treat it like ink on paper, not paint.
> If you ever want to ask "should this be red?" the answer is almost always no — use charcoal,
> let red appear once per viewport.

---

## Components extracted from OCS

### 1. Top bar + navigation (screenshot 1)

**Structure:**
- Two stacked rows: thin utility bar (language switcher, region globe) above main nav.
- Main nav: logo left, **5–6 nav items center-aligned with chevron-down on hover-dropdowns**, search icon + pill CTA right.
- Background: bone, no shadow, no border. The page just starts.

**ACI version:**
- Utility row: phone / email / WhatsApp on the left, no language switcher (Spanish only).
- Main nav items (Spanish):
  `Servicios ▾` · `Sectores ▾` · `Nosotros ▾` · `Sostenibilidad` · `Novedades`
- CTA pill: **"Solicitar propuesta"** — filled red, white text, fully rounded.
- Logo block on the left: AFM mark at ~44px height with the "ACI FACILITY MANAGEMENT SA" lockup.

```
[ +54 11 xxxx-xxxx · contacto@acifm.com.ar · WhatsApp ]
[ AFM logo            Servicios ▾  Sectores ▾  Nosotros ▾  Sostenibilidad  Novedades            🔍   [Solicitar propuesta] ]
```

---

### 2. Hero section (screenshot 1)

This is the part you want to copy carefully — it's what makes OCS feel premium.

**Structure:**
- Full-width photograph that fills ~85% of the viewport, with a **diagonal striped graphic overlay** on the right side (the orange angled stripes).
- Headline + sub + CTA float over the photo, **bottom-left aligned**.
- Above the headline, a **floating white card** holds a "tag" — for OCS it's the EMCOR acquisition badge. Useful for news/announcement framing.
- A small chip-shaped overlay credit (logo of partner) sits inside that white card.
- Bottom-right: prev/next arrow circles in white pill with red icon.

**ACI version:**
- Photograph: a real Argentine corporate / industrial environment (a Puerto Madero tower lobby, a microcentro office floor mid-clean, a rooftop AC plant under maintenance — choose by season).
- Diagonal stripes in `--aci-red` at low opacity (8–12%) overlaid on the right third — exactly the OCS move but red instead of orange. This is the single bold graphic flourish on the page.
- Headline (Spanish, two-line, declarative — bottom left over photo):

  > **Un solo proveedor.**
  > **Todo lo que tu edificio necesita.**

- Sub (one sentence, max ~140 chars):
  > "Mantenimiento técnico, limpieza, jardinería, seguridad y gestión integral — desde Buenos Aires, para empresas que no pueden parar."

- CTA: red pill button **"Conocé nuestros servicios"** (or "Solicitar propuesta" for the harder ask).
- Floating tag card (top-left of the headline block): use it for **"Nueva en Argentina · Servicios Integrales 2026"** or remove for v1 if there's no announcement.
- Bottom-right: same arrow pair, white circle + red icon, for hero-image rotation (3 photos max, no autoplay).

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│              [ photograph + diagonal red stripes overlay ]     │
│                                                                │
│   ┌──────────────────┐                                         │
│   │ Servicios IFM    │    ← floating white card / tag          │
│   └──────────────────┘                                         │
│                                                                │
│   Un solo proveedor.                                           │
│   Todo lo que tu edificio necesita.                            │
│   Mantenimiento, limpieza, seguridad y gestión integral...     │
│                                                                │
│   [ Conocé nuestros servicios → ]            ◀  ▶              │
└────────────────────────────────────────────────────────────────┘
```

**Critical detail:** the OCS hero is **NOT a video, NOT a carousel-as-fashion-show**. It's a single confident still, with optional manual advance to 2-3 alternates. Keep that discipline.

---

### 3. Two-column intro + service-card carousel (screenshot 2)

**Structure:**
- Left column (~⅓ width): an h2 headline + paragraph + red pill CTA + carousel arrows.
- Right column: a horizontal carousel of **photo-topped cards with text below**.
- Cards have:
  - Rounded corners (~16px radius)
  - Photograph occupies the top ~55% of card
  - White-paper body below with title + 2-line description
  - **Floating circular icon button** (red, with arrow) anchored at the bottom-right of the photo, half-overlapping the photo/body boundary
  - Body has a subtle drop shadow / lift off the bone background
- Arrows under the left text are minimal — outline circle for "prev," filled red circle for "next" (active state).

**ACI version:**
- Left headline:
  > **Experiencia local.**
  > **Capacidad integral.**
- Left paragraph: "Servicios técnicos y operativos auto-prestados en CABA y AMBA, con estándares consistentes que sostienen la productividad y resiliencia de tu operación día a día."
- Left CTA (pill): **"Encontrá tu equipo local"** or **"Hablemos"**
- Cards (the three pillars from the CLAUDE.md taxonomy — perfect fit here):
  1. **Servicios Técnicos** (Hard FM): "Instalaciones eléctricas, electromecánicas y electrónicas. Mantenimiento preventivo y correctivo."
  2. **Servicios Operativos** (Soft FM): "Limpieza, jardinería, control de plagas y seguridad — auto-prestados con personal propio."
  3. **Gestión y Logística**: "Administración de oficinas, logística de mercaderías y asesoramiento en gestión empresarial."

This 3-card layout is also ACI's full top-level service taxonomy — kills two birds with one stone.

---

### 4. ESG / values block (screenshot 3)

**Structure:**
- Pale-tint background (OCS uses sage green `#EDF3EA`; ACI will use `--aci-tint` red wash).
- Centered eyebrow line at top: italic-feeling pull-quote in charcoal.
- Two-column body: large rounded photograph on the left, **vertical accordion-style list of 3-4 topics on the right**.
- The active/expanded item has full-color black text + a colored vertical bar (OCS: green; ACI: red) on its left edge + an underlined "Find out more" link in the brand color.
- The other items are **grayed out** (`--aci-ink-mute`) until you click them, which is what creates the soft, focused feel.
- Surrounding container has rounded corners and sits inside the bone canvas like a slab.

**ACI version:**
- Eyebrow quote: *"Hacer las cosas bien — ese es el método ACI."*
- Three list items (only one expanded at a time):
  - **Compromiso con el cliente** — "Cada contrato es una relación de largo plazo. Auditorías mensuales, KPIs claros y un único punto de contacto."
  - **Responsabilidad operativa** — "Personal propio capacitado, equipamiento certificado, cumplimiento de normativa de higiene, seguridad y medio ambiente."
  - **Gestión integral** — "Hard, soft y back-office bajo un mismo paraguas. Una factura, un interlocutor, un nivel de servicio."
- Each closed item: muted grey heading + greyed-out body. Active item: charcoal heading, full-opacity body, red left-bar, red "Saber más" link.
- Photo on left: a real ACI moment — a worker, a building exterior, a maintenance scene.

The "muted-until-active" treatment is the **most distinctive UX move on the OCS page** — copy it exactly. It signals confidence (we don't need to shout all our values at once).

---

### 5. News/insights carousel with size-shift on advance (screenshots 4 & 5) — ★

This is the carousel you flagged. Let me describe what's actually happening:

**Structure (resting state, screenshot 4):**
- Centered title + subtitle + red pill CTA at the top.
- Below: 3 cards visible. The **first (leftmost) is double-width**, the next two are normal width. A 4th card peeks in from the right, partially clipped.
- All cards are dark-photo cards with text overlaid (white text, gradient toward the bottom for legibility).
- Categories shown as small text chips above the headline (e.g., "Contract Win | Soft Services").
- The featured (large) card has additional metadata at the bottom: a tiny avatar circle + author name + date + "Read more" link.
- Below the cards: a **horizontal progress bar** in the brand color showing scroll position (~33% filled at rest), and prev/next arrow circles to the right.

**Structure (after pressing next, screenshot 5):**
- The carousel slides by one card.
- The **previously-second card is now the featured (double-width) card** with full metadata visible.
- The previous featured card slides out partially to the left.
- A new card appears on the right.
- Progress bar advances proportionally; the "next" arrow becomes a filled-red circle (active state).

**Why this is good:** The "first card is featured" treatment means there's always **one focal article** without losing the rhythm of the row. As you advance, the focal-point passes left-to-right through the items. It's the magazine equivalent of "the cover story rotates."

**ACI version:**
- Section title: **"Novedades y casos"**
- Subtitle: "Conocé los proyectos, contratos y novedades de ACI."
- CTA pill: **"Ver todas las novedades"**
- Cards (same dark-photo + white-text format):
  - Category chip in light-red on dark photo, e.g. "Contrato | Servicios Técnicos" or "Caso de éxito | Limpieza"
  - Headline: ~22px white serif-feeling sans, weight 500
  - Featured card adds avatar + "ACI Equipo" + date + "Leer más" underline
- Progress bar: `--aci-red-soft` track + `--aci-red` fill
- Arrow circles: outline circle (resting) + filled red circle (active/hovered)

**Implementation note:**
This is a **scroll-snap carousel with width modifier on the snapped item**. The CSS pattern:

```css
.carousel { display: flex; gap: 24px; overflow-x: scroll; scroll-snap-type: x mandatory; }
.card { flex: 0 0 320px; scroll-snap-align: start; }
.card.is-featured { flex: 0 0 640px; }   /* the snapped/active card doubles */
```

You toggle the `.is-featured` class on the leftmost-visible card via Intersection Observer. This is the move you said you liked.

---

### 6. Buttons & micro-components

**Pill button (primary):**
```css
.btn-primary {
  display: inline-flex; align-items: center; gap: 12px;
  padding: 14px 28px;
  background: var(--aci-red);
  color: #fff;
  border-radius: 999px;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: background 200ms ease, transform 200ms ease;
}
.btn-primary:hover { background: var(--aci-red-hover); transform: translateY(-1px); }
```

**Arrow circle button (secondary, used on carousels and cards):**
```css
.btn-arrow {
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 1.5px solid var(--aci-red);
  display: grid; place-items: center;
  color: var(--aci-red);
  transition: all 180ms ease;
}
.btn-arrow:hover, .btn-arrow.is-active {
  background: var(--aci-red);
  color: #fff;
}
.btn-arrow--filled { background: var(--aci-red); color: #fff; border: none; }
```

**Floating icon-on-card (the orange dot with arrow on the service cards):**
A 36px red circle with a white arrow-up-right inside, positioned absolutely at the bottom-right of the card photo, half-overlapping the photo/body boundary. Subtle box-shadow for lift.

**Underlined link with red:**
```css
.link-arrow {
  color: var(--aci-red);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}
```

**Carousel progress bar:**
```css
.progress { height: 3px; background: var(--aci-red-soft); border-radius: 999px; }
.progress-fill { height: 100%; background: var(--aci-red); border-radius: 999px; transition: width 300ms ease; }
```

---

### 7. Typography (mapped to ACI)

OCS uses what looks like **Open Sans** or a similar humanist sans throughout — it's friendly, not fashion-y. For ACI the same choice works, but I'd push slightly more contemporary:

| Role | Font | Size (desktop) | Weight | Tracking |
|---|---|---|---|---|
| Hero h1 | Inter / General Sans | 56–64px | 600 | -0.01em |
| Section h2 | Inter / General Sans | 36–44px | 500 | -0.005em |
| Card h3 | Inter / General Sans | 22–24px | 500 | 0 |
| Eyebrow | Inter | 13px | 500, UPPERCASE | +0.08em |
| Body | Inter | 17px | 400 | 0, line-height 1.55 |
| Small / meta | Inter | 13–14px | 400 | 0 |

> ACI's logo wordmark uses what looks like a custom condensed display face for "AFM" and a wider sans for "ACI FACILITY MANAGEMENT SA". Don't try to match that in body text — keep web typography clean and let the logo carry the industrial accent.

---

## What we are NOT copying from OCS

1. **The cookie banner takeover** — Argentina has milder cookie regs; one slim bottom-bar is enough.
2. **The 13-country region picker** — ACI is BA-based; remove this entirely.
3. **The mega-menu with photo previews on every nav item** — overkill for v1, use a simple dropdown.
4. **The 80+ page sitemap** — ACI v1 stays under 12 pages.

---

## Page rhythm summary (homepage scroll order)

1. **Hero** (full viewport) — photograph + red diagonal stripes + headline + CTA + arrows
2. **Two-column intro + 3-card service carousel** — "Experiencia local. Capacidad integral."
3. **Sectors strip** (small horizontal row of sector pills with photos — Corporativo, Industria, Salud, Educación, Retail, Logística)
4. **Values / ESG block** — pale red-tint surface, photo + accordion list
5. **Numbers band** — full-width charcoal section, large red numerals (clientes, m² gestionados, técnicos en planta) — ACI doesn't have these yet, so design the slot but populate as the company grows
6. **Novedades carousel** — the size-shift one
7. **CTA band** — full-width charcoal with one pill button: "Hablemos sobre tu edificio"
8. **Footer** — 4-column structural footer (Servicios, Sectores, Empresa, Contacto)

This rhythm — **light → light → light → tinted → dark → light → dark → light** — is what gives OCS its visual cadence. Without the dark interruption bands, every section blurs together. The numbers band and CTA band are the two charcoal "punctuation marks" in an otherwise light document.

---

*Last updated: 2026-04-25*

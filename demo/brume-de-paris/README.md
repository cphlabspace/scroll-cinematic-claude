# Brume de Paris — demo site

A polished, editorial landing page for the **Brume de Paris** collection of perfumed
sanitizing mists (*brume désinfectante parfumée*), built with the
[`scroll-cinematic`](../../SKILL.md) skill's smooth-scroll + reveal engine.

Four fragrances, each with its own color world that the ambient background morphs into
as you scroll:

| # | Fragrance | World |
|---|-----------|-------|
| 01 | Jardin des Tuileries | sage green |
| 02 | Nuit Saint-Honoré | lavender |
| 03 | Velours Blanc | warm cream |
| 04 | Riviera Soleil | golden amber |

## Run it

```bash
cd demo/brume-de-paris
python3 -m http.server 8782
# open http://localhost:8782
```

Or double-click **`Launch Demo.command`** (macOS).

## What's "cool" here

- **Pure-CSS bottles** modeled on the real product — white cap, dip-tube, tinted glass,
  serif labels — no image assets needed, so it loads instantly and scales crisply.
- **Scroll-reactive aura**: a soft, grainy color field that drifts and shifts to match
  the fragrance currently in view (`@property` color transitions + `IntersectionObserver`).
- **Lenis** smooth scroll, staggered reveal-on-enter, and count-up stats.
- Cormorant Garamond / Jost typography for an understated Parisian-maison feel.
- Fully responsive; respects `prefers-reduced-motion`.

## Upgrade path → real 3D

To turn this into the full cinematic "3D scroll" experience, run the parent skill to
generate a Higgsfield hero + a 360° bottle turntable clip, slice it into frames, and
swap the hero `.bottle` for a `<canvas>` scrub section (see `SKILL.md`, steps 2–6).
Stack: plain HTML + CSS + JS + Lenis, zero build.

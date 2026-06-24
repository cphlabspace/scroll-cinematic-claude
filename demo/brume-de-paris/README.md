# Brume de Paris — high-converting subscription landing page

A conversion-focused landing page for **Brume de Paris**, a *perfumed hand-sanitizer
subscription* — one refillable forever-bottle, a new Paris-inspired scent every month.
Built on the [`scroll-cinematic`](../../SKILL.md) engine (smooth scroll + reveals) with
real hero visuals generated via the **Higgsfield MCP**.

## The offer / innovation

- **Refillable forever-bottle** — keep one weighted glass spray for life; refills arrive
  in compostable pods (zero single-use plastic). This is the differentiator.
- **A new scent monthly** — rotating limited drops; keep, skip or swap any month.
- **Subscription, not a one-off** — recurring revenue, "never run dry" convenience.

## Conversion architecture (why it converts)

| Element | Purpose |
|---|---|
| Announcement bar + live 48h countdown | Urgency / founding-member offer |
| Hero: sharp value prop + ★4.9 social proof + dual CTA | Instant clarity, low-friction start |
| "As seen in" press bar | Borrowed authority |
| 3 innovation pillars + How-it-works (3 steps) | Reduce confusion, show the model |
| Four scent worlds (aura shifts color per scent) | Desire / product depth |
| Animated stats (70%, 12,400+ subs, 0 plastic, 4.9★) | Proof |
| 3-tier pricing, "Most popular", monthly/annual toggle, savings | Choice architecture + anchor |
| 30-day guarantee | Risk reversal |
| Testimonials + FAQ | Objection handling |
| Sticky CTA bar (appears after the fold, hides at pricing) | Always-available conversion |

## Run it

```bash
cd demo/brume-de-paris
python3 -m http.server 8782
# open http://localhost:8782
```
Or double-click **`Launch Demo.command`** (macOS).

## Resilience

- **Pure-CSS bottles** model the real product — no image assets required, instant load.
- **Lenis is optional**: if the CDN fails, the page falls back to native smooth scroll
  and every other feature (reveals, counters, countdown, pricing toggle, sticky CTA)
  keeps working. No single point of failure.
- Fully responsive; respects `prefers-reduced-motion`.

## Higgsfield visuals (generated, not yet baked in)

Real product shots were generated with the Higgsfield MCP (`nano_banana_pro`):
- `hero-jardin` — editorial single-bottle hero (sage / Jardin des Tuileries)
- `collection` — four-bottle flat-lay (social / OG image)

> **Note:** in the build environment the egress policy blocks the Higgsfield CDN, so these
> couldn't be downloaded into `assets/` here. To bake them in, run on an unrestricted
> network and drop the files in `assets/` as `hero-jardin.{png,jpg,webp}` — `app.js`
> auto-detects and swaps the CSS hero bottle for the real photo (`tryHeroShot()`).

### Upgrade path → the signature 3D scroll

To turn the hero into a true cinematic "3D scroll", generate a 360° bottle turntable
clip (`seedance_2_0`, 1080p), slice it to frames (`scripts/extract-frames.sh`), and swap
the hero bottle for a `<canvas>` scrub section — see `SKILL.md`, steps 2–6.

/* ============================================================
   Brume de Paris — scroll engine
   Lenis smooth scroll · reveal-on-enter · counters ·
   ambient aura that shifts to the scent world in view
   ============================================================ */

// each scent section paints the ambient aura with its own pair of colors
const WORLDS = {
  vert:  ["#aebfa4", "#cfe0c8"],
  lav:   ["#b3a9e0", "#d6cef2"],
  cream: ["#e8d3a8", "#f1e6c9"],
  gold:  ["#e3a93c", "#f0cf86"],
};

function setAura(a, b) {
  const aura = document.getElementById("aura");
  if (!aura) return;
  aura.style.setProperty("--aura-a", a);
  aura.style.setProperty("--aura-b", b);
}

function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const dur = 1600, t0 = performance.now();
  function step(t) {
    const k = Math.min((t - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - k, 3);
    const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
    el.textContent = val + suffix;
    if (k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
  // smooth scroll
  const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
  window.__lenis = lenis;
  function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);

  // reveal on enter + count-up
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      if (e.target.classList.contains("stat-num")) animateCount(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal, .stat-num").forEach((el) => io.observe(el));

  // aura follows whichever scent world is centered in the viewport
  const scentIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const w = WORLDS[e.target.dataset.scent];
      if (w) setAura(w[0], w[1]);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".scent").forEach((el) => scentIO.observe(el));

  // hide the scroll hint once you move
  lenis.on("scroll", ({ scroll }) => {
    const hint = document.getElementById("scroll-hint");
    if (hint) hint.style.opacity = scroll > 60 ? "0" : "1";
  });
});

/* ============================================================
   Brume de Paris — subscription landing engine
   Lenis smooth scroll · reveals · count-ups · scroll-reactive aura ·
   countdown · sticky CTA · nav state · pricing toggle
   ============================================================ */

const WORLDS = {
  vert:  ["#aebfa4", "#cfe0c8"],
  lav:   ["#b3a9e0", "#d6cef2"],
  cream: ["#e8d3a8", "#f1e6c9"],
  gold:  ["#e3a93c", "#f0cf86"],
};
function setAura(a, b){
  const aura = document.getElementById("aura");
  if(!aura) return;
  aura.style.setProperty("--aura-a", a);
  aura.style.setProperty("--aura-b", b);
}

function animateCount(el){
  if(el.dataset.text){ el.textContent = el.dataset.text; return; } // e.g. "0 plastic" -> word
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const isFloat = target % 1 !== 0;
  const dur = 1700, t0 = performance.now();
  function fmt(n){
    if(isFloat) return n.toFixed(1);
    return Math.round(n).toLocaleString("en-US");
  }
  function step(t){
    const k = Math.min((t - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - k, 3);
    el.textContent = fmt(target * eased) + suffix;
    if(k < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* 48h founding-member countdown (persists within the tab session) */
function startCountdown(){
  const el = document.getElementById("countdown");
  if(!el) return;
  let remaining = 48 * 3600; // seconds
  function tick(){
    const h = String(Math.floor(remaining/3600)).padStart(2,"0");
    const m = String(Math.floor((remaining%3600)/60)).padStart(2,"0");
    const s = String(remaining%60).padStart(2,"0");
    el.textContent = `${h}:${m}:${s}`;
    if(remaining > 0) remaining--;
  }
  tick();
  setInterval(tick, 1000);
}

/* swap CSS bottle for a real product shot if one is present */
function tryHeroShot(){
  const img = document.getElementById("hero-shot");
  if(!img) return;
  const candidates = ["assets/hero-jardin.png","assets/hero-jardin.jpg","assets/hero-jardin.webp"];
  let i = 0;
  function next(){
    if(i >= candidates.length) return;          // none present → keep CSS bottle
    img.onload = () => img.classList.add("loaded");
    img.onerror = () => { i++; next(); };
    img.src = candidates[i];
  }
  next();
}

/* monthly / annual pricing toggle */
function initPricing(){
  const btns = document.querySelectorAll(".pt-btn");
  const amts = document.querySelectorAll(".plan-price .amt");
  btns.forEach(b => b.addEventListener("click", () => {
    btns.forEach(x => x.classList.remove("is-active"));
    b.classList.add("is-active");
    const cycle = b.dataset.cycle;
    amts.forEach(a => { a.textContent = a.dataset[cycle]; });
    document.querySelectorAll(".per").forEach(p => p.textContent = cycle === "annual" ? "/mo · billed yearly" : "/mo");
  }));
}

document.addEventListener("DOMContentLoaded", () => {
  // smooth scroll — Lenis is optional. If the CDN didn't load, fall back to
  // native scrolling so the rest of the page still works.
  let lenis = null;
  const onScroll = (cb) => {
    if(lenis) lenis.on("scroll", ({ scroll }) => cb(scroll));
    else window.addEventListener("scroll", () => cb(window.scrollY), { passive: true });
  };
  if(typeof Lenis !== "undefined"){
    lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    window.__lenis = lenis;
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }

  // anchor links → smooth scroll (Lenis if present, else native)
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if(id.length < 2) return;
      const t = document.querySelector(id);
      if(!t) return;
      e.preventDefault();
      if(lenis) lenis.scrollTo(t, { offset: -10 });
      else t.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // reveals + count-ups
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if(!e.isIntersecting) return;
      e.target.classList.add("in");
      if(e.target.classList.contains("stat-num")) animateCount(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".reveal, .stat-num").forEach(el => io.observe(el));

  // aura follows the scent world in view
  const scentIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if(!e.isIntersecting) return;
      const w = WORLDS[e.target.dataset.scent];
      if(w) setAura(w[0], w[1]);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll(".scent").forEach(el => scentIO.observe(el));

  // nav state + scroll hint + sticky CTA
  const nav = document.getElementById("nav");
  const hint = document.getElementById("scroll-hint");
  const sticky = document.getElementById("sticky-cta");
  const plans = document.getElementById("plans");
  onScroll((scroll) => {
    if(nav) nav.classList.toggle("scrolled", scroll > 30);
    if(hint) hint.style.opacity = scroll > 60 ? "0" : "1";
    if(sticky && plans){
      const plansTop = plans.getBoundingClientRect().top + scroll;
      // show after the first viewport, hide once the user reaches the plans
      const show = scroll > window.innerHeight * 0.9 && scroll < plansTop - window.innerHeight * 0.4;
      sticky.classList.toggle("show", show);
    }
  });

  startCountdown();
  tryHeroShot();
  initPricing();
});

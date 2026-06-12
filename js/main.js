/* ═══════════════════════════════════════════════
   BITTA SWEETS · interactions & motion
   ═══════════════════════════════════════════════ */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Preloader → page load sequence ── */
  const preloader = $("#preloader");
  const boot = () => {
    setTimeout(() => {
      preloader.classList.add("is-done");
      document.body.classList.add("is-loaded");
      setTimeout(() => preloader.remove(), 1400);
    }, reduced ? 100 : 1500);
  };
  window.addEventListener("load", boot);
  setTimeout(boot, 4000); // safety net

  /* ── Sticky nav ── */
  const nav = $("#nav");
  const onScrollNav = () => nav.classList.toggle("is-scrolled", scrollY > 40);
  addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ── Mobile burger ── */
  const burger = $("#burger");
  const links = $("#navLinks");
  burger.addEventListener("click", () => {
    burger.classList.toggle("is-open");
    links.classList.toggle("is-open");
  });
  $$("#navLinks a").forEach(a =>
    a.addEventListener("click", () => {
      burger.classList.remove("is-open");
      links.classList.remove("is-open");
    })
  );

  /* ── Scroll reveals ── */
  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }),
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  $$(".reveal").forEach(el => io.observe(el));

  /* stagger index for signature cards */
  $$(".cards .card").forEach((c, i) => c.style.setProperty("--i", i % 4));

  /* ── Animated counters ── */
  const fmt = n => n.toLocaleString("en-IN");
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      counterIO.unobserve(e.target);
      const el = e.target, target = +el.dataset.count, dur = 1800, t0 = performance.now();
      const tick = t => {
        const p = Math.min((t - t0) / dur, 1);
        el.textContent = fmt(Math.round(target * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  $$("[data-count]").forEach(el => counterIO.observe(el));

  /* ── Menu tabs ── */
  $$(".menu__tab").forEach(tab =>
    tab.addEventListener("click", () => {
      $$(".menu__tab").forEach(t => { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      $$(".menu__panel").forEach(p => p.classList.toggle("is-active", p.dataset.panel === tab.dataset.tab));
    })
  );

  /* ── Testimonial rotator ── */
  const quotes = $$(".quote");
  const dotsWrap = $("#quoteDots");
  let qi = 0, qTimer;
  quotes.forEach((_, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", `Testimonial ${i + 1}`);
    b.addEventListener("click", () => { showQuote(i); restartQ(); });
    dotsWrap.appendChild(b);
  });
  const dots = $$("button", dotsWrap);
  function showQuote(i) {
    qi = i;
    quotes.forEach((q, k) => q.classList.toggle("is-active", k === i));
    dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
  }
  const restartQ = () => { clearInterval(qTimer); qTimer = setInterval(() => showQuote((qi + 1) % quotes.length), 5200); };
  showQuote(0); restartQ();

  /* ── Hero parallax ── */
  const para = $$("[data-parallax]");
  if (!reduced && para.length) {
    addEventListener("scroll", () => {
      para.forEach(el => {
        const f = +el.dataset.parallax;
        el.style.transform = `translateY(${scrollY * f}px)`;
      });
    }, { passive: true });
  }

  /* ── 3D tilt on cards / media ── */
  if (!reduced && matchMedia("(hover: hover)").matches) {
    $$("[data-tilt]").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });

    /* ── Magnetic buttons ── */
    $$("[data-magnetic]").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.32}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });

    /* ── Custom cursor ── */
    const cur = $("#cursor"), ring = $("#cursorRing");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      cur.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    }, { passive: true });
    (function follow() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(follow);
    })();
    $$("a, button, .card").forEach(el => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hot"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hot"));
    });
  }

  /* ── Gold dust particles ── */
  const canvas = $("#dust");
  if (canvas && !reduced) {
    const ctx = canvas.getContext("2d");
    let W, H, parts = [];
    const resize = () => {
      W = canvas.width = innerWidth * devicePixelRatio;
      H = canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = innerWidth + "px";
      canvas.style.height = innerHeight + "px";
    };
    resize(); addEventListener("resize", resize);
    const N = Math.min(70, innerWidth / 16);
    for (let i = 0; i < N; i++) {
      parts.push({
        x: Math.random(), y: Math.random(),
        r: (Math.random() * 1.6 + 0.4) * devicePixelRatio,
        vy: (Math.random() * 0.16 + 0.05) / 1000,
        vx: (Math.random() - 0.5) * 0.05 / 1000,
        a: Math.random() * 0.5 + 0.12,
        tw: Math.random() * Math.PI * 2
      });
    }
    (function draw(t) {
      ctx.clearRect(0, 0, W, H);
      parts.forEach(p => {
        p.y -= p.vy; p.x += p.vx; p.tw += 0.02;
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 169, 138, ${alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    })();
  }

  /* ── Deferred map load (Maps embed steals focus + scroll if loaded early) ── */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const mapFrame = $("#mapFrame");
  if (mapFrame) {
    const mapIO = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        mapFrame.src = mapFrame.dataset.src;
        mapIO.disconnect();
      }
    }, { rootMargin: "200px" });
    mapIO.observe(mapFrame);
  }

  /* ── Footer year ── */
  $("#year").textContent = new Date().getFullYear();
})();

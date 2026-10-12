(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }

  /* ---------------- language ---------------- */
  // The two languages are separate static pages (/ and /en/); the switch is a plain link and
  // only remembers the choice, so a later first-visit redirect does not fight the user.
  var lang = root.lang === "ru" ? "ru" : "en";
  var L = {
    ru: { win: "Скачать для Windows", linux: "Linux · AppImage", getLinux: "Скачать для Linux", altWin: "Windows · Установщик" },
    en: { win: "Download for Windows", linux: "Linux · AppImage", getLinux: "Download for Linux", altWin: "Windows · Installer" }
  }[lang];
  document.querySelectorAll(".seg-btn[data-lang]").forEach(function (a) {
    a.addEventListener("click", function () { store("ara-lang", a.dataset.lang); });
  });

  /* ---------------- theme + accent ---------------- */
  var themeBtn = document.getElementById("themeBtn");
  themeBtn.addEventListener("click", function () {
    var next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next; store("ara-theme", next);
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = next === "dark" ? "#151518" : "#f5f2f8";
  });
  var ACCENTS = [
    { n: "Lilac", h: 265, s: 70 }, { n: "Blue", h: 215, s: 80 }, { n: "Teal", h: 175, s: 65 }, { n: "Green", h: 135, s: 50 },
    { n: "Amber", h: 38, s: 90 }, { n: "Coral", h: 12, s: 85 }, { n: "Pink", h: 330, s: 75 }, { n: "Mono", h: 260, s: 4 }
  ];
  var swWrap = document.getElementById("swatches");
  function setAccent(i) {
    var a = ACCENTS[i];
    root.style.setProperty("--h", a.h); root.style.setProperty("--s", a.s + "%");
    swWrap.querySelectorAll(".sw").forEach(function (b, k) { b.setAttribute("aria-checked", String(k === i)); });
    store("ara-accent", String(i));
  }
  ACCENTS.forEach(function (a, i) {
    var b = document.createElement("button");
    b.className = "sw"; b.setAttribute("role", "radio"); b.setAttribute("aria-label", a.n);
    b.style.setProperty("--sh", a.h); b.style.setProperty("--ss", Math.max(a.s, 6) + "%");
    b.addEventListener("click", function () { setAccent(i); });
    swWrap.appendChild(b);
  });
  var savedAccent = parseInt(store("ara-accent"), 10);
  setAccent(isNaN(savedAccent) ? 0 : Math.min(savedAccent, ACCENTS.length - 1));

  /* ---------------- expressive shapes (same polar curves as the app) ---------------- */
  var SPEC = {
    circle: [1, 0], cookie4: [4, .10], cookie6: [6, .09], cookie9: [9, .075], cookie12: [12, .06],
    clover4: [4, .17], clover8: [8, .12], sunny: [8, .10], burst: [12, .16]
  };
  function shapePath(kind) {
    var sp = SPEC[kind] || SPEC.cookie9, n = sp[0], depth = sp[1], pts = [];
    for (var i = 0; i <= 160; i++) {
      var t = i / 160 * Math.PI * 2, r = 1 - depth * (1 - Math.cos(n * t));
      pts.push((r * Math.cos(t - Math.PI / 2)).toFixed(4) + " " + (r * Math.sin(t - Math.PI / 2)).toFixed(4));
    }
    return "M" + pts.join("L") + "Z";
  }
  document.querySelectorAll("svg[data-shape]").forEach(function (svg) {
    var p = svg.querySelector("path"); if (p) p.setAttribute("d", shapePath(svg.dataset.shape));
    if (!svg.hasAttribute("viewBox")) svg.setAttribute("viewBox", "-1.05 -1.05 2.1 2.1");
  });

  /* ---------------- reveal on scroll ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else revealEls.forEach(function (el) { el.classList.add("in"); });

  /* ---------------- nav shadow ---------------- */
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("stuck", window.scrollY > 24); }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------------- hero tilt ---------------- */
  var tilt = document.getElementById("tilt");
  if (tilt && !reduce && matchMedia("(hover: hover)").matches) {
    var win = tilt.querySelector(".window");
    tilt.addEventListener("pointermove", function (e) {
      var r = tilt.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      win.style.transform = "rotateY(" + (x * 9).toFixed(2) + "deg) rotateX(" + (-y * 7).toFixed(2) + "deg)";
    });
    tilt.addEventListener("pointerleave", function () { win.style.transform = ""; });
  }

  /* ---------------- screenshot tabs ---------------- */
  var tabs = document.querySelectorAll("#shotTabs .chip-btn"), imgs = document.querySelectorAll("#shotStack img");
  function showShot(id) {
    tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t.dataset.shot === id)); });
    imgs.forEach(function (i) { i.classList.toggle("on", i.dataset.shot === id); });
  }
  tabs.forEach(function (t) { t.addEventListener("click", function () { showShot(t.dataset.shot); stopAuto(); }); });
  var order = ["catalog", "filters", "discover", "settings"], idx = 0, auto = null;
  function stopAuto() { if (auto) { clearInterval(auto); auto = null; } }
  if (!reduce) auto = setInterval(function () {
    var box = document.getElementById("screens").getBoundingClientRect();
    if (box.top < innerHeight && box.bottom > 0) { idx = (idx + 1) % order.length; showShot(order[idx]); }
  }, 4200);

  /* ---------------- typing demo ---------------- */
  var typed = document.getElementById("typed"), hitsEl = document.querySelector(".hits"), typeTimer = null;
  var DEMO = [
    { q: "witcer 3", h: ["The Witcher 3", "The Witcher 2", "The Witcher"] },
    { q: "кибепанк", h: ["Cyberpunk 2077", "Cyberpunk 2077: Phantom Liberty"] },
    { q: "хадес", h: ["Hades", "Hades II"] }
  ];
  function restartTyping() {
    if (!typed) return;
    clearTimeout(typeTimer);
    var di = 0;
    (function run() {
      var d = DEMO[di % DEMO.length], k = 0;
      typed.textContent = ""; hitsEl.style.opacity = 0;
      (function type() {
        if (reduce) { typed.textContent = d.q; show(); return; }
        typed.textContent = d.q.slice(0, ++k);
        if (k < d.q.length) typeTimer = setTimeout(type, 90 + Math.random() * 70);
        else typeTimer = setTimeout(show, 250);
      })();
      function show() {
        hitsEl.innerHTML = d.h.map(function (h) { return '<span class="hit">' + h + "</span>"; }).join("");
        hitsEl.style.transition = "opacity .4s"; hitsEl.style.opacity = 1;
        if (!reduce) typeTimer = setTimeout(function () { di++; run(); }, 2600);
      }
    })();
  }

  /* ---------------- OS-aware primary download ---------------- */
  var URLS = {
    win: "https://github.com/BadKiko/Arachnel/releases/latest/download/Arachnel-Setup.exe",
    linux: "https://github.com/BadKiko/Arachnel/releases/latest/download/Arachnel-x86_64.AppImage"
  };
  function detectOS() {
    var ua = navigator.userAgent || "", linux = /Linux/i.test(ua) && !/Android/i.test(ua);
    var main = document.getElementById("ctaMain"), alt = document.getElementById("ctaAlt");
    var mt = document.getElementById("ctaMainText"), at = document.getElementById("ctaAltText");
    var first = linux ? "linux" : "win", second = linux ? "win" : "linux";
    main.href = URLS[first]; alt.href = URLS[second];
    mt.textContent = first === "win" ? L.win : L.getLinux;
    at.textContent = second === "linux" ? L.linux : L.altWin;
    main.querySelector("use").setAttribute("href", "#i-" + (first === "win" ? "download" : "download"));
    alt.querySelector("use").setAttribute("href", second === "linux" ? "#i-linux" : "#i-windows");
    document.getElementById("dlWin").classList.toggle("pick", !linux);
    document.getElementById("dlLinux").classList.toggle("pick", linux);
  }

  /* ---------------- latest release (falls back to static text) ---------------- */
  function mb(n) { return (n / 1048576).toFixed(0) + " MB"; }
  function fillRelease(r) {
    if (!r || !r.tag_name) return;
    document.getElementById("verChip").textContent = r.tag_name;
    (r.assets || []).forEach(function (a) {
      if (/Setup\.exe$/i.test(a.name)) document.getElementById("sizeWin").textContent = r.tag_name + " · " + mb(a.size);
      if (/AppImage$/i.test(a.name)) document.getElementById("sizeLinux").textContent = r.tag_name + " · " + mb(a.size);
    });
  }
  try {
    var cached = sessionStorage.getItem("ara-release");
    if (cached) fillRelease(JSON.parse(cached));
    else fetch("https://api.github.com/repos/BadKiko/Arachnel/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (r) { if (r) { fillRelease(r); try { sessionStorage.setItem("ara-release", JSON.stringify({ tag_name: r.tag_name, assets: (r.assets || []).map(function (a) { return { name: a.name, size: a.size }; }) })); } catch (e) {} } })
      .catch(function () {});
  } catch (e) {}

  detectOS();
  restartTyping();
})();

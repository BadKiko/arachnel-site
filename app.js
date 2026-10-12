(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }

  /* ---------------- i18n ---------------- */
  var T = {
    ru: {
      skip: "К содержимому",
      "nav.how": "Как это работает", "nav.features": "Возможности", "nav.screens": "Скриншоты", "nav.plugins": "Плагины", "nav.faq": "Вопросы", "nav.download": "Скачать",
      "hero.eyebrow": "Лаунчер игр · Windows и Linux", "hero.title": "Выбрал.<br>Скачал.<br>Играй.",
      "hero.lead": "Arachnel собирает каталог, загрузки и библиотеку в одном окне. На Windows всё просто запускается, на Linux лаунчер сам подтянет Proton и всё нужное.",
      "cta.win": "Скачать для Windows", "cta.linux": "Linux · AppImage", "cta.all": "Все релизы",
      "float.search": "Умный поиск", "float.play": "Играть",
      "m.catalog": "Каталог", "m.discover": "Подборки", "m.library": "Библиотека", "m.friends": "Друзья", "m.downloads": "Загрузки", "m.plugins": "Плагины",
      "how.eyebrow": "Plug and play", "how.title": "Три шага, и вы в игре", "how.lead": "Никаких настроек системы и ручной возни с запуском.",
      "how.s1.t": "Выберите игру", "how.s1.d": "Каталог с поиском, который прощает опечатки и понимает кириллицу и латиницу. Фильтры и сортировка под рукой.",
      "how.s2.t": "Скачайте", "how.s2.d": "Загрузки с понятным прогрессом, установка в выбранную папку, обновления игр в библиотеке.",
      "how.s3.t": "Нажмите «Играть»", "how.s3.d": "На Windows игра просто стартует. На Linux Arachnel сам настроит Proton, и вам не нужно трогать систему.",
      "f.eyebrow": "Возможности", "f.title": "Всё нужное, и ничего лишнего",
      "f.search.t": "Поиск, который понимает", "f.search.d": "Опечатки, раскладка и кириллица вместо латиницы: ищите так, как думаете.",
      "f.discover.t": "Подборки как лента", "f.discover.d": "Одна игра на экран: трейлер, жанры, «Играть» и «Не моё».",
      "f.linux.t": "Linux без боли", "f.linux.d": "Proton подтягивается сам. Лаунчер ставится как AppImage, без пакетов и зависимостей.",
      "f.theme.t": "Ваши цвета", "f.theme.d": "Тёмная и светлая тема, палитры и цвет акцента. Попробуйте прямо здесь.",
      "f.plugins.t": "Источники через плагины", "f.plugins.d": "В лаунчере нет встроенного каталога: плагин подключает источник и отвечает за скачивание, установку и запуск.",
      "f.friends.t": "Друзья", "f.friends.d": "Добавляйте друзей по коду и видьте, кто онлайн и во что играет.",
      "f.keys.t": "Для клавиатуры", "f.keys.d": "Быстрый поиск и переключение разделов без мыши.",
      "f.lang.t": "Русский и English", "f.lang.d": "Интерфейс переведён, переводы можно улучшать на Weblate.",
      "s.eyebrow": "Скриншоты", "s.title": "Посмотрите изнутри", "s.catalog": "Каталог", "s.filters": "Фильтры", "s.discover": "Подборки", "s.settings": "Настройки", "s.note": "На скриншотах тестовые данные.",
      "p.eyebrow": "Плагины", "p.title": "Подключите источник за минуту",
      "p.lead": "Плагин это маленькая надстройка к источнику. Он наполняет каталог и берёт на себя скачивание, установку и запуск.",
      "p.s1": "Откройте «Настройки → Плагины → Магазин плагинов»", "p.s2": "Установите плагин из списка, рекомендованные сверху", "p.s3": "Игры появятся в «Каталоге»",
      "p.sdk": "Написать свой плагин", "p.store": "Магазин плагинов", "p.i1": "Источник игр", "p.i1d": "Каталог, загрузка, установка, запуск", "p.rec": "Рекомендуем",
      "p.i2": "Ещё один источник", "p.i2d": "Устанавливается так же", "p.install": "Установить", "p.i3": "Установить из файла…",
      "d.eyebrow": "Скачать", "d.title": "Arachnel для вашей системы", "d.lead": "Свежая сборка всегда на GitHub Releases. Контрольные суммы лежат рядом.",
      "d.win": "Установщик для Windows 10 и 11", "d.getwin": "Скачать .exe", "d.linux": "AppImage для x86_64: сделайте исполняемым и запускайте", "d.getlinux": "Скачать AppImage",
      "d.sums": "Контрольные суммы SHA-256", "d.build": "Сборка из исходников",
      "q.eyebrow": "Вопросы", "q.title": "Коротко о главном",
      "q.1q": "Есть ли в Arachnel каталог игр?", "q.1a": "Встроенного каталога нет. Источники подключаются плагинами: плагин заполняет «Каталог» и отвечает за скачивание, установку и запуск.",
      "q.2q": "Как это работает на Linux?", "q.2a": "Лаунчер сам подтягивает Proton и всё, что нужно для запуска, чтобы вам не пришлось настраивать систему вручную.",
      "q.3q": "Запустится ли любая игра?", "q.3a": "Нет. Игры с DRM или античитом могут не работать. Это зависит от самой игры и источника.",
      "q.4q": "Куда сообщать об ошибках и идеях?", "q.4a": "В", "q.5q": "Можно ли помочь с переводом?", "q.5a": "Да, переводы живут на",
      "ft.proj": "Проект", "ft.docs": "Документация",
      "ft.legal": "Arachnel не хранит и не распространяет игры. Плагины создают сторонние авторы: вы отвечаете за то, что устанавливаете.",
      "alt.catalog": "Каталог Arachnel: сетка игр, сортировка по дате добавления", "alt.filters": "Лист фильтров каталога", "alt.discover": "Подборки: игра с трейлером и списком «Далее»", "alt.settings": "Настройки внешнего вида"
    },
    en: {
      skip: "Skip to content",
      "nav.how": "How it works", "nav.features": "Features", "nav.screens": "Screenshots", "nav.plugins": "Plugins", "nav.faq": "FAQ", "nav.download": "Download",
      "hero.eyebrow": "Game launcher · Windows & Linux", "hero.title": "Pick.<br>Download.<br>Play.",
      "hero.lead": "Arachnel puts the catalog, downloads and library in one window. On Windows it just runs; on Linux the launcher fetches Proton and everything else it needs.",
      "cta.win": "Download for Windows", "cta.linux": "Linux · AppImage", "cta.all": "All releases",
      "float.search": "Smart search", "float.play": "Play",
      "m.catalog": "Catalog", "m.discover": "Discover", "m.library": "Library", "m.friends": "Friends", "m.downloads": "Downloads", "m.plugins": "Plugins",
      "how.eyebrow": "Plug and play", "how.title": "Three steps to playing", "how.lead": "No system tweaking, no manual fiddling to get a game to start.",
      "how.s1.t": "Pick a game", "how.s1.d": "A catalog whose search forgives typos and mixes Cyrillic and Latin. Filters and sorting at hand.",
      "how.s2.t": "Download it", "how.s2.d": "Downloads with clear progress, installs into the folder you choose, game updates in your library.",
      "how.s3.t": "Hit Play", "how.s3.d": "On Windows the game simply starts. On Linux Arachnel sets up Proton for you, so you never touch the system.",
      "f.eyebrow": "Features", "f.title": "Everything you need, nothing you don't",
      "f.search.t": "Search that gets you", "f.search.d": "Typos, the wrong keyboard layout, Cyrillic instead of Latin: search the way you think.",
      "f.discover.t": "Discover as a feed", "f.discover.d": "One game per screen: trailer, genres, Play and Not for me.",
      "f.linux.t": "Linux without pain", "f.linux.d": "Proton is fetched automatically. The launcher ships as an AppImage: no packages, no dependencies.",
      "f.theme.t": "Your colors", "f.theme.d": "Dark and light themes, palettes and an accent color. Try it right here.",
      "f.plugins.t": "Sources via plugins", "f.plugins.d": "There is no built-in catalog: a plugin connects a source and handles download, install and launch.",
      "f.friends.t": "Friends", "f.friends.d": "Add friends by code and see who is online and what they play.",
      "f.keys.t": "Keyboard-friendly", "f.keys.d": "Quick search and section switching without the mouse.",
      "f.lang.t": "English & Русский", "f.lang.d": "The interface is translated, and translations can be improved on Weblate.",
      "s.eyebrow": "Screenshots", "s.title": "Take a look inside", "s.catalog": "Catalog", "s.filters": "Filters", "s.discover": "Discover", "s.settings": "Settings", "s.note": "Screenshots use sample data.",
      "p.eyebrow": "Plugins", "p.title": "Connect a source in a minute",
      "p.lead": "A plugin is a small add-on for a source. It fills the catalog and handles download, install and launch.",
      "p.s1": "Open Settings → Plugins → Plugin store", "p.s2": "Install a plugin from the list, recommended ones on top", "p.s3": "Games show up in Catalog",
      "p.sdk": "Write your own plugin", "p.store": "Plugin store", "p.i1": "Game source", "p.i1d": "Catalog, download, install, launch", "p.rec": "Recommended",
      "p.i2": "Another source", "p.i2d": "Installs the same way", "p.install": "Install", "p.i3": "Install from file…",
      "d.eyebrow": "Download", "d.title": "Arachnel for your system", "d.lead": "The latest build is always on GitHub Releases. Checksums sit next to it.",
      "d.win": "Installer for Windows 10 and 11", "d.getwin": "Download .exe", "d.linux": "x86_64 AppImage: make it executable and run", "d.getlinux": "Download AppImage",
      "d.sums": "SHA-256 checksums", "d.build": "Build from source",
      "q.eyebrow": "FAQ", "q.title": "The short version",
      "q.1q": "Does Arachnel include a game catalog?", "q.1a": "No built-in catalog. Sources are connected through plugins: a plugin fills the Catalog and handles download, install and launch.",
      "q.2q": "How does it work on Linux?", "q.2a": "The launcher fetches Proton and whatever else it needs to run games, so you don't have to set the system up by hand.",
      "q.3q": "Will every game run?", "q.3a": "No. Games with DRM or anti-cheat may not work. It depends on the game and the source.",
      "q.4q": "Where do I report bugs and ideas?", "q.4a": "On", "q.5q": "Can I help with translations?", "q.5a": "Yes, translations live on",
      "ft.proj": "Project", "ft.docs": "Docs",
      "ft.legal": "Arachnel does not host or distribute games. Plugins are made by third parties: you are responsible for what you install.",
      "alt.catalog": "Arachnel catalog: grid of games sorted by date added", "alt.filters": "Catalog filter sheet", "alt.discover": "Discover: a game with a trailer and an Up next list", "alt.settings": "Appearance settings"
    }
  };
  var lang = "ru";
  function applyLang(l) {
    lang = T[l] ? l : "en";
    root.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = T[lang][el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var v = T[lang][el.getAttribute("data-i18n-alt")];
      if (v != null) el.setAttribute("alt", v);
    });
    document.title = lang === "ru" ? "Arachnel — лаунчер игр для Windows и Linux" : "Arachnel — game launcher for Windows and Linux";
    document.querySelectorAll(".seg-btn").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    store("ara-lang", lang);
    detectOS(); // re-apply CTA labels after the text swap
    restartTyping();
  }
  document.querySelectorAll(".seg-btn").forEach(function (b) { b.addEventListener("click", function () { applyLang(b.dataset.lang); }); });

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
    mt.textContent = first === "win" ? T[lang]["cta.win"] : (lang === "ru" ? "Скачать для Linux" : "Download for Linux");
    at.textContent = second === "linux" ? T[lang]["cta.linux"] : (lang === "ru" ? "Windows · Установщик" : "Windows · Installer");
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

  applyLang(store("ara-lang") || root.lang);
})();

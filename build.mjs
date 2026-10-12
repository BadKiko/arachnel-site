// Builds the two static pages (ru at /, en at /en/) from src/template.html + src/i18n.mjs.
// Usage: node build.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import I18N from "./src/i18n.mjs";

const template = readFileSync(new URL("./src/template.html", import.meta.url), "utf8");
const ORIGIN = "https://arachnel.badkiko.ru";

const META = {
  ru: {
    title: "Arachnel: лаунчер игр для Windows и Linux",
    description: "Arachnel — лаунчер игр для Windows и Linux. Выбрал игру, скачал, нажал «Играть». Каталог, подборки, библиотека и плагины в стиле Material 3 Expressive.",
    ogTitle: "Arachnel: лаунчер игр",
    ogDescription: "Выбрал игру, скачал, нажал «Играть». Для Windows и Linux.",
    ogLocale: "ru_RU", canonical: ORIGIN + "/", base: "", ruHref: "./", enHref: "en/",
  },
  en: {
    title: "Arachnel: game launcher for Windows and Linux",
    description: "Arachnel is a game launcher for Windows and Linux. Pick a game, download it, hit Play. Catalog, Discover, library and plugins in Material 3 Expressive.",
    ogTitle: "Arachnel: game launcher",
    ogDescription: "Pick a game, download it, hit Play. For Windows and Linux.",
    ogLocale: "en_US", canonical: ORIGIN + "/en/", base: "../", ruHref: "../?nolang", enHref: "./",
  },
};

function render(lang) {
  const t = I18N[lang];
  const m = META[lang];
  let html = template;

  // Text of every [data-i18n] element (none of them nests another element of the same tag).
  html = html.replace(/(<([a-z0-9]+)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)([\s\S]*?)(<\/\2>)/g, (all, open, tag, key, _inner, close) => {
    if (!(key in t)) throw new Error(`missing ${lang} string: ${key}`);
    return open + t[key] + close;
  });
  // alt text.
  html = html.replace(/alt="[^"]*"(\s+)data-i18n-alt="([^"]+)"/g, (all, sp, key) => {
    if (!(key in t)) throw new Error(`missing ${lang} string: ${key}`);
    return `alt="${t[key].replace(/"/g, "&quot;")}"${sp}data-i18n-alt="${key}"`;
  });

  const vars = { ...m, lang, ruPressed: String(lang === "ru"), enPressed: String(lang === "en") };
  html = html.replace(/\{\{(\w+)\}\}/g, (all, k) => {
    if (!(k in vars)) throw new Error(`unknown placeholder ${k}`);
    return vars[k];
  });
  return html;
}

writeFileSync(new URL("./index.html", import.meta.url), render("ru"));
mkdirSync(new URL("./en/", import.meta.url), { recursive: true });
writeFileSync(new URL("./en/index.html", import.meta.url), render("en"));

writeFileSync(new URL("./sitemap.xml", import.meta.url), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>${ORIGIN}/</loc><xhtml:link rel="alternate" hreflang="ru" href="${ORIGIN}/"/><xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/en/"/></url>
  <url><loc>${ORIGIN}/en/</loc><xhtml:link rel="alternate" hreflang="ru" href="${ORIGIN}/"/><xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/en/"/></url>
</urlset>
`);
writeFileSync(new URL("./robots.txt", import.meta.url), `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`);
console.log("built: index.html, en/index.html, sitemap.xml, robots.txt");

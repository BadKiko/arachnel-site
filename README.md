# Arachnel site

Landing page for [Arachnel](https://github.com/BadKiko/Arachnel), the game launcher for Windows and Linux.
Plain HTML, CSS and a little JavaScript: no build step, no dependencies.

Material 3 Expressive look to match the app: tonal surfaces, big type, springy shapes. The accent colour,
light/dark theme and RU/EN language are switchable and remembered in the browser.

## Run locally

```sh
node build.mjs            # regenerate index.html, en/index.html, sitemap.xml, robots.txt
python3 -m http.server 8000
# open http://localhost:8000
```

The two languages are separate static pages, `/` (Russian) and `/en/` (English), built from
`src/template.html` and the strings in `src/i18n.mjs`. A first visit to `/` from a non-Russian browser
is sent to `/en/` once; the RU/EN switch remembers the choice.

## Layout

| Path | What |
|---|---|
| `src/template.html`, `src/i18n.mjs`, `build.mjs` | Source of the two pages and the build script |
| `index.html`, `en/index.html` | Generated pages (committed, served as is) |
| `styles.css` | Design tokens (dark and light), components, motion |
| `app.js` | Accent picker, expressive shapes, reveal, release info |
| `assets/img/*.webp` | App screenshots (sample data) |
| `assets/fonts/` | Roboto Flex (variable weight and width), self-hosted |

## Deploy

Served at https://arachnel.badkiko.ru by an nginx container behind Traefik on the VPS
(`/opt/arachnel-site`). To publish a change: push to `main`, then on the VPS run

```sh
/opt/arachnel-site/update.sh
```

## Notes

- Download buttons point at `releases/latest/download/Arachnel-Setup.exe` and `Arachnel-x86_64.AppImage`;
  the version and sizes are read from the GitHub API at runtime and fall back to static text.
- Screenshots are the app's own, taken with sample data. Replace the files in `assets/img/` to update them.

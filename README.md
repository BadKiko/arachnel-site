# Arachnel site

Landing page for [Arachnel](https://github.com/BadKiko/Arachnel), the game launcher for Windows and Linux.
Plain HTML, CSS and a little JavaScript: no build step, no dependencies.

Material 3 Expressive look to match the app: tonal surfaces, big type, springy shapes. The accent colour,
light/dark theme and RU/EN language are switchable and remembered in the browser.

## Run locally

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Layout

| Path | What |
|---|---|
| `index.html` | All sections and the icon sprite |
| `styles.css` | Design tokens (dark and light), components, motion |
| `app.js` | RU/EN strings, accent picker, expressive shapes, reveal, release info |
| `assets/img/*.webp` | App screenshots (sample data) |
| `assets/fonts/` | Roboto Flex (variable weight and width), self-hosted |

## Deploy

`.github/workflows/pages.yml` publishes the repo root to GitHub Pages on every push to `main`.
Enable it once under *Settings → Pages → Source: GitHub Actions*.

## Notes

- Download buttons point at `releases/latest/download/Arachnel-Setup.exe` and `Arachnel-x86_64.AppImage`;
  the version and sizes are read from the GitHub API at runtime and fall back to static text.
- Screenshots are the app's own, taken with sample data. Replace the files in `assets/img/` to update them.

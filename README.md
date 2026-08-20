# Nervous System Glossary

An interactive, editable glossary of nervous system terms for biology
students. Click a term to see a larger, labeled diagram and definition.
Terms can be added, edited, or deleted right in the browser — changes are
saved to `localStorage` so they persist between visits on the same device.

Includes a light/dark mode toggle (top right) — light mode is the default,
and the choice is remembered per device.

Built on [andrewbridge/vue-spa-template](https://github.com/andrewbridge/vue-spa-template):
no build step, no bundler — just Vue 3 and [goober](https://goober.js.org/)
loaded via an import map, with [Tabler](https://tabler.io/) for base UI.

## Local development

Serve it with any static HTTP server. A simple one is included:

```
npm install
npm run serve
```

Or skip `npm install` entirely and just point any static server (or the
VS Code "Live Server" extension) at this folder — there's nothing to build.

## Project structure

```
index.html                        Import map, fonts, Tabler CDN links, mounts #root
src/
  index.mjs                       Entry point — creates and mounts the app
  modules/
    deps.mjs                      Centralised third-party imports (vue, goober)
    services/
      data.mjs                    Reactive term store + localStorage persistence
      theme.mjs                   Light/dark mode state + localStorage persistence
    content/
      terms.mjs                   Seed term data + category colour helpers
      icons.mjs                   Small icons used in the term list
      diagrams.mjs                Larger labeled diagrams used in the popup
    components/
      App.mjs                     Root component
      NeuralHero.mjs              Decorative animated header graphic
      TermRow.mjs                 A term in the list (click to open, hover to edit/delete)
      AddTermForm.mjs             Form for adding a new term
      TermBubble.mjs              The popup with the big diagram + definition
  styles/
    app.css                       Palette, keyframes, and layout rules
manifest.json, icon.svg, sw.js    Minimal PWA support (installable, works offline after first load)
.github/workflows/deploy.yml      GitHub Pages deploy workflow (no build step)
```

## Deploying to GitHub Pages

1. Push this repo to GitHub.
2. In the repo settings, go to **Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` — the included workflow (`.github/workflows/deploy.yml`)
   publishes the repo as-is, with no build step.

The one thing the workflow does touch is `sw.js`: it holds a `%VERSION%`
placeholder in its cache name, which the deploy stamps with the short commit
SHA. Each deploy therefore gets its own cache (`nervous-glossary-<sha>`), and
the service worker deletes the previous one when it activates — so returning
visitors pick up the new code instead of being served stale cached assets.
Served straight from the repo locally, the placeholder is simply left alone.

## Notes

- Term edits are stored in the browser's `localStorage`, per-device. There's
  no backend, so edits made on one device/browser won't sync to another.
- `@tabler/core` and `@tabler/icons-webfont` are pulled from jsDelivr with
  the `@latest` tag for convenience. For a production site you may want to
  pin exact versions so a Tabler update can't unexpectedly change your styling.
- Diagrams and icons are plain inline SVG strings (see `content/diagrams.mjs`
  and `content/icons.mjs`) — new terms added through the UI reuse one of the
  existing icon styles rather than getting a custom diagram automatically.

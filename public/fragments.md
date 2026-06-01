# Fragments

> Fragments preserve real links while making same-origin navigation feel instant.

Add the browser router to your shell:

```html
<main id="content-slot"><!-- route body --></main>
<script type="module" src="/app/client.js"></script>
```

```js
import { installFragmentNavigation } from "/nativefragments/router.js";

installFragmentNavigation({
  slot: "#content-slot",
  prefetch: "intent",
});
```

The router intercepts same-origin clicks, fetches the route with `x-fragment: true`, replaces the slot, updates metadata, pushes history, and keeps external links as normal browser navigation.

## Nested Fragments

```html
<a href="/settings/profile" data-fragment-slot="settings-panel" data-fragment-prefetch="intent">Profile</a>
<section data-fragment-slot="settings-panel"></section>
```

The router sends `x-fragment-slot: settings-panel`, replaces only the matching container, updates history, and keeps the full route as the fallback.

## Prefetch

```html
<a href="/reports" data-fragment-prefetch="visible">Reports</a>
<a href="/settings" data-fragment-prefetch="load">Settings</a>
<a href="/logout" data-fragment-prefetch="none">Log out</a>
```

The default prefetch mode is `intent`, which prefetches same-origin fragments on hover and focus.

## Declarative Manifest

On Cloudflare, the Worker can use `HTMLRewriter` to detect `data-fragment-slot` and `data-fragment-prefetch` markup and append a `data-fragment-manifest` JSON script for the browser router and agents.

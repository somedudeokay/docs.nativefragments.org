# Signals

Core has no reactive state. Add the optional @nativefragments/signals package when an island needs local state and DOM bindings — and keep the server-rendered HTML as the source of truth.

> **Note:** Signals are a separate package, not part of @nativefragments/core. Reach for them only where a component needs client-side reactivity.

## Install

Add the package and copy its browser module next to the other helpers so it loads with no build step.

```shell
npm i @nativefragments/signals
cp node_modules/@nativefragments/signals/public/nativefragments/*.js public/nativefragments/
```

## State and bindings

`state` holds a value, `computed` derives one, and the `bind*` helpers wire a signal to the DOM. Pair them with a [Shadow DOM component](/concepts/components) to drive a small interactive island.

```js
// public/app/components/counter.js
import { bindText, computed, state } from "/nativefragments/signals.js";

const count = state(0);
const label = computed(() => `Count ${count.get()}`);

bindText(root.querySelector("[data-count]"), label);
root.querySelector("button").addEventListener("click", () => {
  count.set(count.get() + 1);
});
```

## Keep HTML canonical

Render meaningful HTML on the server first, then use signals to hydrate the interactive part. Don't hide the page behind a client-only app shell — that breaks the things that make the output readable.

## See also

- [Components](/concepts/components) — where signals usually live.
- [Agent-Friendly Apps](/concepts/agent-friendly) — keep content in the initial HTML.

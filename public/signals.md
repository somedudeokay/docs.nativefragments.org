# State

Core has no reactive state. Add the optional @nativefragments/signals package when an island needs local state and DOM bindings. Its API is based on the TC39 Signals proposal.

> **Note:** State is a separate package, not part of @nativefragments/core. Reach for it only where a component needs client-side reactivity.

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

## Shared state across fragments

Put a signal in its own module and import it wherever you need it. Because the module stays loaded across [fragment navigation](/concepts/fragments), the same signal is shared between components — even ones in different fragments that swap in and out.

```js
// public/app/state/cart.js — one signal, imported everywhere
import { state } from "/nativefragments/signals.js";

export const cartCount = state(0);
```

A badge in the persistent shell reads it; a button inside a swapped-in product fragment writes it.

```js
// public/app/components/cart-badge.js — lives in the shell
import { bindText } from "/nativefragments/signals.js";
import { cartCount } from "/app/state/cart.js";

bindText(this.querySelector("[data-count]"), cartCount);
```

```js
// public/app/components/add-to-cart.js — lives in a product fragment
import { cartCount } from "/app/state/cart.js";

button.addEventListener("click", () => cartCount.set(cartCount.get() + 1));
```

The badge updates the moment the button fires, and it stays correct as product fragments navigate in and out, because both sides point at the same `cartCount`.

## Keep HTML canonical

Render meaningful HTML on the server first, then use state to hydrate the interactive part. Don't hide the page behind a client-only app shell — that breaks the things that make the output readable.

## See also

- [Components](/concepts/components) — where state usually lives.
- [Fragments](/concepts/fragments) — how shared state survives navigation.

import { html } from "@nativefragments/core/server";
import { callout, code, docPage } from "./blocks.js";

export const signalsPage = () =>
  docPage({
    eyebrow: "Concepts",
    title: "State",
    intro:
      "Core has no reactive state. Add the optional @nativefragments/signals package when an island needs local state and DOM bindings. Its API is based on the TC39 Signals proposal.",
    body: html`
      ${callout(
        "Note",
        "State is a separate package, not part of @nativefragments/core. Reach for it only where a component needs client-side reactivity.",
      )}

      <h2>Install</h2>
      <p>
        Add the package and copy its browser module next to the other helpers so
        it loads with no build step.
      </p>
      ${code(`npm i @nativefragments/signals
cp node_modules/@nativefragments/signals/public/nativefragments/*.js public/nativefragments/`, "shell")}

      <h2>State and bindings</h2>
      <p>
        <code>state</code> holds a value, <code>computed</code> derives one, and
        the <code>bind*</code> helpers wire a signal to the DOM. Pair them with a
        <a href="/concepts/components">Shadow DOM component</a> to drive a small
        interactive island.
      </p>
      ${code(`// public/app/components/counter.js
import { bindText, computed, state } from "/nativefragments/signals.js";

const count = state(0);
const label = computed(() => \`Count \${count.get()}\`);

bindText(root.querySelector("[data-count]"), label);
root.querySelector("button").addEventListener("click", () => {
  count.set(count.get() + 1);
});`)}

      <h2>Shared state across fragments</h2>
      <p>
        Put a signal in its own module and import it wherever you need it.
        Because the module stays loaded across
        <a href="/concepts/fragments">fragment navigation</a>, the same signal is
        shared between components — even ones in different fragments that swap in
        and out.
      </p>
      ${code(`// public/app/state/cart.js — one signal, imported everywhere
import { state } from "/nativefragments/signals.js";

export const cartCount = state(0);`)}
      <p>
        A badge in the persistent shell reads it; a button inside a swapped-in
        product fragment writes it.
      </p>
      ${code(`// public/app/components/cart-badge.js — lives in the shell
import { bindText } from "/nativefragments/signals.js";
import { cartCount } from "/app/state/cart.js";

bindText(this.querySelector("[data-count]"), cartCount);`)}
      ${code(`// public/app/components/add-to-cart.js — lives in a product fragment
import { cartCount } from "/app/state/cart.js";

button.addEventListener("click", () => cartCount.set(cartCount.get() + 1));`)}
      <p>
        The badge updates the moment the button fires, and it stays correct as
        product fragments navigate in and out, because both sides point at the
        same <code>cartCount</code>.
      </p>

      <h2>Keep HTML canonical</h2>
      <p>
        Render meaningful HTML on the server first, then use state to hydrate the
        interactive part. Don't hide the page behind a client-only app shell —
        that breaks the things that make the output readable.
      </p>

      <h2>See also</h2>
      <ul>
        <li><a href="/concepts/components">Components</a> — where state usually lives.</li>
        <li><a href="/concepts/fragments">Fragments</a> — how shared state survives navigation.</li>
      </ul>
    `,
  });

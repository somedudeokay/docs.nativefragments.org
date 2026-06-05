import { installFragmentNavigation } from "/nativefragments/router.js";
import "/app/components/site-header.js";
import "/app/components/docs-search.js";

// Expose the fragment navigate function so <docs-search> can deep-link to a
// heading without a full page reload.
window.__nfNavigate = installFragmentNavigation({
  afterNavigate() {
    document.querySelector(".sidebar")?.scrollTo({ top: 0 });
    document.querySelector("nf-site-header")?.sync?.();
  },
});

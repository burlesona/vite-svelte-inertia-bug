import { createInertiaApp } from '@inertiajs/inertia-svelte'

createInertiaApp({
  // this janky thing is to make rollup glob work
  resolve: name => {
    const s = name.split('/');
    if (s.length == 1) return import(`./pages/${s[0]}.svelte`);
    if (s.length == 2) return import(`./pages/${s[0]}/${s[1]}.svelte`);
  },
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})

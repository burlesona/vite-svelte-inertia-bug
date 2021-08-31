import { createInertiaApp } from '@inertiajs/inertia-svelte'

createInertiaApp({
  resolve: name => import(`./pages/${name}.svelte`),
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})
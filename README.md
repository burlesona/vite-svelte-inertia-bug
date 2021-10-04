# Vite + Inertia + Svelte

To run in dev mode:

1. `yarn install`
2. In one terminal, `yarn vite`
3. In another terminal, `node app.js`
4. Open the app at `localhost:4000`.

To run in prod mode:

1. `yarn install`
2. `yarn build`
3. `ENV=production node app.js`
4. Open the app at `localhost:4000`.


There's a bug I'm tracking across two repos:

- https://github.com/sveltejs/vite-plugin-svelte/issues/175
- https://github.com/inertiajs/inertia/issues/826

The bug is that the $page object (a Svelte store) created by
`node-inertia` does not exist in dev mode. However, surprisingly,
it exists in production. In this example app you can see this by
checking the $page object which logs to the console and lists
its keys in the navbar across the top.

We see the same issue in another app using the same frontend libraries
but a Ruby backend.

Sorry the example is a little bit more than the bare minimum, it was
much quicker to dust off and update the deps on this prototype I made a while ago and see
that it has the same behavior than to construct a new example from scratch.

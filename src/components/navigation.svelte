<script>
  import { page, Link } from '@inertiajs/inertia-svelte'
  console.log($page)
</script>

<style>
  nav#primary {
    margin-top: 3em;
  }
</style>

<nav id="primary">
  <Link href="/">Home</Link>
  <Link href="/bikes">Bikes</Link>
  <Link href="/cart">Cart</Link>
  <p>$page has keys {Object.keys($page)}</p>
</nav>

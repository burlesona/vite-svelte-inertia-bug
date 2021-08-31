<script>
  import { Link } from '@inertiajs/inertia-svelte'
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
</nav>
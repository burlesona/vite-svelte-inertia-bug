<script>
  import { page, Link, inertia } from '@inertiajs/inertia-svelte'
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
  <a use:inertia href="/bikes?param1=true&param2=false">First Inertia Link</a>
  <Link href="/bikes?param1=true&param2=false">Second Inertia Link</Link>
  <p>$page has keys {Object.keys($page)}</p>
</nav>

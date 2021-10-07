<script>
  import { Link } from '@inertiajs/inertia-svelte'
  import Navigation from '../../components/navigation.svelte'
</script>

<style>
  .fine-print {
    color: #999;
    font-size: 0.8em;
  }
</style>

<Navigation />

<h1>Andrew's e-Bikes</h1>
<p>(and some regular bikes)</p>
<hr>
<p>Andrew's e-Bikes is the best localhost bike shop. Our reputation is built on
   our super-fast response time. Compare us to any other online bike shop, we guarantee
   we're faster.
</p>
<p>
   When you're ready to shell out, head to the <Link href="/bikes">bikes</Link> page.
</p>
<p class="fine-print">
  *Note, we only deliver to ports > 1024.
</p>

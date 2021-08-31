<script>
  // Props
  export let cart;

  // Imports
  import { inertia } from '@inertiajs/inertia-svelte'
  import Navigation from '../../components/navigation.svelte'

  function getPrice(cart) {
    let total = 0;
    cart.forEach((bike) => { total += bike.price_int });
    return total;
  }

  // This is how you have to delcare a computed value if you want the function to
  // re-run when it's arguments change.
  $: totalPrice = getPrice(cart).toLocaleString('en-US');

  function formData(bike){
    return {
      cart_id: bike.cart_id,
    };
  }

  function buyNow() {
    console.log('Bought this cart:',cart);
  }
</script>

<style>
  th.item {
    text-align: left;
    width: 300px;
  }
  .footer td {
    padding-top: 0.25em;
    border-top: 1px solid #AAA;
  }
  .total-label { text-align: right; }
</style>

<!-- CART PAGE -->

<Navigation />
<h1>Your shopping cart</h1>
<hr>

{#if cart.length <= 0}
  <p>There's nothing in your cart.</p>

{:else}
  <table class="cart">
    <thead>
      <tr>
        <th class="item">Item</th>
        <th>Price</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {#each cart as bike}
      <tr>
        <td>{bike.brand} {bike.name}</td>
        <td>{bike.price_display}</td>
        <td>
          <button use:inertia={{ method: 'delete', href: '/cart', data: formData(bike) }}>
            Remove
          </button>
        </td>
      </tr>
    {/each}
    </tbody>
    <tfoot>
      <tr class="footer">
        <td class="total-label">Total</td>
        <td class="total">${totalPrice}</td>
      <tr>
    </tfoot>
  </table>
{/if}

<hr>
<div class="actions">
  <button on:click={buyNow}>Buy everything!</button>
</div>
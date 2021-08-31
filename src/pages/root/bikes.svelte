<script>
  // Props
  export let bikes;
  export let cart;
  export let confirm_message = null;

  // Imports
  import { afterUpdate } from 'svelte'
  import { inertia, Link } from '@inertiajs/inertia-svelte'
  import Navigation from '@/components/navigation.svelte'

  export function bikeData(bike) {
    return { id: bike.id };
  }

  afterUpdate(() => {
    if (confirm_message) {
      setTimeout(() => { confirm_message = null }, 1500);
    }
  });

</script>

<style>
  header {
    display: flex;
    align-items: center;
  }

  header h1 { flex: 1; }

  .confirm-message {
    position: absolute;
    box-model: border-box;
    width: 320px;
    padding: 1em;
    top: 5em;
    left: calc(50% - 150px);
    background: #888;
    color: #FFF;
    display: flex;
  }

  .confirm-message .text {
    flex: 1;
  }

  .confirm-message .close {
    cursor: pointer;
    padding: 0 1em;
    font-family: sans-serif;
  }

  .bikes {
    display: flex;
    flex-wrap:  wrap;
  }

  .bike {
    padding: 1em;
    margin:  1em;
    border: 1px solid #999;
    border-radius: 4px;
  }

  .name {
    position: relative;
  }

  .name .brand {
    margin: 0;
    color: #777;
  }
  .name .model {
    margin: 0;
  }

  .name .badge {
    position: absolute;
    top:  0;
    right:  0;
    background: #FFFF00;
    color:  #000;
    font-weight: bold;
    padding: 0.25em;
    animation: shimmer 0.2s infinite;

  }

  @keyframes shimmer {
    0% { background: #FFEA29; }
    50% { background: #FFDD11; right: 2px }
    100% { background: #FFEA29; }
  }

  .actions {
    margin-top:  1em;
    display: flex;
    align-items: center;
  }

  .price {
    flex: 1;
    font-size: 1.2em;
  }

  .price .money {
    color: #2080BB;
  }

  .buy-button {
    display: inline-block;
    border: none;
    cursor: pointer;
    background: #21AC5C;
    color: #FFF;
    font-size: 1em;
    padding: 0.5em;
    border-radius: 10px;
    text-decoration: none;
  }
</style>

<Navigation />

<header>
  <h1>Bikes For Sales</h1>
  <div class="cart">
    {#if cart.length > 0}
      <div>{cart.length} items in cart.</div>
      <Link href="/cart">Checkout</Link>
    {:else}
      Nothing in your cart.
    {/if}
  </div>
</header>

{#if confirm_message}
  <div class="confirm-message">
    <span class="text">{confirm_message}</span>
    <span class="close" on:click={() => confirm_message = null}>X</span>
  </div>
{/if}

<div class="bikes">
  {#each bikes as bike}
    <div class="bike">
      <div class="name">
        <div class="brand">{bike.brand}</div>
        <h2 class="model">{bike.name}</h2>
        {#if bike.ebike}
          <div class="badge">E-Bike!</div>
        {/if}
      </div>

      <img src="{bike.image}" alt="{bike.name}" height="200">

      <div class="actions">
        <div class="price">
          Only <span class="money">{bike.price_display}</span>!
        </div>

        <button class="buy-button" use:inertia={{ href: "/bikes", method: "post", data: bikeData(bike) }}>
          Add to cart
        </button>
      </div>
    </div>
  {/each}
</div>
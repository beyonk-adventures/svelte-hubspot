<HubSpotTracking
  bind:this={hs}
  subdomain="js-eu1"
  hubId={import.meta.env.VITE_HUB_ID}
  disabled={true}
/>

<main>
  <slot></slot>
</main>

<footer>
  {#if !consented}
    <button type="button" on:click={consent}>Consent</button>
  {/if}
</footer>

<script>
  import { onMount } from 'svelte'
  import { navigating, page } from '$app/stores'
  import { HubSpotTracking } from '$lib'

  let hs
  let consented = false

  $: if ($navigating) {
    hs.setPageView($navigating.to)
  }

  onMount(() => {
    // initial navigation
    hs.setPageView($page)
  })

  function consent () {
    consented = true
    hs.init()
  }
</script>

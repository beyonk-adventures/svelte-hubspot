<HubSpotTracking
  bind:this={hs}
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
  import { onMount, tick } from 'svelte'
  import { getStores } from '$app/stores'
  import { HubSpotTracking } from '$lib'

  const { page } = getStores();

  let hs
  let consented = false

  onMount(() => {
    const unsubscribe = page.subscribe(async ($page) => {
      await tick()
      hs.setPageView($page)
    })

    return unsubscribe
  })

  function consent () {
    consented = true
    hs.init()
  }
</script>

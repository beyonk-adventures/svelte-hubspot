<HubSpotTracking
  bind:this={hs}
  subdomain="js-eu1"
  hubId={import.meta.env.VITE_HUB_ID}
  doNotTrack={!consented}
  loadChatWidgetImmediately={false}
/>

<main>
  <slot></slot>
</main>

<footer>
  {#if !consented}
    <button type="button" on:click={consent}>Consent</button>
  {:else}
    <button type="button" on:click={revoke}>Revoke</button>
  {/if}
</footer>

<script>
  import { onMount } from 'svelte'
  import { browser } from '$app/env'
  import { navigating, page } from '$app/stores'
  import { HubSpotTracking } from '$lib'

  let hs
  let consented = false

  $: if ($navigating) {
    hs.setPath($navigating.to)
  }

  onMount(() => {
    // initial navigation
    hs.setPath($page)
  })

  function consent () {
    consented = true
    hs.loadChatWidget()
  }

  function revoke () {
    consented = false;
  }
</script>

<HubSpotTracking
  bind:this={hs}
  subdomain="js-eu1"
  hubId={import.meta.env.VITE_HUB_ID}
  disabled={!consented}
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

  const cookie = '__hs_do_not_track'

  let hs
  let consented =
    browser &&
    document.cookie
      .split('; ')
      .reduce((acc, c) => {
        const [name, value] = c.split('=')
        return { ...acc, [name]: value }
      }, {})[cookie] === 'no'

  $: if ($navigating) {
    hs.setPath($navigating.to)
  }

  onMount(() => {
    // initial navigation
    hs.setPath($page)
  })

  function consent () {
    consented = true
    document.cookie = `${cookie}=no;max-age=${60*60*24*365}`
    hs.init()
  }

  function revoke () {
    document.cookie = `${cookie}=yes;max-age=${60*60*24*365}`
    consented = false;
  }
</script>

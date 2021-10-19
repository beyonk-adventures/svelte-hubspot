<HubSpotTracking
  bind:this={hs}
  hubId={import.meta.env.VITE_HUB_ID}
  disabled={true}
  on:load={() => { ready = true }}
/>

<button type="button" disabled={ready} on:click={enable}>Consent</button>

<script>
  import { HubSpotTracking } from '$lib'

  let hs
  let ready = false

  function enable () {
    hs.init()
  }
</script>

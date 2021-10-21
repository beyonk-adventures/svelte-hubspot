<script>
  import { onMount } from 'svelte'
  import loader from '@beyonk/async-script-loader'

  export let subdomain = 'js'
  export let hubId
  export let disabled = false

  const url = `//${subdomain}.hs-scripts.com/${hubId}.js`
  const globalName = '_hsp'

  onMount(() => {
    window._hsq = window._hsq || []

    if (!disabled) {
      init()
    }
  })

  function loaded () {
    return !!window[globalName]
  }

  export function init () {
    loader(
      [
        { type: 'script', async: true, defer: true, url },
      ],
      loaded,
      trackPageView
    )
  }

  export function setIdentity (email, properties = {}) {
    _hsq.push([ 'identify', { ...properties, email } ])

    if (loaded()) {
      trackPageView()
    } else {
      // identity will be pushed with the initial `trackPageView` call on load
    }
  }

  export function setPath ({ path, query }, track = loaded()) {
    _hsq.push([ 'setPath', `${path}?${new URLSearchParams(query)}` ])

    if (track) {
      trackPageView()
    }
  }

  function trackPageView () {
    _hsq.push([ 'trackPageView' ])
  }
</script>

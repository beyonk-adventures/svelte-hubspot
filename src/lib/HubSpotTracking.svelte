<script>
  import { onMount } from 'svelte'
  import loader from '@beyonk/async-script-loader'

  export let hubId
  export let disabled = false

  const url = `//js.hs-scripts.com/${hubId}.js`
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

  export function setPageView ({ path, query }) {
    _hsq.push([ 'setPath', `${path}?${query}` ])

    if (loaded()) {
      trackPageView()
    }
  }

  function trackPageView () {
    _hsq.push([ 'trackPageView' ])
  }
</script>

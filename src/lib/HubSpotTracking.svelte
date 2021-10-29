<script>
  import { onMount, tick } from 'svelte'
  import loader from '@beyonk/async-script-loader'

  export let subdomain = 'js'
  export let hubId
  export let doNotTrack = false

  const url = `//${subdomain}.hs-scripts.com/${hubId}.js`
  const globalName = '_hsp'

  let isMounted = false

  $: if (isMounted) {
    setDoNotTrackCookie(doNotTrack ? 'yes' : 'no')
  }

  onMount(async () => {
    window._hsq = window._hsq || []

    isMounted = true
    await tick()
    init()
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

  function setDoNotTrackCookie (value) {
    const cookie = '__hs_do_not_track'

    const expiry = new Date()
    expiry.setMonth(expiry.getMonth() + 13)

    document.cookie = `${cookie}=${value};Expires=${expiry.toUTCString()}`

    trackPageView()
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
    // __hs_do_not_track cookie will be honoured
    _hsq.push([ 'trackPageView' ])
  }
</script>

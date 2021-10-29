<script>
  import { onMount, tick } from 'svelte'
  import loader from '@beyonk/async-script-loader'

  export let subdomain = 'js'
  export let hubId
  export let doNotTrack = false
  export let loadChatWidgetImmediately = true

  const url = `//${subdomain}.hs-scripts.com/${hubId}.js`
  const globalName = '_hsp'

  let isMounted = false
  let isChatWidgetLoaded = false

  $: if (isMounted) {
    setDoNotTrackCookie(doNotTrack ? 'yes' : 'no')
  }

  onMount(async () => {
    window._hsq = window._hsq || []
    window.hsConversationsSettings = {
      loadImmediately: loadChatWidgetImmediately
    }
    window.hsConversationsOnReady = [onConversationsApiReady]

    isMounted = true
    await tick()
    init()
  })

  function isLoaded () {
    return !!window[globalName]
  }

  export function init () {
    loader(
      [
        { type: 'script', async: true, defer: true, url },
      ],
      isLoaded,
      trackPageView
    )
  }

  function onConversationsApiReady () {
    const status = window.HubSpotConversations.widget.status()

    isChatWidgetLoaded = status.loaded || (status.hasOwnProperty('pending') && !status.pending)
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

    if (isLoaded()) {
      trackPageView()
    } else {
      // identity will be pushed with the initial `trackPageView` call on load
    }
  }

  export function setPath ({ path, query }) {
    _hsq.push([ 'setPath', `${path}?${new URLSearchParams(query)}` ])

    refreshChatWidget()
    trackPageView()
  }

  function trackPageView () {
    // __hs_do_not_track cookie will be honoured
    _hsq.push([ 'trackPageView' ])
  }

  export function loadChatWidget () {
    const { widget } = window.HubSpotConversations || {}

    if (widget) {
      widget.load()
    } else {
      window.hsConversationsOnReady.push(loadChatWidget)
    }
  }

  function refreshChatWidget () {
    if (!isChatWidgetLoaded) {
      return
    }
    window.HubSpotConversations.widget.refresh()
  }
</script>

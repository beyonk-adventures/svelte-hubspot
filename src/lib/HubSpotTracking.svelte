<script>
  import { createEventDispatcher, onMount } from 'svelte'
  import loader from '@beyonk/async-script-loader'

  const dispatch = createEventDispatcher();

  export let hubId
  export let disabled = false

  const url = `//js.hs-scripts.com/${hubId}.js`
  const globalName = '_hsp'

  onMount(() => {
    if (disabled) { return }

    init()
  })

  export function init () {
    loader(
      [
        { type: 'script', async: true, defer: true, url },
      ],
      () => !!window[globalName],
      () => dispatch('load')
    )
  }
</script>

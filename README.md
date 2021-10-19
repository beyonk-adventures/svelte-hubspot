<p align="center">
  <img width="186" height="90" src="https://user-images.githubusercontent.com/218949/44782765-377e7c80-ab80-11e8-9dd8-fce0e37c235b.png" alt="Beyonk" />
</p>

## Svelte HubSpot

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com) [![Svelte v3](https://img.shields.io/badge/svelte-v3-blueviolet.svg)](https://svelte.dev)

Svelte HubSpot integration

## Installation

```sh
npm i -D @beyonk/svelte-hubspot
```

## Usage

```svelte
<!-- src/routes/__layout.svelte -->
<HubSpotTracking hubId="123456" />

<script>
  import { HubSpotTracking } from '@beyonk/svelte-hubspot'
</script>
```

### The `disabled` property (optional)

Pass `disabled={true}` if you require tracking to be enabled programmatically, e.g. as an upshot of user consent of GDPR policy.

```svelte
<HubSpotTracking bind:this={hs} hubId="123456" disabled={true} />

<script>
  let hs

  function enableTracking () {
    hs.init();
  }
</script>
```

### Events

`load`: emitted on load of tracking code

## Developing

In order to run the local demo you *must* pass a valid HubSpot ID otherwise it won't work:

```sh
VITE_HUB_ID=<your-hub-id> npm run dev
```

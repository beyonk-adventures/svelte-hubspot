declare module "@beyonk/svelte-hubspot" {
  import { SvelteComponentTyped } from 'svelte'

  export interface HubSpotTrackingProps {
    subdomain?: string
    hubId: string
    doNotTrack?: boolean
  }

  export class HubSpotTracking extends SvelteComponentTyped<HubSpotTrackingProps> {
    init(): void
    setIdentity(email: string, properties?: { [key: string]: any }): void
    setPath(
      page: {
        path: string,
        query: { [key: string]: string } | URLSearchParams
      },
      track?: boolean
    ): void
  }
}

declare module "@beyonk/svelte-hubspot" {
  import { SvelteComponentTyped } from 'svelte'

  export interface HubSpotTrackingProps {
    subdomain?: string
    hubId: string
    disabled?: boolean
  }

  export class HubSpotTracking extends SvelteComponentTyped<HubSpotTrackingProps> {
    init(): void
    setPageView(page: { path: string, query: URLSearchParams }): void
  }
}

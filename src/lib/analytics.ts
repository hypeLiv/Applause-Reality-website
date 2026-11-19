/**
 * Google Analytics 4 events. The tag itself is loaded in the root layout
 * (production only), so in development these calls are no-ops.
 *
 * Events sent (mark the ones that matter as key events in GA → Admin → Events):
 *   generate_lead   – consultation form sent (desktop) or handed to WhatsApp (phones)
 *   whatsapp_click  – any WhatsApp link tapped
 *   phone_click     – any tel: link tapped
 *   email_click     – any mailto: link tapped
 *   directions_click – the Google Maps link tapped
 */

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, { page_path: window.location.pathname, ...params });
}

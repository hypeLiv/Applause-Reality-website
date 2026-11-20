"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** Which contact channel a link opens, if any. */
function channel(href: string): string | null {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (/^https?:\/\/(api\.whatsapp\.com|wa\.me|web\.whatsapp\.com)\//.test(href)) return "whatsapp_click";
  if (/^https?:\/\/(maps\.google\.|www\.google\.[a-z.]+\/maps)/.test(href)) return "directions_click";
  return null;
}

/** The link without a prefilled WhatsApp message or email body (keeps the number tapped). */
function linkUrl(href: string) {
  try {
    const url = new URL(href);
    for (const key of ["text", "body", "subject"]) url.searchParams.delete(key);
    return url.toString();
  } catch {
    return href.split("?")[0];
  }
}

/**
 * One document-level listener reports every contact link (header, footer,
 * CTAs, floating buttons, blog posts…) so no component needs its own wiring.
 */
export default function ContactClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!(a instanceof HTMLAnchorElement)) return;
      const event = channel(a.href);
      if (!event) return;
      track(event, {
        link_url: linkUrl(a.href),
        link_text: (a.getAttribute("aria-label") || a.textContent || "").trim().slice(0, 100),
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

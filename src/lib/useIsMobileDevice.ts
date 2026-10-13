"use client";

import { useSyncExternalStore } from "react";

let cached: boolean | null = null;

/**
 * True on phones and tablets — devices where WhatsApp is expected to be
 * installed. Deliberately not a screen-width check: a narrow laptop window is
 * still a laptop. Touch-screen laptops keep a fine primary pointer, so they
 * count as desktop.
 */
function detect(): boolean {
  if (cached !== null) return cached;
  const nav = navigator as Navigator & { userAgentData?: { mobile?: boolean } };
  const ua = nav.userAgent;
  cached =
    nav.userAgentData?.mobile === true ||
    /Android|iPhone|iPod|iPad|Mobile|Opera Mini|IEMobile/i.test(ua) ||
    // iPadOS reports itself as a Mac; a Mac with multi-touch is an iPad.
    (/Macintosh/.test(ua) && nav.maxTouchPoints > 1) ||
    window.matchMedia("(pointer: coarse) and (hover: none)").matches;
  return cached;
}

const subscribe = () => () => {};

/** Server render (and first hydration pass) assumes desktop; phones switch right after. */
export function useIsMobileDevice(): boolean {
  return useSyncExternalStore(subscribe, detect, () => false);
}

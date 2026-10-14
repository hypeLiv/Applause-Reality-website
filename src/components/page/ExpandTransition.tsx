"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Shared-element hand-off from a project card to its page.
 *
 * Clicking an ExpandLink lifts the photo inside its `[data-expand-root]`
 * (the element marked `[data-expand-source]`) into a fixed overlay, grows it
 * into the PageHero frame and tints it like the hero, while the route changes
 * underneath. The new page renders ExpandLanding, which dissolves the overlay
 * into the real hero once its photo is ready.
 *
 * The overlay lives on <body>, outside React, so it survives the navigation.
 */

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const GROW_MS = 750;

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

let overlay: HTMLDivElement | null = null;
let grown: Promise<unknown> = Promise.resolve();

/** The PageHero frame at the top of the page: inset by its padding, rounded. */
function heroFrame() {
  const w = window.innerWidth;
  const pad = w >= 768 ? 16 : w >= 640 ? 12 : 8;
  return { top: pad, left: pad, width: w - pad * 2, height: window.innerHeight - pad * 2, radius: w >= 768 ? 32 : 24 };
}

function expandFrom(source: HTMLElement) {
  overlay?.remove();
  const rect = source.getBoundingClientRect();
  const img = source.querySelector("img");
  const radius = getComputedStyle(source).borderTopLeftRadius;
  const to = heroFrame();

  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  Object.assign(el.style, {
    position: "fixed",
    zIndex: "40",
    overflow: "hidden",
    pointerEvents: "none",
    background: "#050c1f",
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    borderRadius: radius,
  });
  if (img) {
    const photo = document.createElement("img");
    photo.src = img.currentSrc || img.src;
    photo.alt = "";
    Object.assign(photo.style, { position: "absolute", inset: "0", width: "100%", height: "100%", objectFit: "cover" });
    el.appendChild(photo);
  }
  // The same two washes PageHero lays over its photo, faded in as it grows.
  const tint = document.createElement("div");
  Object.assign(tint.style, {
    position: "absolute",
    inset: "0",
    opacity: "0",
    background:
      "linear-gradient(to right, rgb(5 12 31 / 0.85), rgb(5 12 31 / 0.5), rgb(5 12 31 / 0.1)), rgb(5 12 31 / 0.45)",
  });
  el.appendChild(tint);
  document.body.appendChild(el);
  overlay = el;

  const timing = { duration: GROW_MS, easing: EASE, fill: "forwards" as const };
  const box = el.animate(
    [
      { top: `${rect.top}px`, left: `${rect.left}px`, width: `${rect.width}px`, height: `${rect.height}px`, borderRadius: radius },
      { top: `${to.top}px`, left: `${to.left}px`, width: `${to.width}px`, height: `${to.height}px`, borderRadius: `${to.radius}px` },
    ],
    timing,
  );
  tint.animate([{ opacity: 0 }, { opacity: 1 }], timing);
  // Timers back up the animation promises: a backgrounded tab can pause the
  // animation, and the overlay must still clear.
  grown = Promise.race([box.finished.catch(() => undefined), wait(GROW_MS + 150)]);

  // If the new page never lands (a failed navigation), don't leave a curtain up.
  const stale = el;
  window.setTimeout(() => {
    if (overlay === stale) dissolve();
  }, 5000);
}

function dissolve() {
  const el = overlay;
  if (!el) return;
  overlay = null;
  const fade = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 500, easing: "ease-out", fill: "forwards" });
  Promise.race([fade.finished.catch(() => undefined), wait(650)]).then(() => el.remove());
}

/** A link that expands its card's photo into the next page's hero. */
export function ExpandLink({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const router = useRouter();
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        // New-tab clicks and reduced motion get a normal navigation.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const source = e.currentTarget
          .closest("[data-expand-root]")
          ?.querySelector<HTMLElement>("[data-expand-source]");
        if (!source) return;
        e.preventDefault();
        expandFrom(source);
        router.push(href);
      }}
    >
      {children}
    </Link>
  );
}

/** Rendered by the destination page: dissolves the overlay into its hero. */
export function ExpandLanding() {
  useEffect(() => {
    if (!overlay) return;
    let cancelled = false;
    const hero = document.querySelector<HTMLImageElement>('img[fetchpriority="high"]');
    const ready = hero?.decode ? hero.decode().catch(() => undefined) : Promise.resolve();
    // Wait for the grow to finish and the hero photo to be paintable (capped,
    // so a slow image never holds the curtain).
    Promise.all([grown, Promise.race([ready, wait(900)])]).then(() => {
      if (!cancelled) dissolve();
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}

"use client";

import { useEffect, useRef, useState } from "react";
import { INTRO_DONE_CLASS, INTRO_SEEN_KEY } from "@/lib/intro";
import { site } from "@/lib/site";

/** Minimum time the wall takes to cross, and the most we will ever wait for the page. */
const MIN_MS = 1800;
const MAX_MS = 3000;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * First-visit intro: a midnight wall slides left to right across an ivory
 * stage, uncovering the wordmark as the page loads. The wall's leading edge
 * carries the load counter. Once the wall is gone the stage lifts away.
 */
export default function IntroLoader() {
  const [gone, setGone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (html.classList.contains(INTRO_DONE_CLASS)) {
      setGone(true);
      return;
    }

    // Hold the page still (native scroll and Lenis) while the intro plays.
    const block = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const blockKeys = (e: KeyboardEvent) => {
      if ([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) block(e);
    };
    const opts = { capture: true, passive: false } as const;
    window.addEventListener("wheel", block, opts);
    window.addEventListener("touchmove", block, opts);
    window.addEventListener("keydown", blockKeys, opts);
    html.style.overflow = "hidden";

    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    const start = performance.now();
    let raf = 0;
    let shown = 0;
    let finishing = false;

    const release = () => {
      window.removeEventListener("wheel", block, opts);
      window.removeEventListener("touchmove", block, opts);
      window.removeEventListener("keydown", blockKeys, opts);
      window.removeEventListener("load", onLoad);
      html.style.overflow = "";
    };

    const finish = () => {
      finishing = true;
      try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {}
      const root = rootRef.current;
      if (!root) return;
      root.dataset.state = "lift";
      window.setTimeout(() => {
        html.classList.add(INTRO_DONE_CLASS);
        release();
        setGone(true);
      }, 900);
    };

    const frame = (now: number) => {
      const elapsed = now - start;
      // Time-driven sweep; if the page is still loading, stall short of the end.
      const timed = easeInOut(Math.min(1, elapsed / MIN_MS));
      const ready = loaded || elapsed > MAX_MS;
      const target = ready ? timed : Math.min(timed, 0.9);
      shown += (target - shown) * 0.25;
      if (target - shown < 0.001) shown = target;

      if (wallRef.current) wallRef.current.style.transform = `translate3d(${(shown * 100).toFixed(3)}%,0,0)`;
      if (countRef.current) countRef.current.textContent = String(Math.round(shown * 100)).padStart(3, "0");

      if (shown >= 1 && !finishing) {
        window.setTimeout(finish, 350);
      } else if (!finishing) {
        raf = requestAnimationFrame(frame);
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      release();
    };
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="intro" data-state="run" aria-hidden>
      <div className="intro-stage">
        <p className="intro-word">
          Applause <em>Reality</em>
        </p>
        <p lang="hi" className="intro-tag">
          {site.tagline}
        </p>
      </div>
      <div ref={wallRef} className="intro-wall">
        <span className="intro-edge">
          <span ref={countRef} className="intro-count">
            000
          </span>
        </span>
      </div>
    </div>
  );
}

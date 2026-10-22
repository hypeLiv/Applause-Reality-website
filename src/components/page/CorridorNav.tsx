"use client";

import { useEffect, useState } from "react";

type Item = { id: string; label: string; note: string };

/**
 * Sticky switcher for the location chapters. Sits just under the site header
 * and marks whichever chapter currently holds the middle of the screen.
 */
export default function CorridorNav({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= mid) current = item.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label="Locations" className="sticky top-[80px] z-40 flex justify-center px-4">
      <ul className="flex max-w-full gap-1 overflow-x-auto rounded-full bg-white/85 p-1.5 shadow-[0_24px_48px_-24px_rgba(11,23,51,0.3)] ring-1 ring-ink-900/10 backdrop-blur-xl [scrollbar-width:none]">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`lux-focus flex items-baseline gap-2 rounded-full px-4 py-2 font-text text-sm font-semibold transition-colors duration-300 ${
                  on ? "bg-royal text-white" : "text-ink-900/70 hover:text-ink-900"
                }`}
              >
                {item.label}
                <span className={`hidden text-xs font-medium sm:inline ${on ? "text-white/70" : "text-ink-900/45"}`}>{item.note}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

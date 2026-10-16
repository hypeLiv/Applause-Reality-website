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
      <ul className="lux-glass flex max-w-full backdrop-blur-xl gap-1 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none]">
        {items.map((item) => {
          const on = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`lux-focus flex items-baseline gap-2 rounded-full px-4 py-2 font-text text-sm font-semibold transition-colors duration-300 ${
                  on ? "bg-ivory text-ink-950" : "text-ivory/75 hover:text-ivory"
                }`}
              >
                {item.label}
                <span className={`hidden text-xs font-medium sm:inline ${on ? "text-ink-950/55" : "text-ivory/45"}`}>{item.note}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

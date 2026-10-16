"use client";

import Image from "@/components/Image";
import { useId, useState } from "react";
import { Bezel } from "@/components/home/ui";
import MorphGallery from "@/components/ui/morph-gallery";
import type { GalleryImage } from "@/content/projects";

/**
 * A project's renders as one morphing frame per group (Exteriors, Clubhouse…),
 * with group tabs above and a thumbnail strip below. Only the active group is
 * handed to the WebGL gallery, which uploads every slide as a texture up
 * front, so a phone holds a handful of textures rather than thirty.
 */
export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const id = useId();
  // The server sorts images by group, so first appearance is display order.
  const groups = [...new Set(images.map((im) => im.group))];
  const [group, setGroup] = useState(groups[0]);
  const [index, setIndex] = useState(0);
  const items = images.filter((im) => im.group === group);
  const current = items[index] ?? items[0];

  const choose = (g: (typeof groups)[number]) => {
    setGroup(g);
    setIndex(0);
  };

  return (
    <div>
      {groups.length > 1 && (
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
          <div role="tablist" aria-label="Gallery sections" className="inline-flex gap-1 rounded-full bg-white/[0.06] p-1 ring-1 ring-white/10">
            {groups.map((g) => (
              <button
                key={g}
                id={`${id}-${g}`}
                role="tab"
                type="button"
                aria-selected={g === group}
                aria-controls={`${id}-panel`}
                onClick={() => choose(g)}
                className={`lux-focus whitespace-nowrap rounded-full px-4 py-2 font-text text-sm font-semibold transition-colors ${
                  g === group ? "bg-ivory text-ink-950" : "text-ivory/65 hover:text-ivory"
                }`}
              >
                {g}
                <span className={`ml-1.5 tabular-nums ${g === group ? "text-ink-950/45" : "text-ivory/35"}`}>
                  {images.filter((im) => im.group === g).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-${group}`} className="mt-6">
        <Bezel coreClassName="relative">
          <MorphGallery
            // A new group remounts the gallery with only that group's textures.
            key={group}
            items={items.map((im) => ({ src: optimized(im.src), alt: im.alt }))}
            index={index}
            onIndexChange={setIndex}
            // Landscape renders: on narrow screens the width caps the height.
            height="clamp(15rem, min(58svh, 62vw), 40rem)"
            duration={1400}
            thumbnails={false}
            className="bg-ink-950"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-ink-950/80 via-ink-950/25 to-transparent px-5 pb-5 pt-16 md:px-9 md:pb-8">
            <div key={`${group}-${index}`} className="motion-safe:animate-[pillar-rise_700ms_var(--ease-lux)_both]">
              <p className="font-text text-xs font-semibold tracking-[0.22em] text-accent tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </p>
              <p className="lux-display mt-1.5 text-[clamp(1.5rem,3vw,2.5rem)] text-ivory">{current?.caption}</p>
            </div>
          </div>
        </Bezel>

        <ul className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 md:mt-5 md:gap-3">
          {items.map((im, i) => {
            const on = i === index;
            return (
              <li key={im.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-current={on}
                  aria-label={`Show ${im.caption}`}
                  className={`lux-focus group relative block aspect-[16/10] w-28 overflow-hidden rounded-xl ring-1 transition-[box-shadow,opacity] duration-500 md:w-40 ${
                    on ? "opacity-100 ring-2 ring-accent" : "opacity-50 ring-white/10 hover:opacity-85"
                  }`}
                >
                  <Image
                    src={im.src}
                    alt={im.alt}
                    fill
                    sizes="160px"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-[1.05]"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/**
 * The gallery's textures go through Next's image optimizer: a 1920px WebP is
 * a fraction of the original's bytes and stays same-origin, which WebGL needs.
 */
function optimized(src: string) {
  return `/_next/image?url=${encodeURIComponent(src)}&w=1920&q=75`;
}

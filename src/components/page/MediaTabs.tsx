"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "@/components/Image";
import { useId, useState } from "react";
import { EASE } from "@/components/home/motion";

type Media = { src: string; alt: string; fit?: "cover" | "contain" };

/**
 * A rounded media frame that flips between a project photo and its highlights
 * sheet. `overlay` sits on top of the frame (logo chip, badges).
 */
export default function MediaTabs({
  photo,
  highlights,
  overlay,
}: {
  photo: Media;
  highlights: Media;
  overlay?: React.ReactNode;
}) {
  const [tab, setTab] = useState<"photo" | "highlights">("photo");
  const id = useId();
  const items = { photo, highlights };
  const current = items[tab];

  return (
    <div>
      <div
        className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-ink-950 shadow-[0_40px_80px_-40px_rgba(11,23,51,0.55)]"
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-${tab}`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={tab}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={current.fit === "contain" ? "object-contain p-3" : "object-cover"}
            />
          </motion.div>
        </AnimatePresence>
        {overlay}
      </div>

      <div role="tablist" aria-label="Project media" className="mt-4 inline-flex rounded-full bg-ink-900/[0.06] p-1">
        {(["photo", "highlights"] as const).map((t) => (
          <button
            key={t}
            id={`${id}-${t}`}
            role="tab"
            type="button"
            aria-selected={tab === t}
            aria-controls={`${id}-panel`}
            onClick={() => setTab(t)}
            className={`lux-focus rounded-full px-4 py-2 font-text text-sm font-semibold capitalize transition-colors ${
              tab === t ? "bg-ink-900 text-ivory" : "text-ink-900/65 hover:text-ink-900"
            }`}
          >
            {t === "photo" ? "Photo" : "Project highlights"}
          </button>
        ))}
      </div>
    </div>
  );
}

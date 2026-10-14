"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import Tilt from "./Tilt";

export type Award = { src: string; w: number; h: number; title: string; meta: string };

/**
 * Recognitions as a masonry wall of framed photos that tilt toward the pointer;
 * clicking one opens it full size so the small print on certificates is legible.
 */
export default function AwardWall({ awards }: { awards: Award[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Award | null>(null);

  return (
    <>
      <ul className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {awards.map((a) => (
          <li key={a.src} className="mb-6 break-inside-avoid">
            <Tilt className="rounded-[22px]">
              <button
                type="button"
                onClick={() => {
                  setOpen(a);
                  dialog.current?.showModal();
                }}
                aria-label={`View ${a.title} full size`}
                className="lux-focus group block w-full overflow-hidden rounded-[22px] bg-ink-900 text-left ring-1 ring-white/10"
              >
                <Image
                  src={a.src}
                  alt={a.title}
                  width={a.w}
                  height={a.h}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                <span className="flex items-start justify-between gap-4 border-t border-white/10 px-5 py-4">
                  <span>
                    <span className="block font-sans text-[15px] font-semibold leading-snug text-ivory">{a.title}</span>
                    <span className="mt-1 block font-text text-[13px] text-ivory/55">{a.meta}</span>
                  </span>
                  <span
                    aria-hidden
                    className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 text-ivory/70 transition-colors group-hover:border-white/40 group-hover:text-ivory"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
                    </svg>
                  </span>
                </span>
              </button>
            </Tilt>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={open ? open.title : "Recognition"}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current?.close();
        }}
        className="m-auto w-[min(92vw,980px)] overflow-visible bg-transparent p-0 backdrop:bg-ink-950/85 backdrop:backdrop-blur-sm"
      >
        {open && (
          <figure className="relative overflow-hidden rounded-[24px] bg-ink-900 text-ivory">
            <Image src={open.src} alt={open.title} width={open.w} height={open.h} sizes="980px" className="mx-auto h-auto max-h-[78vh] w-auto" />
            <figcaption className="flex items-center justify-between gap-4 px-6 py-4">
              <span>
                <span className="block font-sans text-base font-semibold">{open.title}</span>
                <span className="font-text text-sm text-ivory/60">{open.meta}</span>
              </span>
              <button
                type="button"
                onClick={() => dialog.current?.close()}
                className="lux-focus rounded-full border border-white/20 px-4 py-2 font-text text-sm font-semibold hover:bg-white/10"
              >
                Close
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}

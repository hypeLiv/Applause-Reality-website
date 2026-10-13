"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-6">
      <div className="mx-auto flex h-16 max-w-[1392px] items-center justify-between gap-4 rounded-md border border-black/5 bg-white/95 px-3 shadow-[0_6px_24px_rgba(8,21,45,0.08)] backdrop-blur sm:h-20 sm:px-4">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.jpeg"
            alt="Applause Reality"
            width={178}
            height={51}
            priority
            className="h-10 w-auto sm:h-[51px]"
          />
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md bg-aqua px-5 py-3 font-text text-[15px] uppercase transition-colors hover:bg-lavender/50 xl:px-7 ${
                  active ? "underline underline-offset-4" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <a href={site.phone.href} className="hidden text-center sm:block">
            <span className="block font-text text-[15px] font-bold uppercase tracking-[0.05em] text-navy">
              Call Us
            </span>
            <span className="block font-text text-[17px] font-semibold leading-tight">
              {site.phone.display}
            </span>
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md bg-navy-deep px-6 py-4 font-display text-lg font-semibold text-white transition-colors hover:bg-navy md:block xl:px-10"
          >
            Free Consultation
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-md bg-aqua lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-auto mt-2 flex max-w-[1392px] flex-col gap-1 rounded-md bg-white p-3 shadow-lg lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md bg-aqua px-4 py-3 font-text uppercase"
            >
              {item.label}
            </Link>
          ))}
          <a href={site.phone.href} className="px-4 py-3 font-text font-semibold">
            Call {site.phone.display}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-navy-deep px-4 py-3 text-center font-display font-semibold text-white"
          >
            Free Consultation
          </a>
        </nav>
      )}
    </header>
  );
}

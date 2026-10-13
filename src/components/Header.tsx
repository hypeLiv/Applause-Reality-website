"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ConsultLink from "@/components/ConsultLink";
import { nav, site } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the homepage hero the bar dissolves into the framed photo; everywhere
  // else (and once scrolled) it is the frosted pill.
  const onHero = pathname === "/" && !scrolled && !open;

  const shell = `mx-auto flex h-16 items-center justify-between gap-3 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    onHero
      ? "max-w-[1360px] border-transparent bg-transparent px-4 md:px-8"
      : `max-w-[1120px] px-2.5 pl-5 backdrop-blur-xl ${
          scrolled
            ? "border-white/70 bg-white/85 shadow-[0_10px_40px_-12px_rgba(8,21,45,0.25)]"
            : "border-white/50 bg-white/70 shadow-[0_8px_30px_-14px_rgba(8,21,45,0.2)]"
        }`
  }`;

  const linkIdle = onHero
    ? "text-white/80 hover:bg-white/10 hover:text-white"
    : "text-ink-900/65 hover:bg-ink-900/[0.05] hover:text-ink-900";
  const linkActive = onHero ? "bg-white/15 text-white" : "bg-ink-900/[0.07] text-ink-900";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 sm:px-6 ${
        onHero ? "pt-6 sm:pt-7 md:pt-8" : "pt-4 sm:pt-5"
      } transition-[padding] duration-500`}
    >
      <div className={shell}>
        <Link href="/" className="relative h-9 w-[126px] shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-light.png"
            alt=""
            fill
            sizes="126px"
            priority
            className={`object-contain object-left transition-opacity duration-300 ${onHero ? "opacity-100" : "opacity-0"}`}
          />
          <Image
            src="/images/logo.png"
            alt="Applause Reality"
            fill
            sizes="126px"
            priority
            className={`object-contain object-left transition-opacity duration-300 ${onHero ? "opacity-0" : "opacity-100"}`}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-4 py-2 font-text text-[13px] font-medium uppercase tracking-[0.08em] transition-colors ${
                  active ? linkActive : linkIdle
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phone.href}
            className={`hidden items-center gap-2 rounded-full px-4 py-2 font-text text-[14px] font-semibold transition-colors md:flex ${
              onHero ? "text-white hover:bg-white/10" : "text-ink-900 hover:bg-ink-900/[0.05]"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className={`h-4 w-4 ${onHero ? "text-brass-soft" : "text-royal"}`}
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
            </svg>
            {site.phone.display}
          </a>
          <ConsultLink
            className={`hidden rounded-full px-5 py-2.5 font-text text-[14px] font-semibold transition-colors md:block ${
              onHero
                ? "border border-white/35 bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
                : "bg-ink-900 text-ivory hover:bg-royal"
            }`}
          >
            Free Consultation
          </ConsultLink>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-full transition-colors lg:hidden ${
              onHero ? "text-white hover:bg-white/10" : "text-ink-900 hover:bg-ink-900/[0.05]"
            }`}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-auto mt-2 flex max-w-[1120px] flex-col gap-1 rounded-[28px] border border-white/70 bg-white/90 p-3 shadow-[0_20px_50px_-20px_rgba(8,21,45,0.35)] backdrop-blur-xl lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-full px-4 py-3 font-text text-[14px] font-medium uppercase tracking-[0.08em] text-ink-900 hover:bg-ink-900/[0.05]"
            >
              {item.label}
            </Link>
          ))}
          <a href={site.phone.href} className="px-4 py-3 font-text font-semibold text-ink-900">
            Call {site.phone.display}
          </a>
          <ConsultLink
            onClick={() => setOpen(false)}
            className="rounded-full bg-ink-900 px-4 py-3 text-center font-text font-semibold text-ivory"
          >
            Free Consultation
          </ConsultLink>
        </nav>
      )}
    </header>
  );
}

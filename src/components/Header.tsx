"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ConsultLink from "@/components/ConsultLink";
import { nav, site } from "@/lib/site";

/** Pages whose hero is dark, matched by path so the first paint is already right. */
const DARK_HERO = /^\/($|projects|blog|post\/|about-applause-reality)/;

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // A section marked data-header-over-dark keeps the bar transparent for
      // as long as it sits behind it (e.g. a pinned full-bleed video hero).
      const dark = document.querySelector("[data-header-over-dark]");
      const r = dark?.getBoundingClientRect();
      setOverDark(!!r && r.top <= 0 && r.bottom > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Over a dark hero the bar dissolves into it: on any page that opens on a
  // dark hero until you scroll, and over any marked section while it's behind
  // the bar. Light-topped pages (consultation, privacy) keep the frosted pill.
  const darkTop = DARK_HERO.test(pathname);
  const onHero = !open && ((darkTop && !scrolled) || overDark);

  const shell = `mx-auto flex h-[52px] items-center justify-between gap-2 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    onHero
      ? "max-w-[1320px] border-transparent bg-transparent px-3 md:px-6"
      : `max-w-[1060px] px-1.5 pl-4 ${
          scrolled
            ? "border-white/70 bg-white shadow-[0_10px_40px_-12px_rgba(8,21,45,0.25)]"
            : "border-white/50 bg-white shadow-[0_8px_30px_-14px_rgba(8,21,45,0.2)]"
        }`
  }`;

  const linkIdle = onHero
    ? "text-white/80 hover:bg-white/10 hover:text-white"
    : "text-ink-900/65 hover:bg-ink-900/[0.05] hover:text-ink-900";
  const linkActive = onHero ? "bg-white/15 text-white" : "bg-ink-900/[0.07] text-ink-900";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-4 sm:px-6 ${
        onHero ? "pt-4 sm:pt-5 md:pt-6" : "pt-3 sm:pt-4"
      } transition-[padding] duration-500`}
    >
      <div className={shell}>
        <Link href="/" className="relative h-8 w-[112px] shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo-light.png"
            alt=""
            fill
            sizes="112px"
            priority
            className={`object-contain object-left transition-opacity duration-300 ${onHero ? "opacity-100" : "opacity-0"}`}
          />
          <Image
            src="/images/logo.png"
            alt="Applause Reality"
            fill
            sizes="112px"
            priority
            className={`object-contain object-left transition-opacity duration-300 ${onHero ? "opacity-0" : "opacity-100"}`}
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-full px-3.5 py-1.5 font-text text-[12px] font-medium uppercase tracking-[0.1em] transition-colors ${
                  active ? linkActive : linkIdle
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={site.phone.href}
            className={`hidden items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 font-text text-[13px] font-semibold transition-colors md:flex ${
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
              className={`h-3.5 w-3.5 ${onHero ? "text-accent-soft" : "text-royal"}`}
            >
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
            </svg>
            {site.phone.display}
          </a>
          <ConsultLink
            className={`hidden whitespace-nowrap rounded-full px-4 py-2 font-text text-[13px] font-semibold transition-colors md:block ${
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
            className={`grid h-9 w-9 place-items-center rounded-full transition-colors lg:hidden ${
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
        <nav className="mx-auto mt-2 flex max-w-[1060px] flex-col gap-1 rounded-[28px] border border-white/70 bg-white/90 p-3 shadow-[0_20px_50px_-20px_rgba(8,21,45,0.35)] backdrop-blur-xl lg:hidden">
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

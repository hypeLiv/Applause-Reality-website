"use client";

import Image from "@/components/Image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ConsultLink from "@/components/ConsultLink";
import { Arrow } from "@/components/home/ui";
import { isDarkBehind } from "@/lib/backdrop";
import { nav, site } from "@/lib/site";
import type { Img } from "@/sanity/media";

/** How often (ms) the logo re-checks what's behind it while scrolling: ~8 times a second. */
const PROBE_MS = 125;

export default function Header({ logo, logoOnDark }: { logo: Img; logoOnDark: Img }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const [overBackdrop, setOverBackdrop] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);

  // While the menu sheet is open: hold the page still and let Escape close it.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    // The logo probe is the costly part, so it runs at most every PROBE_MS (with a trailing run once
    // scrolling settles) and only from lg, where the logo stands bare; below lg it sits in the white pill.
    const wide = window.matchMedia("(min-width: 1024px)");
    let probeTimer = 0;
    let lastProbe = -PROBE_MS;
    const probe = () => {
      probeTimer = 0;
      lastProbe = performance.now();
      if (!wide.matches) setOverBackdrop(false);
      else if (logoRef.current && headerRef.current) setOverBackdrop(isDarkBehind(logoRef.current, headerRef.current));
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const behind = (selector: string) =>
        [...document.querySelectorAll(selector)].some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= 0 && r.bottom > 80;
        });
      // A section marked data-header-over-dark keeps the bar transparent for
      // as long as it sits behind it (e.g. a pinned full-bleed video hero).
      setOverDark(behind("[data-header-over-dark]"));
      // Whatever is directly behind the bare logo decides its colour (see lib/backdrop).
      probeTimer ||= window.setTimeout(probe, Math.max(0, PROBE_MS - (performance.now() - lastProbe)));
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(probeTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Every page opens on a light hero, so the bar is the white pill; it dissolves
  // only over a marked dark section while that sits behind it (e.g. a pinned video).
  // The open menu is a light full-screen sheet: the bar dissolves into it but keeps its ink.
  const clear = open || overDark;
  const onHero = overDark && !open;
  // From lg, once the page is scrolled, the bare logo and the consultation button slide into the links
  // pill, which stretches both ways to take them in.
  const merged = scrolled && !clear;
  // Over a dark backdrop the bare (lg) logo turns white; below lg (or merged) it sits in the white pill.
  const backdrop = overBackdrop && !open && !onHero && !merged;
  const glide = "duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";

  // Below lg the bar is one pill; from lg it splits apart: a bare logo, the links pill and the
  // consultation button, floating separately. Flex spacers (not a grid) place them so the split can
  // animate: at the top the row fills the bar and the links sit centred between logo and button (both
  // 188px wide); merged, the row shrinks to its content and the outer spacers centre it.
  const shell = `mx-auto flex h-[52px] items-center justify-between gap-2 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:max-w-[1320px] lg:justify-normal lg:gap-0 lg:border-transparent lg:bg-transparent lg:px-0 lg:pl-0 lg:shadow-none ${
    clear
      ? "max-w-[1320px] border-transparent bg-transparent px-3 md:px-6"
      : `max-w-[1060px] px-1.5 pl-4 ${
          scrolled
            ? "border-white/70 bg-white shadow-[0_10px_40px_-12px_rgba(8,21,45,0.25)]"
            : "border-white/50 bg-white shadow-[0_8px_30px_-14px_rgba(8,21,45,0.2)]"
        }`
  }`;
  const island = `transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    clear
      ? "lg:border-transparent lg:bg-transparent lg:shadow-none"
      : scrolled
        ? "lg:border-white/70 lg:bg-white lg:shadow-[0_10px_40px_-12px_rgba(8,21,45,0.25)]"
        : "lg:border-white/50 lg:bg-white lg:shadow-[0_8px_30px_-14px_rgba(8,21,45,0.2)]"
  }`;

  const phone = (shown: string) => (
    <a
      href={site.phone.href}
      className={`${shown} items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 font-text text-[13px] font-semibold transition-colors ${
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
  );

  const linkIdle = onHero
    ? "text-white/80 hover:bg-white/10 hover:text-white"
    : "text-ink-900/65 hover:bg-ink-900/[0.05] hover:text-ink-900";
  const linkActive = onHero ? "bg-white/15 text-white" : "bg-ink-900/[0.07] text-ink-900";

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 px-4 sm:px-6 ${
        // Above the floating chat button (z-50) while the menu sheet covers the screen.
        open ? "z-[60]" : "z-50"
      } ${clear ? "pt-4 sm:pt-5 md:pt-6" : "pt-3 sm:pt-4"} transition-[padding] duration-500`}
    >
      <div className={shell}>
        <span
          aria-hidden
          className={`hidden transition-[flex-grow] lg:block ${glide} ${merged ? "lg:grow" : "lg:grow-0"}`}
        />
        <div
          className={`flex min-w-0 grow items-center justify-between transition-[flex-grow] lg:justify-normal ${glide} ${merged ? "lg:grow-0" : ""}`}
        >
          {/* From lg the logo stands on its own at the top, no pill behind it (the PNG is transparent). */}
          <div
            className={`relative flex shrink-0 items-center transition-[padding] lg:h-[52px] ${glide} ${merged ? "lg:pl-6 lg:pr-20" : "lg:px-6"}`}
          >
            <span
              aria-hidden
              className={`absolute right-9 top-1/2 hidden h-5 w-px -translate-y-1/2 bg-ink-900/10 transition-opacity lg:block ${glide} ${merged ? "opacity-100" : "opacity-0"}`}
            />
            <Link ref={logoRef} href="/" className="relative block h-10 w-[140px]" onClick={() => setOpen(false)}>
              <Image
                src={logoOnDark.src}
                alt={logoOnDark.alt}
                aria-hidden
                fill
                sizes="140px"
                priority
                className={`object-contain object-left transition-opacity duration-300 ${onHero ? "opacity-100" : backdrop ? "opacity-0 lg:opacity-100" : "opacity-0"}`}
              />
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="140px"
                priority
                className={`object-contain object-left transition-opacity duration-300 ${onHero ? "opacity-0" : backdrop ? "opacity-100 lg:opacity-0" : "opacity-100"}`}
              />
            </Link>
          </div>

          <span aria-hidden className="hidden lg:block lg:grow" />

          <div className="relative hidden h-[52px] items-center gap-0.5 px-2 lg:flex">
            {/* The pill itself: hugging the links at the top, merged it reaches over the logo's 244px slot
                on the left and the button's 190px slot on the right. */}
            <span
              aria-hidden
              className={`absolute inset-y-0 -z-10 rounded-full border ${island} ${
                merged ? "-left-[244px] -right-[190px]" : "left-0 right-0"
              }`}
            />
            <nav className="flex items-center gap-0.5">
              {nav.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
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
            {phone("hidden xl:flex")}
          </div>

          <span aria-hidden className="hidden lg:block lg:grow" />

          <div
            className={`flex items-center gap-1.5 transition-[padding] ${glide} ${merged ? "lg:pl-2 lg:pr-1.5" : ""}`}
          >
            {phone("hidden md:flex lg:hidden")}
            <ConsultLink
              className={`hidden whitespace-nowrap rounded-full px-4 py-2 font-text text-[13px] font-semibold transition-[background-color,box-shadow,width,height] md:block lg:inline-flex lg:items-center lg:justify-center lg:px-0 lg:text-[14px] lg:duration-700 lg:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                merged ? "lg:h-10 lg:w-[176px]" : "lg:h-[52px] lg:w-[188px]"
              } ${
                onHero
                  ? "border border-white/35 bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
                  : `bg-royal text-white hover:bg-[#1c3880] ${merged ? "" : "lg:shadow-[0_12px_30px_-12px_rgba(36,69,160,0.6)]"}`
              }`}
            >
              Free Consultation
            </ConsultLink>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
              className={`grid h-10 w-10 place-items-center rounded-full transition-[background-color,translate,scale,rotate] duration-500 ease-[var(--ease-spring)] active:scale-[0.94] lg:hidden ${
                onHero ? "text-white hover:bg-white/10" : "text-ink-900 hover:bg-ink-900/[0.05]"
              }`}
            >
              {/* Two lines that rotate into an X rather than swapping icons. */}
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-spring)] ${
                    open ? "translate-y-[5.25px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-5 rounded-full bg-current transition-transform duration-500 ease-[var(--ease-spring)] ${
                    open ? "-translate-y-[5.25px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <span
          aria-hidden
          className={`hidden transition-[flex-grow] lg:block ${glide} ${merged ? "lg:grow" : "lg:grow-0"}`}
        />
      </div>

      {/* Phones and tablets: a full-screen sheet; each link rises out of its own mask in turn. */}
      <div
        id="site-menu"
        aria-hidden={!open}
        className={`fixed inset-0 -z-10 flex flex-col bg-ivory/95 backdrop-blur-3xl transition-[opacity,visibility] duration-500 ease-[var(--ease-spring)] lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Main" className="flex flex-1 flex-col justify-center px-6 pt-24 sm:px-10">
          <ul>
            {nav.map((item, i) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="overflow-hidden border-b border-ink-900/10">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    tabIndex={open ? undefined : -1}
                    style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
                    className={`flex items-baseline justify-between py-4 transition-[translate,scale,rotate,opacity] duration-700 ease-[var(--ease-spring)] ${
                      open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                    }`}
                  >
                    <span
                      className={`lux-display text-[clamp(2.4rem,9vw,3.6rem)] ${active ? "text-ink-900" : "text-ink-900/60"}`}
                    >
                      {item.label}
                    </span>
                    <span className="font-text text-xs font-semibold tracking-[0.2em] text-royal tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          style={{ transitionDelay: open ? `${120 + nav.length * 60}ms` : "0ms" }}
          className={`flex flex-col gap-3 px-6 pb-10 transition-[translate,scale,rotate,opacity] duration-700 ease-[var(--ease-spring)] sm:px-10 ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <ConsultLink
            onClick={() => setOpen(false)}
            className="lux-btn flex items-center justify-between rounded-full bg-royal py-2 pl-6 pr-2 font-text text-[15px] font-semibold text-white transition-transform duration-500 ease-[var(--ease-spring)] active:scale-[0.98]"
          >
            Free Consultation
            <Arrow />
          </ConsultLink>
          <a
            href={site.phone.href}
            tabIndex={open ? undefined : -1}
            className="rounded-full border border-ink-900/15 px-6 py-4 text-center font-text text-[15px] font-semibold text-ink-900"
          >
            Call {site.phone.display}
          </a>
        </div>
      </div>
    </header>
  );
}

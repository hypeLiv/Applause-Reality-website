/** Landing-page buttons and line icons (24px grid, 1.5px stroke). */

const base =
  "lux-focus group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-text text-[15px] font-semibold transition-all duration-200 ease-[var(--ease-lux)]";

export const lux = {
  gold: `${base} bg-brass text-ink-950 shadow-[0_12px_32px_-12px_rgba(212,162,76,0.75)] hover:-translate-y-0.5 hover:bg-brass-soft active:translate-y-0`,
  ghostDark: `${base} border border-white/20 text-ivory hover:border-white/50 hover:bg-white/5`,
  ghostLight: `${base} border border-ink-900/15 text-ink-900 hover:border-ink-900/40 hover:bg-ink-900/[0.03]`,
  // Hero pair: solid ivory primary + tinted glass secondary, sized up for the framed hero.
  heroPrimary: `${base} bg-ivory px-9 py-[18px] text-base text-ink-950 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 hover:bg-white active:translate-y-0`,
  heroGlass: `${base} border border-white/30 bg-white/15 px-9 py-[18px] text-base text-white backdrop-blur-md hover:bg-white/25`,
};

const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  ),
  shortlist: <path d="M10 6h10M10 12h10M10 18h10M4 6l1.2 1.2L7.5 5M4 12l1.2 1.2L7.5 11M4 18l1.2 1.2L7.5 17" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  bank: <path d="M3 10h18M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18M12 3l9 4.5H3z" />,
  document: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l8.5-8.5M16.5 6.5l2.5 2.5M14 9l2 2" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" />,
  sliders: (
    <>
      <path d="M4 7h9M17 7h3M4 17h3M11 17h9" />
      <circle cx="15" cy="7" r="2" />
      <circle cx="9" cy="17" r="2" />
    </>
  ),
  play: <path d="M8 5.5v13l11-6.5z" fill="currentColor" />,
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

export function Arrow() {
  return (
    <Icon name="arrow" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
  );
}

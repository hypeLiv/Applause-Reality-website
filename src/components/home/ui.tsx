/** Landing-page buttons, the bezel frame and line icons (24px grid, 1.25px stroke). */

// Pills press in on click; an <Arrow /> inside turns into a trailing island (see .lux-btn in globals.css).
const base =
  "lux-focus lux-btn group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-text text-[15px] font-semibold transition-[translate,scale,rotate,background-color,border-color,color,box-shadow] duration-500 ease-[var(--ease-spring)] active:scale-[0.98]";

export const lux = {
  primary: `${base} lux-primary`,
  ghostDark: `${base} border border-white/20 text-ivory hover:border-white/50 hover:bg-white/5`,
  ghostLight: `${base} border border-ink-900/15 text-ink-900 hover:border-ink-900/40 hover:bg-ink-900/[0.03]`,
  // Hero pair: solid ivory primary + tinted secondary, sized up for the framed hero.
  heroPrimary: `${base} lux-btn-lg bg-ivory px-9 py-[18px] text-base text-ink-950 shadow-[0_24px_48px_-24px_rgba(5,12,31,0.7)] hover:bg-white`,
  heroGlass: `${base} lux-btn-lg border border-white/25 bg-white/[0.12] px-9 py-[18px] text-base text-white hover:bg-white/20`,
};

const bezelTone = {
  // On ink sections.
  dark: { shell: "bg-white/[0.045] ring-1 ring-white/10", core: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]" },
  // Over photography, where the tray needs a little more presence.
  glass: { shell: "bg-white/10 ring-1 ring-white/20", core: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" },
  // On ivory and white sections.
  light: { shell: "bg-ink-900/[0.035] ring-1 ring-ink-900/[0.07]", core: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]" },
  // A dark card set into a light section.
  ink: { shell: "bg-ink-900/[0.035] ring-1 ring-ink-900/[0.07]", core: "bg-ink-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]" },
} as const;

/**
 * Double-bezel frame: a hairline tray (shell) holding the card (core), with
 * the core's radius inset by the tray's padding so the curves stay concentric.
 */
export function Bezel({
  tone = "dark",
  radius = "2rem",
  className = "",
  coreClassName = "",
  children,
}: {
  tone?: keyof typeof bezelTone;
  radius?: string;
  className?: string;
  coreClassName?: string;
  children: React.ReactNode;
}) {
  const t = bezelTone[tone];
  return (
    <div style={{ "--bz": radius } as React.CSSProperties} className={`rounded-[var(--bz)] p-1.5 ${t.shell} ${className}`}>
      <div className={`h-full overflow-hidden rounded-[calc(var(--bz)-0.375rem)] ${t.core} ${coreClassName}`}>{children}</div>
    </div>
  );
}

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
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  download: <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />,
  home: <path d="M4 11l8-6.5 8 6.5M6 9.5V20h12V9.5M10 20v-5h4v5" />,
  building: <path d="M5 20.5V5l7-2v17.5M12 7l7 2.5v11M3 20.5h18M8 8v1M8 12v1M8 16v1M15.5 12v1M15.5 16v1" />,
  chart: <path d="M4 19.5h16M7 16v-4M11 16V9M15 16v-6M19 16V6M6 10l4-4 3 2.5L19 3" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
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
    <span aria-hidden className="lux-island">
      <Icon name="arrow" className="h-4 w-4" />
    </span>
  );
}

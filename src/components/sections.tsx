import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function HindiTagline({ as: Tag = "p" }: { as?: "p" | "h2" }) {
  return (
    <section className="bg-mist px-6 py-12 text-center">
      <Tag className="t-h2 font-display font-semibold text-navy">{site.tagline}</Tag>
    </section>
  );
}

/** Dark navy two-column band: uppercase label on the left, statement on the right. */
export function PromiseBand({
  title = "Our Partnership Promise",
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-ink px-6 py-10 md:px-14">
      <div className="mx-auto grid max-w-[1320px] items-center gap-6 md:grid-cols-[minmax(0,420px)_1fr] md:gap-12">
        <h2 className="font-aether text-2xl uppercase tracking-[0.05em] text-white/60 md:border-r md:border-white/30 md:pr-10 md:text-[31px]">
          {title}
        </h2>
        <p className="font-inter text-lg leading-snug text-mist md:text-xl">{children}</p>
      </div>
    </section>
  );
}

type CtaProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

export function Cta({ href, children, className = "" }: CtaProps) {
  if (isExternal(href)) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export const btn = {
  navy: "inline-flex items-center justify-center rounded-md bg-navy-deep px-8 py-4 font-display text-lg font-semibold text-white transition-colors hover:bg-navy",
  pillDark:
    "inline-flex items-center justify-center rounded-full bg-black px-6 py-3 font-display text-lg font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-ink",
  outlineLight:
    "inline-flex items-center justify-center rounded-full border border-white/70 px-10 py-4 font-display text-2xl font-semibold text-white transition-colors hover:bg-white hover:text-black",
  white:
    "inline-flex items-center justify-center rounded-md bg-white px-10 py-4 font-display text-lg font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-mist",
};

/** Full-bleed photo backdrop with optional dimming. */
export function PhotoBackdrop({
  src,
  alt = "",
  dim = 0,
  priority = false,
}: {
  src: string;
  alt?: string;
  dim?: number;
  priority?: boolean;
}) {
  return (
    <>
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="-z-10 object-cover" />
      {dim > 0 && <div className="absolute inset-0 -z-10 bg-black" style={{ opacity: dim }} />}
    </>
  );
}

export function BankLogos({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <Image src="/images/pnb.png" alt="Punjab National Bank" width={124} height={53} className="h-[53px] w-auto rounded-md" />
      <Image src="/images/sbi.png" alt="State Bank of India" width={108} height={56} className="h-[56px] w-auto rounded-md" />
    </div>
  );
}

export type Story = { label: string; quote: string; by: string; role?: string };

export function StoryCards({ stories }: { stories: Story[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stories.map((s) => (
        <article key={s.by} className="rounded-xl bg-periwinkle-soft p-6 text-black">
          <h3 className="font-display text-lg font-semibold uppercase leading-tight text-navy md:text-xl">
            {s.label}
          </h3>
          {s.role && <p className="mt-1 font-display text-xl font-semibold">{s.role}</p>}
          <p className="mt-4 font-text text-[17px] italic leading-relaxed">{s.quote}</p>
          <p className="mt-4 font-text text-sm">{s.by}</p>
        </article>
      ))}
    </div>
  );
}

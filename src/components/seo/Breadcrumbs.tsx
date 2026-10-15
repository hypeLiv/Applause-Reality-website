import Link from "next/link";
import { absolute } from "@/lib/seo";
import JsonLd from "./JsonLd";

export type Crumb = { name: string; href: string };

/**
 * Visible breadcrumb trail plus its BreadcrumbList schema, built from the same
 * list so the two never drift. The last crumb is the current page.
 */
export default function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const muted = tone === "dark" ? "text-ivory/55" : "text-slate-ink";
  const link = tone === "dark" ? "hover:text-ivory" : "hover:text-ink-900";
  const current = tone === "dark" ? "text-ivory/85" : "text-ink-900";

  return (
    <>
      <nav aria-label="Breadcrumb" className={`font-text text-sm font-semibold ${muted}`}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {items.map((c, i) => {
            const last = i === items.length - 1;
            return (
              <li key={c.href} className="flex min-w-0 items-center gap-2">
                {last ? (
                  <span aria-current="page" className={`max-w-[28ch] truncate ${current}`}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className={`lux-focus transition-colors ${link}`}>
                      {c.name}
                    </Link>
                    <span aria-hidden className="opacity-50">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absolute(c.href),
          })),
        }}
      />
    </>
  );
}

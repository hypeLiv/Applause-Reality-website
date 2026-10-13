import { site } from "@/lib/site";

const sizes = {
  sm: "text-base",
  md: "text-xl md:text-2xl",
  lg: "text-[clamp(1.3rem,2vw,1.85rem)]",
};

/**
 * The client's signature line, "रिश्ता बुकिंग के साथ भी, Possession के बाद भी",
 * led by the logo's gold hairline. Meant to appear on most pages, so every
 * placement shares this one treatment.
 */
export default function BrandTagline({
  onDark = false,
  size = "md",
  align = "start",
  className = "",
}: {
  /** Use on navy/photo backgrounds; light backgrounds get royal blue. */
  onDark?: boolean;
  size?: keyof typeof sizes;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <p
      lang="hi"
      className={`flex items-center gap-4 font-deva font-medium leading-snug ${
        align === "center" ? "justify-center text-center" : ""
      } ${onDark ? "text-brass-soft" : "text-royal"} ${sizes[size]} ${className}`}
    >
      <span aria-hidden className="h-px w-8 shrink-0 bg-brass" />
      {site.tagline}
    </p>
  );
}

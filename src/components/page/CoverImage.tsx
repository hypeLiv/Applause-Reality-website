import Image from "@/components/Image";

/**
 * A cover that never crops: the image is shown whole, over a blurred, scaled-up
 * copy of itself that fills the frame. Portrait posters and landscape renders
 * can share one card shape this way.
 */
export default function CoverImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
  zoom = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Ease the image in slightly on hover of a parent `.group`. */
  zoom?: boolean;
}) {
  return (
    <span className={`relative block overflow-hidden bg-mist ${className}`}>
      <Image src={src} alt="" aria-hidden fill sizes="200px" className="scale-125 object-cover opacity-80 blur-2xl" />
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-contain ${zoom ? "transition-transform duration-700 ease-[var(--ease-lux)] group-hover:scale-[1.03]" : ""}`}
      />
    </span>
  );
}

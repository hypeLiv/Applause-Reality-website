"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { useIsMobileDevice } from "@/lib/useIsMobileDevice";

export const CONSULTATION_PATH = "/consultation";

/**
 * Every "talk to us" call to action goes through here: phones and tablets open
 * WhatsApp, laptops and desktops go to the consultation form (where WhatsApp
 * is unlikely to be set up). Without JavaScript it falls back to the form.
 */
export default function ConsultLink({
  whatsapp = site.whatsapp,
  className,
  children,
  onClick,
  "aria-label": ariaLabel,
}: {
  whatsapp?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  "aria-label"?: string;
}) {
  const mobile = useIsMobileDevice();

  if (mobile) {
    return (
      <a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={CONSULTATION_PATH} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const promises = [
  "Applause Reality आपकी पहली विजिट से लेकर बुकिंग तक, हर कदम पर आपके साथ है।",
  "चाहे लोन की प्रक्रिया हो या कागजी कार्रवाई, हम पजेशन तक आपकी पूरी मदद करते हैं।",
  "पजेशन के बाद भी, आपकी भविष्य की हर ज़रूरत के लिए हम हमेशा आपके साथ खड़े हैं।",
];

export default function Footer() {
  return (
    <footer>
      <div className="h-14 bg-ink" />
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-10 md:grid-cols-[200px_1fr_auto] md:px-9">
        <div className="text-[15px]">
          <Image
            src="/images/logo-mark.png"
            alt="Applause Reality"
            width={116}
            height={114}
            className="mb-4 h-[114px] w-auto"
          />
          <p>© {new Date().getFullYear()} Applause Reality.</p>
          <p>All rights reserved.</p>
          <Link href="/privacy-policy" className="mt-4 inline-block underline">
            Privacy Policy
          </Link>
        </div>

        <div className="space-y-2 font-inter text-lg font-bold leading-snug text-slate-blue md:text-xl">
          {promises.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="font-inter md:text-right">
          <a href={site.emailHref} className="text-xl font-bold underline">
            {site.email}
          </a>
          <div className="mt-4 space-y-0.5 text-[15px] font-semibold">
            {site.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block">
                {p}
              </a>
            ))}
          </div>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="mt-4 inline-grid h-7 w-7 place-items-center rounded-full bg-[#0a66c2] text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.3 21 14.7V21h-4v-5.6c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95V21H9z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

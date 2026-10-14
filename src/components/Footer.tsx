import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import { nav, site } from "@/lib/site";

const columns = [
  { title: "Explore", links: nav.map((n) => ({ label: n.label, href: n.href })) },
  {
    title: "Contact",
    links: [
      { label: site.email, href: site.emailHref },
      ...site.phones.map((p) => ({ label: p, href: `tel:${p.replace(/\s/g, "")}` })),
    ],
  },
  {
    title: "Connect",
    links: [
      // The footer is plain anchors, so it always points at the form page;
      // the page itself offers WhatsApp to phone visitors.
      { label: "Free consultation", href: "/consultation" },
      { label: "LinkedIn", href: site.linkedin },
      { label: "Privacy policy", href: "/privacy-policy" },
    ],
  },
];

// The client's partnership promise, carried over from the original footer.
const promises = [
  "Applause Reality आपकी पहली विजिट से लेकर बुकिंग तक, हर कदम पर आपके साथ है।",
  "चाहे लोन की प्रक्रिया हो या कागजी कार्रवाई, हम पजेशन तक आपकी पूरी मदद करते हैं।",
  "पजेशन के बाद भी, आपकी भविष्य की हर ज़रूरत के लिए हम हमेशा आपके साथ खड़े हैं।",
];

// Inter for everything (Hind fills in Devanagari), via the next/font variables in layout.tsx.
const INTER = 'var(--ff-inter), var(--ff-hind), "Inter", system-ui, sans-serif';

export default function Footer() {
  return (
    <HalftoneWordmarkFooter
      wordmark="applause"
      label={site.name}
      meta={site.tagline}
      statement={promises.map((line) => (
        <p key={line}>{line}</p>
      ))}
      columns={columns}
      note={`© ${new Date().getFullYear()} ${site.name} · Delhi NCR`}
      palette={{ background: "#050c1f", ink: "#f7f4ee", warm: "#8ea6e8" }}
      fontFamily='"Inter", system-ui, sans-serif'
      monoFamily={INTER}
      // The word is fitted to the width, so its height scales with vw. The
      // floor leaves room for the link block plus the promise lines on phones.
      height="max(680px, calc(340px + 22vw))"
    />
  );
}

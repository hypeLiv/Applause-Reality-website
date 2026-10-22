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

// The site sans for everything (Hind fills in Devanagari), via the next/font variables in layout.tsx.
const SANS = "var(--ff-sans), var(--ff-hind), system-ui, sans-serif";

export default function Footer() {
  return (
    <HalftoneWordmarkFooter
      wordmark="applause"
      label={site.name}
      meta={<span lang="hi">{site.tagline}</span>}
      statement={promises.map((line) => (
        <p key={line} lang="hi">
          {line}
        </p>
      ))}
      columns={columns}
      note={`© ${new Date().getFullYear()} ${site.name} · Delhi NCR`}
      palette={{ background: "#f0f4ff", ink: "#2445a0", warm: "#ffb800" }}
      // Canvas fonts need a real family name (it ignores CSS variables); next/font registers this one.
      fontFamily='"Plus Jakarta Sans", system-ui, sans-serif'
      monoFamily={SANS}
      // Baseline on the bottom edge: the letters sit whole, only the descenders crop.
      crop={0}
      // The word is fitted to the width, so its height scales with vw. The
      // floor leaves room for the link block plus the promise lines on phones.
      height="max(740px, calc(360px + 22vw), calc(1000px - 55vw))"
    />
  );
}

import ConsultLink from "@/components/ConsultLink";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { site } from "@/lib/site";

// Stands in for the Wix chat widget: WhatsApp on phones, the consultation form on laptops.
// A WhatsApp button sits above it on every device (WhatsApp Web on desktops).
export default function ChatButton() {
  return (
    <>
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Applause Reality on WhatsApp (${site.whatsappDisplay})`}
        title="Chat on WhatsApp"
        className="fixed bottom-14 right-3 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] transition-transform hover:-translate-y-0.5 sm:bottom-[4.75rem] sm:right-4 sm:h-[3.25rem] sm:w-[3.25rem]"
      >
        <WhatsAppIcon className="h-6 w-6 sm:h-7 sm:w-7" />
      </a>
      <ConsultLink className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 rounded-full bg-royal px-3.5 py-2 font-inter text-[13px] text-white sm:bottom-4 sm:right-4 sm:gap-2 sm:px-5 sm:py-3 sm:text-[15px] shadow-[0_8px_24px_rgba(36,69,160,0.35)] transition-transform hover:-translate-y-0.5">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
          className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]"
        >
          <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9zM19 14l.95 2.55L22.5 17.5l-2.55.95L19 21l-.95-2.55L15.5 17.5l2.55-.95z" />
        </svg>
        Chat with Reality experts
      </ConsultLink>
    </>
  );
}

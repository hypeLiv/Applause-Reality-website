import ConsultLink from "@/components/ConsultLink";

// Stands in for the Wix chat widget: WhatsApp on phones, the consultation form on laptops.
export default function ChatButton() {
  return (
    <ConsultLink className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-navy-deep px-5 py-3 font-inter text-[15px] text-white shadow-[0_8px_24px_rgba(10,61,154,0.35)] transition-transform hover:-translate-y-0.5">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9zM19 14l.95 2.55L22.5 17.5l-2.55.95L19 21l-.95-2.55L15.5 17.5l2.55-.95z" />
      </svg>
      Chat with Reality experts
    </ConsultLink>
  );
}

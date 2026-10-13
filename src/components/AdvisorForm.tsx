"use client";

import { useState } from "react";

// The Wix form posted to Wix's own inbox. Until a mail/CRM backend is chosen,
// submissions open a pre-filled WhatsApp chat with the consultation line.
const WHATSAPP_NUMBER = "918796857733";

const fields = [
  { name: "firstName", label: "First name", type: "text", autoComplete: "given-name" },
  { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "company", label: "Company name", type: "text", autoComplete: "organization" },
] as const;

export default function AdvisorForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      "Hello Applause Reality, I'd like to meet an advisor.",
      ...fields.map((f) => `${f.label}: ${data.get(f.name) ?? ""}`),
    ];
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      {fields.map((f) => (
        <label
          key={f.name}
          className={`block font-text text-[13px] font-medium text-slate-ink ${f.name === "email" || f.name === "company" ? "sm:col-span-2" : ""}`}
        >
          {f.label}*
          {f.name === "phone" ? (
            <span className="mt-1.5 flex items-center gap-2 rounded-xl border border-ink-900/15 bg-white px-4 transition-colors focus-within:border-royal">
              <span aria-hidden>🇮🇳</span>
              <input
                required
                name={f.name}
                type={f.type}
                autoComplete={f.autoComplete}
                className="h-12 w-full bg-transparent text-base text-ink-900 outline-none"
              />
            </span>
          ) : (
            <input
              required
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              className="mt-1.5 h-12 w-full rounded-xl border border-ink-900/15 bg-white px-4 text-base text-ink-900 outline-none transition-colors focus:border-royal"
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        className="lux-focus mt-2 h-14 w-full rounded-full bg-ink-900 font-text text-[15px] font-semibold text-ivory transition-colors hover:bg-royal sm:col-span-2"
      >
        Request a callback
      </button>
      {sent && (
        <p role="status" className="text-center text-sm text-slate-ink sm:col-span-2">
          Thanks! Finish sending your details in WhatsApp.
        </p>
      )}
    </form>
  );
}

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
    <form onSubmit={onSubmit} className="space-y-4 rounded-lg bg-black/40 p-6">
      {fields.map((f) => (
        <label key={f.name} className="block font-text text-sm text-white">
          {f.label}*
          {f.name === "phone" ? (
            <span className="mt-1 flex items-center gap-2 border border-white/30 bg-white/5 px-3">
              <span aria-hidden>🇮🇳</span>
              <input
                required
                name={f.name}
                type={f.type}
                autoComplete={f.autoComplete}
                className="h-10 w-full bg-transparent text-white outline-none"
              />
            </span>
          ) : (
            <input
              required
              name={f.name}
              type={f.type}
              autoComplete={f.autoComplete}
              className="mt-1 h-10 w-full border border-white/30 bg-white/5 px-3 text-white outline-none focus:border-white"
            />
          )}
        </label>
      ))}
      <button
        type="submit"
        className="h-11 w-full rounded-sm bg-white font-text text-black transition-colors hover:bg-mist"
      >
        Submit
      </button>
      {sent && (
        <p role="status" className="text-center text-sm text-mist">
          Thanks! Finish sending your details in WhatsApp.
        </p>
      )}
    </form>
  );
}

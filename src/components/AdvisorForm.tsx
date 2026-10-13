"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { useIsMobileDevice } from "@/lib/useIsMobileDevice";

const fields = [
  { name: "firstName", label: "First name", type: "text", autoComplete: "given-name" },
  { name: "lastName", label: "Last name", type: "text", autoComplete: "family-name" },
  { name: "email", label: "Email", type: "email", autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { name: "company", label: "Company name", type: "text", autoComplete: "organization" },
] as const;

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "mt-1.5 h-12 w-full rounded-xl border border-ink-900/15 bg-white px-4 text-base text-ink-900 outline-none transition-colors focus:border-royal";

/**
 * Phones hand the details to WhatsApp (where the conversation continues);
 * laptops post them to /api/consultation, which emails the team.
 */
export default function AdvisorForm({ withMessage = false }: { withMessage?: boolean }) {
  const mobile = useIsMobileDevice();
  const [status, setStatus] = useState<Status>("idle");
  const [fallback, setFallback] = useState<string>(site.emailHref);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(
      [...fields.map((f) => f.name), "message", "website"].map((k) => [k, String(data.get(k) ?? "").trim()]),
    );
    const summary = [
      "Hello Applause Reality, I'd like to meet an advisor.",
      ...fields.map((f) => `${f.label}: ${values[f.name]}`),
      ...(values.message ? [`Message: ${values.message}`] : []),
    ].join("\n");

    if (mobile) {
      window.open(`${site.whatsapp}&text=${encodeURIComponent(summary)}`, "_blank", "noopener,noreferrer");
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, page: window.location.pathname }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setFallback(
        `mailto:${site.email}?subject=${encodeURIComponent("Consultation request")}&body=${encodeURIComponent(summary)}`,
      );
      setStatus("error");
    }
  }

  if (status === "sent" && !mobile) {
    return (
      <div role="status" className="rounded-2xl border border-ink-900/10 bg-white p-8 text-center">
        <p className="font-sans text-2xl font-semibold tracking-[-0.02em] text-ink-900">Thank you — request received.</p>
        <p className="mt-3 font-text text-base leading-relaxed text-slate-ink">
          A Delhi NCR relationship manager will be in touch shortly. For anything urgent, call{" "}
          <a href={site.phone.href} className="font-semibold text-royal underline-offset-4 hover:underline">
            {site.phone.display}
          </a>
          .
        </p>
      </div>
    );
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
            <input required name={f.name} type={f.type} autoComplete={f.autoComplete} className={inputClass} />
          )}
        </label>
      ))}

      {withMessage && (
        <label className="block font-text text-[13px] font-medium text-slate-ink sm:col-span-2">
          What are you looking for? <span className="font-normal text-slate-ink/70">(optional)</span>
          <textarea
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="e.g. 3 BHK in Greater Noida, budget ₹2–3 Cr, home-loan support"
            className={`${inputClass} h-auto resize-y py-3`}
          />
        </label>
      )}

      {/* Honeypot: hidden from people, filled in by bots. */}
      <label aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="lux-focus mt-2 h-14 w-full rounded-full bg-ink-900 font-text text-[15px] font-semibold text-ivory transition-colors hover:bg-royal disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
      >
        {status === "sending" ? "Sending…" : mobile ? "Continue on WhatsApp" : "Request a callback"}
      </button>

      {status === "sent" && mobile && (
        <p role="status" className="text-center text-sm text-slate-ink sm:col-span-2">
          Thanks! Finish sending your details in WhatsApp.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-center text-sm text-slate-ink sm:col-span-2">
          We couldn&apos;t send that just now.{" "}
          <a href={fallback} className="font-semibold text-royal underline underline-offset-4">
            Email it to us instead
          </a>{" "}
          or call{" "}
          <a href={site.phone.href} className="font-semibold text-royal underline underline-offset-4">
            {site.phone.display}
          </a>
          .
        </p>
      )}
    </form>
  );
}

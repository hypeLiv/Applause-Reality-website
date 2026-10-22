"use client";

import { useId, useState } from "react";
import { Arrow } from "@/components/home/ui";
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

/** Field shell: white on both the ivory and white cards, royal focus halo, red only after interaction. */
const shell =
  "peer w-full rounded-2xl border border-ink-900/[0.12] bg-white px-4 font-text text-[15px] text-ink-900 shadow-[inset_0_1px_2px_rgba(11,23,51,0.04)] outline-none focus-visible:outline-none transition-[border-color,box-shadow] duration-200 hover:border-ink-900/25 focus:border-royal focus:shadow-[0_0_0_4px_rgba(36,69,160,0.12)] user-invalid:border-[#c2410c] user-invalid:focus:shadow-[0_0_0_4px_rgba(194,65,12,0.12)]";

/** Label that rests inside the field and floats up once it is focused or filled. */
const floatLabel =
  "pointer-events-none absolute top-[1.15rem] origin-left font-text text-[15px] text-slate-ink/80 transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[11px] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-[0.12em] peer-focus:text-royal peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-[0.12em]";

/**
 * Phones hand the details to WhatsApp (where the conversation continues);
 * laptops post them to /api/consultation, which emails the team.
 */
export default function AdvisorForm({ withMessage = false }: { withMessage?: boolean }) {
  const mobile = useIsMobileDevice();
  const uid = useId();
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
    <form onSubmit={onSubmit} className="grid gap-3.5 sm:grid-cols-2">
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const wide = f.name === "email";
        return (
          <div key={f.name} className={`relative ${wide ? "sm:col-span-2" : ""}`}>
            {f.name === "phone" ? (
              <>
                <input
                  required
                  id={id}
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  inputMode="tel"
                  placeholder=" "
                  className={`${shell} h-[3.75rem] pb-2 pl-[4.25rem] pt-6`}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-4 flex items-center border-r border-ink-900/10 pr-3 font-text text-[15px] font-semibold text-ink-900"
                >
                  +91
                </span>
                <label htmlFor={id} className={`${floatLabel} left-[4.25rem]`}>
                  {f.label}
                </label>
              </>
            ) : (
              <>
                <input
                  required
                  id={id}
                  name={f.name}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  placeholder=" "
                  className={`${shell} h-[3.75rem] pb-2 pt-6`}
                />
                <label htmlFor={id} className={`${floatLabel} left-4`}>
                  {f.label}
                </label>
              </>
            )}
          </div>
        );
      })}

      {withMessage && (
        <div className="relative sm:col-span-2">
          <textarea
            id={`${uid}-message`}
            name="message"
            rows={4}
            maxLength={1000}
            placeholder="e.g. 3 BHK in Greater Noida, budget ₹2–3 Cr, home-loan support"
            className={`${shell} min-h-[8.5rem] resize-y pb-3 pt-8 leading-relaxed placeholder:text-transparent focus:placeholder:text-slate-ink/45`}
          />
          <label htmlFor={`${uid}-message`} className={`${floatLabel} left-4`}>
            What are you looking for? <span className="normal-case tracking-normal opacity-70">(optional)</span>
          </label>
        </div>
      )}

      {/* Honeypot: hidden from people, filled in by bots. */}
      <label aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="lux-focus lux-btn group mt-3 inline-flex h-14 w-full items-center justify-between gap-2 rounded-full bg-royal pl-7 font-text text-[15px] font-semibold text-white shadow-[0_24px_48px_-24px_rgba(36,69,160,0.6)] transition-[background-color,translate,scale,rotate] duration-500 ease-[var(--ease-spring)] [--island:2.5rem] hover:bg-[#1c3880] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:col-span-2"
      >
        {status === "sending" ? "Sending…" : mobile ? "Continue on WhatsApp" : "Request a callback"}
        {status !== "sending" && <Arrow />}
      </button>
      <p className="text-center font-text text-[13px] text-slate-ink/80 sm:col-span-2">
        {mobile ? "Opens WhatsApp with your details filled in." : "Sent straight to the Applause Reality advisory team."}
      </p>

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

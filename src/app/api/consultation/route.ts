import { NextResponse } from "next/server";

/**
 * Consultation requests from the desktop form, delivered by email via Resend
 * (plain HTTPS, no SDK). Configure in .env.local / the host's env settings:
 *   RESEND_API_KEY     – from resend.com
 *   LEADS_EMAIL_TO     – inbox that receives leads (comma-separate for several)
 *   LEADS_EMAIL_FROM   – optional; a sender on a domain verified in Resend
 * Until configured, the route answers 503 and the form offers email/phone instead.
 */

const REQUIRED = ["firstName", "lastName", "email", "phone", "company"] as const;
const LIMITS: Record<string, number> = {
  firstName: 80,
  lastName: 80,
  email: 160,
  phone: 30,
  company: 120,
  message: 1000,
  page: 200,
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Bots fill the hidden "website" field; accept silently and drop.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const v: Record<string, string> = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const raw = typeof body[key] === "string" ? (body[key] as string).trim() : "";
    v[key] = raw.slice(0, max);
  }
  const missing = REQUIRED.filter((k) => !v[k]);
  if (missing.length) return NextResponse.json({ error: "missing", fields: missing }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (v.phone.replace(/\D/g, "").length < 7) {
    return NextResponse.json({ error: "invalid_phone" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_EMAIL_TO;
  if (!apiKey || !to) {
    console.warn("[consultation] RESEND_API_KEY / LEADS_EMAIL_TO not set; lead not delivered.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const name = `${v.firstName} ${v.lastName}`;
  const text = [
    "New consultation request from applausereality.com",
    "",
    `Name:    ${name}`,
    `Email:   ${v.email}`,
    `Phone:   ${v.phone}`,
    `Company: ${v.company}`,
    v.message ? `\nLooking for:\n${v.message}` : "",
    "",
    `Sent from: ${v.page || "unknown page"}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEADS_EMAIL_FROM || "Applause Reality Website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: v.email,
      subject: `Consultation request — ${name} (${v.company})`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("[consultation] Resend error", res.status, await res.text().catch(() => ""));
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

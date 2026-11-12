import { site } from "@/lib/site";

/**
 * Branded HTML for the consultation-lead email sent to the team.
 * Email clients ignore <style> blocks and web fonts unevenly, so everything is
 * inline-styled tables with safe fallbacks (Fraunces → Georgia, Jakarta → Helvetica).
 */

export type Lead = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  page: string;
};

const C = {
  ink: "#08152d",
  navy: "#0a3d9a",
  royal: "#2445a0",
  slate: "#46506a",
  mist: "#f0f4ff",
  ivory: "#f7f4ee",
  gold: "#d19a3f",
  line: "#e4e8f2",
};

const SERIF = "Fraunces, Georgia, 'Times New Roman', serif";
const SANS = "'Plus Jakarta Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch]!);

/** Digits for wa.me / tel:, assuming an Indian number when no country code is given. */
function phoneDigits(phone: string) {
  const d = phone.replace(/\D/g, "");
  return d.length === 10 ? `91${d}` : d;
}

function button(href: string, label: string, primary = false) {
  const bg = primary ? C.navy : "#ffffff";
  const fg = primary ? "#ffffff" : C.navy;
  return `<a href="${esc(href)}" style="display:inline-block;margin:0 6px 8px 0;padding:11px 20px;border-radius:999px;border:1px solid ${C.navy};background:${bg};color:${fg};font-family:${SANS};font-size:14px;font-weight:600;text-decoration:none;">${label}</a>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:12px 0;border-bottom:1px solid ${C.line};width:120px;vertical-align:top;font-family:${SANS};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${C.slate};">${label}</td>
    <td style="padding:12px 0;border-bottom:1px solid ${C.line};font-family:${SANS};font-size:15px;color:${C.ink};">${value}</td>
  </tr>`;
}

export function leadEmailHtml(v: Lead) {
  const name = esc(`${v.firstName} ${v.lastName}`);
  const digits = phoneDigits(v.phone);
  const pageUrl = v.page.startsWith("/") ? `${site.url}${v.page}` : "";
  const received = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const link = (href: string, text: string) =>
    `<a href="${esc(href)}" style="color:${C.royal};text-decoration:none;">${esc(text)}</a>`;

  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New consultation request</title></head>
<body style="margin:0;padding:0;background:${C.ivory};">
  <div style="display:none;max-height:0;overflow:hidden;">${name} · ${esc(v.phone)} · ${esc(v.company)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ivory};">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid ${C.line};">

        <tr><td align="center" style="background:${C.ink};padding:28px 24px 24px;">
          <img src="${site.url}/images/logo-light.png" width="200" alt="Applause Reality" style="display:block;width:200px;max-width:70%;height:auto;border:0;">
        </td></tr>
        <tr><td style="height:3px;background:${C.gold};line-height:3px;font-size:0;">&nbsp;</td></tr>

        <tr><td style="padding:32px 32px 8px;">
          <p style="margin:0 0 8px;font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${C.gold};font-weight:700;">New consultation request</p>
          <h1 style="margin:0 0 6px;font-family:${SERIF};font-size:28px;line-height:1.2;font-weight:600;color:${C.ink};">${name}</h1>
          <p style="margin:0;font-family:${SANS};font-size:14px;color:${C.slate};">${esc(v.company)} · ${esc(received)} IST</p>
        </td></tr>

        <tr><td style="padding:20px 32px 4px;">
          ${button(`tel:+${digits}`, "Call now", true)}${button(`https://wa.me/${digits}`, "WhatsApp")}${button(`mailto:${v.email}`, "Reply by email")}
        </td></tr>

        <tr><td style="padding:12px 32px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            ${row("Phone", link(`tel:+${digits}`, v.phone))}
            ${row("Email", link(`mailto:${v.email}`, v.email))}
            ${row("Company", esc(v.company))}
          </table>
        </td></tr>

        ${
          v.message
            ? `<tr><td style="padding:16px 32px 8px;">
          <p style="margin:0 0 8px;font-family:${SANS};font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:${C.slate};">Looking for</p>
          <div style="background:${C.mist};border-left:3px solid ${C.navy};border-radius:10px;padding:16px 18px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.ink};white-space:pre-wrap;">${esc(v.message)}</div>
        </td></tr>`
            : ""
        }

        <tr><td style="padding:24px 32px 28px;">
          <p style="margin:0;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.slate};">
            Sent from ${pageUrl ? link(pageUrl, v.page) : esc(v.page || "the website")} on ${link(site.url, "applausereality.com")}.<br>
            Hit reply to answer ${esc(v.firstName)} directly.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

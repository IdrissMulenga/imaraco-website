import "server-only";
import { site } from "@/data/site";

/*
 * Email through Resend (https://resend.com). Settings (in .env.local / Vercel):
 *   RESEND_API_KEY      API key from resend.com
 *   CONTACT_TO_EMAIL    where form messages go (e.g. support@imaracompany.com)
 *   CONTACT_FROM_EMAIL  sender, on your verified domain (optional; defaults
 *                       to "Imara <support@imaracompany.com>", i.e. site.email)
 *   RESEND_AUDIENCE_ID  optional: mailing list for newsletter / "Notify me"
 * In development without a key, emails are printed in the terminal instead.
 */

type Email = {
  /** Recipient. Defaults to your inbox (CONTACT_TO_EMAIL). */
  to?: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const isConfigured = () => !!process.env.RESEND_API_KEY && !!process.env.CONTACT_TO_EMAIL;

// Sender of every email. Never Resend's test sender (onboarding@resend.dev):
// it can only email the Resend account owner, so every confirmation to a
// visitor would fail without anyone noticing.
const fromAddress = () => process.env.CONTACT_FROM_EMAIL || `Imara <${site.email}>`;

async function resend(path: string, body: unknown) {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend ${path} responded ${res.status}: ${await res.text()}`);
}

export async function sendEmail({ to, subject, text, html, replyTo }: Email) {
  if (!isConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[email:dev] to=${to ?? "(inbox)"} | ${subject}\n${text}\n`);
      return;
    }
    throw new Error("Email is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.");
  }
  const recipients = (to ?? process.env.CONTACT_TO_EMAIL!).split(",").map((s) => s.trim());
  await resend("/emails", {
    from: fromAddress(),
    to: recipients,
    subject,
    text,
    html,
    reply_to: replyTo,
  });
}

/**
 * Saves an email address to the Resend mailing list (if RESEND_AUDIENCE_ID
 * is set). Failures are logged, never shown to the visitor.
 */
export async function addToMailingList(email: string, topic: string) {
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!audience || !process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV !== "production") console.info(`[list:dev] ${email} (${topic})`);
    return;
  }
  try {
    await resend(`/audiences/${audience}/contacts`, { email, unsubscribed: false });
  } catch (err) {
    console.error("[mailing-list] could not save contact", err);
  }
}

/** Simple branded HTML email: orange header bar, white card, footer. */
export function emailLayout(title: string, bodyHtml: string) {
  return `<!doctype html><html><body style="margin:0;background:#f6f4f2;font-family:Arial,Helvetica,sans-serif;color:#1a1715">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2dfdc">
<tr><td style="height:6px;background:linear-gradient(90deg,#F37421,#FFC24D)"></td></tr>
<tr><td style="padding:28px 28px 8px"><div style="font-size:22px;font-weight:bold;color:#0F0D0C">imara</div></td></tr>
<tr><td style="padding:8px 28px 4px"><h1 style="margin:0;font-size:20px;color:#0F0D0C">${escapeHtml(title)}</h1></td></tr>
<tr><td style="padding:8px 28px 28px;font-size:15px;line-height:1.6;color:#403b37">${bodyHtml}</td></tr>
<tr><td style="padding:16px 28px;background:#f8f7f6;font-size:12px;color:#756e68">Imara Company Limited · Technology built to last.</td></tr>
</table></td></tr></table></body></html>`;
}

/** Turns label/value rows into simple HTML paragraphs. */
export function rowsHtml(rows: [string, string][]) {
  return rows
    .map(([k, v]) => `<p style="margin:0 0 12px"><strong>${escapeHtml(k)}</strong><br>${escapeHtml(v).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

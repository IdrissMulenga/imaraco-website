"use server";

import { en } from "@/i18n/dictionaries/en";
import { emailLayout, escapeHtml, rowsHtml, sendEmail } from "@/lib/email";
import { emailCopy } from "@/lib/emailCopy";
import { canSendConfirmation, clientIp, isRateLimited, looksLikeBot } from "@/lib/spam";
import { contactSchema } from "@/lib/validation";

/** English label for an interest value (used in the emails we receive). */
function interestLabel(value: string) {
  const id = value.split(":")[1] as keyof typeof en.interest | undefined;
  return (id && en.interest[id]) || (value === "other" ? en.form.other : value);
}

export type ActionResult =
  | { ok: true }
  | { ok: false; error: "invalid" | "rateLimited" | "server" };


export async function submitContact(input: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    // A filled honeypot fails validation too; answer like a success so
    // bots get no signal.
    const raw = input as { website?: unknown } | null;
    if (typeof raw?.website === "string" && raw.website.length > 0) return { ok: true };
    return { ok: false, error: "invalid" };
  }

  const data = parsed.data;
  if (looksLikeBot(data.website, data.startedAt)) return { ok: true };
  if (await isRateLimited(`contact:${await clientIp()}`)) return { ok: false, error: "rateLimited" };

  const isOrder = data.interest === "product:pay";
  const interest = interestLabel(data.interest);
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Interest", interest],
    ["Language", data.lang.toUpperCase()],
    ["Message", data.message],
  ];

  // 1) To your inbox. If this fails, the visitor sees an error and can retry.
  try {
    const subject = isOrder
      ? `🛒 New Imara Pay order from ${data.name}`
      : `New enquiry from ${data.name} (${interest})`;
    await sendEmail({
      subject,
      replyTo: data.email,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n\n"),
      html: emailLayout(subject, rowsHtml(rows)),
    });
  } catch (err) {
    console.error("[contact] failed to send", err);
    return { ok: false, error: "server" };
  }

  // 2) Confirmation to the visitor. A failure here doesn't affect the result:
  //    their message already reached you.
  if (await canSendConfirmation(data.email)) {
    try {
      const c = emailCopy[data.lang];
      const subject = isOrder ? c.orderSubject : c.contactSubject;
      const body = isOrder ? c.orderBody : c.contactBody;
      await sendEmail({
        to: data.email,
        subject,
        text: `${c.greeting}\n\n${body}\n\n${c.signoff}`,
        html: emailLayout(
          subject,
          `<p>${escapeHtml(c.greeting)}</p><p>${escapeHtml(body)}</p><p>${escapeHtml(c.signoff)}</p>`,
        ),
      });
    } catch (err) {
      console.error("[contact] confirmation email failed", err);
    }
  }

  return { ok: true };
}

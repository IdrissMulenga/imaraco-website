"use server";

import { notifyTopicName } from "@/data/notifyTopics";
import { fill } from "@/i18n/config";
import { en } from "@/i18n/dictionaries/en";
import { getDictionary } from "@/i18n/server";
import { addToMailingList, emailLayout, escapeHtml, sendEmail } from "@/lib/email";
import { emailCopy } from "@/lib/emailCopy";
import { canSendConfirmation, clientIp, isRateLimited, looksLikeBot } from "@/lib/spam";
import { notifySchema } from "@/lib/validation";
import type { ActionResult } from "./contact";

/**
 * Newsletter + "Notify me" sign-ups (Labs, Imara Afya, the band, footer):
 * 1. saves the email to the mailing list (if RESEND_AUDIENCE_ID is set),
 * 2. tells your inbox who signed up for what,
 * 3. sends the visitor a short confirmation in their language.
 * The topic is an id from a fixed list (data/notifyTopics.ts); names come
 * from our dictionaries, never from the browser.
 */
export async function submitNotify(input: unknown): Promise<ActionResult> {
  const parsed = notifySchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  const { email, topic, lang, website, startedAt } = parsed.data;
  if (looksLikeBot(website, startedAt)) return { ok: true };
  if (await isRateLimited(`notify:${await clientIp()}`)) return { ok: false, error: "rateLimited" };

  // English name for your inbox and the mailing list, so one product always
  // has one name there, whatever language the visitor used.
  const topicLabel = notifyTopicName(topic, en);
  await addToMailingList(email, topicLabel);

  try {
    await sendEmail({
      subject: `New sign-up: ${topicLabel}`,
      replyTo: email,
      text: `${email} signed up for: ${topicLabel} (${lang.toUpperCase()})`,
      html: emailLayout(
        `New sign-up: ${topicLabel}`,
        `<p><strong>${escapeHtml(email)}</strong> signed up for <strong>${escapeHtml(topicLabel)}</strong> (${lang.toUpperCase()}).</p>`,
      ),
    });
  } catch (err) {
    console.error("[notify] failed to send", err);
    return { ok: false, error: "server" };
  }

  if (await canSendConfirmation(email)) {
    try {
      const c = emailCopy[lang];
      const isNewsletter = topic === "news";
      const subject = isNewsletter ? c.newsletterSubject : c.notifySubject;
      const body = isNewsletter
        ? c.newsletterBody
        : fill(c.notifyBody, { topic: notifyTopicName(topic, getDictionary(lang)) });
      await sendEmail({
        to: email,
        subject,
        text: `${body}\n\n${c.signoff}`,
        html: emailLayout(subject, `<p>${escapeHtml(body)}</p><p>${escapeHtml(c.signoff)}</p>`),
      });
    } catch (err) {
      console.error("[notify] confirmation email failed", err);
    }
  }

  return { ok: true };
}

import { z } from "zod";
import { notifyTopics } from "@/data/notifyTopics";
import { productIds } from "@/data/products";
import { serviceIds } from "@/data/services";
import { locales } from "@/i18n/config";

// Values of the "I'm interested in" dropdown (labels come from the dictionary).
export const interestValues = [
  ...productIds.map((id) => `product:${id}`),
  ...serviceIds.map((id) => `service:${id}`),
  "other",
];

// The same schema validates in the browser and again on the server.
// Error messages are keys of `form.errors` in the dictionaries, so the
// browser shows them in the visitor's language.
export const contactSchema = z.object({
  name: z.string().trim().min(1, "nameRequired").min(2, "nameShort").max(100, "tooLong"),
  email: z.string().trim().min(1, "emailRequired").max(200, "tooLong").pipe(z.email("email")),
  // Topic, filled in from the button the visitor clicked (not a visible field).
  interest: z.string().refine((v) => interestValues.includes(v), "interest"),
  message: z.string().trim().min(1, "messageRequired").min(10, "messageShort").max(5000, "tooLong"),
  // Language of the page, so the confirmation email matches it.
  lang: z.enum(locales),
  // Spam traps: `website` must stay empty (hidden from humans) and
  // `startedAt` records when the form was shown.
  website: z.string().max(0),
  startedAt: z.number(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const notifySchema = z.object({
  email: z.string().trim().pipe(z.email("email")),
  // One of a fixed list: the server looks up the name itself.
  topic: z.enum(notifyTopics),
  lang: z.enum(locales),
  website: z.string().max(0),
  startedAt: z.number(),
});

export type NotifyInput = z.infer<typeof notifySchema>;

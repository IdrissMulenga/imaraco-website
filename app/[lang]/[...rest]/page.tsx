import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getI18n } from "@/i18n/server";

// Any address under /en/… or /fr/… that isn't a real page lands here and
// shows our own "Page not found" (app/[lang]/not-found.tsx), in the right
// language and with the navbar and footer, instead of Next's plain 404.

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return { title: t.notFound.title };
}

export default function UnknownPage() {
  notFound();
}

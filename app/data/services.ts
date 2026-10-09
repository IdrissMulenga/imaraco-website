import type { Dictionary } from "@/i18n/dictionaries/en";

// Our services, in order. The text is in the dictionaries
// (i18n/dictionaries/en.ts and fr.ts, under "services").

export type ServiceId = "ai" | "web" | "mobile" | "support" | "backend" | "design" | "training";

export type Service = {
  id: ServiceId;
  title: string;
  short: string;
  included: string[];
  /** Shown as a wide, highlighted card at the top of the grid. */
  featured?: boolean;
};

export const serviceIds: ServiceId[] = ["ai", "web", "mobile", "support", "backend", "design", "training"];

/** The services with their text in the current language. */
export function getServices(t: Dictionary): Service[] {
  return serviceIds.map((id) => ({ id, ...t.services[id], featured: id === "ai" }));
}

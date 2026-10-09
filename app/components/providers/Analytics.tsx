import Script from "next/script";

/**
 * Privacy-friendly, cookie-free analytics (Plausible or Umami).
 * Renders nothing unless configured, so no tracking happens by default.
 *
 * Plausible: NEXT_PUBLIC_PLAUSIBLE_DOMAIN=imara.example
 * Umami:     NEXT_PUBLIC_UMAMI_WEBSITE_ID=<id> (+ NEXT_PUBLIC_UMAMI_SRC)
 */
export function Analytics() {
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const umamiId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (plausible) {
    return (
      <Script
        defer
        data-domain={plausible}
        src={process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js"}
        strategy="afterInteractive"
      />
    );
  }
  if (umamiId) {
    return (
      <Script
        defer
        data-website-id={umamiId}
        src={process.env.NEXT_PUBLIC_UMAMI_SRC ?? "https://cloud.umami.is/script.js"}
        strategy="afterInteractive"
      />
    );
  }
  return null;
}

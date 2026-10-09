/* eslint-disable @next/next/no-img-element -- ImageResponse draws plain <img> tags; next/image does not apply here. */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/server";

/*
 * The picture shown when a link to the site is shared (WhatsApp, Facebook,
 * LinkedIn, X…). It's drawn from code when the site is built, one per
 * language: the Imara logo, the "Build it. Run it. Fix it." headline and the
 * web address, in the brand fonts and colours. Every page uses it.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Imara: Build it. Run it. Fix it.";

// Draw both pictures (en, fr) once, when the site is built.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const ORANGE = "#F37421";
const fontDir = join(process.cwd(), "app/assets/fonts");

/**
 * Fonts and logo, read once and cached (as base64 text). Cached work is what
 * lets Next draw the pictures at build time with Cache Components on.
 */
async function loadAssets() {
  "use cache";
  const files = await Promise.all([
    readFile(join(fontDir, "Outfit-Medium.woff")),
    readFile(join(fontDir, "Outfit-Bold.woff")),
    readFile(join(fontDir, "BricolageGrotesque-Bold.woff")),
    readFile(join(process.cwd(), "public/brand/imara-mark.png")),
  ]);
  return files.map((f) => f.toString("base64"));
}

export default async function OpengraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : defaultLocale);

  const [outfitMedium, outfitBold, logoFont, mark] = await loadAssets();
  const font = (base64: string) => Buffer.from(base64, "base64");
  // White Imara emblem (transparent PNG).
  const markSrc = `data:image/png;base64,${mark}`;
  const domain = site.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0F0D0C",
          // Warm glow behind the big emblem
          backgroundImage: "radial-gradient(circle at 80% 45%, rgba(243,116,33,0.5) 0%, rgba(243,116,33,0) 42%)",
          color: "white",
          fontFamily: "Outfit",
          padding: "64px 72px",
        }}
      >
        {/* Big emblem on the right */}
        <img
          src={markSrc}
          alt=""
          width={240}
          height={440}
          style={{ position: "absolute", right: 130, top: 95 }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <img src={markSrc} alt="" width={33} height={60} />
            <div style={{ fontFamily: "Bricolage Grotesque", fontSize: 52, letterSpacing: "-0.03em" }}>imara</div>
          </div>

          {/* Headline */}
          <div style={{ display: "flex", flexDirection: "column", fontWeight: 700, fontSize: 86, lineHeight: 1.04, letterSpacing: "-0.03em" }}>
            <div>{t.hero.build}</div>
            <div>{t.hero.run}</div>
            <div style={{ color: ORANGE }}>{t.hero.fix}</div>
          </div>

          {/* Footer line */}
          <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>
            {/* Word by word: the image engine spaces some words unevenly. */}
            <div style={{ display: "flex", gap: 9 }}>
              {t.common.tagline.split(" ").map((word, i) => (
                <div key={i}>{word}</div>
              ))}
            </div>
            <div style={{ width: 8, height: 8, borderRadius: 8, background: ORANGE, display: "flex" }} />
            <div style={{ color: "white" }}>{domain}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Outfit", data: font(outfitMedium), weight: 500, style: "normal" },
        { name: "Outfit", data: font(outfitBold), weight: 700, style: "normal" },
        { name: "Bricolage Grotesque", data: font(logoFont), weight: 700, style: "normal" },
      ],
    },
  );
}

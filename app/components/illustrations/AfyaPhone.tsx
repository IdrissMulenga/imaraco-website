import { Box } from "@chakra-ui/react";
import Image from "next/image";

/**
 * Realistic phone frames (iPhone or Google Pixel) showing real Imara Afya
 * screenshots. Screenshots live in public/products/imara-afya/:
 *  - iPhone ones were taken on an iPhone (personal details removed)
 *  - Android ones come from the Play Store listing (demo data)
 *
 * Every size is in `cqw` (a % of the phone's width), so a phone scales
 * cleanly to any `width`. Designed at 220px wide: p(10) = 10px at 220px.
 */
const p = (px: number) => `${+((px / 220) * 100).toFixed(3)}cqw`;

export const afyaScreens = {
  // iPhone screenshots (1170 × 2532)
  home: { src: "/products/imara-afya/home.webp", ratio: "1170 / 2532", alt: "Imara Afya home screen on iPhone: today's goals for steps, water, sleep and mood" },
  "check-in": { src: "/products/imara-afya/check-in.webp", ratio: "1170 / 2532", alt: "Imara Afya check-in screen on iPhone: mood and energy trend" },
  sleep: { src: "/products/imara-afya/sleep.webp", ratio: "1170 / 2532", alt: "Imara Afya sleep screen on iPhone: 8 hours slept, goal met" },
  // Android screenshots (Play Store listing)
  "android-home": { src: "/products/imara-afya/android-home.webp", ratio: "720 / 1499", alt: "Imara Afya home screen on Android in dark mode" },
  "android-check-in": { src: "/products/imara-afya/android-check-in.webp", ratio: "720 / 1499", alt: "Imara Afya check-in screen on Android in dark mode" },
  "android-cycle": { src: "/products/imara-afya/android-cycle.webp", ratio: "720 / 1500", alt: "Imara Afya cycle screen on Android: day 17, next period in 12 days" },
} as const;

export type AfyaScreen = keyof typeof afyaScreens;

// Metal finishes for the frame edge.
const titanium =
  "linear-gradient(145deg, #e3e3e6 0%, #9a9aa0 22%, #d4d4d8 45%, #85858b 70%, #c9c9cd 100%)";
const pixelAluminium =
  "linear-gradient(145deg, #4a4d52 0%, #2a2c30 30%, #55585e 55%, #26282b 80%, #45484d 100%)";

/** A hardware button sticking out of the side of the phone. */
function SideButton({
  side,
  top,
  height,
  finish,
}: {
  side: "left" | "right";
  top: number;
  height: number;
  finish: string;
}) {
  return (
    <Box
      position="absolute"
      top={p(top)}
      {...(side === "left" ? { left: p(-2.2) } : { right: p(-2.2) })}
      w={p(3)}
      h={p(height)}
      borderRadius={p(2)}
      bgImage={finish}
      boxShadow="inset 0 0 1px rgba(0,0,0,.5)"
    />
  );
}

function Screenshot({ screen, eager, decorative }: { screen: AfyaScreen; eager: boolean; decorative: boolean }) {
  const shot = afyaScreens[screen];
  return (
    <Image
      src={shot.src}
      alt={decorative ? "" : shot.alt}
      fill
      sizes="(max-width: 768px) 45vw, 260px"
      loading={eager ? "eager" : "lazy"}
      style={{ objectFit: "cover", objectPosition: "top" }}
    />
  );
}

export function AfyaPhone({
  width = "220px",
  screen = "home",
  device = "iphone",
  eager = false,
  decorative = true,
}: {
  width?: string;
  screen?: AfyaScreen;
  /** Which phone to draw around the screenshot. */
  device?: "iphone" | "pixel";
  /** Load right away (for phones visible when the page opens). */
  eager?: boolean;
  /** true when a parent already describes the picture (role="img"). */
  decorative?: boolean;
}) {
  const isIphone = device === "iphone";
  const finish = isIphone ? titanium : pixelAluminium;
  const ratio = afyaScreens[screen].ratio;

  return (
    <Box w={width} flexShrink={0} css={{ containerType: "inline-size" }}>
      <Box position="relative" filter="drop-shadow(0 28px 34px rgba(0,0,0,.28))">
        {/* Side buttons: iPhone has action + volume on the left, power on the right.
            Pixel has power + volume rocker on the right. */}
        {isIphone ? (
          <>
            <SideButton side="left" top={78} height={16} finish={finish} />
            <SideButton side="left" top={108} height={30} finish={finish} />
            <SideButton side="left" top={146} height={30} finish={finish} />
            <SideButton side="right" top={118} height={46} finish={finish} />
          </>
        ) : (
          <>
            <SideButton side="right" top={92} height={26} finish={finish} />
            <SideButton side="right" top={128} height={50} finish={finish} />
          </>
        )}

        {/* Metal frame edge */}
        <Box
          position="relative"
          bgImage={finish}
          borderRadius={isIphone ? p(40) : p(32)}
          p={p(2.6)}
          boxShadow="inset 0 0 0 0.5px rgba(255,255,255,.35)"
        >
          {/* Black bezel */}
          <Box bg="#050505" borderRadius={isIphone ? p(37.5) : p(29.5)} p={isIphone ? p(6.5) : p(7)}>
            {/* Screen */}
            <Box
              position="relative"
              borderRadius={isIphone ? p(31) : p(23)}
              overflow="hidden"
              aspectRatio={ratio}
              bg="black"
            >
              <Screenshot screen={screen} eager={eager} decorative={decorative} />
              {isIphone ? (
                // Dynamic Island
                <Box
                  position="absolute"
                  top={p(7)}
                  left="50%"
                  transform="translateX(-50%)"
                  w={p(60)}
                  h={p(17)}
                  bg="#000"
                  borderRadius="full"
                />
              ) : (
                // Punch-hole camera
                <Box
                  position="absolute"
                  top={p(8)}
                  left="50%"
                  transform="translateX(-50%)"
                  boxSize={p(10)}
                  bgImage="radial-gradient(circle at 35% 35%, #2a3140 0%, #050505 60%)"
                  borderRadius="full"
                  boxShadow="0 0 0 1.5px rgba(0,0,0,.6)"
                />
              )}
              {/* Glass reflection */}
              <Box
                position="absolute"
                inset="0"
                pointerEvents="none"
                bgImage="linear-gradient(115deg, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 38%)"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

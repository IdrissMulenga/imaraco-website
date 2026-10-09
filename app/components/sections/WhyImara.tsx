import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import {
  PiChatsCircleDuotone,
  PiHandCoinsDuotone,
  PiLightningDuotone,
  PiShieldCheckDuotone,
  PiTranslateDuotone,
  PiWifiSlashDuotone,
} from "react-icons/pi";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getI18n } from "@/i18n/server";
import { Section } from "./Section";

const spring = "cubic-bezier(.34,1.56,.64,1)";
const smooth = "cubic-bezier(.22,1,.36,1)";

type Reason = {
  icon: React.ReactNode;
  title: string;
  text: string;
  /** Icon gradient: [light, dark]. */
  color: [string, string];
  /** Wide card (2 columns) in the bento layout on desktop. */
  wide?: boolean;
};

type ReasonKey = "offline" | "payments" | "languages" | "light" | "privacy" | "support";

// Order makes a zigzag on desktop: wide+narrow, narrow+wide, wide+narrow.
// The text comes from the dictionary (why.<key>.title / .text).
const reasons: { key: ReasonKey; icon: React.ReactNode; color: [string, string]; wide?: boolean }[] = [
  { key: "offline", icon: <PiWifiSlashDuotone />, color: ["#38BDF8", "#0369A1"], wide: true },
  { key: "payments", icon: <PiHandCoinsDuotone />, color: ["#34D399", "#047857"] },
  { key: "languages", icon: <PiTranslateDuotone />, color: ["#A78BFA", "#6D28D9"] },
  { key: "light", icon: <PiLightningDuotone />, color: ["#FBBF24", "#D97706"], wide: true },
  { key: "privacy", icon: <PiShieldCheckDuotone />, color: ["#F472B6", "#BE185D"], wide: true },
  { key: "support", icon: <PiChatsCircleDuotone />, color: ["#F9A43A", "#C2650B"] },
];

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  const [from, to] = reason.color;
  return (
    <Box
      as="article"
      position="relative"
      h="full"
      overflow="hidden"
      p={{ base: "6", md: "7" }}
      borderRadius="l4"
      borderWidth="1px"
      borderColor="border"
      bg="bg.panel"
      css={{
        transition: `transform .45s ${smooth}, box-shadow .45s ${smooth}, border-color .3s`,
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: `0 26px 48px -26px ${to}88`,
          borderColor: `${from}88`,
        },
        // Colour wash that fades in from the corner on hover
        "& .wy-wash": { opacity: 0, transition: "opacity .5s" },
        "&:hover .wy-wash": { opacity: 1 },
        "& .wy-icon": { transition: `transform .6s ${spring}` },
        "&:hover .wy-icon": { transform: "rotate(-10deg) scale(1.1)" },
        "& .wy-bg": { transition: `transform .9s ${smooth}, opacity .5s` },
        "&:hover .wy-bg": { transform: "rotate(0deg) scale(1.12)", opacity: 0.22 },
        "& .wy-bar": { transition: `width .6s ${smooth}` },
        "&:hover .wy-bar": { width: "4rem" },
        "@media (prefers-reduced-motion: reduce)": {
          "&, & *": { transition: "none !important" },
          "&:hover, &:hover *": { transform: "none !important" },
        },
      }}
    >
      {/* Colour wash (hover) */}
      <Box
        className="wy-wash"
        position="absolute"
        inset="0"
        bgImage={`radial-gradient(circle at 100% 100%, ${from}26, transparent 60%)`}
        pointerEvents="none"
      />
      {/* Large faded icon in the corner */}
      <Box
        className="wy-bg"
        position="absolute"
        right={{ base: "-6", md: "-4" }}
        bottom={{ base: "-8", md: "-6" }}
        fontSize={reason.wide ? { base: "9rem", md: "11rem" } : "9rem"}
        lineHeight="1"
        color={{ _light: to, _dark: from }}
        opacity={0.1}
        transform="rotate(-14deg)"
        pointerEvents="none"
        aria-hidden="true"
      >
        {reason.icon}
      </Box>

      <Stack position="relative" gap="4" maxW={reason.wide ? { lg: "md" } : undefined}>
        <Box
          className="wy-icon"
          boxSize="14"
          borderRadius="28%"
          bgImage={`linear-gradient(145deg, ${from}, ${to})`}
          boxShadow={`0 10px 22px -8px ${to}AA, inset 0 1px 0 rgba(255,255,255,.35)`}
          display="grid"
          placeItems="center"
          color="white"
          css={{ "& svg": { width: "60%", height: "60%" } }}
          aria-hidden="true"
        >
          {reason.icon}
        </Box>
        <Text
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="0.12em"
          color={{ _light: to, _dark: from }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </Text>
        <Stack gap="2">
          <Heading as="h3" size="lg" letterSpacing="-0.015em">
            {reason.title}
          </Heading>
          {/* Accent bar: grows on hover */}
          <Box className="wy-bar" h="3px" w="8" borderRadius="full" bgImage={`linear-gradient(90deg, ${from}, ${to})`} />
        </Stack>
        <Text color="fg.muted">{reason.text}</Text>
      </Stack>
    </Box>
  );
}

export async function WhyImara() {
  const { t } = await getI18n();
  return (
    <Section aria-labelledby="why-title">
      <SectionHeading
        id="why-title"
        eyebrow={t.why.eyebrow}
        title={t.why.title}
        subtitle={t.why.subtitle}
      />
      <Grid
        as="ul"
        listStyleType="none"
        mt={{ base: "10", md: "14" }}
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap="5"
      >
        {reasons.map((r, i) => (
          <Box as="li" key={r.key} gridColumn={r.wide ? { lg: "span 2" } : undefined}>
            {/* Staggered entrance as the section scrolls into view */}
            <Reveal delay={(i % 3) * 0.08} y={28}>
              <ReasonCard reason={{ ...r, ...t.why[r.key] }} index={i} />
            </Reveal>
          </Box>
        ))}
      </Grid>
    </Section>
  );
}

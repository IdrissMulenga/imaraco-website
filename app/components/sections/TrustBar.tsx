import { Box, HStack, Text } from "@chakra-ui/react";
import {
  PiDeviceMobileDuotone,
  PiDevicesDuotone,
  PiEyeSlashDuotone,
  PiMapPinDuotone,
  PiSparkleDuotone,
  PiTranslateDuotone,
  PiWhatsappLogoDuotone,
  PiWifiSlashDuotone,
} from "react-icons/pi";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { getI18n } from "@/i18n/server";

/**
 * Trust bar: verifiable commitments (no client logos or numbers), scrolling
 * by themselves in an endless loop. Pauses on hover; stays still for
 * visitors who turn on "reduce motion".
 * When real partners agree to be listed, their logos can join this loop.
 * Never use a logo without written permission.
 */
type TrustKey = Exclude<keyof Dictionary["trust"], "label">;

const items: { icon: React.ReactNode; key: TrustKey; color: string }[] = [
  { icon: <PiMapPinDuotone />, key: "local", color: "#F37421" },
  { icon: <PiSparkleDuotone />, key: "ai", color: "#7C3AED" },
  { icon: <PiDevicesDuotone />, key: "platforms", color: "#0369A1" },
  { icon: <PiWifiSlashDuotone />, key: "offline", color: "#0E7490" },
  { icon: <PiDeviceMobileDuotone />, key: "mobileMoney", color: "#047857" },
  { icon: <PiTranslateDuotone />, key: "bilingual", color: "#6D28D9" },
  { icon: <PiWhatsappLogoDuotone />, key: "helpdesk", color: "#16A34A" },
  { icon: <PiEyeSlashDuotone />, key: "noTrackers", color: "#BE185D" },
];

function Row({ labels, hidden = false }: { labels: Dictionary["trust"]; hidden?: boolean }) {
  return (
    <HStack
      as="ul"
      listStyleType="none"
      gap={{ base: "3", md: "4" }}
      pe={{ base: "3", md: "4" }}
      flexShrink={0}
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <HStack
          as="li"
          key={item.key}
          gap="2.5"
          ps="1.5"
          pe="4"
          py="1.5"
          borderRadius="full"
          borderWidth="1px"
          borderColor="border"
          bg="bg.panel"
          whiteSpace="nowrap"
          transition="border-color .25s, transform .25s"
          _hover={{ borderColor: item.color, transform: "translateY(-2px)" }}
        >
          <Box
            boxSize="8"
            borderRadius="full"
            display="grid"
            placeItems="center"
            fontSize="lg"
            color={item.color}
            bg={`${item.color}1A`}
            _dark={{ bg: `${item.color}33`, color: "white" }}
          >
            {item.icon}
          </Box>
          <Text fontSize="sm" fontWeight="medium" color="fg">
            {labels[item.key]}
          </Text>
        </HStack>
      ))}
    </HStack>
  );
}

export async function TrustBar() {
  const { t } = await getI18n();
  return (
    <Box
      as="section"
      aria-label={t.trust.label}
      borderYWidth="1px"
      borderColor="border.subtle"
      bg="bg.subtle"
      py={{ base: "5", md: "6" }}
      overflow="hidden"
      // Fade the left and right edges
      css={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      {/* Two identical rows side by side, moved left by exactly one row's
          width, so the loop never shows a gap. */}
      <Box
        display="flex"
        w="max-content"
        css={{
          // Keyframes "imaraMarquee" are defined in app/theme/index.ts
          animation: "imaraMarquee 40s linear infinite",
          "&:hover": { animationPlayState: "paused" },
          "@media (prefers-reduced-motion: reduce)": {
            animation: "none",
            flexWrap: "wrap",
            width: "auto",
            justifyContent: "center",
            rowGap: "0.75rem",
            "& > ul:last-of-type": { display: "none" },
          },
        }}
      >
        <Row labels={t.trust} />
        <Row labels={t.trust} hidden />
      </Box>
    </Box>
  );
}

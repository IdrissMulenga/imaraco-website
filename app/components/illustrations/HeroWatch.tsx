import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { PiArrowsClockwiseDuotone, PiFootprintsDuotone, PiSparkleDuotone } from "react-icons/pi";
import { Float } from "@/components/motion/Reveal";
import { getI18n } from "@/i18n/server";

/**
 * Homepage hero picture: the Imara Afya Band mockup
 * (public/products/imara-afya/watch.webp), floating over soft rings and a
 * warm glow, with small floating info chips around it.
 */

function Chip({
  icon,
  color,
  title,
  text,
}: {
  icon: React.ReactNode;
  color: [string, string];
  title: string;
  text: string;
}) {
  return (
    <HStack
      gap="3"
      ps="2"
      pe="4"
      py="2"
      bg="bg.panel"
      borderRadius="full"
      borderWidth="1px"
      borderColor="border"
      boxShadow="0 18px 36px -18px rgba(0,0,0,.35)"
      whiteSpace="nowrap"
    >
      <Box
        boxSize="9"
        borderRadius="full"
        display="grid"
        placeItems="center"
        color="white"
        fontSize="lg"
        bgImage={`linear-gradient(145deg, ${color[0]}, ${color[1]})`}
        flexShrink={0}
      >
        {icon}
      </Box>
      <Stack gap="0" lineHeight="1.2">
        <Text fontSize="sm" fontWeight="semibold">
          {title}
        </Text>
        <Text fontSize="xs" color="fg.muted">
          {text}
        </Text>
      </Stack>
    </HStack>
  );
}

export async function HeroWatch() {
  const { t } = await getI18n();
  return (
    <Box
      position="relative"
      w="full"
      maxW={{ base: "sm", md: "md" }}
      mx="auto"
      aspectRatio="1"
      role="img"
      aria-label={t.hero.watchAlt}
    >
      <Box aria-hidden="true">
        {/* Warm glow + concentric rings */}
        <Box position="absolute" inset="12%" borderRadius="full" bg="brand.solid" opacity={{ _light: 0.22, _dark: 0.28 }} filter="blur(70px)" />
        <Box position="absolute" inset="18%" borderRadius="full" bg="#30B44B" opacity={0.12} filter="blur(60px)" transform="translate(18%, 12%)" />
        {["4%", "14%", "24%"].map((inset, i) => (
          <Box
            key={inset}
            position="absolute"
            inset={inset}
            borderRadius="full"
            borderWidth="1px"
            borderColor="border.emphasized"
            opacity={0.55 - i * 0.12}
            borderStyle={i === 0 ? "dashed" : "solid"}
          />
        ))}

        {/* The band */}
        <Box position="absolute" inset="8%" display="grid" placeItems="center">
          <Float>
            <Box
              position="relative"
              w={{ base: "14rem", md: "16.5rem" }}
              aspectRatio="720 / 971"
              transform="rotate(-6deg)"
              filter="drop-shadow(0 40px 40px rgba(0,0,0,.35))"
            >
              <Image
                src="/products/imara-afya/watch.webp"
                alt=""
                fill
                sizes="(max-width: 768px) 240px, 304px"
                loading="eager"
                style={{ objectFit: "contain" }}
              />
            </Box>
          </Float>
        </Box>
        {/* Soft ground shadow */}
        <Box position="absolute" bottom="3%" left="30%" right="30%" h="5%" borderRadius="full" bg="blackAlpha.400" filter="blur(14px)" />

        {/* Floating chips */}
        <Box position="absolute" top={{ base: "4%", md: "10%" }} left={{ base: "-2%", md: "-10%" }}>
          <Float delay={0.6}>
            <Chip icon={<PiFootprintsDuotone />} color={["#4CC764", "#1E8E3E"]} title={t.hero.chipSteps} text={t.hero.chipStepsText} />
          </Float>
        </Box>
        <Box position="absolute" top="46%" right={{ base: "-2%", md: "-12%" }} display={{ base: "none", sm: "block" }}>
          <Float delay={1.3}>
            <Chip icon={<PiArrowsClockwiseDuotone />} color={["#4A90E2", "#205CAA"]} title={t.hero.chipSync} text="Imara Afya" />
          </Float>
        </Box>
        <Box position="absolute" bottom={{ base: "6%", md: "8%" }} left={{ base: "0", md: "-4%" }}>
          <Float delay={2}>
            <Chip icon={<PiSparkleDuotone />} color={["#F9A43A", "#C2650B"]} title={t.hero.chipBand} text={t.common.comingSoon} />
          </Float>
        </Box>
      </Box>
    </Box>
  );
}

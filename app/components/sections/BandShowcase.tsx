import { Badge, Box, Grid, Heading, HStack, Link, List, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import { LuArrowDown, LuCheck } from "react-icons/lu";
import { HeroWatch } from "@/components/illustrations/HeroWatch";
import { Reveal } from "@/components/motion/Reveal";
import { NotifyForm } from "@/components/shared/NotifyForm";
import { getI18n } from "@/i18n/server";

/**
 * Imara Afya Band showcase (above the Imara Afya card on the homepage and Products page): the floating watch
 * mockup with "Coming soon", a short description and a notify sign-up.
 * The band belongs to Imara Afya, so a chip and a connector link it to the
 * Imara Afya app card that follows (#imara-afya).
 */
export async function BandShowcase({ headingAs = "h2" }: { headingAs?: "h2" | "h3" }) {
  const { t } = await getI18n();
  return (
    <Reveal>
      <Grid
        id="imara-afya-band"
        scrollMarginTop="24"
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={{ base: "6", md: "10" }}
        alignItems="center"
        borderWidth="1px"
        borderColor="border"
        borderRadius="l4"
        p={{ base: "5", md: "10" }}
        overflow="hidden"
        position="relative"
        bgImage={{
          _light: "radial-gradient(circle at 85% 30%, #FFE4D1, transparent 55%)",
          _dark: "radial-gradient(circle at 85% 30%, #3A1F0F, transparent 55%)",
        }}
        bg="bg.panel"
      >
        <Stack gap="5" order={{ base: 2, md: 1 }}>
          <HStack gap="2" flexWrap="wrap">
            <Badge variant="solid" size="lg">
              {t.band.eyebrow}
            </Badge>
            <AfyaChip label={t.band.partOf} />
          </HStack>
          <Heading as={headingAs} id="band-title" size={{ base: "3xl", md: "4xl" }}>
            {t.band.title}
          </Heading>
          <Text textStyle="lead" color="fg.muted">
            {t.band.text}
          </Text>
          <List.Root gap="2" variant="plain">
            {t.band.points.map((point) => (
              <List.Item key={point}>
                <List.Indicator asChild color={{ _light: "#2A9F42", _dark: "#4CC764" }}>
                  <LuCheck />
                </List.Indicator>
                {point}
              </List.Item>
            ))}
          </List.Root>
          <Stack gap="2" maxW="md" pt="1">
            <Text fontSize="sm" fontWeight="medium" color="fg.muted">
              {t.band.notify}
            </Text>
            <NotifyForm topic="band" topicName={t.band.title} />
          </Stack>
        </Stack>
        <Box order={{ base: 1, md: 2 }}>
          <HeroWatch />
        </Box>
      </Grid>

      {/* Connector: the band and the app are one product family */}
      <Stack align="center" gap="0">
        <Box h={{ base: "6", md: "8" }} borderLeftWidth="2px" borderStyle="dashed" borderColor={afyaGreen} />
        <Link
          href="#imara-afya"
          display="inline-flex"
          alignItems="center"
          gap="2"
          px="4"
          py="2"
          borderRadius="full"
          borderWidth="1px"
          borderColor={{ _light: "#CFE9D5", _dark: "#1E3A27" }}
          bg={{ _light: "#F1FAF3", _dark: "#0E1F14" }}
          fontSize="sm"
          fontWeight="semibold"
          color="fg"
          textDecoration="none"
          _hover={{ textDecoration: "none", borderColor: afyaGreen }}
        >
          <AfyaLogo size="5" />
          {t.band.connector}
          <Box as="span" color={afyaGreen}>
            <LuArrowDown />
          </Box>
        </Link>
      </Stack>
    </Reveal>
  );
}

const afyaGreen = { _light: "#2A9F42", _dark: "#4CC764" };

function AfyaLogo({ size }: { size: string }) {
  return (
    <Box w={size} flexShrink={0}>
      <Image src="/brand/imara-afya-logo.png" alt="" width={229} height={256} style={{ width: "100%", height: "auto" }} />
    </Box>
  );
}

/** "Part of Imara Afya" chip, in Imara Afya's green. */
function AfyaChip({ label }: { label: string }) {
  return (
    <HStack
      gap="1.5"
      px="2.5"
      py="1"
      borderRadius="full"
      borderWidth="1px"
      borderColor={{ _light: "#CFE9D5", _dark: "#1E3A27" }}
      bg={{ _light: "#F1FAF3", _dark: "#0E1F14" }}
      fontSize="sm"
      fontWeight="semibold"
      color={afyaGreen}
    >
      <AfyaLogo size="4" />
      {label}
    </HStack>
  );
}

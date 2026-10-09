import { Alert, Badge, Box, Center, Grid, Heading, HStack, List, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { FaAndroid, FaApple } from "react-icons/fa";
import { LuCheck, LuWatch } from "react-icons/lu";
import { AfyaPhone } from "@/components/illustrations/AfyaPhone";
import { Float, Reveal } from "@/components/motion/Reveal";
import { NotifyForm } from "@/components/shared/NotifyForm";
import { StoreButtons } from "@/components/shared/StoreButtons";
import { afyaStores, routes } from "@/data/site";
import { getI18n } from "@/i18n/server";

/** Small "iOS" / "Android" label under a phone. */
function PlatformLabel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <HStack
      gap="1.5"
      px="3"
      py="1"
      borderRadius="full"
      bg={{ _light: "whiteAlpha.800", _dark: "blackAlpha.500" }}
      borderWidth="1px"
      borderColor={{ _light: "#D6E4F5", _dark: "#1C2B40" }}
      fontSize="xs"
      fontWeight="semibold"
      color="fg.muted"
      whiteSpace="nowrap"
      aria-hidden="true"
    >
      {icon}
      {label}
    </HStack>
  );
}

/**
 * Featured block for Imara Afya, our first product. Shows "Coming soon"
 * badges + a notify signup until launch, then links to the app stores. `showDisclaimer` adds the medical note (Products page).
 */
export async function AfyaSpotlight({
  headingAs = "h2",
  showDisclaimer = false,
  showBandNote = true,
}: {
  headingAs?: "h2" | "h3";
  showDisclaimer?: boolean;
  showBandNote?: boolean;
}) {
  const { t, href } = await getI18n();
  return (
    <Reveal>
      <Grid
        templateColumns={{ base: "1fr", md: "1.3fr 1fr" }}
        gap={{ base: "8", md: "12" }}
        alignItems="center"
        bg="bg.panel"
        borderWidth="1px"
        borderColor="border"
        borderRadius="l4"
        p={{ base: "5", md: "10" }}
        overflow="hidden"
        id="imara-afya"
        scrollMarginTop="24"
      >
        <Stack gap="5">
          <Stack direction="row" gap="2" flexWrap="wrap">
            <Badge variant="solid" size="lg">
              {t.common.ourFirstProduct}
            </Badge>
            <Badge variant="subtle" colorPalette="gray" size="lg">
              {afyaStores.launched ? t.afya.badgeAvailable : t.afya.badgeSoon}
            </Badge>
            {/* Where the band has its own section above, link back to it */}
            {!showBandNote && (
              <Badge asChild size="lg" variant="outline" colorPalette="green" gap="1.5">
                <a href="#imara-afya-band">
                  <LuWatch />
                  {t.band.withApp}
                </a>
              </Badge>
            )}
          </Stack>
          <HStack gap="3">
            <Box w={{ base: "10", md: "12" }} flexShrink={0}>
              <Image
                src="/brand/imara-afya-logo.png"
                alt={t.afya.logoAlt}
                width={229}
                height={256}
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
            <Heading as={headingAs} id="afya-title" size={{ base: "3xl", md: "4xl" }}>
              Imara Afya
            </Heading>
          </HStack>
          <Text textStyle="lead" color="fg.muted">
            {t.afya.text}
          </Text>
          <List.Root gap="2" variant="plain">
            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="2">
              {t.afya.features.map((f) => (
                <List.Item key={f}>
                  {/* Green tick: Imara Afya's green (from its logo) */}
                  <List.Indicator asChild color={{ _light: "#2A9F42", _dark: "#4CC764" }}>
                    <LuCheck />
                  </List.Indicator>
                  {f}
                </List.Item>
              ))}
            </SimpleGrid>
          </List.Root>
          {/* The wearable band (coming soon); hidden where the band has its own section */}
          {showBandNote && (
                    <HStack
            gap="3"
            p="3"
            borderRadius="l3"
            borderWidth="1px"
            borderColor={{ _light: "#CFE9D5", _dark: "#1E3A27" }}
            bg={{ _light: "#F1FAF3", _dark: "#0E1F14" }}
          >
            <Center
              boxSize="10"
              borderRadius="l2"
              bg={{ _light: "#DDF2E2", _dark: "#173323" }}
              color={{ _light: "#2A9F42", _dark: "#4CC764" }}
              fontSize="xl"
              flexShrink={0}
            >
              <LuWatch />
            </Center>
            <Text fontSize="sm" color="fg.muted">
              <Text as="span" fontWeight="semibold" color="fg">
                {t.afya.bandTitle}
              </Text>{" "}
              {t.afya.bandText}
            </Text>
          </HStack>
          )}
          <StoreButtons size="lg" pt="1" />
          {!afyaStores.launched && (
            <Stack gap="2" maxW="md">
              <Text fontSize="sm" fontWeight="medium" color="fg.muted">
                {t.afya.notifyPrompt}
              </Text>
              <NotifyForm topic="afya" topicName="Imara Afya" />
            </Stack>
          )}
          {showDisclaimer && (
            <Alert.Root status="info" variant="subtle" borderRadius="l3">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>{t.afya.disclaimerTitle}</Alert.Title>
                <Alert.Description fontSize="sm">
                  {t.afya.disclaimer}{" "}
                  <NextLink href={href(routes.privacy)} style={{ textDecoration: "underline" }}>
                    {t.afya.privacyLink}
                  </NextLink>
                  .
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}
        </Stack>

        <Center
          alignSelf="stretch"
          // Imara Afya's own colors (blue → green, from its logo), not the site orange
          bgGradient="to-br"
          gradientFrom={{ _light: "#E9F0FA", _dark: "#0F1A2B" }}
          gradientTo={{ _light: "#E8F6EB", _dark: "#0E2116" }}
          borderRadius="l3"
          borderWidth="1px"
          borderColor={{ _light: "#D6E4F5", _dark: "#1C2B40" }}
          py={{ base: "8", md: "12" }}
          overflow="hidden"
          role="img"
          aria-label={t.afya.screensAlt}
        >
          {/* Real screens on both platforms: iPhone (front) and Pixel (behind) */}
          <Box position="relative" w="min(440px, 86vw)" aspectRatio={{ base: "440 / 610", md: "440 / 560" }}>
            <Stack position="absolute" right="0" top="0" w="54%" align="center" gap="3">
              <AfyaPhone width="100%" device="pixel" screen="android-home" />
              <PlatformLabel icon={<FaAndroid />} label="Android" />
            </Stack>
            <Stack position="absolute" left="0" top="7%" w="56%" align="center" gap="3" zIndex="1">
              {/* w="full": the float wrapper must have a width, or "100%" collapses to 0 */}
              <Box w="full">
                <Float>
                  <AfyaPhone width="100%" device="iphone" screen="home" />
                </Float>
              </Box>
              <PlatformLabel icon={<FaApple />} label="iOS" />
            </Stack>
          </Box>
        </Center>
      </Grid>
    </Reveal>
  );
}

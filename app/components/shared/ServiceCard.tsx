import { Badge, Box, Button, Card, HStack, LinkBox, LinkOverlay, List, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowRight, LuCheck } from "react-icons/lu";
import type { Service, ServiceId } from "@/data/services";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { serviceIcons } from "./icons";

// Same easing as the product cards.
const spring = "cubic-bezier(.34,1.56,.64,1)";
const smooth = "cubic-bezier(.22,1,.36,1)";

/** Each service's own colours: icon gradient, soft top area, text and border. */
export const servicePalette: Record<
  ServiceId,
  {
    icon: [string, string];
    soft: { light: [string, string]; dark: [string, string] };
    text: { light: string; dark: string };
    border: { light: string; dark: string };
  }
> = {
  ai: {
    icon: ["#22D3EE", "#7C3AED"],
    soft: { light: ["#ECFEFF", "#EDE9FE"], dark: ["#0A1B22", "#1A1236"] },
    text: { light: "#6D28D9", dark: "#C4B5FD" },
    border: { light: "#C4B5FD", dark: "#3B2A6B" },
  },
  web: {
    icon: ["#38BDF8", "#0369A1"],
    soft: { light: ["#F0F9FF", "#E0F2FE"], dark: ["#0A1822", "#0C2233"] },
    text: { light: "#0369A1", dark: "#7DD3FC" },
    border: { light: "#BAE6FD", dark: "#123A55" },
  },
  mobile: {
    icon: ["#A78BFA", "#6D28D9"],
    soft: { light: ["#F5F3FF", "#EDE9FE"], dark: ["#160F26", "#1F1538"] },
    text: { light: "#6D28D9", dark: "#C4B5FD" },
    border: { light: "#DDD6FE", dark: "#3B2A6B" },
  },
  support: {
    icon: ["#34D399", "#047857"],
    soft: { light: ["#ECFDF5", "#D1FAE5"], dark: ["#0A1D16", "#0D2A1F"] },
    text: { light: "#047857", dark: "#6EE7B7" },
    border: { light: "#A7F3D0", dark: "#134E3A" },
  },
  backend: {
    icon: ["#94A3B8", "#334155"],
    soft: { light: ["#F8FAFC", "#E2E8F0"], dark: ["#12161C", "#1A2029"] },
    text: { light: "#334155", dark: "#CBD5E1" },
    border: { light: "#CBD5E1", dark: "#2B3442" },
  },
  design: {
    icon: ["#F472B6", "#BE185D"],
    soft: { light: ["#FDF2F8", "#FCE7F3"], dark: ["#220D18", "#2E1121"] },
    text: { light: "#BE185D", dark: "#F9A8D4" },
    border: { light: "#FBCFE8", dark: "#5A1B3B" },
  },
  training: {
    icon: ["#F9A43A", "#C2650B"],
    soft: { light: ["#FFF7EB", "#FEEBCC"], dark: ["#221608", "#2E1D0A"] },
    text: { light: "#A85A09", dark: "#FCC77A" },
    border: { light: "#FDD496", dark: "#5A3810" },
  },
};

/** App-icon style badge with the service's line icon. */
export function ServiceIcon({ id, className }: { id: ServiceId; className?: string }) {
  const [from, to] = servicePalette[id].icon;
  return (
    <Box
      className={className}
      boxSize={{ base: "14", md: "16" }}
      flexShrink={0}
      borderRadius="28%"
      bgImage={`linear-gradient(145deg, ${from}, ${to})`}
      boxShadow={`0 10px 22px -8px ${to}AA, inset 0 1px 0 rgba(255,255,255,.35)`}
      display="grid"
      placeItems="center"
      position="relative"
      overflow="hidden"
      color="white"
      fontSize={{ base: "2xl", md: "3xl" }}
      aria-hidden="true"
    >
      <Box position="absolute" inset="0" bgImage="linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,0) 55%)" />
      <Box position="relative" display="grid" placeItems="center" fontSize={{ base: "3xl", md: "4xl" }}>
        {serviceIcons[id]}
      </Box>
    </Box>
  );
}

/**
 * Service card, styled like the product cards: a coloured top area with the
 * service icon, then title and description.
 * - Home page (default): the whole card links to the service on /services.
 * - Services page (`detailed`): adds "what's included". One contact button
 *   at the bottom of the page replaces a "Request a quote" on every card.
 * Hover: card lifts, border takes the service colour, icon tilts, glow grows.
 */
export async function ServiceCard({ service, detailed = false }: { service: Service; detailed?: boolean }) {
  const { t, href } = await getI18n();
  const pal = servicePalette[service.id];
  const accent = { _light: pal.text.light, _dark: pal.text.dark };
  // Featured (AI): picture on the left, text on the right, from tablet up.
  const wide = service.featured;

  const card = (
    <Card.Root
      h="full"
      flexDirection={wide ? { base: "column", md: "row" } : "column"}
      overflow="hidden"
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border"
      borderRadius="l4"
      css={{
        transition: `transform .45s ${smooth}, box-shadow .45s ${smooth}, border-color .3s`,
        "&:hover, &:focus-within": {
          transform: "translateY(-6px)",
          boxShadow: "0 28px 50px -24px rgba(0,0,0,.35)",
          borderColor: pal.border.light,
          _dark: { borderColor: pal.border.dark },
        },
        "& .sc-icon": { transition: `transform .55s ${spring}` },
        "&:hover .sc-icon, &:focus-within .sc-icon": { transform: "rotate(-8deg) scale(1.08)" },
        "& .sc-glow": { transition: `transform .7s ${smooth}, opacity .5s` },
        "& .sc-bgicon": { transition: `transform .8s ${smooth}, opacity .5s` },
        "&:hover .sc-bgicon, &:focus-within .sc-bgicon": { transform: "rotate(-4deg) scale(1.08) translateX(-6px)", opacity: 0.32 },
        "&:hover .sc-glow, &:focus-within .sc-glow": { transform: "scale(1.35)", opacity: 0.75 },
        "& .sc-arrow": { transition: "transform .25s ease-out" },
        "&:hover .sc-arrow, &:focus-within .sc-arrow": { transform: "translateX(4px)" },
        "@media (prefers-reduced-motion: reduce)": {
          "&, & *": { transition: "none !important" },
          "&:hover, &:hover *, &:focus-within, &:focus-within *": { transform: "none !important" },
        },
      }}
    >
      {/* Coloured top area */}
      <Box
        position="relative"
        h={wide ? { base: "28", md: "auto" } : { base: "28", md: "32" }}
        w={wide ? { md: "38%" } : undefined}
        minH={wide ? { md: "56" } : undefined}
        flexShrink={0}
        overflow="hidden"
        bgImage={{
          _light: `linear-gradient(135deg, ${pal.soft.light[0]}, ${pal.soft.light[1]})`,
          _dark: `linear-gradient(135deg, ${pal.soft.dark[0]}, ${pal.soft.dark[1]})`,
        }}
        borderBottomWidth={wide ? { base: "1px", md: "0" } : "1px"}
        borderRightWidth={wide ? { md: "1px" } : undefined}
        borderColor={{ _light: pal.border.light, _dark: pal.border.dark }}
      >
        <Box
          position="absolute"
          inset="0"
          opacity={{ _light: 0.5, _dark: 0.35 }}
          bgImage={`radial-gradient(${pal.icon[1]}33 1.2px, transparent 1.2px)`}
          bgSize="16px 16px"
          css={{ maskImage: "linear-gradient(to left, black 10%, transparent 75%)" }}
        />
        <Box
          className="sc-glow"
          position="absolute"
          right="-10"
          top="-10"
          boxSize="36"
          borderRadius="full"
          bg={pal.icon[0]}
          opacity={0.35}
          filter="blur(36px)"
        />
        {/* Large faded icon in the background */}
        <Box
          className="sc-bgicon"
          position="absolute"
          right={{ base: "-4", md: "-2" }}
          top="50%"
          mt={{ base: "-14", md: "-16" }}
          fontSize={{ base: "7.5rem", md: "8.5rem" }}
          lineHeight="1"
          color={{ _light: pal.icon[1], _dark: pal.icon[0] }}
          opacity={0.2}
          transform="rotate(-12deg)"
          aria-hidden="true"
        >
          {serviceIcons[service.id]}
        </Box>
        <Box position="absolute" left={{ base: "5", md: "6" }} bottom={{ base: "5", md: "6" }}>
          <ServiceIcon id={service.id} className="sc-icon" />
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" flex="1">
      <Card.Body gap="3" p={{ base: "5", md: "6" }}>
        {wide && (
          <Badge alignSelf="flex-start" variant="solid" colorPalette="purple">
            {t.common.new}
          </Badge>
        )}
        <Card.Title as="h3" fontFamily="heading" fontSize="lg" letterSpacing="-0.015em">
          {detailed ? (
            service.title
          ) : (
            <LinkOverlay asChild>
              <NextLink href={`${href(routes.services)}#${service.id}`}>{service.title}</NextLink>
            </LinkOverlay>
          )}
        </Card.Title>
        <Card.Description color="fg.muted">{service.short}</Card.Description>
        {detailed && (
          <List.Root
            gap="2"
            variant="plain"
            fontSize="sm"
            pt="1"
            display={wide ? { md: "grid" } : undefined}
            gridTemplateColumns={wide ? { md: "1fr 1fr" } : undefined}
          >
            {service.included.map((item) => (
              <List.Item key={item}>
                <List.Indicator asChild color={accent}>
                  <LuCheck />
                </List.Indicator>
                {item}
              </List.Item>
            ))}
          </List.Root>
        )}
      </Card.Body>

      {!detailed && (
        <Card.Footer px={{ base: "5", md: "6" }} pb={{ base: "5", md: "6" }}>
          <HStack gap="1.5" fontSize="sm" fontWeight="semibold" color={accent} aria-hidden="true">
            <Text>{t.common.learnMore}</Text>
            <LuArrowRight className="sc-arrow" />
          </HStack>
        </Card.Footer>
      )}
      </Box>
    </Card.Root>
  );

  if (detailed) {
    // Anchor so home-page cards can jump straight to this service.
    return (
      <Box id={service.id} h="full" scrollMarginTop="24">
        {card}
      </Box>
    );
  }
  return (
    <LinkBox asChild h="full">
      {card}
    </LinkBox>
  );
}

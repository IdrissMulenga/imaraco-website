import { Badge, Box, Card, HStack, LinkBox, LinkOverlay, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { LuArrowRight } from "react-icons/lu";
import type { Product } from "@/data/products";
import { ProductLogo, productIconsDuotone, productPalette } from "./ProductLogo";
import { getI18n } from "@/i18n/server";
import { StoreButtons } from "./StoreButtons";

// Springy easing for the hover animations.
const spring = "cubic-bezier(.34,1.56,.64,1)";
const smooth = "cubic-bezier(.22,1,.36,1)";

/**
 * Product card: a picture area in the product's own colours (logo, glow,
 * dot pattern) above the name, tagline and description.
 * Hover: card lifts, border takes the product colour, logo tilts, glow grows, arrow nudges. Disabled for "reduce motion".
 */
export async function ProductCard({ product }: { product: Product }) {
  const i18n = await getI18n();
  const href = product.href ? i18n.href(product.href) : undefined;
  const pal = productPalette[product.id];

  const card = (
    <Card.Root
      h="full"
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
        "& .pc-logo": { transition: `transform .55s ${spring}` },
        "&:hover .pc-logo, &:focus-within .pc-logo": { transform: "rotate(-8deg) scale(1.08)" },
        "& .pc-glow": { transition: `transform .7s ${smooth}, opacity .5s` },
        "& .pc-bgicon": { transition: `transform .8s ${smooth}, opacity .5s` },
        "&:hover .pc-bgicon, &:focus-within .pc-bgicon": { transform: "rotate(-4deg) scale(1.08) translateX(-6px)", opacity: 0.32 },
        "&:hover .pc-glow, &:focus-within .pc-glow": { transform: "scale(1.35)", opacity: 0.75 },
        "& .pc-arrow": { transition: "transform .25s ease-out" },
        "&:hover .pc-arrow, &:focus-within .pc-arrow": { transform: "translateX(4px)" },
        "@media (prefers-reduced-motion: reduce)": {
          "&, & *": { transition: "none !important" },
          "&:hover, &:hover *, &:focus-within, &:focus-within *": { transform: "none !important" },
        },
      }}
    >
      {/* Picture area */}
      <Box
        position="relative"
        h={{ base: "36", md: "40" }}
        overflow="hidden"
        bgImage={{
          _light: `linear-gradient(135deg, ${pal.soft.light[0]}, ${pal.soft.light[1]})`,
          _dark: `linear-gradient(135deg, ${pal.soft.dark[0]}, ${pal.soft.dark[1]})`,
        }}
        borderBottomWidth="1px"
        borderColor={{ _light: pal.border.light, _dark: pal.border.dark }}
      >
        {/* Dot pattern */}
        <Box
          position="absolute"
          inset="0"
          opacity={{ _light: 0.5, _dark: 0.35 }}
          bgImage={`radial-gradient(${pal.icon[1]}33 1.2px, transparent 1.2px)`}
          bgSize="16px 16px"
          css={{ maskImage: "linear-gradient(to left, black 10%, transparent 75%)" }}
        />
        {/* Glow */}
        <Box
          className="pc-glow"
          position="absolute"
          right="-12"
          top="-12"
          boxSize="44"
          borderRadius="full"
          bg={pal.icon[0]}
          opacity={0.35}
          filter="blur(40px)"
        />
        {/* Large faded icon in the background */}
        <Box
          className="pc-bgicon"
          position="absolute"
          right={{ base: "-4", md: "-2" }}
          top="50%"
          mt={{ base: "-16", md: "-20" }}
          fontSize={{ base: "8.5rem", md: "10rem" }}
          lineHeight="1"
          color={{ _light: pal.icon[1], _dark: pal.icon[0] }}
          opacity={0.2}
          transform="rotate(-12deg)"
          aria-hidden="true"
        >
          {productIconsDuotone[product.id]}
        </Box>
        {/* Logo */}
        <ProductLogo id={product.id} className="pc-logo" size={{ base: "16", md: "18" }} position="absolute" left="6" bottom="6" />
      </Box>

      <Card.Body gap="3" p={{ base: "5", md: "6" }}>
        <HStack justify="space-between" gap="2" flexWrap="wrap">
          <Badge variant="subtle" colorPalette="gray">
            {product.category}
          </Badge>
          {product.status && (
            <Badge variant="solid" colorPalette="brand">
              {product.status}
            </Badge>
          )}
        </HStack>
        <div>
          <Card.Title as="h3" fontFamily="heading" fontSize="xl" letterSpacing="-0.015em">
            {href ? (
              <LinkOverlay asChild>
                <NextLink href={href}>{product.name}</NextLink>
              </LinkOverlay>
            ) : (
              product.name
            )}
          </Card.Title>
          <Text mt="1" fontWeight="medium" color={{ _light: pal.text.light, _dark: pal.text.dark }}>
            {product.tagline}
          </Text>
        </div>
        <Card.Description color="fg.muted">{product.short}</Card.Description>
      </Card.Body>

      <Card.Footer flexDirection="column" alignItems="stretch" gap="3" px={{ base: "5", md: "6" }} pb={{ base: "5", md: "6" }}>
        <HStack justify="space-between" gap="3">
          <Text fontSize="xs" color="fg.muted" fontWeight="medium">
            {product.meta}
          </Text>
          {href && (
            <HStack
              gap="1.5"
              fontSize="sm"
              fontWeight="semibold"
              color={{ _light: pal.text.light, _dark: pal.text.dark }}
              aria-hidden="true"
              flexShrink={0}
            >
              {i18n.t.common.learnMore}
              <LuArrowRight className="pc-arrow" />
            </HStack>
          )}
        </HStack>
        {!href && <StoreButtons size="sm" />}
      </Card.Footer>
    </Card.Root>
  );

  if (!href) return card;
  return (
    <LinkBox asChild h="full">
      {card}
    </LinkBox>
  );
}

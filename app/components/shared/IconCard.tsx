import { Box, Heading, Stack, Text } from "@chakra-ui/react";

const smooth = "cubic-bezier(.22,1,.36,1)";
const spring = "cubic-bezier(.34,1.56,.64,1)";

/**
 * Card used on About and Labs: gradient app-style icon, title, text,
 * optional badge/children, a large faded copy of the icon in the corner,
 * and a lift + colour glow on hover (off for "reduce motion").
 */
export function IconCard({
  icon,
  color,
  title,
  text,
  badge,
  children,
  as = "h3",
}: {
  icon: React.ReactNode;
  /** Gradient [light, dark] for the icon and accents. */
  color: [string, string];
  title: string;
  text: string;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  as?: "h2" | "h3";
}) {
  const [from, to] = color;
  return (
    <Stack
      as="article"
      gap="4"
      h="full"
      p={{ base: "6", md: "7" }}
      position="relative"
      overflow="hidden"
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border"
      borderRadius="l4"
      css={{
        transition: `transform .45s ${smooth}, box-shadow .45s ${smooth}, border-color .3s`,
        "&:hover": { transform: "translateY(-5px)", boxShadow: `0 26px 48px -26px ${to}99`, borderColor: `${from}88` },
        "& .ic-icon": { transition: `transform .55s ${spring}` },
        "&:hover .ic-icon": { transform: "rotate(-8deg) scale(1.08)" },
        "& .ic-bg": { transition: `transform .9s ${smooth}, opacity .5s` },
        "&:hover .ic-bg": { transform: "rotate(0deg) scale(1.1)", opacity: 0.2 },
        "@media (prefers-reduced-motion: reduce)": {
          "&, & *": { transition: "none !important" },
          "&:hover, &:hover *": { transform: "none !important" },
        },
      }}
    >
      <Box
        className="ic-bg"
        aria-hidden="true"
        position="absolute"
        right="-6"
        bottom="-8"
        fontSize="9rem"
        lineHeight="1"
        color={{ _light: to, _dark: from }}
        opacity={0.09}
        transform="rotate(-14deg)"
        pointerEvents="none"
      >
        {icon}
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap="3" position="relative">
        <Box
          className="ic-icon"
          boxSize="12"
          borderRadius="28%"
          bgImage={`linear-gradient(145deg, ${from}, ${to})`}
          boxShadow={`0 10px 20px -10px ${to}`}
          color="white"
          display="grid"
          placeItems="center"
          fontSize="2xl"
          flexShrink={0}
          aria-hidden="true"
        >
          {icon}
        </Box>
        {badge}
      </Box>
      <Stack gap="2" position="relative" flex="1">
        <Heading as={as} size="lg" letterSpacing="-0.015em">
          {title}
        </Heading>
        <Text color="fg.muted">{text}</Text>
      </Stack>
      {children && <Box position="relative">{children}</Box>}
    </Stack>
  );
}

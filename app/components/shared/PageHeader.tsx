import { Box, Container, Heading, HStack, Stack, Text } from "@chakra-ui/react";

/** Title block at the top of every inner page. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
  icon,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Optional logo shown beside the title (e.g. a product logo). */
  icon?: React.ReactNode;
  /** Optional buttons or badges under the subtitle. */
  children?: React.ReactNode;
}) {
  return (
    <Box
      as="header"
      position="relative"
      overflow="hidden"
      borderBottomWidth="1px"
      borderColor="border.subtle"
    >
      {/* Same abstract background as the home hero: brand glow + dot grid */}
      <Box
        aria-hidden="true"
        position="absolute"
        inset="0"
        pointerEvents="none"
        bgImage="radial-gradient(circle at 92% 0%, var(--chakra-colors-brand-muted), transparent 42%)"
        css={{ maskImage: "linear-gradient(to bottom, black 50%, transparent)" }}
      />
      <Box
        aria-hidden="true"
        position="absolute"
        inset="0"
        pointerEvents="none"
        opacity={{ _light: 0.5, _dark: 0.25 }}
        bgImage="radial-gradient(var(--chakra-colors-border-emphasized) 1px, transparent 1px)"
        bgSize="22px 22px"
        css={{ maskImage: "linear-gradient(to left, black, transparent 70%)" }}
      />
      <Container maxW="7xl" px={{ base: "4", md: "6" }} py={{ base: "8", md: "12" }} position="relative">
        <Stack gap="4" maxW="3xl">
          {eyebrow && (
            <Text textStyle="eyebrow" color="brand.fg">
              {eyebrow}
            </Text>
          )}
          <HStack gap={{ base: "3", md: "4" }} align="center">
            {icon}
            <Heading as="h1" fontSize={{ base: "4xl", md: "5xl" }} lineHeight="1.1" letterSpacing="-0.03em">
              {title}
            </Heading>
          </HStack>
          {subtitle && (
            <Text textStyle="lead" color="fg.muted">
              {subtitle}
            </Text>
          )}
          {children && <Box pt="2">{children}</Box>}
        </Stack>
      </Container>
    </Box>
  );
}

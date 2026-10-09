import { Box, Container, type BoxProps } from "@chakra-ui/react";

/** Standard page section: vertical rhythm + centered container. */
export function Section({
  children,
  tone = "default",
  ...props
}: { tone?: "default" | "subtle" } & BoxProps) {
  return (
    <Box as="section" py={{ base: "16", md: "24" }} bg={tone === "subtle" ? "bg.subtle" : undefined} {...props}>
      <Container maxW="7xl" px={{ base: "4", md: "6" }}>
        {children}
      </Container>
    </Box>
  );
}

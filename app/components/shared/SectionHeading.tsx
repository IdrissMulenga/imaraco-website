import { Heading, Stack, Text } from "@chakra-ui/react";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "start",
  id,
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  /** Set to label the section via aria-labelledby. */
  id?: string;
  as?: "h1" | "h2";
}) {
  const centered = align === "center";
  return (
    <Stack
      gap="3"
      maxW="2xl"
      mx={centered ? "auto" : undefined}
      textAlign={centered ? "center" : "start"}
    >
      {eyebrow && (
        <Text textStyle="eyebrow" color="brand.fg">
          {eyebrow}
        </Text>
      )}
      <Heading as={as} id={id} size={{ base: "2xl", md: "4xl" }}>
        {title}
      </Heading>
      {subtitle && (
        <Text textStyle="lead" color="fg.muted">
          {subtitle}
        </Text>
      )}
    </Stack>
  );
}

import { Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Reveal } from "@/components/motion/Reveal";
import { IconTile } from "./IconTile";

export type Feature = { icon: React.ReactNode; title: string; text: string };

export function FeatureGrid({
  features,
  columns = 3,
}: {
  features: Feature[];
  columns?: 2 | 3;
}) {
  return (
    <SimpleGrid
      as="ul"
      listStyleType="none"
      columns={{ base: 1, sm: 2, lg: columns }}
      gap={{ base: "8", md: "10" }}
    >
      {features.map((f, i) => (
        <li key={f.title}>
          <Reveal delay={(i % columns) * 0.06}>
            <Stack gap="3">
              <IconTile>{f.icon}</IconTile>
              <Heading as="h3" size="md" letterSpacing="-0.015em">
                {f.title}
              </Heading>
              <Text color="fg.muted">{f.text}</Text>
            </Stack>
          </Reveal>
        </li>
      ))}
    </SimpleGrid>
  );
}

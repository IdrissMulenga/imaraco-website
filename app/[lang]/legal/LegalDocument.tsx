import { Alert, Box, Container, Heading, List, Stack, Text } from "@chakra-ui/react";
import { PageHeader } from "@/components/shared/PageHeader";
import { getI18n } from "@/i18n/server";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

/** One legal document's text in one language. */
export type LegalContent = { title: string; description: string; intro: string; updated: string; sections: LegalSection[] };

/** Readable layout shared by the Privacy, Terms and Cookie pages. */
export async function LegalDocument({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  const { t } = await getI18n();
  return (
    <>
      <PageHeader eyebrow={t.legal.eyebrow} title={title} subtitle={intro} />
      <Container maxW="3xl" px={{ base: "4", md: "6" }} py={{ base: "12", md: "16" }}>
        <Stack gap="10">
          <Text fontSize="sm" color="fg.muted">
            {t.legal.lastUpdated}: {updated}
          </Text>
          {/* PLACEHOLDER: have a lawyer review before launch. */}
          <Alert.Root status="warning" variant="subtle" borderRadius="l3">
            <Alert.Indicator />
            <Alert.Description fontSize="sm">
              {t.legal.draft}
            </Alert.Description>
          </Alert.Root>
          {sections.map((s, i) => (
            <Box as="section" key={s.heading}>
              <Heading as="h2" size="lg" mb="3">
                {i + 1}. {s.heading}
              </Heading>
              <Stack gap="3" color="fg.muted" lineHeight="1.75">
                {s.paragraphs?.map((p) => <Text key={p}>{p}</Text>)}
                {s.list && (
                  <List.Root ps="5" gap="1.5">
                    {s.list.map((item) => (
                      <List.Item key={item}>{item}</List.Item>
                    ))}
                  </List.Root>
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>
    </>
  );
}

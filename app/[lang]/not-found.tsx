import { Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { routes } from "@/data/site";
import { getI18n } from "@/i18n/server";

export default async function NotFound() {
  const { t, href } = await getI18n();
  return (
    <Container maxW="2xl" py={{ base: "24", md: "32" }} px={{ base: "4", md: "6" }}>
      <Stack gap="5" align="center" textAlign="center">
        <Text textStyle="eyebrow" color="brand.fg">
          404
        </Text>
        <Heading as="h1" size="4xl">
          {t.notFound.title}
        </Heading>
        <Text color="fg.muted">{t.notFound.text}</Text>
        <Button asChild>
          <NextLink href={href(routes.home)}>{t.notFound.home}</NextLink>
        </Button>
      </Stack>
    </Container>
  );
}

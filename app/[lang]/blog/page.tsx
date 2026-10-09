import { Button, EmptyState, VStack } from "@chakra-ui/react";
import type { Metadata } from "next";
import { LuNewspaper } from "react-icons/lu";
import { Section } from "@/components/sections/Section";
import { PageHeader } from "@/components/shared/PageHeader";
import { site } from "@/data/site";
import { getI18n } from "@/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  return pageMetadata({ path: "/blog", title: t.meta.blogTitle, description: t.meta.blogDescription });
}

// News page: "/[lang]/blog"
// Posts will go in app/[lang]/blog/[slug]/page.tsx when we start publishing.
export default async function BlogPage() {
  const { t } = await getI18n();
  return (
    <>
      <PageHeader eyebrow={t.blog.eyebrow} title={t.blog.title} subtitle={t.blog.subtitle} />
      <Section aria-label={t.blog.aria}>
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator>
              <LuNewspaper />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>{t.blog.empty}</EmptyState.Title>
              <EmptyState.Description>
                {t.blog.emptyText}
              </EmptyState.Description>
            </VStack>
            <Button asChild variant="outline">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer">
                {site.instagram.handle}
              </a>
            </Button>
          </EmptyState.Content>
        </EmptyState.Root>
      </Section>
    </>
  );
}

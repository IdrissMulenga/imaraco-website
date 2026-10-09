import { Box, Card, Grid, HStack, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import { LuArrowUpRight } from "react-icons/lu";
import {
  PiEnvelopeSimpleDuotone,
  PiInstagramLogoDuotone,
  PiMapPinDuotone,
  PiPaperPlaneTiltDuotone,
  PiWhatsappLogoDuotone,
} from "react-icons/pi";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/shared/ContactForm";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { site, whatsappLink } from "@/data/site";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { getI18n } from "@/i18n/server";
import { Section } from "./Section";

const smooth = "cubic-bezier(.22,1,.36,1)";
const spring = "cubic-bezier(.34,1.56,.64,1)";

type Method = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  /** Icon gradient. */
  color: [string, string];
};

/** The ways to reach us, labelled in the current language. */
function getMethods(t: Dictionary): Method[] {
  return [
    {
      icon: <PiWhatsappLogoDuotone />,
      label: t.common.whatsapp,
      value: t.contact.whatsappValue,
      href: whatsappLink(),
      external: true,
      color: ["#4ADE80", "#15803D"],
    },
    {
      icon: <PiEnvelopeSimpleDuotone />,
      label: t.contact.email,
      value: site.email,
      href: `mailto:${site.email}`,
      color: ["#60A5FA", "#1D4ED8"],
    },
    {
      icon: <PiInstagramLogoDuotone />,
      label: t.contact.instagram,
      value: site.instagram.handle,
      href: site.instagram.url,
      external: true,
      color: ["#F472B6", "#9333EA"],
    },
    {
      icon: <PiMapPinDuotone />,
      label: t.contact.location,
      value: t.contact.locationValue,
      color: ["#F9A43A", "#C2650B"],
    },
  ];
}

/** One way to reach us, as a card (clickable when it has a link). */
function MethodCard({ m }: { m: Method }) {
  const [from, to] = m.color;
  const inner = (
    <HStack
      gap="4"
      p="4"
      h="full"
      borderRadius="l3"
      borderWidth="1px"
      borderColor="border"
      bg="bg.panel"
      css={{
        transition: `transform .4s ${smooth}, box-shadow .4s ${smooth}, border-color .3s`,
        "& .ct-icon": { transition: `transform .5s ${spring}` },
        "& .ct-arrow": { transition: "transform .25s ease-out, opacity .25s", opacity: 0.4 },
        ...(m.href
          ? {
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: `0 18px 34px -20px ${to}AA`,
                borderColor: `${from}99`,
              },
              "&:hover .ct-icon": { transform: "rotate(-8deg) scale(1.08)" },
              "&:hover .ct-arrow": { transform: "translate(2px,-2px)", opacity: 1 },
            }
          : {}),
        "@media (prefers-reduced-motion: reduce)": {
          "&, & *": { transition: "none !important" },
          "&:hover, &:hover *": { transform: "none !important" },
        },
      }}
    >
      <Box
        className="ct-icon"
        boxSize="12"
        flexShrink={0}
        borderRadius="28%"
        bgImage={`linear-gradient(145deg, ${from}, ${to})`}
        boxShadow={`0 10px 20px -10px ${to}`}
        color="white"
        display="grid"
        placeItems="center"
        fontSize="2xl"
        aria-hidden="true"
      >
        {m.icon}
      </Box>
      <Box flex="1" minW="0">
        <Text fontSize="xs" color="fg.muted" fontWeight="medium" textTransform="uppercase" letterSpacing="0.08em">
          {m.label}
        </Text>
        <Text fontWeight="semibold" truncate>
          {m.value}
        </Text>
      </Box>
      {m.href && (
        <Box className="ct-arrow" color="fg.muted" fontSize="lg" aria-hidden="true">
          <LuArrowUpRight />
        </Box>
      )}
    </HStack>
  );

  if (!m.href) return inner;
  return (
    <a
      href={m.href}
      {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`${m.label}: ${m.value}`}
      style={{ display: "block", height: "100%" }}
    >
      {inner}
    </a>
  );
}

export async function ContactDetails() {
  const { t } = await getI18n();
  return (
    <Grid as="ul" listStyleType="none" templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1fr" }} gap="3">
      {getMethods(t).map((m, i) => (
        <Box as="li" key={m.label}>
          <Reveal delay={i * 0.06}>
            <MethodCard m={m} />
          </Reveal>
        </Box>
      ))}
    </Grid>
  );
}

/** The contact form in a card. Suspense is needed because the form reads the URL. */
export async function ContactFormCard({
  title,
  ...props
}: { title?: string } & React.ComponentProps<typeof ContactForm>) {
  const { t } = await getI18n();
  return (
    <Card.Root
      position="relative"
      overflow="hidden"
      variant="outline"
      borderRadius="l4"
      bg="bg.panel"
      boxShadow="0 30px 60px -40px rgba(0,0,0,.35)"
    >
      {/* Orange accent line + soft glow */}
      <Box h="1" bgImage="linear-gradient(90deg, #F7931E, #FFC93C, #F7931E)" />
      <Box
        aria-hidden="true"
        position="absolute"
        top="-24"
        right="-24"
        boxSize="64"
        borderRadius="full"
        bg="brand.solid"
        opacity={0.12}
        filter="blur(60px)"
        pointerEvents="none"
      />
      <Card.Body p={{ base: "5", md: "8" }} gap="6" position="relative">
        <HStack gap="3">
          <Box
            boxSize="11"
            borderRadius="28%"
            bgImage="linear-gradient(145deg, #F9A43A, #C2650B)"
            color="white"
            display="grid"
            placeItems="center"
            fontSize="xl"
            aria-hidden="true"
          >
            <PiPaperPlaneTiltDuotone />
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              {title ?? t.contact.formTitle}
            </Text>
            <Text fontSize="sm" color="fg.muted">
              {t.contact.formNote}
            </Text>
          </Box>
        </HStack>
        <Suspense fallback={<Skeleton h="md" borderRadius="l3" />}>
          <ContactForm {...props} />
        </Suspense>
      </Card.Body>
    </Card.Root>
  );
}

export async function ContactSection() {
  const { t } = await getI18n();
  return (
    <Section id="contact" aria-labelledby="contact-title" scrollMarginTop="20">
      <Grid templateColumns={{ base: "1fr", lg: "0.8fr 1.2fr" }} gap={{ base: "10", lg: "16" }}>
        <Stack gap="8">
          <SectionHeading
            id="contact-title"
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            subtitle={t.contact.subtitle}
          />
          <ContactDetails />
        </Stack>
        <Reveal delay={0.1}>
          <ContactFormCard />
        </Reveal>
      </Grid>
    </Section>
  );
}

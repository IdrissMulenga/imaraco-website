import { Box, Grid, HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import {
  LuArrowRight,
  LuCircleCheck,
  LuCode,
  LuHeadset,
  LuLock,
  LuSmartphone,
  LuSparkles,
  LuStore,
  LuWallet,
} from "react-icons/lu";
import { LogoMark } from "@/components/brand/Logo";
import { Float } from "@/components/motion/Reveal";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { getI18n } from "@/i18n/server";
import { AfyaPhone } from "./AfyaPhone";

/**
 * Hero illustration: the three parts of "Build it. Run it. Fix it."
 *   Build it → a laptop showing this website (imaracompany.com) + its code
 *   Run it   → our own product, Imara Afya, on a phone
 *   Fix it   → a help-desk chat where a laptop problem gets solved
 *
 * Every size is in `cqw` (a % of the illustration's width), so it scales
 * smoothly from phones to desktops. Designed at 560px wide:
 * u(10) means "10px when the illustration is 560px wide".
 */
const u = (px: number) => `${+((px / 560) * 100).toFixed(3)}cqw`;

/** "Build it." → "Build it" (step tags have no full stop). */
const word = (s: string) => s.replace(/\.$/, "");

/** Orange "Build it / Run it / Fix it" tag. */
function StepTag({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      gap={u(5)}
      px={u(10)}
      py={u(4)}
      borderRadius="full"
      bg="brand.solid"
      color="brand.contrast"
      fontSize={u(10.5)}
      fontWeight="bold"
      boxShadow="md"
      whiteSpace="nowrap"
    >
      {children}
    </Box>
  );
}

/** Small pill button used inside the mini website. */
function MiniButton({ children, solid = false }: { children: React.ReactNode; solid?: boolean }) {
  return (
    <HStack
      gap={u(3)}
      px={u(8)}
      py={u(3.5)}
      borderRadius="full"
      fontSize={u(6.5)}
      fontWeight="semibold"
      whiteSpace="nowrap"
      bg={solid ? "brand.solid" : undefined}
      color={solid ? "brand.contrast" : "fg"}
      borderWidth={solid ? undefined : "1px"}
      borderColor="border"
    >
      {children}
    </HStack>
  );
}

/** Laptop showing a miniature of this website (the Imara homepage). */
function Laptop({ t }: { t: Dictionary }) {
  return (
    <Box>
      {/* Screen bezel */}
      <Box bg="#161616" borderRadius={`${u(14)} ${u(14)} ${u(4)} ${u(4)}`} p={u(8)} pb={u(10)}>
        <Box bg="bg.panel" borderRadius={u(5)} overflow="hidden" aspectRatio="16 / 10.4">
          {/* Browser bar */}
          <HStack gap={u(6)} h={u(22)} px={u(8)} bg="bg.muted" borderBottomWidth="1px" borderColor="border.subtle">
            {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
              <Box key={c} boxSize={u(6)} borderRadius="full" bg={c} />
            ))}
            <HStack
              gap={u(4)}
              ms={u(8)}
              flex="1"
              maxW="60%"
              h={u(13)}
              px={u(7)}
              borderRadius="full"
              bg="bg.panel"
              fontSize={u(7.5)}
              color="fg.muted"
            >
              <LuLock />
              imaracompany.com
            </HStack>
          </HStack>

          {/* Mini Imara website */}
          <Stack gap={u(10)} px={u(12)} py={u(9)}>
            {/* Navbar */}
            <HStack justify="space-between" gap={u(6)}>
              <HStack gap={u(3)}>
                <LogoMark height={u(13)} />
                <Text fontFamily="logo" fontWeight="bold" fontSize={u(10)} letterSpacing="-0.03em">
                  imara
                </Text>
              </HStack>
              <HStack gap={u(8)} fontSize={u(6.5)} color="fg.muted">
                <Text color="brand.fg" fontWeight="semibold">
                  {t.nav.products}
                </Text>
                <span>{t.nav.services}</span>
                <span>{t.nav.labs}</span>
                <span>{t.nav.about}</span>
                <span>{t.nav.contact}</span>
              </HStack>
              <MiniButton solid>{t.nav.workWithUs}</MiniButton>
            </HStack>

            {/* Hero */}
            <Grid templateColumns="1.15fr 1fr" gap={u(12)} alignItems="center">
              <Stack gap={u(5)}>
                <Text fontSize={u(5.5)} fontWeight="bold" letterSpacing="0.12em" color="brand.fg">
                  {t.hero.eyebrow.toUpperCase()}
                </Text>
                <Text fontSize={u(15)} fontWeight="bold" lineHeight="1.05" letterSpacing="-0.02em" color="fg">
                  {t.hero.build} {t.hero.run}
                  <Box as="span" display="block" color="brand.fg">
                    {t.hero.fix}
                  </Box>
                </Text>
                <Text fontSize={u(6.5)} color="fg.muted" lineHeight="1.45">
                  {t.heroArt.miniText}
                </Text>
                <HStack gap={u(4)} pt={u(2)}>
                  <MiniButton solid>
                    {t.hero.ctaPrimary} <LuArrowRight />
                  </MiniButton>
                </HStack>
              </Stack>

              {/* Our products */}
              <Stack gap={u(5)}>
                {[
                  {
                    icon: (
                      <Image
                        src="/brand/imara-afya-logo.png"
                        alt=""
                        width={229}
                        height={256}
                        style={{ width: "80%", height: "auto" }}
                      />
                    ),
                    name: "Imara Afya",
                    tag: t.common.comingSoon,
                  },
                  { icon: <LuStore />, name: "Duka POS", tag: t.products.duka.category },
                  { icon: <LuWallet />, name: "Imara Pay", tag: t.products.pay.category },
                ].map((p, i) => (
                  <HStack
                    key={p.name}
                    gap={u(5)}
                    p={u(5)}
                    borderRadius={u(6)}
                    bg="bg.subtle"
                    borderWidth="1px"
                    borderColor="border.subtle"
                  >
                    <Box
                      boxSize={u(15)}
                      borderRadius={u(4)}
                      bg="brand.subtle"
                      color="brand.fg"
                      display="grid"
                      placeItems="center"
                      fontSize={u(8.5)}
                      flexShrink={0}
                    >
                      {p.icon}
                    </Box>
                    <Text flex="1" fontSize={u(7)} fontWeight="semibold">
                      {p.name}
                    </Text>
                    <Box
                      px={u(5)}
                      py={u(1.5)}
                      borderRadius="full"
                      fontSize={u(5)}
                      fontWeight="semibold"
                      whiteSpace="nowrap"
                      bg={i === 0 ? "brand.solid" : "bg.muted"}
                      color={i === 0 ? "brand.contrast" : "fg.muted"}
                    >
                      {p.tag}
                    </Box>
                  </HStack>
                ))}
              </Stack>
            </Grid>

            {/* Services */}
            <Grid templateColumns="repeat(3, 1fr)" gap={u(7)}>
              {[
                { icon: <LuCode />, t: t.heroArt.websites },
                { icon: <LuSmartphone />, t: t.heroArt.mobileApps },
                { icon: <LuHeadset />, t: t.heroArt.helpDesk },
              ].map((f) => (
                <HStack
                  key={f.t}
                  gap={u(5)}
                  p={u(6)}
                  borderRadius={u(6)}
                  bg="bg.subtle"
                  fontSize={u(6.5)}
                  fontWeight="medium"
                >
                  <Box color="brand.solid" fontSize={u(9)} flexShrink={0}>
                    {f.icon}
                  </Box>
                  {f.t}
                </HStack>
              ))}
            </Grid>
          </Stack>
        </Box>
      </Box>
      {/* Keyboard deck */}
      <Box
        mx={`-${u(26)}`}
        h={u(13)}
        borderRadius={`${u(2)} ${u(2)} ${u(14)} ${u(14)}`}
        bgGradient="to-b"
        gradientFrom={{ _light: "#D9D9DC", _dark: "#3A3A3E" }}
        gradientTo={{ _light: "#A9A9AE", _dark: "#232326" }}
        position="relative"
        boxShadow="0 18px 30px -12px rgba(0,0,0,.35)"
      >
        <Box
          position="absolute"
          top="0"
          left="50%"
          transform="translateX(-50%)"
          w="16%"
          h="45%"
          borderRadius={`0 0 ${u(6)} ${u(6)}`}
          bg={{ _light: "#BFBFC4", _dark: "#2C2C30" }}
        />
      </Box>
    </Box>
  );
}

/** Small dark code editor window showing the hero's code. */
function CodeWindow() {
  const kw = "#FF9E64";
  const fn = "#7AA2F7";
  const str = "#9ECE6A";
  const dim = "#A3A8B4";
  return (
    <Box
      w={u(205)}
      bg="#17181D"
      borderRadius={u(10)}
      boxShadow="0 20px 40px -12px rgba(0,0,0,.5)"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      overflow="hidden"
    >
      <HStack gap={u(5)} px={u(9)} h={u(20)} bg="#1F2027" fontSize={u(7.5)} color={dim}>
        <Box color={kw} fontSize={u(9)}>
          <LuCode />
        </Box>
        Hero.tsx
      </HStack>
      <Box
        as="pre"
        m="0"
        p={u(9)}
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
        fontSize={u(8)}
        lineHeight="1.6"
        color="#C0CAF5"
        whiteSpace="pre"
      >
        <span style={{ color: kw }}>export function</span> <span style={{ color: fn }}>Hero</span>() {"{"}
        {"\n  "}
        <span style={{ color: kw }}>return</span> (
        {"\n    "}&lt;<span style={{ color: fn }}>Title</span>&gt;
        {"\n      "}
        <span style={{ color: str }}>Build it. Run it.</span>
        {"\n      "}&lt;<span style={{ color: fn }}>Accent</span>&gt;
        <span style={{ color: str }}>Fix it.</span>&lt;/<span style={{ color: fn }}>Accent</span>&gt;
        {"\n    "}&lt;/<span style={{ color: fn }}>Title</span>&gt;
        {"\n  "});
        {"\n"}
        {"}"}
        <Box
          as="span"
          display="inline-block"
          w={u(5)}
          h={u(10)}
          ms={u(2)}
          bg={kw}
          verticalAlign="middle"
          css={{
            // Keyframes "imaraCaret" are defined in app/theme/index.ts
            animation: "imaraCaret 1.1s steps(1) infinite",
            "@media (prefers-reduced-motion: reduce)": { animation: "none" },
          }}
        />
      </Box>
    </Box>
  );
}

/** Help-desk chat where a laptop problem gets fixed. */
function HelpDeskCard({ t }: { t: Dictionary }) {
  return (
    <Box
      w={u(232)}
      bg="bg.panel"
      borderWidth="1px"
      borderColor="border"
      borderRadius={u(16)}
      boxShadow="0 24px 48px -16px rgba(0,0,0,.35)"
      p={u(11)}
    >
      <HStack justify="space-between" mb={u(9)}>
        <HStack gap={u(7)}>
          <Box
            boxSize={u(26)}
            borderRadius="full"
            bg="brand.subtle"
            color="brand.fg"
            display="grid"
            placeItems="center"
            fontSize={u(13)}
          >
            <LuHeadset />
          </Box>
          <Box>
            <Text fontSize={u(10)} fontWeight="bold" lineHeight="1.2">
              {t.heroArt.deskName}
            </Text>
            <Text fontSize={u(7.5)} color="fg.muted">
              {t.heroArt.deskStatus}
            </Text>
          </Box>
        </HStack>
        <HStack
          gap={u(3)}
          px={u(7)}
          py={u(3)}
          borderRadius="full"
          bg={{ _light: "green.50", _dark: "green.950" }}
          color={{ _light: "green.700", _dark: "green.300" }}
          fontSize={u(7.5)}
          fontWeight="semibold"
        >
          <LuCircleCheck />
          {t.heroArt.resolved}
        </HStack>
      </HStack>

      <Stack gap={u(6)} fontSize={u(8.5)} lineHeight="1.4">
        <Box
          alignSelf="flex-end"
          maxW="80%"
          px={u(9)}
          py={u(6)}
          borderRadius={`${u(12)} ${u(12)} ${u(3)} ${u(12)}`}
          bg="bg.muted"
        >
          {t.heroArt.userMsg}
        </Box>
        <HStack
          alignSelf="flex-start"
          align="flex-start"
          gap={u(5)}
          maxW="88%"
          px={u(9)}
          py={u(6)}
          borderRadius={`${u(12)} ${u(12)} ${u(12)} ${u(3)}`}
          bg="brand.subtle"
        >
          <Box color="brand.solid" fontSize={u(10)} mt={u(1)} flexShrink={0}>
            <LuSparkles />
          </Box>
          <span>{t.heroArt.replyMsg}</span>
        </HStack>
      </Stack>
    </Box>
  );
}

export async function HeroIllustration() {
  const { t } = await getI18n();
  return (
    <Box
      role="img"
      aria-label={t.heroArt.label}
      position="relative"
      w="full"
      aspectRatio="560 / 520"
      css={{ containerType: "inline-size" }}
    >
      <Box aria-hidden="true">
        {/* Build it: laptop + code */}
        <Box position="absolute" left={u(26)} top={u(150)} w={u(380)}>
          <Laptop t={t} />
        </Box>
        <Box position="absolute" left="0" top="0">
          <Float delay={0.8}>
            <Stack gap={u(6)} align="flex-start">
              <StepTag>1 · {word(t.hero.build)}</StepTag>
              <CodeWindow />
            </Stack>
          </Float>
        </Box>

        {/* Run it: Imara Afya on a phone */}
        <Box position="absolute" right="0" top={u(36)}>
          <Float>
            <Stack gap={u(6)} align="flex-end">
              <StepTag>2 · {word(t.hero.run)}</StepTag>
              <AfyaPhone width={u(158)} screen="home" eager sizes="(max-width: 1024px) 26vw, 170px" />
            </Stack>
          </Float>
        </Box>

        {/* Fix it: help desk */}
        <Box position="absolute" left={u(8)} bottom="0">
          <Float delay={1.6}>
            <Stack gap={u(6)} align="flex-start">
              <StepTag>3 · {word(t.hero.fix)}</StepTag>
              <HelpDeskCard t={t} />
            </Stack>
          </Float>
        </Box>
      </Box>
    </Box>
  );
}

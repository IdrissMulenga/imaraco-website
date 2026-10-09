import { Box, HStack, Stack, Text, type StackProps } from "@chakra-ui/react";
import { FaApple } from "react-icons/fa";
import { afyaStores } from "@/data/site";
import { getI18n } from "@/i18n/server";

/** The four-color Google Play logo. */
function GooglePlayLogo() {
  return (
    <svg viewBox="0 0 24 26" width="100%" height="100%" aria-hidden="true">
      <path d="M1.2 0.6 13.3 13 1.2 25.4c-.4-.3-.7-.9-.7-1.6V2.2c0-.7.3-1.3.7-1.6Z" fill="#00A0FF" />
      <path d="M17.4 8.9 13.3 13 1.2 0.6c.4-.3 1-.4 1.6-.1l14.6 8.4Z" fill="#00D26A" />
      <path d="M17.4 17.1 2.8 25.5c-.6.3-1.2.2-1.6-.1L13.3 13l4.1 4.1Z" fill="#FF3A44" />
      <path d="m22.1 14.4-4.7 2.7-4.1-4.1 4.1-4.1 4.7 2.7c1.1.6 1.1 2.2 0 2.8Z" fill="#FFC400" />
    </svg>
  );
}

const sizes = {
  sm: { h: "10", px: "3", gap: "2", icon: "5", top: "2xs", bottom: "sm" },
  md: { h: "12", px: "3.5", gap: "2.5", icon: "6", top: "2xs", bottom: "md" },
  lg: { h: "14", px: "4", gap: "3", icon: "7", top: "xs", bottom: "lg" },
} as const;

function Badge({
  href,
  icon,
  topLine,
  bottomLine,
  size,
}: {
  href?: string;
  icon: React.ReactNode;
  topLine: string;
  bottomLine: string;
  size: keyof typeof sizes;
}) {
  const s = sizes[size];
  const content = (
    <HStack
      gap={s.gap}
      h={s.h}
      px={s.px}
      bg="black"
      color="white"
      borderRadius="lg"
      borderWidth="1px"
      borderColor="#A6A6A6"
      transition="transform 0.15s, box-shadow 0.15s"
      _hover={href ? { transform: "translateY(-1px)", boxShadow: "md" } : undefined}
    >
      <Box boxSize={s.icon} flexShrink={0} display="grid" placeItems="center" fontSize={s.icon === "7" ? "2xl" : "xl"}>
        {icon}
      </Box>
      <Stack gap="0" lineHeight="1.05">
        <Text fontSize={s.top} textTransform="uppercase" letterSpacing="0.04em" opacity={0.85}>
          {topLine}
        </Text>
        <Text fontSize={s.bottom} fontWeight="semibold" letterSpacing="-0.01em">
          {bottomLine}
        </Text>
      </Stack>
    </HStack>
  );

  if (!href) {
    // Not launched yet: shown as a label, not a link.
    return (
      <Box aria-label={`${topLine} ${bottomLine}`} role="img" cursor="default">
        {content}
      </Box>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${topLine} ${bottomLine}`}>
      {content}
    </a>
  );
}

/**
 * Google Play + App Store badges for Imara Afya. Before launch they read
 * "Coming soon on…" and aren't clickable; after launch (`afyaStores.launched`
 * in data/site.ts) they link to the stores.
 */
export async function StoreButtons({ size = "md", ...props }: { size?: keyof typeof sizes } & StackProps) {
  const { t } = await getI18n();
  const live = afyaStores.launched;
  return (
    <Stack direction="row" gap="2" flexWrap="wrap" {...props}>
      <Badge
        size={size}
        href={live ? afyaStores.playStore : undefined}
        icon={<GooglePlayLogo />}
        topLine={live ? t.store.getItOn : t.store.comingSoonOn}
        bottomLine="Google Play"
      />
      <Badge
        size={size}
        href={live ? afyaStores.appStore : undefined}
        icon={<FaApple />}
        topLine={live ? t.store.downloadOnThe : t.store.comingSoonOnThe}
        bottomLine="App Store"
      />
    </Stack>
  );
}

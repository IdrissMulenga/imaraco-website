import { Box, HStack, Text, type BoxProps } from "@chakra-ui/react";

// The Imara emblem (public/brand/imara-mark.png), width : height.
const MARK_RATIO = 552 / 1012;

/**
 * The Imara emblem. The PNG is used as a mask and filled with `color`, so
 * one file works in any color: dark on the light theme, white on the dark one.
 */
export function LogoMark({ height = 9, color = "fg", ...props }: BoxProps & { height?: BoxProps["h"] }) {
  return (
    <Box
      as="span"
      display="inline-block"
      flexShrink={0}
      h={height}
      aspectRatio={MARK_RATIO}
      bg={color}
      aria-hidden="true"
      css={{
        maskImage: "url(/brand/imara-mark.png)",
        maskSize: "contain",
        maskRepeat: "no-repeat",
        maskPosition: "center",
      }}
      {...props}
    />
  );
}

// Logo sizes: emblem height + wordmark text size (base = phones, md = tablet and up).
const sizes = {
  md: { mark: 9, text: "xl", gap: "2" },
  lg: { mark: { base: "10", md: "12" }, text: { base: "2xl", md: "3xl" }, gap: "2.5" },
} as const;

/** Emblem + "imara" wordmark, used in the navbar, mobile menu and footer. */
export function Logo({
  withName = true,
  size = "md",
  color = "fg",
}: {
  withName?: boolean;
  /** Logo colour, e.g. "white" on a dark background. */
  color?: string;
  /** "lg" in the navbar, "md" elsewhere. */
  size?: keyof typeof sizes;
}) {
  const s = sizes[size];
  return (
    <HStack gap={s.gap}>
      <LogoMark height={s.mark} color={color} />
      {withName && (
        <Text
          as="span"
          fontFamily="logo"
          fontWeight="bold"
          fontSize={s.text}
          letterSpacing="-0.03em"
          color={color}
        >
          imara
        </Text>
      )}
    </HStack>
  );
}

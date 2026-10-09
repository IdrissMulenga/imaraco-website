import { Box, type BoxProps } from "@chakra-ui/react";
import {
  PiGraduationCapDuotone,
  PiHeartbeatDuotone,
  PiStorefrontDuotone,
  PiWalletDuotone,
} from "react-icons/pi";
import type { ProductId } from "@/data/products";

/**
 * Each product's own colours. `icon` = app-icon gradient, `soft` = light
 * card background (light / dark mode), `text` = readable accent text.
 * PLACEHOLDER logos: replace with the real product logos when they exist.
 */
export const productPalette: Record<
  ProductId,
  {
    icon: [string, string];
    soft: { light: [string, string]; dark: [string, string] };
    text: { light: string; dark: string };
    border: { light: string; dark: string };
  }
> = {
  afya: {
    icon: ["#30B44B", "#205CAA"],
    soft: { light: ["#E9F0FA", "#E8F6EB"], dark: ["#0F1A2B", "#0E2116"] },
    text: { light: "#205CAA", dark: "#7FB0F0" },
    border: { light: "#B9D0EE", dark: "#1F3A5C" },
  },
  duka: {
    icon: ["#2DD4BF", "#0F766E"],
    soft: { light: ["#F0FDFA", "#CCFBF1"], dark: ["#0A1D1B", "#0E2B28"] },
    text: { light: "#0F766E", dark: "#5EEAD4" },
    border: { light: "#99F6E4", dark: "#134E48" },
  },
  school: {
    icon: ["#818CF8", "#4338CA"],
    soft: { light: ["#EEF2FF", "#E0E7FF"], dark: ["#13142A", "#1C1E44"] },
    text: { light: "#4338CA", dark: "#A5B4FC" },
    border: { light: "#C7D2FE", dark: "#2E3270" },
  },
  pay: {
    icon: ["#FBBF24", "#D97706"],
    soft: { light: ["#FFFBEB", "#FEF3C7"], dark: ["#211806", "#30230A"] },
    text: { light: "#B45309", dark: "#FCD34D" },
    border: { light: "#FDE68A", dark: "#5A4010" },
  },
};

/** Duotone (filled + outline) icon for each product, as used on the services. */
export const productIconsDuotone: Record<ProductId, React.ReactNode> = {
  afya: <PiHeartbeatDuotone />,
  duka: <PiStorefrontDuotone />,
  school: <PiGraduationCapDuotone />,
  pay: <PiWalletDuotone />,
};

/** App-icon style logo: rounded square, product gradient, white duotone icon. */
export function ProductLogo({ id, size = "14", ...props }: { id: ProductId; size?: BoxProps["boxSize"] } & BoxProps) {
  const [from, to] = productPalette[id].icon;
  return (
    <Box
      boxSize={size}
      flexShrink={0}
      borderRadius="28%"
      bgImage={`linear-gradient(145deg, ${from}, ${to})`}
      boxShadow={`0 10px 22px -8px ${to}AA, inset 0 1px 0 rgba(255,255,255,.35)`}
      display="grid"
      placeItems="center"
      position="relative"
      overflow="hidden"
      aria-hidden="true"
      {...props}
    >
      {/* Soft top shine */}
      <Box position="absolute" inset="0" bgImage="linear-gradient(180deg, rgba(255,255,255,.22), rgba(255,255,255,0) 55%)" />
      <Box
        as="span"
        position="relative"
        w="full"
        h="full"
        display="grid"
        placeItems="center"
        color="white"
        css={{ "& svg": { width: "62%", height: "62%" } }}
      >
        {productIconsDuotone[id]}
      </Box>
    </Box>
  );
}

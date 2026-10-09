"use client";

import { IconButton, Skeleton } from "@chakra-ui/react";
import { useSyncExternalStore } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { applyColorMode, type ColorMode } from "@/components/providers/themeScript";
import { useI18n } from "@/i18n/client";

// Reads the current mode from the class on <html> (set by themeScript)
// and re-renders whenever it changes.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const getMode = (): ColorMode =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";
// On the server the mode is unknown, so the button renders a placeholder.
const getServerMode = () => null;

export function useColorMode() {
  const colorMode = useSyncExternalStore(subscribe, getMode, getServerMode);
  return {
    colorMode,
    toggleColorMode: () => applyColorMode(colorMode === "dark" ? "light" : "dark"),
  };
}

// Button + icon size: 44px button / 24px icon on phones (comfortable for a
// thumb), 40px / 20px on desktop. Shared with the mobile menu button.
export const NAV_ICON_BUTTON = {
  size: { base: "lg", lg: "md" },
  css: { "& svg": { boxSize: { base: "6", lg: "5" } } },
} as const;

/** Sun/moon button that switches between light and dark mode. */
export function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { t } = useI18n();

  if (!colorMode) return <Skeleton boxSize={{ base: "11", lg: "10" }} borderRadius="full" />;

  const label = colorMode === "dark" ? t.common.switchToLight : t.common.switchToDark;
  return (
    <IconButton
      onClick={toggleColorMode}
      variant="ghost"
      {...NAV_ICON_BUTTON}
      borderRadius="full"
      aria-label={label}
      title={label}
      colorPalette="gray"
    >
      {colorMode === "dark" ? <LuSun /> : <LuMoon />}
    </IconButton>
  );
}

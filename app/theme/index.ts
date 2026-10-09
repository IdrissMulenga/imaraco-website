import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
  defineSlotRecipe,
} from "@chakra-ui/react";
import { cardAnatomy } from "@chakra-ui/react/anatomy";

/**
 * Imara design system (Chakra UI v3).
 *
 * - One strong primary: "brand" = Imara orange #F37421 (brand.500).
 * - Warm neutrals override Chakra's `gray`, so every built-in semantic
 *   token (bg.*, fg.*, border.*) picks them up.
 * - `colorPalette: brand` is set globally, so components use the brand
 *   color unless told otherwise.
 *
 * Contrast: light mode uses white text on #F37421 (2.9:1, below the WCAG AA
 * 4.5:1 guideline, chosen for the brand look); dark mode uses near-black
 * text on orange (6.5:1). Orange *text* on white uses
 * brand.700 (5.3:1). fg.muted (gray.600 on white) = 7.6:1.
 */

const button = defineRecipe({
  base: {
    fontWeight: "semibold",
    borderRadius: "full",
    letterSpacing: "-0.005em",
    transitionProperty: "common",
    transitionDuration: "moderate",
    _active: { transform: "translateY(1px)" },
  },
  variants: {
    variant: {
      // For buttons placed on a solid brand-colored band.
      inverted: {
        bg: { _light: "white", _dark: "gray.950" },
        color: "colorPalette.fg",
        _hover: { bg: { _light: "brand.50", _dark: "gray.900" } },
      },
    },
    size: {
      lg: { h: "12", px: "6", textStyle: "md" },
      xl: { h: "14", px: "7", textStyle: "md" },
    },
  },
});

const heading = defineRecipe({
  base: {
    fontFamily: "heading",
    fontWeight: "bold",
    letterSpacing: "-0.015em",
    color: "fg",
    textWrap: "balance",
  },
});

const badge = defineRecipe({
  base: { borderRadius: "full", fontWeight: "semibold" },
});

const card = defineSlotRecipe({
  slots: cardAnatomy.keys(),
  base: {
    root: { borderRadius: "l3" },
  },
  variants: {
    variant: {
      // Bordered card that lifts on hover. Used for product/service cards.
      interactive: {
        root: {
          bg: "bg.panel",
          borderWidth: "1px",
          borderColor: "border",
          transitionProperty: "transform, box-shadow, border-color",
          transitionDuration: "moderate",
          transitionTimingFunction: "ease-out",
          _hover: {
            transform: "translateY(-4px)",
            boxShadow: "lg",
            borderColor: "brand.emphasized",
          },
          _focusWithin: { borderColor: "brand.focusRing" },
        },
      },
      // Quiet tinted card for feature grids.
      soft: {
        root: { bg: "bg.subtle", borderWidth: "1px", borderColor: "border.subtle" },
      },
    },
  },
});

const config = defineConfig({
  globalCss: {
    html: {
      colorPalette: "brand",
      scrollBehavior: "smooth",
      "@media (prefers-reduced-motion: reduce)": { scrollBehavior: "auto" },
    },
    body: {
      bg: "bg",
      color: "fg",
      fontFamily: "body",
      textRendering: "optimizeLegibility",
    },
    "::selection": { bg: "brand.muted", color: "fg" },
    // Scroll-in animation (components/motion/Reveal). Content is hidden only
    // while JavaScript is running (html.js), so it's never lost without it.
    "html.js [data-reveal]": {
      transitionProperty: "opacity, transform",
      transitionDuration: "0.5s",
      transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
    },
    "html.js [data-reveal]:not([data-shown])": {
      opacity: 0,
      transform: "translateY(var(--reveal-y, 16px))",
      "@media (prefers-reduced-motion: reduce)": { transform: "none" },
    },
  },
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: "#FFF4EC" },
          100: { value: "#FFE4D1" },
          200: { value: "#FDC6A1" },
          300: { value: "#FAA36C" },
          400: { value: "#F7883F" },
          500: { value: "#F37421" }, // Imara orange
          600: { value: "#D95F12" },
          700: { value: "#B44C0D" },
          800: { value: "#8F3D10" },
          900: { value: "#723411" },
          950: { value: "#3E1806" },
        },
        gray: {
          50: { value: "#F8F7F6" },
          100: { value: "#F0EEEC" },
          200: { value: "#E2DFDC" },
          300: { value: "#C9C4BF" },
          400: { value: "#A09993" },
          500: { value: "#756E68" },
          600: { value: "#59534E" },
          700: { value: "#403B37" },
          800: { value: "#292522" },
          900: { value: "#1A1715" },
          950: { value: "#0F0D0C" },
        },
        // Illustration-only accent (never used for text).
        sun: { value: "#FFC24D" },
      },
      fonts: {
        // Outfit everywhere; Bricolage Grotesque only for the "imara" wordmark.
        heading: {
          value: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif",
        },
        body: {
          value: "var(--font-outfit), ui-sans-serif, system-ui, sans-serif",
        },
        logo: {
          value: "var(--font-logo), ui-sans-serif, system-ui, sans-serif",
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: "{colors.brand.500}" },
          // Text on orange: white in light mode (owner's choice), near-black in dark.
          contrast: { value: { _light: "white", _dark: "#1C1006" } },
          fg: { value: { _light: "{colors.brand.700}", _dark: "{colors.brand.400}" } },
          // Dark tints are kept low-saturation so orange areas don't turn into
          // heavy brown blocks.
          muted: { value: { _light: "{colors.brand.100}", _dark: "#3A1F0F" } },
          subtle: { value: { _light: "{colors.brand.50}", _dark: "#1F150E" } },
          emphasized: { value: { _light: "{colors.brand.200}", _dark: "{colors.brand.800}" } },
          focusRing: { value: { _light: "{colors.brand.500}", _dark: "{colors.brand.400}" } },
        },
        bg: {
          DEFAULT: { value: { _light: "white", _dark: "{colors.gray.950}" } },
          // Dark surfaces step up from the page background so tinted
          // sections and cards stay visible.
          panel: { value: { _light: "white", _dark: "#1A1715" } },
          subtle: { value: { _light: "{colors.gray.50}", _dark: "#151210" } },
          muted: { value: { _light: "{colors.gray.100}", _dark: "#221E1B" } },
        },
      },
      radii: {
        l1: { value: "0.375rem" },
        l2: { value: "0.625rem" },
        l3: { value: "1rem" },
        l4: { value: "1.5rem" },
      },
    },
    // Animations. Keyframes must live here: Chakra drops @keyframes
    // written inside a component's css prop.
    keyframes: {
      imaraMarquee: {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(-50%)" },
      },
      imaraCaret: {
        "0%, 49%": { opacity: 1 },
        "50%, 100%": { opacity: 0 },
      },
    },
    textStyles: {
      eyebrow: {
        value: {
          fontSize: "xs",
          fontWeight: "bold",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          lineHeight: "1rem",
        },
      },
      lead: {
        value: {
          fontSize: { base: "md", md: "lg" },
          lineHeight: { base: "1.6", md: "1.7" },
        },
      },
    },
    recipes: { button, heading, badge },
    slotRecipes: { card },
  },
});

export const system = createSystem(defaultConfig, config);

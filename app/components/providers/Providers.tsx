"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { system } from "@/theme";
import { EmotionRegistry } from "./EmotionRegistry";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <EmotionRegistry>
      <ChakraProvider value={system}>
        {/* Honour the OS "reduce motion" setting for every animation. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ChakraProvider>
    </EmotionRegistry>
  );
}

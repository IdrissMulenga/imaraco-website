"use client";

import { ChakraProvider } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { system } from "@/theme";
import { EmotionRegistry } from "./EmotionRegistry";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <EmotionRegistry>
      <ChakraProvider value={system}>
        {children}
      </ChakraProvider>
    </EmotionRegistry>
  );
}

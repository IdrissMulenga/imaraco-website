"use client";

import { Accordion, Box, Text } from "@chakra-ui/react";

export type FAQItem = { question: string; answer: string };

/** Accessible accordion of questions and answers. */
export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <Accordion.Root collapsible variant="enclosed" borderRadius="l3">
      {items.map((item) => (
        <Accordion.Item key={item.question} value={item.question}>
          <Accordion.ItemTrigger py="4" fontWeight="semibold" cursor="pointer">
            <Box flex="1" textAlign="start">
              {item.question}
            </Box>
            <Accordion.ItemIndicator />
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            <Accordion.ItemBody>
              <Text color="fg.muted">{item.answer}</Text>
            </Accordion.ItemBody>
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

"use client";

import { Box, Button, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { submitNotify } from "@/actions/notify";
import { useI18n } from "@/i18n/client";
import type { NotifyTopic } from "@/data/notifyTopics";
import { fill } from "@/i18n/config";
import { notifySchema } from "@/lib/validation";

/** One-field "Notify me" email capture (Labs, Imara Afya, footer newsletter). */
export function NotifyForm({
  topic,
  topicName,
  successText,
}: {
  topic: NotifyTopic;
  /** Name shown to the visitor, in their language. */
  topicName: string;
  successText?: string;
}) {
  const { lang, t } = useI18n();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  // Spam timing trap: when the form became usable (browser only).
  const startedAt = useRef(0);
  const [error, setError] = useState<string>();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const values = { email, topic, lang, website, startedAt: startedAt.current };
    const parsed = notifySchema.safeParse(values);
    if (!parsed.success) {
      // Schema messages are keys of form.errors (e.g. "email").
      const key = parsed.error.issues[0]?.message as keyof typeof t.form.errors;
      setError(t.form.errors[key] ?? t.form.errors.email);
      return;
    }
    setError(undefined);
    setState("sending");
    const res = await submitNotify(values);
    if (res.ok) {
      setState("done");
    } else {
      setState("idle");
      setError(
        res.error === "rateLimited"
          ? t.notify.rateLimited
          : t.notify.error,
      );
    }
  }

  if (state === "done") {
    return (
      <Text role="status" fontSize="sm" fontWeight="medium" color="brand.fg">
        {successText ?? fill(t.notify.success, { topic: topicName })}
      </Text>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ position: "relative", width: "100%" }}>
      <Field.Root invalid={!!error}>
        <Field.Label srOnly>{fill(t.notify.label, { topic: topicName })}</Field.Label>
        <Stack direction={{ base: "column", sm: "row" }} gap="2" w="full">
          <Input
            type="email"
            autoComplete="email"
            placeholder={t.notify.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            flex={{ sm: "1" }}
          />
          <Button type="submit" loading={state === "sending"} flexShrink={0}>
            {t.notify.button}
          </Button>
        </Stack>
        <Field.ErrorText>{error}</Field.ErrorText>
      </Field.Root>
      <Box aria-hidden="true" position="absolute" left="-10000px" w="1px" h="1px" overflow="hidden">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </Box>
    </form>
  );
}

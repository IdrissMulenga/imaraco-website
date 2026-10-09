"use client";

import {
  Alert,
  Box,
  Button,
  Field,
  Input,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { submitContact } from "@/actions/contact";
import { routes } from "@/data/site";
import { useI18n } from "@/i18n/client";
import { contactSchema, type ContactInput, interestValues } from "@/lib/validation";

type Status = "idle" | "success" | "error" | "rateLimited";


/**
 * Short contact form: name, email, message. The topic comes from the button
 * the visitor clicked, via the URL (e.g. /contact?interest=service:web), and
 * is shown above the fields. Must be rendered inside <Suspense>.
 */
export function ContactForm({
  interest,
  messagePlaceholder,
  submitLabel,
}: {
  /** Fixed interest (overrides the URL), e.g. "product:pay" for orders. */
  interest?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
}) {
  const { lang, t, href } = useI18n();
  const f = t.form;
  // Error messages in the schema are keys of form.errors in the dictionary.
  const err = (key?: string) => (key ? (f.errors[key as keyof typeof f.errors] ?? key) : undefined);
  const searchParams = useSearchParams();
  const fromUrl = interest ?? searchParams.get("interest") ?? "";
  const defaultInterest = interestValues.includes(fromUrl) ? fromUrl : "other";
  // e.g. "service:web" → "web" → "Custom web development"
  const topicId = defaultInterest.split(":")[1] as keyof typeof t.interest | undefined;
  const topic = topicId ? t.interest[topicId] : undefined;
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      interest: defaultInterest,
      lang,
      message: "",
      website: "",
      startedAt: 0,
    },
  });

  // Keep the topic in sync when navigating between contact links.
  useEffect(() => {
    setValue("interest", defaultInterest);
  }, [defaultInterest, setValue]);

  // Spam timing trap: record when the form first became usable (browser
  // only). Set once: restarting it (e.g. after an error) would make a quick
  // retry look like a bot, and the message would be silently dropped.
  useEffect(() => {
    setValue("startedAt", Date.now());
  }, [setValue]);

  async function onSubmit(values: ContactInput) {
    const res = await submitContact(values);
    if (res.ok) {
      reset({ ...values, name: "", email: "", message: "" });
      setStatus("success");
    } else {
      setStatus(res.error === "rateLimited" ? "rateLimited" : "error");
    }
  }

  if (status === "success") {
    return (
      <Stack gap="4" role="status">
        <Alert.Root status="success" borderRadius="l3">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{f.successTitle}</Alert.Title>
            <Alert.Description>
              {f.successText}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
        <div>
          <Button variant="outline" colorPalette="gray" onClick={() => setStatus("idle")}>
            {f.sendAnother}
          </Button>
        </div>
      </Stack>
    );
  }

  return (
    <Stack asChild position="relative" gap="5">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {(status === "error" || status === "rateLimited") && (
          <Alert.Root status="error" borderRadius="l3" role="alert">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>{f.errorTitle}</Alert.Title>
              <Alert.Description>
                {status === "rateLimited"
                  ? f.rateLimited
                  : f.errorText}
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        )}

        {topic && (
          <HStack gap="2" fontSize="sm">
            <Text color="fg.muted">{f.topic}:</Text>
            <Text fontWeight="semibold">{topic}</Text>
          </HStack>
        )}

        <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
          <Field.Root required invalid={!!errors.name}>
            <Field.Label>
              {f.name} <Field.RequiredIndicator />
            </Field.Label>
            <Input autoComplete="name" {...register("name")} />
            <Field.ErrorText>{err(errors.name?.message)}</Field.ErrorText>
          </Field.Root>

          <Field.Root required invalid={!!errors.email}>
            <Field.Label>
              {f.email} <Field.RequiredIndicator />
            </Field.Label>
            <Input type="email" autoComplete="email" inputMode="email" {...register("email")} />
            <Field.ErrorText>{err(errors.email?.message)}</Field.ErrorText>
          </Field.Root>

        </SimpleGrid>

        <Field.Root required invalid={!!errors.message}>
          <Field.Label>
            {f.message} <Field.RequiredIndicator />
          </Field.Label>
          <Textarea
            rows={5}
            autoresize
            placeholder={messagePlaceholder ?? f.messagePlaceholder}
            {...register("message")}
          />
          <Field.ErrorText>{err(errors.message?.message)}</Field.ErrorText>
        </Field.Root>

        {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
        <Box aria-hidden="true" position="absolute" left="-10000px" w="1px" h="1px" overflow="hidden">
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </label>
        </Box>

        <Stack
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ sm: "center" }}
          gap="4"
        >
          <Text fontSize="sm" color="fg.muted">
            {f.privacyBefore}{" "}
            <ChakraLink asChild color="brand.fg" textDecoration="underline">
              <NextLink href={href(routes.privacy)}>{f.privacyLink}</NextLink>
            </ChakraLink>
            .
          </Text>
          <Button type="submit" size="lg" loading={isSubmitting} loadingText={f.sending} flexShrink={0}>
            {submitLabel ?? f.submit}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}

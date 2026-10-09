import { Center, type CenterProps } from "@chakra-ui/react";

/** Rounded brand-tinted square that holds a line icon. */
export function IconTile(props: CenterProps) {
  return (
    <Center
      boxSize="11"
      borderRadius="l3"
      bg="brand.subtle"
      color="brand.fg"
      borderWidth="1px"
      borderColor="brand.muted"
      fontSize="xl"
      flexShrink={0}
      aria-hidden="true"
      {...props}
    />
  );
}

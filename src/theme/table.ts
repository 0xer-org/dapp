import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

const mdStyle = definePartsStyle({
  th: { px: 0, textTransform: "none", letterSpacing: 1, fontSize: "md" },
  td: { px: 0, pt: 4, pb: 1 },
  tbody: { py: 12 },
  thead: {
    borderBottomWidth: "1px",
    borderColor: "accent",
  },
});

export const tableTheme = defineMultiStyleConfig({ sizes: { md: mdStyle } });

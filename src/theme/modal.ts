import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    bg: "#21221D",
    border: "1px solid #52534F",
  },
  header: {
    pb: 8,
  },
  footer: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
  overlay: {
    bg: "blackAlpha.900",
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});

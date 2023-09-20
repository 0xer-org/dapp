import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  field: {},
});

const outline = definePartsStyle({
  field: {
    bg: "#393A36",
    borderColor: "accent",
    _placeholder: { color: "accent" },
  },
});

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants: {
    outline,
  },
});

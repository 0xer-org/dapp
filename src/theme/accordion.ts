import { accordionAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  container: {
    bg: "#21221D",
    py: 5,
    px: 4,
    borderRadius: 5,
    gap: 2,
    border: "1px solid #52534F",
    mb: 6,
  },
});

export const accordionTheme = defineMultiStyleConfig({ baseStyle });

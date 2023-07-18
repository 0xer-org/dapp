import { tabsAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

const baseStyle = definePartsStyle({
  tab: {
    color: "#9C9D9B",
    pl: "none",
    _selected: {
      color: "text",
      borderColor: "text",
      borderBottomWidth: 1,
    },
  },
});

export const tabsTheme = defineMultiStyleConfig({ baseStyle });

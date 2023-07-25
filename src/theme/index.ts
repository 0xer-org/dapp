import { extendTheme } from "@chakra-ui/react";
import { tabsTheme } from "./tabs";
import { modalTheme } from "./modal";
import { accordionTheme } from "./accordion";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        textTransform: "uppercase",
      },
      variants: {
        outline: {
          borderColor: "white",
          borderWidth: 2,
          bg: "transparent",
          color: "text",
          fontWeight: "bold",
          px: 8,
          _hover: {
            bg: "transparent",
          },
        },
      },
    },
    Tabs: tabsTheme,
    Modal: modalTheme,
    Accordion: accordionTheme,
  },
  colors: {
    text: "#f5f5f5",
    accent: "#52534F",
  },
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
      },
      body: {
        color: "#f5f5f5",
        fontFamily: "Unbounded",
      },
    },
  },
});

export default theme;

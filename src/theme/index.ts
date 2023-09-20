import { extendTheme } from "@chakra-ui/react";
import { tabsTheme } from "./tabs";
import { modalTheme } from "./modal";
import { inputTheme } from "./input";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        borderRadius: 0,
      },
      variants: {
        outlineDark: {
          borderColor: "white",
          borderWidth: 3,
          bg: "transparent",
          color: "text",
          fontWeight: "bold",
          px: 8,
          _hover: {
            bg: "transparent",
          },
        },
        outline: {
          borderColor: "black",
          borderWidth: 2,
          bg: "transparent",
          color: "black",
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
    Input: inputTheme,
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
        background: "#F7F7F7",
        fontFamily: "Unbounded",
      },
      ".grecaptcha-badge": {
        visibility: "hidden",
      },
    },
  },
});

export default theme;

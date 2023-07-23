import { extendTheme } from "@chakra-ui/react";
import { tabsTheme } from "./tabs";
import { modalTheme } from "./modal";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        textTransform: "uppercase",
      },
    },
    Tabs: tabsTheme,
    Modal: modalTheme,
  },
  colors: {
    text: "#f5f5f5",
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

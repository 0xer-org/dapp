import { Flex, Text } from "@chakra-ui/react";
import isInLineBrowser from "@/libs/isInLineBrowser";

const Footer = () => {
  const lineMode = isInLineBrowser();

  return lineMode ? null : (
    <Flex
      bg="black"
      fontWeight="bold"
      justify="space-between"
      px={{ base: 5, lg: 100 }}
      pt="100px"
      pb="150px"
      color="white"
      direction={{ base: "column", md: "row" }}
    >
      <Text>{"{0x(er)}"}</Text>
      <Text maxW={{ base: "100%", lg: "40%" }} lineHeight={2}>
        © 2024 0xer.org
      </Text>
    </Flex>
  );
};
export default Footer;

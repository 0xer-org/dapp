import { Flex, Image, Text } from "@chakra-ui/react";
import logo from "@/assets/images/logo.png";
import { useEffect, useState } from "react";
import { useLiff } from "react-liff";

const Footer = () => {
  const [lineMode, setLineMode] = useState(false);
  const { isReady, liff } = useLiff();

  // check if is from line
  useEffect(() => {
    if (isReady && liff.isInClient()) {
      setLineMode(true);
    }
  }, [isReady, liff]);
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
      <Text fontFamily="Aclonica" fontSize="1.25rem">
        <Image src={logo} />
      </Text>
      <Text maxW={{ base: "100%", lg: "40%" }} lineHeight={2}>
        © 2024 0xer.org
      </Text>
    </Flex>
  );
};
export default Footer;

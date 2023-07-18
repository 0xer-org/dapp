import { Box, Flex, Image, Text } from "@chakra-ui/react";
import logo from "@/assets/images/logo.png";

const Footer = () => (
  <Box bg="black" fontWeight="bold" px="100px" py="60px" color="white">
    <Flex align="center" mb={4}>
      <Image src={logo} width="30px" mr={2} />
      <Text fontSize="1.25rem">0xer NFT</Text>
    </Flex>
    <Text maxW="40%" lineHeight={2}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et felis
      eget turpis commodo aliquet sit amet vel odio. Vivamus accumsan lacinia
      arcu, scelerisque laoreet nisl fringilla posuere. Nulla nec dolor vehicula
      nisl pulvinar luctus non non mi. Morbi ac molestie leo, non porta eros.
      Curabitur dapibus eleifend magna eget commodo.
    </Text>
  </Box>
);
export default Footer;

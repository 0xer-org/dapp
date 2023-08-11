import logo from "@/assets/images/logo.png";
import { Flex, Image, Text } from "@chakra-ui/react";

const NFTIntroduction = () => (
  <Flex direction="column" align="center">
    <Image src={logo} />
    <Text fontSize="3xl" align="center" my={3} color="black" fontWeight="black">
      0xer NFT
    </Text>
    <Text align="center" color="black" maxW={750}>
      NFT provides people with a unique and fully transparent storage mechanism.
      0xer's NFT is an open protocol like DNA on the Internet, storing data that
      each person voluntarily provides, and each person will have full access to
      their own capability data.
    </Text>
  </Flex>
);
export default NFTIntroduction;

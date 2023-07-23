import { Link as RouterLink } from "react-router-dom";
import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import logo from "@/assets/images/logo.png";
import ConnectWallet from "./ConnectWallet";

const Navbar = () => (
  <Flex
    height="94px"
    width="100vw"
    bg="black"
    alignItems="center"
    justify="space-between"
    px={12}
    fontWeight="bold"
    position="fixed"
    top={0}
    zIndex={10000}
  >
    <Flex align="center" gap={6} fontSize="1.25rem">
      <RouterLink to="/">
        <Flex align="center">
          <Image src={logo} width="30px" mr={2} />
          <Text>[0xer]</Text>
        </Flex>
      </RouterLink>

      <Link _hover={{ textDecor: "none" }} href="/#explore">
        Explore
      </Link>
      <RouterLink to="/did">0xDID</RouterLink>
      <RouterLink to="/mission">Mission</RouterLink>
      <RouterLink to="/">Paper</RouterLink>
      <RouterLink to="/">FAQ</RouterLink>
      <RouterLink to="/">Twitter</RouterLink>
    </Flex>
    <Box>
      <ConnectWallet />
    </Box>
  </Flex>
);
export default Navbar;

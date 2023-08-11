import { withRouter } from "react-router";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import logo from "@/assets/images/logo.png";
import ConnectWallet from "./ConnectWallet";
import { HamburgerIcon } from "@chakra-ui/icons";

const DesktopNavigation = ({
  history,
}: {
  history: RouteComponentProps["history"];
}) => (
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
    <Menu>
      <MenuButton fontWeight="bold">Mission</MenuButton>
      <MenuList bg="black">
        <MenuItem bg="black" onClick={() => history.push("/mission/1")}>
          #001
        </MenuItem>
        <MenuDivider />
        <MenuItem bg="black" onClick={() => history.push("/mission/2")}>
          #002
        </MenuItem>
      </MenuList>
    </Menu>
    <RouterLink to="/">Paper</RouterLink>
    <RouterLink to="/">FAQ</RouterLink>
    <RouterLink to="/">Twitter</RouterLink>
  </Flex>
);

const MobileNavigation = () => (
  <Menu>
    <MenuButton
      as={IconButton}
      icon={<HamburgerIcon />}
      bg="black"
      color="white"
      _active={{
        bg: "black",
        color: "white",
      }}
    />
    <MenuList bg="black">
      <MenuItem bg="black" as={RouterLink} to="/">
        Home
      </MenuItem>
      <MenuItem bg="black" as={Link} href="/#explore">
        Explore
      </MenuItem>
      <MenuItem bg="black" as={RouterLink} to="/did">
        0xDID
      </MenuItem>
      <MenuItem bg="black" as={RouterLink} to="/mission">
        Mission
      </MenuItem>
      <MenuItem bg="black" as={RouterLink} to="/">
        Papper
      </MenuItem>
      <MenuItem bg="black" as={RouterLink} to="/">
        FAQ
      </MenuItem>
      <MenuItem bg="black" as={RouterLink} to="/">
        Twitter
      </MenuItem>
    </MenuList>
  </Menu>
);

const Navbar = ({ history }: { history: RouteComponentProps["history"] }) => {
  const [isDesktop] = useMediaQuery("(min-width: 996px)");
  const Navigation = isDesktop ? DesktopNavigation : MobileNavigation;
  return (
    <Flex
      height="94px"
      width="100vw"
      bg="black"
      alignItems="center"
      justify="space-between"
      px={{ base: 3, lg: 12 }}
      fontWeight="bold"
      position="fixed"
      top={0}
      zIndex={10000}
    >
      <Navigation history={history} />

      <Box>
        <ConnectWallet />
      </Box>
    </Flex>
  );
};
export default withRouter(Navbar);

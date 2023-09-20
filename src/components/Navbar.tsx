import { withRouter } from "react-router";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import ProfileLink from "@/components/ProfileLink";
import { HamburgerIcon } from "@chakra-ui/icons";
import AccountContext from "@/context/account";
import { useContext } from "react";
import logo from "@/assets/images/logo.png";
import openseaLogo from "@/assets/images/opensea.png";
import twitterLogo from "@/assets/images/x.png";

// @todo: add social links

const DesktopNavigation = ({
  history,
}: {
  history: RouteComponentProps["history"];
}) => (
  <Flex align="center" gap={6} fontSize="1.25rem" mr={10}>
    <RouterLink to="/">Tasks</RouterLink>
    <RouterLink to="/">Paper</RouterLink>
    <RouterLink to="/">FAQ</RouterLink>
    <RouterLink to="/">Twitter</RouterLink>
    <RouterLink to="/">
      <Image src={twitterLogo} width="2.5rem" />
    </RouterLink>
    <RouterLink to="/">
      <Image src={openseaLogo} width="2.5rem" />
    </RouterLink>
  </Flex>
);

const MobileNavigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="hamburger"
        onClick={onOpen}
        bg="black"
        color="white"
        _hover={{
          bg: "black",
          color: "white",
        }}
      >
        <HamburgerIcon />
      </IconButton>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="black" marginTop="96px" width="100px">
          <DrawerBody color="white">
            <Flex direction="column" p={5} gap={3}>
              <RouterLink to="/">Paper</RouterLink>
              <RouterLink to="/">FAQ</RouterLink>
              <RouterLink to="/">Twitter</RouterLink>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Navbar = ({ history }: { history: RouteComponentProps["history"] }) => {
  const [isDesktop] = useMediaQuery("(min-width: 996px)");
  const Navigation = isDesktop ? DesktopNavigation : MobileNavigation;
  const { account } = useContext(AccountContext);

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
      <RouterLink to="/">
        <Flex align="center">
          <Image src={logo} />
        </Flex>
      </RouterLink>
      <Flex
        direction={!!account || isDesktop ? "row" : "row-reverse"}
        align="center"
      >
        <Navigation history={history} />
        <Box>
          <ProfileLink />
        </Box>
      </Flex>
    </Flex>
  );
};
export default withRouter(Navbar);

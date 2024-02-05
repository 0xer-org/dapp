import { withRouter } from "react-router";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  Box,
  Collapse,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import ProfileLink from "@/components/ProfileLink";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import AccountContext from "@/context/account";
import { useContext, useEffect } from "react";
import openseaLogo from "@/assets/images/opensea.png";
import twitterLogo from "@/assets/images/x.png";
import warpcastLogo from "@/assets/images/warpcast.png";
import isInLineBrowser from "@/libs/isInLineBrowser";

// @todo: add social links

const DesktopNavigation = () => (
  <Flex align="center" gap={6} fontSize="1.25rem" fontWeight="normal" mr={10}>
    <Menu>
      <MenuButton>Tasks</MenuButton>
      <MenuList bg="#393A36" borderColor="accent">
        <MenuItem bg="#393A36">
          <RouterLink to="/tasks/1">Task #001</RouterLink>
        </MenuItem>
        <MenuItem bg="#393A36">
          <RouterLink to="/tasks/2">Task #002</RouterLink>
        </MenuItem>
        <MenuItem bg="#393A36">
          <RouterLink to="/tasks/3">Task #003</RouterLink>
        </MenuItem>
      </MenuList>
    </Menu>
    <Link
      href="https://whitepaper.0xer.org"
      target="_blank"
      rel="noreferrer noopener"
    >
      Whitepaper
    </Link>
    <Link
      href="https://whitepaper.0xer.org/airdrop"
      target="_blank"
      rel="noreferrer noopener"
    >
      Airdrop
    </Link>
    <RouterLink to="/dna">MyDNA</RouterLink>
    <Link
      href="https://x.com/0xer_org"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Image src={twitterLogo} width="2.5rem" />
    </Link>
    <Link
      href="https://warpcast.com/0xer"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Image src={warpcastLogo} width="2.25rem" />
    </Link>
    <Link
      href="https://testnets.opensea.io/collection/0xer-1"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Image src={openseaLogo} width="2.5rem" />
    </Link>
  </Flex>
);

const MobileNavigation = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { isOpen: tasksOpen, onToggle: onTasksToggle } = useDisclosure();

  const location = useLocation();

  useEffect(() => {
    onClose();
  }, [location, onClose]);

  return (
    <>
      <IconButton
        aria-label="hamburger"
        onClick={onToggle}
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
        <DrawerContent bg="black" marginTop="94px">
          <DrawerBody color="white">
            <Flex direction="column" p={5} gap={3}>
              <Flex align="center" gap={3}>
                <Text onClick={onTasksToggle}>Tasks</Text>
                {tasksOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Flex>
              <Collapse in={tasksOpen}>
                <VStack align="flex-start" pl={4}>
                  <RouterLink to="/tasks/1">Task #001</RouterLink>
                  <RouterLink to="/tasks/2">Task #002</RouterLink>
                  <RouterLink to="/tasks/3">Task #003</RouterLink>
                </VStack>
              </Collapse>
              <Link
                href="https://whitepaper.0xer.org"
                target="_blank"
                rel="noreferrer noopener"
              >
                Whitepaper
              </Link>
              <Link
                href="https://whitepaper.0xer.org/airdrop"
                target="_blank"
                rel="noreferrer noopener"
              >
                Airdrop
              </Link>
              <RouterLink to="/dna">MyDNA</RouterLink>
              <Link
                href="https://x.com/0xer_org"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image src={twitterLogo} width="2.5rem" />
              </Link>
              <Link
                href="https://warpcast.com/0xer"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image src={warpcastLogo} width="2.25rem" />
              </Link>
              <Link
                href="https://testnets.opensea.io/collection/0xer-1"
                target="_blank"
                rel="noreferrer noopener"
              >
                <Image src={openseaLogo} width="2.5rem" />
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const Navbar = () => {
  const lineMode = isInLineBrowser();
  const [isDesktop] = useMediaQuery("(min-width: 996px)");
  const Navigation = isDesktop ? DesktopNavigation : MobileNavigation;
  const { account } = useContext(AccountContext);

  return lineMode ? null : (
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
          <Text>{"{0x(er)}"}</Text>
        </Flex>
      </RouterLink>
      <Flex
        direction={!!account || isDesktop ? "row" : "row-reverse"}
        align="center"
      >
        <Navigation />
        <Box>
          <ProfileLink />
        </Box>
      </Flex>
    </Flex>
  );
};
export default withRouter(Navbar);

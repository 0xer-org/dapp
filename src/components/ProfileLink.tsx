import { useContext } from "react";
import { createAvatarUrl, shortenAddress } from "@/libs";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import AccountContext from "@/context/account";

import WalletConnectionContext from "@/context/walletConnection";

const ProfileLink = () => {
  const { account } = useContext(AccountContext);
  const { connectWallet } = useContext(WalletConnectionContext);
  const { onToggle, onClose, isOpen } = useDisclosure();

  return account ? (
    <Flex align="center" gap={4}>
      <Avatar src={createAvatarUrl(account)} size="sm" onClick={onToggle} />
      <Text textDecor="underline" display={{ base: "none", md: "block" }}>
        {shortenAddress(account)}
      </Text>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay display={{ base: "block", md: "none" }} />
        <DrawerContent
          display={{ base: "block", md: "none" }}
          bg="black"
          marginTop="94px"
        >
          <DrawerBody color="white">
            <Flex align="center" gap={2}>
              <Avatar src={createAvatarUrl(account)} size="xs" />
              <Text>{shortenAddress(account)}</Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  ) : (
    <Button onClick={connectWallet} variant="outlineDark">
      Connect
    </Button>
  );
};

export default ProfileLink;

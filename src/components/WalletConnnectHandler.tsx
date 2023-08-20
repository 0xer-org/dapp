import { createUser } from "@/api";
import TokenContext from "@/context/token";
import WalletConnectionContext from "@/context/walletConnection";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useLiff } from "react-liff";

const WalletConnnectHandler = () => {
  const { connect, account } = useContext(TokenContext);
  const { isOpen, close } = useContext(WalletConnectionContext);

  const { isReady, liff } = useLiff();

  useEffect(() => {
    async function lineAuth() {
      const accessToken = await liff.getAccessToken();

      const result = await createUser({
        type: "line",
        accessToken,
      });
      const { private_key: privateKey, claim_hash: claimHash } = result;
      connect(privateKey);
      // @todo: do something with claim hash
      console.log(claimHash);
    }

    if (isReady && liff.isInClient()) {
      lineAuth();
    }
  }, [connect, isReady, liff]);

  return (
    <Modal isOpen={isOpen && !account} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody
          p={5}
          borderTop="1px solid #52534F"
          borderBottom="1px solid #52534F"
        >
          <VStack>
            <Text align="center">
              Please install the MetaMask wallet extension.
            </Text>
            <Button onClick={() => connect()}>Connect</Button>
          </VStack>
        </ModalBody>

        <ModalFooter bg="#030303" justifyContent="center">
          <Text align="center">Supported Browsers</Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WalletConnnectHandler;

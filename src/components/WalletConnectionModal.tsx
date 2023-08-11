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
import { useContext } from "react";

const WalletConnectionModal = () => {
  const { connect, account } = useContext(TokenContext);
  const { isOpen, close } = useContext(WalletConnectionContext);
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
            <Button onClick={connect}>Connect</Button>
          </VStack>
        </ModalBody>

        <ModalFooter bg="#030303" justifyContent="center">
          <Text align="center">Supported Browsers</Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WalletConnectionModal;

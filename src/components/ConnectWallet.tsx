import { useContext } from "react";
import { shortenAddress } from "@/libs";
import TokenContext from "@/context/token";
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
  useDisclosure,
} from "@chakra-ui/react";

const ConnectWallet = () => {
  const { account, connect } = useContext(TokenContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {account ? (
        shortenAddress(account)
      ) : (
        <Button
          onClick={onOpen}
          borderColor="white"
          borderWidth={2}
          bg="transparent"
          color="text"
          fontWeight="bold"
          px={8}
          _hover={{
            bg: "transparent",
          }}
        >
          Connect
        </Button>
      )}
      <Modal isOpen={isOpen && !account} onClose={onClose} isCentered>
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
    </>
  );
};

export default ConnectWallet;

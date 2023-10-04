import { createUser, getUser } from "@/api";
import AccountContext from "@/context/account";
import WalletConnectionContext from "@/context/walletConnection";
import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useLiff } from "react-liff";
import metamaskLogo from "@/assets/images/metamask.png";

const WalletConnnectHandler = () => {
  const { connect, account, setValues, sign } = useContext(AccountContext);
  const { isOpen, close } = useContext(WalletConnectionContext);
  const toast = useToast();
  const params = new URLSearchParams(window.location.search);
  const referrer = params.get("referrer") || undefined;

  const { isReady: isLineReady, liff } = useLiff();
  const isFromLine = isLineReady && liff.isInClient();

  // line register flow
  useEffect(() => {
    async function lineAuth() {
      let accessToken = localStorage.getItem("auth");
      if (!accessToken) {
        const lineToken = await liff.getAccessToken();

        const result = await createUser({
          type: "line",
          accessToken: lineToken,
          referrer,
        });

        accessToken = result.access_token as string;

        localStorage.setItem("auth", accessToken);
      }
      const result = await getUser();
      const { private_key: privateKey, data } = result;
      connect(privateKey);
      setValues(data);
    }

    if (isFromLine) {
      lineAuth();
    }
  }, [connect, isFromLine, liff, referrer, setValues]);

  // normal wallet user flow
  useEffect(() => {
    if (account && !isFromLine) {
      (async () => {
        let accessToken = localStorage.getItem("auth");
        if (!accessToken) {
          const signature = await sign(`Hello, ${account}!`);
          const result = await createUser({
            address: account,
            signature,
            referrer,
          });
          accessToken = result.access_token;
          if (accessToken) localStorage.setItem("auth", accessToken);
        }
        try {
          const { data } = await getUser();
          setValues(data);
        } catch (e) {
          toast({
            title:
              "Something went wrong, please refresh you page and try again.",
          });
          localStorage.removeItem("auth");
        }
      })();
    }
  }, [account, setValues, isFromLine, referrer, sign, toast]);

  return (
    <Modal isOpen={isOpen && !account} onClose={close} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text
            fontSize="lg"
            top={3}
            position="absolute"
            align={{ base: "left", md: "center" }}
            width="90%"
          >
            Connect Wallet
          </Text>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody
          p={5}
          borderTop="1px solid #52534F"
          borderBottom="1px solid #52534F"
        >
          <VStack py={5} gap={5}>
            <Button
              onClick={() => connect()}
              display="flex"
              bg="#21221D"
              py={6}
              border="1px solid #52534F"
              color="white"
              width={300}
              textTransform="none"
            >
              <Image src={metamaskLogo} width={8} />
              <Text flex={1}>MetaMask</Text>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WalletConnnectHandler;

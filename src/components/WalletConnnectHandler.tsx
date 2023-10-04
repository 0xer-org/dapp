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
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useLiff } from "react-liff";
import metamaskLogo from "@/assets/images/metamask.png";

const WalletConnnectHandler = () => {
  const { connect, account, setValues, sign } = useContext(AccountContext);
  const { isOpen, close } = useContext(WalletConnectionContext);
  const params = new URLSearchParams(window.location.search);
  const referrer = params.get("referrer") || undefined;

  const { isReady: isLineReady, liff } = useLiff();
  const isFromLine = isLineReady && liff.isInClient();

  // line register flow
  useEffect(() => {
    async function lineAuth() {
      const lineToken = await liff.getAccessToken();

      const { access_token: accessToken } = await createUser({
        type: "line",
        accessToken: lineToken,
        referrer,
      });

      localStorage.setItem("auth", accessToken);
      const result = await getUser();
      const { private_key: privateKey, claim_hash: claimHash, data } = result;
      connect(privateKey);
      setValues(data);
      // @todo: do something with claim hash
      console.log(claimHash);
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
          localStorage.removeItem("auth");
        }
      })();
    }
  }, [account, setValues, isFromLine, referrer, sign]);

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

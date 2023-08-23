import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Center, VStack } from "@chakra-ui/react";
import TokenContext from "@/context/token";
import NFTIntroduction from "@/components/NFTIntroduction";
import NFTRenderer from "@/components/NFTRenderer";
import WalletConnectionContext from "@/context/walletConnection";
import { createUser } from "@/api";
import { shortenAddress } from "@/libs";

const DID = () => {
  const { account, id, values } = useContext(TokenContext);
  const { connectWallet } = useContext(WalletConnectionContext);
  const [preparedToMint, setPreparedToMint] = useState(false);

  const connectAndMint = useCallback(() => {
    if (!account) connectWallet();
    setPreparedToMint(true);
  }, [account, connectWallet]);

  useEffect(() => {
    if (account && !id && preparedToMint) {
      createUser({ type: "wallet", address: account }).then(console.log);
      setPreparedToMint(false);
    }
  }, [account, id, preparedToMint]);

  return (
    <Box>
      <Box pt={20} px={5} mb={2}>
        <NFTIntroduction />
      </Box>
      <Center flexDirection="column" mb={20} px={5}>
        {!id ? (
          <VStack my={8} gap={4}>
            <Button
              onClick={connectAndMint}
              width={750}
              maxW="100%"
              color="black"
              border="1px solid black"
              bg="white"
            >
              MINT YOUR 0xer NFT Now
            </Button>
            <Button
              width={750}
              maxW="100%"
              color="black"
              border="1px solid black"
              bg="white"
            >
              EXPLORE 0xer NFT
            </Button>
          </VStack>
        ) : (
          <Center
            my={5}
            py={3}
            width={750}
            maxW="100%"
            color="black"
            bg="white"
            borderRadius={4}
          >
            <Box mr={2}>Owner</Box>
            <Box fontWeight="bold">{shortenAddress(account || "")}</Box>
          </Center>
        )}
        <NFTRenderer values={values} size={{ base: "100%", lg: 750 }} />
      </Center>
    </Box>
  );
};

export default DID;

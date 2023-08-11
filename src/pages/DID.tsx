import { useContext } from "react";
import { Box, Button, Center } from "@chakra-ui/react";
import TokenContext from "@/context/token";
import NFTIntroduction from "@/components/NFTIntroduction";
import NFTRenderer from "@/components/NFTRenderer";

const DID = () => {
  const { id, values, mint } = useContext(TokenContext);
  return (
    <Box>
      <Box pt={20} px={5} mb={10}>
        <NFTIntroduction />
      </Box>
      <Center flexDirection="column" mb={20} px={5}>
        {!!id || (
          <>
            <Button
              my={3}
              onClick={mint}
              width={750}
              maxW="100%"
              color="black"
              border="1px solid black"
              bg="white"
            >
              MINT YOUR 0xer NFT Now
            </Button>
            <Button
              my={3}
              width={750}
              maxW="100%"
              color="black"
              border="1px solid black"
              bg="white"
            >
              EXPLORE 0xer NFT
            </Button>
          </>
        )}
        <NFTRenderer values={values} size={{ base: "100%", lg: 750 }} />
      </Center>
    </Box>
  );
};

export default DID;

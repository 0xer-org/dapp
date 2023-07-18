import { useContext } from "react";
import { Box, Button, Center } from "@chakra-ui/react";
import TokenContext from "@/context/token";
import NFTIntroduction from "@/components/NFTIntroduction";
import NFTRenderer from "@/components/NFTRenderer";

const DID = () => {
  const { id, values, mint } = useContext(TokenContext);
  return (
    <Box>
      <Box pt={20} mb={10}>
        <NFTIntroduction />
      </Box>
      <Center flexDirection="column" mb={20}>
        {!!id || (
          <>
            <Button
              my={3}
              onClick={mint}
              width={750}
              color="black"
              border="1px solid black"
              bg="white"
            >
              PROOF OF HUMANITY & MINT YOUR 0xer LEVEL 1 NFT Now
            </Button>
            <Button
              my={3}
              width={750}
              color="black"
              border="1px solid black"
              bg="white"
            >
              EXPLORE 0xer NFT
            </Button>
          </>
        )}
        <NFTRenderer values={values} />
      </Center>
    </Box>
  );
};

export default DID;

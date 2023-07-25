import {
  Box,
  Button,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import logo from "@/assets/images/logo.png";
import stage0 from "@/assets/images/stage-0.png";
import stage1 from "@/assets/images/stage-1.png";
import stage2 from "@/assets/images/stage-2.png";
import stage3 from "@/assets/images/stage-3.png";
import stage4 from "@/assets/images/stage-4.png";
import stage5 from "@/assets/images/stage-5.png";
import stage6 from "@/assets/images/stage-6.png";
import NFTIntroduction from "@/components/NFTIntroduction";

const Main = () => (
  <Box>
    {/* Jumbotron begin */}
    <Flex height="calc(100vh - 94px)" bg="black" mt="94px">
      <Flex m="auto" direction="column" align="center">
        <Image src={logo} width={55} />
        <Text fontSize="4xl" pb={3} letterSpacing={5}>
          [0xer]
        </Text>
        <Text fontSize="2xl">Seal Your Powers On the Blockchain</Text>
        <Text maxW={800} lineHeight={2} align="center">
          This is a project about seal human capabilities. In the current AI and
          robots digital generation, you and I need a trusted identity to prove
          we are unique in the world and build a network of trust between humans
          together.
        </Text>
        <Button
          mt={5}
          variant="outline"
          onClick={() => document.getElementById("explore")?.scrollIntoView()}
        >
          Explore
        </Button>
      </Flex>
    </Flex>
    {/* Jumbotron end */}

    {/* Tech stack begin */}
    <Box bg="black" p={20}>
      <Text fontSize="3xl" fontWeight="bold" align="center" letterSpacing={2}>
        BLOCKCHAIN TECHNOLOGY
      </Text>
      <Flex gap={10} mt={10} mx="auto" width={1200}>
        <Box
          bg="#393A36"
          py={10}
          px={8}
          flex={1}
          borderRadius="5px"
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: "#52534F" }}
        >
          <Text decoration="underline" fontSize="2xl" mb={2}>
            ERC-6551
          </Text>
          <Text fontSize="xl">
            0xer believes that Web2 or Web3 are both important technologies for
            the Web and are different places of people's conscious existence.
            With the ERC-6551, the interactive process can be more
            user-friendly. Our goal is to maximize service to all people.
          </Text>
        </Box>
        <Box
          bg="#393A36"
          py={10}
          px={8}
          flex={1}
          borderRadius="5px"
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: "#52534F" }}
        >
          <Text decoration="underline" fontSize="2xl" mb={2}>
            Soulbound Token
          </Text>
          <Text fontSize="xl">
            Soul-bound tokens (SBTs) are data-transparent and non-tradable, and
            are used as the basis for personalized identification on the
            Internet and the development of trusted network nodes.
          </Text>
        </Box>
        <Box
          bg="#393A36"
          py={10}
          px={8}
          flex={1}
          borderRadius="5px"
          textAlign="center"
          cursor="pointer"
          _hover={{ bg: "#52534F" }}
        >
          <Text decoration="underline" fontSize="2xl" mb={2}>
            Loot-like NFT
          </Text>
          <Text fontSize="xl">
            The Loot Project has demonstrated the possibility of openness and
            co-creation in gaming applications. 0xer supports people to store
            parts of their abilities, traits and skills on the blockchain via
            NFT based on a zero-knowledge technology.
          </Text>
        </Box>
      </Flex>
    </Box>
    {/* Tech stack end */}

    {/* Introduction begin */}
    <Box id="explore" bg="black" pt="94px">
      <Box bg="white" p={20}>
        <NFTIntroduction />
      </Box>
    </Box>

    {/* Introduction end */}

    {/* Progress & Plan begin */}
    <Flex bg="black" p={20} direction="column" align="center">
      <Text fontSize="3xl" fontWeight="bold" letterSpacing={2} lineHeight={2}>
        PROGRESS & PLAN
      </Text>
      <Text maxW={750} align="center" my={10}>
        The Bitcoin network was born on January 3, 2009, when Satoshi Nakamoto
        mined the "Genesis'' block. We use the block height of Bitcoin as a
        common time standard for the entire 0xer community. The biblical chapter
        of Genesis uses seven days to create the world, and we also divide an
        ideal 0xverse into seven chapters of development.
      </Text>
      <Flex gap={3} my={3}>
        {[stage0, stage1, stage2, stage3, stage4, stage5, stage6].map(
          (image, index) => (
            <Box flex={1} key={index}>
              <Image src={image} width="60px" />
            </Box>
          )
        )}
      </Flex>
    </Flex>
    {/* Progress & Plan end */}

    {/* Stages begin */}
    <Tabs display="flex" variant="unstyled" orientation="vertical">
      <Flex flex={3} bg="#393A36">
        <TabList m="auto" p={4} alignItems="flex-start">
          <Tab>1: PROOF OF HUMANITY</Tab>
          <Tab>2: BUILD ENCRYPTED YOU</Tab>
          <Tab>3: CALCULATE YOUR STRENGTH</Tab>
          <Tab>4: CONTRIBUTE TO THE COMMUNITY</Tab>
          <Tab>5: HUMAN-CENTERED ECONOMICS</Tab>
          <Tab>6: BRIDGING WEB2 & WEB3</Tab>
          <Tab>7: LIVING IN A PERPETUAL NETWORK</Tab>
        </TabList>
      </Flex>

      <TabPanels flex={4} bg="#21221D" p={20} height={600}>
        <TabPanel>
          <Text my={3}>
            The task of the 0xer in this stage is to prove himself as a real
            human being in the anonymous digital world. There are a total of 10
            levels of tests, which are currently known to be a good way to prove
            that you are human. Any methods of communication with the physical
            world, such as SMS verification, email verification, etc., will not
            be used here.
          </Text>
          <Box>
            <Text>Level 1: Basic Response </Text>
            <Text>Level 2: Number Recognition</Text>
            <Text>Level 3: Text input</Text>
            <Text>Level 4: Graphical recognition</Text>
            <Text>Level 5: Motion</Text>
            <Text>Level 6: Calculation</Text>
            <Text>Level 7: Google Authenticator</Text>
            <Text>Level 8: Face Recognition</Text>
            <Text>Level 9: iOS/Android Fingerprint</Text>
            <Text>Level 10: Worldcoin Orb Biometrics</Text>
          </Box>
        </TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </TabPanels>
    </Tabs>
    {/* Stages end */}
  </Box>
);
export default Main;

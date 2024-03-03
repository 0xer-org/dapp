import { Box, Button, Flex, Image, Link, Text } from "@chakra-ui/react";
import arbitrumLogo from "@/assets/images/arbitrum.png";
import ChapterAccordion from "@/components/ChapterAccordion";
import { RouteComponentProps } from "react-router-dom";
import NFTRenderer from "@/components/NFTRenderer";
import { useEffect, useState } from "react";
import { getTotalMint } from "@/libs";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

const Main = ({ history }: { history: RouteComponentProps["history"] }) => {
  const [totalMint, setTotalMint] = useState(0);

  useEffect(() => {
    getTotalMint().then(setTotalMint);
  }, []);

  return (
    <Box>
      {/* Jumbotron begin */}
      <Flex height="calc(100vh - 94px)" bg="black" mt="94px" px={3}>
        <Flex m="auto" direction="column" align="center">
          <Text fontSize="3xl" pb={3} letterSpacing={5} lineHeight={1.2}>
            0xer Decentralized Nexus of Authenticity
          </Text>

          <Text
            maxW={800}
            lineHeight={{ base: 1.5, md: 2 }}
            align={{ base: "left", md: "center" }}
            color="#9EABB5"
            fontSize={{ base: "sm", md: "large" }}
          >
            Thou hast journeyed through life's realms, physical, digital,
            social, and spiritual. Now is the time to gather the scattered
            footprints and forge, upon the blockchain, an identity anonymous yet
            trustworthy, unique and true to thyself. This reborn identity shall
            be a key to unlock the gates of the multiverse.
          </Text>
          <Text
            mt={{ base: 2, md: 10 }}
            fontSize="5xl"
            fontFamily="Cursed Timer ULiL"
            letterSpacing={1}
          >
            <Link
              href="https://testnets.opensea.io/collection/0xer-1"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{ textDecor: "none" }}
            >
              {totalMint}
            </Link>
          </Text>
          <Button
            mt={5}
            variant="outlineDark"
            width={300}
            fontSize="sm"
            onClick={() => history.push("/tasks/1")}
          >
            Mint Your NFT
          </Button>
          <Text mt={2}>Free gas for minting NFT</Text>
          <Link
            href={`https://arbiscan.io/address/${CONTRACT_ADDRESS}`}
            rel="noreferrer noopener"
            target="_blank"
          >
            <Image my={5} width="5rem" src={arbitrumLogo} />
          </Link>
        </Flex>
      </Flex>
      {/* Jumbotron end */}

      {/* DNA begin */}
      <Box p={{ base: 5, lg: 20 }}>
        <Flex
          my={10}
          direction={{ base: "column", md: "row" }}
          mx="auto"
          maxW={1440}
        >
          <Box flex={1}>
            <NFTRenderer
              size={{ base: "100%", lg: 750 }}
              values={new Array(256).fill("00").join("")}
            />
          </Box>
          <Box px={{ base: 2, md: 10 }}>
            <Text fontSize="3xl" my={3} color="black" fontWeight="black">
              NFT: 0xer DNA
            </Text>
            <Text color="black" lineHeight={2}>
              The 0xer DNA (Decentralized Nexus of Authenticity) is an
              anonymized soul-bound NFT on the blockchain, recording your public
              identity, traits, abilities, preferences, and various other
              information in a hexadecimal format (0-255) The 0xer DNA NFT
              employs on-chain blockchain technology to store the data that you
              have made public. This system provides a total of 16x16=256
              numerical storage spaces, specifically designed to depict the
              unique characteristics of an individual. Of these, 10 spaces have
              currently been made accessible. The numerical values representing
              these traits can be sourced from publicly available data (such as
              data on the blockchain) or can be acquired by the individual
              through the completion of specific tasks.
            </Text>
            <Flex justify={{ base: "center", md: "flex-start" }}>
              <Button
                onClick={() => history.push("/tasks/1")}
                mt={5}
                variant="outline"
              >
                Mint Your NFT
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
      {/* DNA end */}

      {/* Introduction begin */}
      <Box bg="black" p={{ base: 0, lg: 20 }}>
        <Text
          fontSize="3xl"
          p={5}
          fontWeight="bold"
          align="center"
          letterSpacing={2}
        >
          Seal and encrypt the concept of You into the 0xer NFT
        </Text>
        <Text mt={8} align="center" fontSize={"1.5rem"}>
          {"{0x(er)}"}
        </Text>
        <Flex
          gap={10}
          mt={10}
          mx="auto"
          maxW={1200}
          direction={{ base: "column", lg: "row" }}
        >
          <Box
            bg="#393A36"
            py={10}
            px={8}
            flex={1}
            borderRadius="5px"
            cursor="pointer"
            _hover={{ bg: "#52534F" }}
          >
            <Text
              decoration="underline"
              fontSize="2xl"
              mb={4}
              textAlign="center"
            >
              0x
            </Text>
            <Text fontSize="md" textAlign="left">
              The prefix "0x" is commonly associated with hexadecimal notation.
              In the context of the 0xer DNA, it symbolizes the hexadecimal
              encoding, reflecting the idea that the project utilizes blockchain
              encryption technology for data preservation. This 16-base
              numerical system is widely used in computer science, and its
              application here emphasizes the digital and technological
              foundation of the project.
            </Text>
          </Box>
          <Box
            bg="#393A36"
            py={10}
            px={8}
            flex={1}
            borderRadius="5px"
            cursor="pointer"
            _hover={{ bg: "#52534F" }}
          >
            <Text
              decoration="underline"
              fontSize="2xl"
              mb={4}
              textAlign="center"
            >
              0x(er)
            </Text>
            <Text fontSize="md" textAlign="left">
              The "er" enclosed in parentheses signifies the individual human
              entity, with various attributes and characteristics. The
              parentheses imply a function-like concept, where "er" represents a
              range of human traits that can be quantified and computed. This
              encapsulates the project's goal of translating human individuality
              into a format that can be processed and utilized by system and AI
              algorithms.
            </Text>
          </Box>
          <Box
            bg="#393A36"
            py={10}
            px={8}
            flex={1}
            borderRadius="5px"
            cursor="pointer"
            _hover={{ bg: "#52534F" }}
          >
            <Text
              decoration="underline"
              fontSize="2xl"
              mb={4}
              textAlign="center"
            >
              {"{0x(er)}"}
            </Text>
            <Text fontSize="md" textAlign="left">
              The curly braces typically denote a set in mathematics and
              computing. In the context of 0xer, they symbolize the collective
              set of all human individuals within the multiverse, forming a
              decentralized society (DeSoc). This signifies the inclusiveness
              and universality of the project, emphasizing the
              interconnectedness of individual entities within a broader
              community.
            </Text>
          </Box>
        </Flex>
        <Text mx="auto" py={10} maxW={800} align="center">
          By furnishing publicly accessible or authorized individual trait
          numerical data, a programmable data nexus is formed. Each individual
          enhances the value of their NFT by establishing a more comprehensive
          record within the NFT, thereby augmenting the overall worth of the
          NFT.
        </Text>
      </Box>
      {/* Introduction end */}

      {/* Tasks begin */}
      <Box p={{ base: 0, lg: 20 }}>
        <Text
          color="black"
          fontSize="3xl"
          p={5}
          fontWeight="bold"
          align="center"
          letterSpacing={2}
        >
          Accept the tasks to begin storing data for your DNA NFT
        </Text>
        <Text
          fontSize="2xl"
          color="black"
          p={5}
          fontWeight="bold"
          align="center"
          letterSpacing={2}
        >
          Ongoing Tasks
        </Text>
        <Flex
          gap={10}
          mt={10}
          mx="auto"
          maxW={1200}
          direction={{ base: "column", lg: "row" }}
          p={5}
        >
          <Flex
            border="1px solid black"
            direction="column"
            p={6}
            flex={1}
            borderRadius="5px"
            cursor="pointer"
          >
            <Text fontSize="2xl" fontWeight="bold" color="black" mb={2}>
              #001
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="black" mb={4}>
              Proof of Humanity
            </Text>
            <Text fontSize="md" color="black" mb={8} flex={1}>
              By passing human verification checkpoints of varying difficulty
              levels, it represents your credibility as a genuine human being.
            </Text>
            <Button
              onClick={() => history.push("/tasks/1")}
              width="100%"
              color="black"
              border="1px solid black"
              fontWeight="normal"
              bg="white"
            >
              Start
            </Button>
          </Flex>
          <Flex
            border="1px solid black"
            direction="column"
            p={6}
            flex={1}
            borderRadius="5px"
            cursor="pointer"
          >
            <Text fontSize="2xl" fontWeight="bold" color="black" mb={2}>
              #002
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="black" mb={4}>
              Community contribution
            </Text>
            <Text fontSize="md" color="black" mb={8} flex={1}>
              Trust that you know where to find more quality humans; now, send
              your exclusive code to them. When they join, they will establish
              an on-chain relationship with you. The more people you invite, the
              higher your contribution value will be.
            </Text>
            <Button
              onClick={() => history.push("/tasks/2")}
              width="100%"
              color="black"
              border="1px solid black"
              fontWeight="normal"
              bg="white"
            >
              Start
            </Button>
          </Flex>
          <Flex
            border="1px solid black"
            direction="column"
            p={6}
            flex={1}
            borderRadius="5px"
            cursor="pointer"
          >
            <Text fontSize="2xl" fontWeight="bold" color="black" mb={2}>
              #003
            </Text>
            <Text fontSize="lg" fontWeight="bold" color="black" mb={4}>
              Web3 Knowledge Test
            </Text>
            <Text fontSize="md" color="black" mb={8} flex={1}>
              This task consists of 100 multiple-choice questions about Web3,
              testing your understanding of Web3 knowledge. Only those who have
              personally experienced it can pass this trial.
            </Text>
            <Button
              onClick={() => history.push("/tasks/3")}
              width="100%"
              color="black"
              border="1px solid black"
              fontWeight="normal"
              bg="white"
            >
              Start
            </Button>
          </Flex>
        </Flex>
        <Text color="black" align="center" p={2} maxW={900} mx="auto">
          When you complete each task, the value of the NFT will change
          accordingly, and you can decide when to update it on chain.
        </Text>
      </Box>
      {/* Tasks end */}

      {/* Plan begin */}
      <Flex
        bg="black"
        p={{ base: 0, lg: 20 }}
        flexDirection={{ base: "column", lg: "row" }}
        alignItems="center"
        justify="center"
      >
        <Text align="center" fontSize="3xl" fontWeight="bold" my={3} p={10}>
          The Plan
        </Text>

        <ChapterAccordion
          chapters={[
            {
              chapter: 1,
              title: "Identifying Real Humans and Binding to DNA NFT",
              content: `In an era dominated by the capabilities of generative AI,
        distinguishing between robots and real humans has become
        increasingly difficult. However, human authenticity serves as
        the cornerstone for building a network of trust within the 0xer
        universe. We take a multi-layered approach to human
        verification, using advanced technologies to authenticate online
        behavior, digital assets, social graphs and biometrics. This
        allows individuals to achieve higher levels of human
        authenticity based on their preferences and the intersection of
        multiple verification results.`,
            },
            {
              chapter: 2,
              title:
                "Aggregate More Important Human Characteristics into On-Chain Data",
              content: `In the 0xer universe, human identity is not a static snapshot, but a dynamic, evolving crypto entity. With soul-bound NFT, 0xer allows users to preserve the multi-dimensional aspects of their characteristics and encode the data that goes on the chain. This data can be provided directly on the chain, authorized by individuals, or manually provided from physical, digital, spiritual and social levels.`,
            },
            {
              chapter: 3,
              title: "Identifying the Leaders Among the Human Traits",
              content: `0xer Identifying the leading traits among the myriad of human characteristics becomes critical: these traits not only describe us, but also guide our collective journey.People who share the same traits form communities through decentralized voting and governance tokens, and can customize the algorithms for these traits, creating computable humans and algorithm DAOs.`,
            },
            {
              chapter: 4,
              title:
                "Crossing the Web2 & Web3 Networks to Welcome More Powerful People",
              content: `The 0xer is not an isolated digital island, but a hub connecting the Web2 and Web3 worlds. By extending the data cover of these networks, we welcome more non-web3 developers to join us in exploring the endless possibilities of the human network of the next era. Through APIs and on-chain human verification mechanisms, non-web3 applications can integrate 0xer services, enabling users to manage their data autonomously and extend it across the Internet.`,
            },
            {
              chapter: 5,
              title: "Organize People and Start Producing and Building!",
              content: `Using Ray Dalio and Bridgewater Associates' Dot Collector technology, designed for talent management and collaborative facilitation, the 0xer community can accurately assess each user's strengths based on their unique characteristics and skills. Users with similar strengths can then come together to form specialized sub-communities. These sub-communities then serve as key drivers for project progress and overall development in our decentralised society.`,
            },
            {
              chapter: 6,
              title: "Building a Stable and Reliable Economy System",
              content: `The strength of a society is based on its economic foundation. At 0xer, we aim to build an economic system that is both transparent and fair, as well as stable and reliable. 0xer is committed to developing an economy based on user-driven data. When people have autonomous ownership of diverse and valuable data, it opens the door for the reconfiguration of innovative business models in both the physical and digital worlds. In addition, the concept of Universal Basic Income (UBI), which many aspire to, will become more possible in such an environment.`,
            },
            {
              chapter: 7,
              title: "Living Together in a Perpetual Network",
              content: `The ultimate goal of 0xer is to create a society that includes real human identities, trusted credentials, a network of values, a balanced economy, and ultimately an enduring social fabric. This is not just a network of computers, but a network built on trust, respect and mutual benefit. As we continue to grow and evolve, this network will serve as the foundation for a new kind of society - one that is truly decentralized and free. We invite you, who have patiently read up to Chapter 7, to join us in this ambitious endeavor.`,
            },
          ]}
        />
      </Flex>
      {/* Plan end */}
    </Box>
  );
};
export default Main;

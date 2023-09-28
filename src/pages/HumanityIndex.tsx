import AccountContext from "@/context/account";
import { createAvatarUrl, shortenAddress } from "@/libs";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Flex,
  Image,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import algorithmPicture from "@/assets/images/algorithm.png";

enum Tabs {
  INTRO,
  LEADERBOARD,
}

// @todo: connect real data

const HumanityIndex = () => {
  const { account } = useContext(AccountContext);
  const [tab, setTab] = useState(Tabs.INTRO);
  useEffect(() => {
    setTimeout(() => {
      // @ts-expect-error
      window?.scrollTo({ top: 0, behavior: "instant" });
    }, 10);
  }, []);
  return (
    <Box minH="calc(100vh - 94px)" bg="black" p={{ base: 3, md: 12 }}>
      <Container maxW={1440}>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 0, md: 12 }}
        >
          <Box flex={3}>
            <Flex
              align={{ base: "start", md: "center" }}
              justify="space-between"
              flexDirection={{ base: "column-reverse", md: "row" }}
              pb={6}
            >
              <Text fontSize="4xl" fontWeight="bold">
                Humanity Index
              </Text>
              <Text>0x(0000)</Text>
            </Flex>
            <Text fontSize="lg" lineHeight={2} pb={12}>
              The Humanity Index is a measure of the likelihood that you are a
              real person, and is the fundamental building block of trust in the
              decentralised community.
            </Text>

            <Box display={{ base: "flex", md: "none" }} mb={8}>
              <Box
                role="button"
                onClick={() => setTab(Tabs.INTRO)}
                pr={5}
                borderBottomWidth={3}
                color={tab === Tabs.INTRO ? "white" : "#9EABB5"}
                borderColor={tab === Tabs.INTRO ? "white" : "#9EABB5"}
                fontWeight={tab === Tabs.INTRO ? 600 : 300}
              >
                Intro
              </Box>
              <Box
                role="button"
                onClick={() => setTab(Tabs.LEADERBOARD)}
                pr={6}
                borderBottomWidth={3}
                color={tab === Tabs.LEADERBOARD ? "white" : "#9EABB5"}
                borderColor={tab === Tabs.LEADERBOARD ? "white" : "#9EABB5"}
                fontWeight={tab === Tabs.LEADERBOARD ? 600 : 300}
              >
                Leaderboard
              </Box>
            </Box>

            <Box
              display={{
                base: tab === Tabs.INTRO ? "block" : "none",
                md: "block",
              }}
            >
              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Address
                </Text>
                <Text>{"{0x(0000)}"}</Text>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Data Source
                </Text>
                <Text> Task #001 Proof of Humanity</Text>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Data Duration
                </Text>
                <Text>2023.09.01 ~ 2023.10.01</Text>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Method
                </Text>
                <Text>
                  By passing different levels of authentication in Task #001,
                  users obtain values provided by the authentication. These
                  values are then processed through an algorithm to be allocated
                  into a range between 0 and 255.
                </Text>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Parameters
                </Text>
                <UnorderedList gap={2}>
                  <ListItem>humanity_index: A value between 0 - 255</ListItem>
                  <ListItem>recaptcha_v2: 0 = failure, 1 = success</ListItem>
                  <ListItem>
                    recaptcha_v3: A floating point number between 0 and 1,
                    representing the likelihood of the user being classified as
                    human.
                  </ListItem>
                  <ListItem>
                    sms_verification: 0 = failure, 1 = success
                  </ListItem>
                  <ListItem>
                    biometric_verification: 0 = failure, 1 = success
                  </ListItem>
                  <ListItem>
                    w1, w2, w3, w4: Weights for each verification method (w1 +
                    w2 + w3 + w4 = 1)
                  </ListItem>
                </UnorderedList>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Method
                </Text>
                <Text>
                  By passing different levels of authentication in Task #001,
                  users obtain values provided by the authentication. These
                  values are then processed through an algorithm to be allocated
                  into a range between 0 and 255.
                </Text>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Formula
                </Text>
                <Text>
                  humanity_index = (w1 * recaptcha_v2 + w2 * recaptcha_v3 + w3 *
                  sms_verification + w4 * biometric_verification) * 255
                </Text>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Algorithm
                </Text>
                <Image src={algorithmPicture} />
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Data Dao
                </Text>
                <Text>
                  Holders of governance tokens who are among the top 10,000
                  users have the authority to propose and vote on algorithm
                  modifications, including the use of parameters and formula.
                  not available until reaching 100,000 users.
                </Text>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Data-using Partners
                </Text>
                <Text>
                  Third-party applications such as dApps or apps can directly
                  access data on the blockchain, or obtain the rights to use
                  this data through API requests. Visit 0xer nexus partner
                  program for detailed information.
                </Text>
                <Divider my={4} />
              </Box>
            </Box>
          </Box>
          <Box
            maxW={474}
            flex={2}
            pt={{ base: 2, md: 20 }}
            display={{
              base: tab === Tabs.LEADERBOARD ? "block" : "none",
              md: "block",
            }}
          >
            {account && (
              <Box mb={10}>
                <Flex
                  justify="space-between"
                  align={{ base: "start", md: "center" }}
                  flexDir={{ base: "column", md: "row" }}
                  gap={4}
                  pb={5}
                >
                  <Text>Your Rank</Text>
                  <Flex align="center" gap={3}>
                    <Avatar src={createAvatarUrl(account)} size="sm" />
                    {shortenAddress(account)}
                  </Flex>
                </Flex>
                <TableContainer
                  bg="#21221D"
                  px={8}
                  pt={3}
                  borderWidth="1px"
                  borderColor="accent"
                >
                  <Table variant="unstyled" size="md">
                    <Thead borderBottom="1px solid #52534F">
                      <Tr>
                        <Th>Value</Th>
                        <Th textAlign="right">Rank</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr borderBottom="none">
                        <Td>038</Td>
                        <Td textAlign="right">2521</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
                <Text my={3} align="right" color="#736B6B">
                  Data input date: 2023.08.22
                </Text>
              </Box>
            )}
            <Box>
              <Flex
                justify="space-between"
                align={{ base: "start", md: "center" }}
                flexDir={{ base: "column", md: "row" }}
                gap={4}
                pb={5}
              >
                <Text>Leaderboard</Text>
                <Flex align="center" gap={3}>
                  Total: 48,121 Participants
                </Flex>
              </Flex>
              <TableContainer
                bg="#21221D"
                px={8}
                pt={3}
                borderWidth="1px"
                borderColor="accent"
              >
                <Table variant="unstyled" size="md">
                  <Thead>
                    <Tr>
                      <Th pr={4}>Rank</Th>
                      <Th pr={4}>Value</Th>
                      <Th>Address</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr borderBottom="none">
                      <Td>038</Td>
                      <Td>255</Td>
                      <Td>
                        <Flex align="center" gap={3}>
                          <Avatar src={createAvatarUrl(account)} size="sm" />
                          {shortenAddress(account || "")}
                        </Flex>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Text my={3} align="right" color="#736B6B">
                Data input date: 2023.08.22
              </Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default HumanityIndex;

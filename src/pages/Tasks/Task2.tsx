import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import useScrollToTop from "@/libs/useScrollToTop";
import { useCallback, useContext, useEffect, useState } from "react";
import AccountContext from "@/context/account";
import createInviteUrl from "@/libs/createInviteUrl";
import ReferralsOverview from "@/components/ReferralsOverview";
import { getLeaderboard, getUser } from "@/api";
import Web3 from "web3";

const Referral = () => {
  useScrollToTop();
  const { account, id, accountInfo, getTokenId } = useContext(AccountContext);
  const [references, setReferences] = useState([]);
  const [total, setTotal] = useState<number>();
  const [rank, setRank] = useState<number>();
  const toast = useToast();

  const copyUrl = useCallback(() => {
    if (id) {
      navigator.clipboard.writeText(createInviteUrl(id));
    }
    toast({
      title: "Copied to clipboard!",
      duration: 2000,
      status: "success",
    });
  }, [id, toast]);

  // fetch user token id first
  useEffect(() => {
    if (account) getTokenId();
  }, [account, getTokenId]);

  useEffect(() => {
    if (account && accountInfo) {
      getUser().then((user) => {
        setReferences(
          user.references?.map(({ id, joined_at: joinedAt }: any) => ({
            address: Web3.utils.toChecksumAddress(id),
            joinedAt,
          }))
        );
      });
      getLeaderboard(0x50).then(({ user, data }) => {
        setTotal(data?.length || 0);
        setRank(user?.rank);
      });
    }
  }, [account, accountInfo]);

  return (
    <Box minH="calc(100vh - 94px)" bg="black" p={{ base: 3, md: 12 }}>
      <Container maxW={1440}>
        <Text fontSize="xl">Task #002</Text>
        <Text fontSize="4xl" fontWeight="bold" my={2}>
          Invite more humans to join
        </Text>
        <Flex gap={16} direction={{ base: "column", lg: "row" }}>
          <Box flex={2}>
            <Box fontSize="lg" lineHeight={2} mb={4}>
              <Text as="p" mb={2}>
                In a digital world filled with robots powered by generative
                artificial intelligence, it's becoming increasingly difficult to
                identify real humans. Time is running out, but it's not too
                late. As a human, you can bring more humans to join and make
                blockchain the foundational infrastructure for anti-bots.
              </Text>
              <Box>
                <UnorderedList>
                  <ListItem>
                    Participants: {total ? total.toLocaleString() : "--"}
                  </ListItem>
                  <ListItem>
                    Your Rank: {rank ? rank.toLocaleString() : "--"}
                  </ListItem>
                </UnorderedList>
              </Box>
            </Box>
            <Divider my={6} />
            <Box>
              <Text fontSize="xl" fontWeight="bold" my={4}>
                Data Contribute to
              </Text>
              <Flex align="center">
                <Text fontWeight={300} pr={2}>
                  0xer Referral Score {"{0x(00C0)}"}
                </Text>
                <Link to="/dna/2">
                  <ExternalLinkIcon />
                </Link>
              </Flex>
            </Box>
          </Box>
          <Box flex={3} maxW={620}>
            <VStack alignItems="stretch" gap={10}>
              {id && (
                <>
                  <Box>
                    <Text fontSize="xl" fontWeight={500} mb={4}>
                      Main Task
                    </Text>
                    <Text fontSize="xl" fontWeight={500} mb={4}>
                      Copy and share your personal invite link with other
                      humans.
                    </Text>
                    <VStack
                      bg="#21221D"
                      borderWidth={2}
                      borderColor="accent"
                      px={{ base: 5, md: 8 }}
                      py={{ base: 5, md: 6 }}
                      alignItems="stretch"
                    >
                      <Text fontWeight="bold" fontSize="lg" mb={4}>
                        Invite other humans
                      </Text>
                      <Text mb={8}>
                        You can share it on social media or through any means
                        with humans you think are great. Once they join, your
                        invitation score and ranking will increase. At the same
                        time, you will establish a "connection" with them,
                        serving as part of your social graph in 0xer Space.
                      </Text>
                      <Button
                        onClick={copyUrl}
                        variant="outlineDark"
                        bg="white"
                        color="black"
                        fontWeight={300}
                        display="flex"
                        flexDir={{ base: "column", md: "row" }}
                        py={2}
                        height="auto"
                        _hover={{
                          bg: "white",
                        }}
                      >
                        <Text maxW="100%" whiteSpace="normal">
                          {createInviteUrl(id)}
                        </Text>
                        <CopyIcon
                          mx={{ base: "auto", md: 2 }}
                          mt={{ base: 2, md: 0 }}
                          display={{ base: "block", md: "inline" }}
                          verticalAlign={-1}
                        />
                      </Button>
                    </VStack>
                  </Box>

                  <ReferralsOverview data={references} />
                </>
              )}
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Referral;

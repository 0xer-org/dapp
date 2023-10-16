import { useCallback, useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Link,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import AccountContext from "@/context/account";
import NFTRenderer from "@/components/NFTRenderer";
import { createAvatarUrl, shortenAddress } from "@/libs";
import { RouteComponentProps } from "react-router-dom";
import humanLogo from "@/assets/images/human.png";
import lockOpenLogo from "@/assets/images/lock-open.png";
import communityLogo from "@/assets/images/community.png";
import lightBulbLogo from "@/assets/images/Lightbulb.png";
import { getLeaderboard, getSignature } from "@/api";

const DNA = ({ history }: { history: RouteComponentProps["history"] }) => {
  const { account, values, submit } = useContext(AccountContext);
  const [verification, setVerification] = useState<
    Array<{ value: number; rank: number; total: number }>
  >([]);
  const toast = useToast();

  const authStatus = values ? parseInt(values.slice(0, 2), 16) : 0;
  const hasNFT = !!account && !!authStatus;

  const submitData = useCallback(async () => {
    const { signature } = await getSignature();
    submit(signature).then((txHash) =>
      toast({
        title: txHash ? (
          <Text>
            Update Successfully!{" "}
            <Link
              href={`https://arbiscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              textDecor="underline"
            >
              Check the transaction
            </Link>
          </Text>
        ) : (
          <Text>Somthing went wrong! Try again later.</Text>
        ),
        status: txHash ? "success" : "error",
      })
    );
  }, [submit, toast]);

  useEffect(() => {
    if (hasNFT)
      Promise.all([
        getLeaderboard(0x00),
        getLeaderboard(0x50),
        getLeaderboard(0xc0),
      ]).then((ranks) =>
        setVerification(
          ranks.map(({ length, user }) => ({ total: length, ...user }))
        )
      );
  }, [hasNFT]);

  return (
    <Flex py={20} maxW={1440} mx="auto">
      <Flex flexDirection="column" mb={20} px={5}>
        {hasNFT && (
          <Center
            my={5}
            py={3}
            width={750}
            maxW="100%"
            color="black"
            bg="white"
            border="2px solid black"
          >
            <Avatar
              src={createAvatarUrl(account)}
              size={{ base: "xs", md: "sm" }}
            />
            <Box mx={3}>Owner</Box>
            <Box fontWeight="bold">{shortenAddress(account || "")}</Box>
          </Center>
        )}
        <NFTRenderer values={values} size={{ base: "100%", lg: 750 }} />
        {hasNFT && (
          <Flex mt={5} gap={5} justifyContent="flex-end">
            {/* @todo: connect real data time */}
            <Text color="black" fontWeight={300}>
              Last Update: 2023.07.15 22:12:00 <br />
              On-Chain Update: 2023.07.15 22:12:00
            </Text>
            <Box>
              <Button variant="outline" onClick={submitData}>
                Submit Data to Chain
              </Button>
            </Box>
          </Flex>
        )}
      </Flex>
      <Box pt={20} px={5} mb={2}>
        {hasNFT ? (
          <Box>
            <Text fontSize="3xl" fontWeight={900} color="black" mb={5}>
              Your DNA NFT
            </Text>
            <Text color="black" mb={5} fontWeight={300}>
              Among The 0xer DNA NFT, non-zero values represent the attributes
              and abilities you have already acquired. Your values and rankings
              are as follows. These values will also be used to calculate your
              airdrop index for token distribution.
            </Text>
            <Flex direction="column" alignItems="stretch" gap={4}>
              <Box
                bg="#f5f5f5"
                _hover={{ bg: "#e6e6e6" }}
                px={8}
                py={5}
                cursor="pointer"
              >
                <Flex gap={4} align="center">
                  <Image src={humanLogo} width={10} height={10} />
                  <Box color="black">
                    <Text mb={3}>#Humanity Index {"{0x(0000)}"}</Text>
                    <UnorderedList fontWeight={300}>
                      <ListItem>Value [{verification[0]?.value}/255]</ListItem>
                      <ListItem>
                        Rank [{verification[0]?.rank}/{verification[0]?.total}]
                      </ListItem>
                      <ListItem>Task: #001 Proof of Humanity</ListItem>
                    </UnorderedList>
                  </Box>
                </Flex>
              </Box>
              <Box
                bg="#f5f5f5"
                _hover={{ bg: "#e6e6e6" }}
                px={8}
                py={5}
                cursor="pointer"
              >
                <Flex gap={4} align="center">
                  <Image src={communityLogo} width={10} height={10} />
                  <Box color="black">
                    <Text mb={3}>#Community Builder Index {"{0x(0050)}"}</Text>
                    <UnorderedList fontWeight={300}>
                      <ListItem>Value [{verification[1]?.value}/255]</ListItem>
                      <ListItem>
                        Rank [{verification[1]?.rank}/{verification[1]?.total}]
                      </ListItem>
                      <ListItem>Task: #002 Invite more humans to join</ListItem>
                    </UnorderedList>
                  </Box>
                </Flex>
              </Box>
              <Box
                bg="#f5f5f5"
                _hover={{ bg: "#e6e6e6" }}
                px={8}
                py={5}
                cursor="pointer"
              >
                <Flex gap={4} align="center">
                  <Image src={lightBulbLogo} width={10} height={10} />
                  <Box color="black">
                    <Text mb={3}>
                      #Web3 Knowledge Level Index {"{0x(00C0)}"}
                    </Text>
                    <UnorderedList fontWeight={300}>
                      <ListItem>Value [{verification[2]?.value}/255]</ListItem>
                      <ListItem>
                        Rank [{verification[2]?.rank}/{verification[2]?.total}]
                      </ListItem>
                      <ListItem>Task: #003 Web3 Knowledge Test</ListItem>
                    </UnorderedList>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        ) : (
          <Box>
            <Flex gap={4} mb={5}>
              <Image src={humanLogo} width={10} />
              <Image src={lockOpenLogo} width={10} />
            </Flex>
            <Text fontSize="3xl" fontWeight={900} color="black" mb={5}>
              Proof of Humanity
            </Text>
            <Text color="black" mb={5} fontWeight={300}>
              You must pass the human verification task, convincing me that
              there is a high probability you are human, in order to claim your
              DNA NFT and officially become a member of the 0xer community.
            </Text>
            <Button
              onClick={() => history.push("/tasks/1")}
              color="black"
              px={100}
              variant="outline"
              bg="white"
            >
              Go!
            </Button>
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default DNA;

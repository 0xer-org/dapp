import AccountContext from "@/context/account";
import { Box, Container, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { ReactElement, useContext, useState } from "react";
import Leaderboard from "@/components/Leaderboard";
import RankCard from "@/components/RankCard";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import useScrollToTop from "@/libs/useScrollToTop";

enum Tabs {
  INTRO,
  LEADERBOARD,
}

interface TaskIntroductionTemplateProps {
  name: string;
  address: string;
  introduction: ReactElement | string;
  method: ReactElement | string;
  task: {
    index: number;
    name: string;
    startFrom: number;
    endAt: number;
  };
  parameters: ReactElement | string;
  formula: ReactElement | string;
  algorithm: string;
  totalParticipants?: number;
  userData?: {
    value?: number;
    rank?: number;
    updatedAt?: number;
  };
  leaderboard?: {
    data?: Array<{ value: number; address: string }>;
    updatedAt?: number;
  };
}

const Template = ({
  name,
  address,
  introduction,
  method,
  task,
  parameters,
  formula,
  algorithm,
  totalParticipants,
  userData = {},
  leaderboard = {},
}: TaskIntroductionTemplateProps) => {
  useScrollToTop();
  const { account } = useContext(AccountContext);
  const [tab, setTab] = useState(Tabs.INTRO);
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
                {name}
              </Text>
              <Text>{address}</Text>
            </Flex>

            <Box fontSize="lg" lineHeight={2} pb={12}>
              {introduction}
            </Box>

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
                <Text>{`{${address}}`}</Text>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Data Source
                </Text>
                <Flex>
                  <Text pr={2}>
                    Task #{task.index.toString().padStart(3, "0")} {task.name}
                  </Text>
                  <Link to={`/tasks/${task.index}`}>
                    <ExternalLinkIcon />
                  </Link>
                </Flex>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Data Duration
                </Text>
                <Text>
                  {task.startFrom} ~ {task.endAt}
                </Text>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Method
                </Text>
                <Text>{method}</Text>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Parameters
                </Text>
                <Box>{parameters}</Box>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Formula
                </Text>
                <Box>{formula}</Box>
                <Divider my={4} />
              </Box>

              <Box pb={8}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  Algorithm
                </Text>
                <Image src={algorithm} />
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
                </Text>
                <Text color="#736B6B" mt={4}>
                  Not available until reaching 100,000 users.
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
            {/* @todo: connect real data */}
            <RankCard
              account={account}
              totalPaticipants={totalParticipants}
              {...userData}
            />
            <Leaderboard
              totalParticipants={totalParticipants}
              {...leaderboard}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Template;

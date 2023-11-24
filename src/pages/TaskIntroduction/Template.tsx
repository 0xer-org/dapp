import { ReactElement, useCallback, useContext, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import AccountContext from "@/context/account";

import Leaderboard from "@/components/Leaderboard";
import RankCard from "@/components/RankCard";
import { Link } from "react-router-dom";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import useScrollToTop from "@/libs/useScrollToTop";
import dayjs from "dayjs";
import Collapsible from "@/components/Collapsible";

hljs.registerLanguage("python", python);

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
  code: string;
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
  code,
  totalParticipants,
  userData = {},
  leaderboard = {},
}: TaskIntroductionTemplateProps) => {
  useScrollToTop();
  const { account } = useContext(AccountContext);
  const [tab, setTab] = useState(Tabs.INTRO);
  const toast = useToast();

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    toast({ title: "Copied!", status: "success" });
  }, [code, toast]);

  const highlightedCode = hljs.highlight(code, {
    language: "python",
  }).value;

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

              <Collapsible
                title="Data Duration"
                titleProps={{
                  fontSize: "xl",
                  fontWeight: "bold",
                  mb: 3,
                }}
                pb={4}
              >
                <Text>
                  {task.startFrom
                    ? `${dayjs(task.startFrom).format("YYYY-MM-DD")} ~ ${dayjs(
                        task.endAt
                      ).format("YYYY-MM-DD")}`
                    : "Not Started Yet"}
                </Text>
              </Collapsible>
              <Divider mb={8} />

              <Collapsible
                title="Method"
                titleProps={{
                  fontSize: "xl",
                  fontWeight: "bold",
                  mb: 3,
                }}
                pb={4}
              >
                <Text>{method}</Text>
              </Collapsible>
              <Divider mb={8} />

              <Collapsible
                title="Parameters"
                titleProps={{
                  fontSize: "xl",
                  fontWeight: "bold",
                  mb: 3,
                }}
                pb={4}
              >
                <Box>{parameters}</Box>
              </Collapsible>
              <Divider mb={8} />

              <Collapsible
                title="Formula"
                titleProps={{
                  fontSize: "xl",
                  fontWeight: "bold",
                  mb: 3,
                }}
                pb={4}
              >
                <Box>{formula}</Box>
              </Collapsible>
              <Divider mb={8} />

              <Collapsible
                title="Algorithm"
                titleProps={{
                  fontSize: "xl",
                  fontWeight: "bold",
                  mb: 3,
                }}
                pb={4}
              >
                <Box as="code" position="relative">
                  <Box position="absolute" right={0} top={0} p={3}>
                    <CopyIcon role="button" onClick={copyCode} />
                  </Box>
                  <Box
                    whiteSpace="pre"
                    p={2}
                    maxW={800}
                    mt={2}
                    overflow="scroll"
                    dangerouslySetInnerHTML={{
                      __html: highlightedCode,
                    }}
                  />
                </Box>
              </Collapsible>
              <Divider mb={8} />

              <Collapsible
                title="Data Dao"
                titleProps={{
                  fontSize: "xl",
                  fontWeight: "bold",
                  mb: 3,
                }}
                pb={4}
              >
                <Text>
                  Holders of governance tokens who are among the top 10,000
                  users have the authority to propose and vote on algorithm
                  modifications, including the use of parameters and formula.
                </Text>
                <Text color="#736B6B" mt={4}>
                  Not available until reaching 100,000 users.
                </Text>
              </Collapsible>
              <Divider mb={8} />

              <Collapsible
                title="Data-using Partners"
                titleProps={{
                  fontSize: "xl",
                  fontWeight: "bold",
                  mb: 3,
                }}
                pb={4}
              >
                <Text>
                  Third-party applications such as dApps or apps can directly
                  access data on the blockchain, or obtain the rights to use
                  this data through API requests. Visit 0xer nexus partner
                  program for detailed information.
                </Text>
              </Collapsible>
              <Divider mb={8} />
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

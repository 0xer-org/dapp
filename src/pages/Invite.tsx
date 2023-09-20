import {
  Box,
  Button,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect } from "react";

const Invite = () => {
  useEffect(() => {
    setTimeout(() => {
      // @ts-expect-error
      window?.scrollTo({ top: 0, behavior: "instant" });
    }, 10);
  }, []);
  return (
    <Flex
      minH="calc(100vh - 94px)"
      bg="black"
      p={12}
      gap={16}
      direction={{ base: "column", lg: "row" }}
    >
      <Box flex={2}>
        <Text fontSize="xl">Mission #001</Text>
        <Text fontSize="4xl" fontWeight="bold" my={2}>
          人類驗證
        </Text>
        <Text fontSize="xl" lineHeight={2} my={4}>
          說明：你必須要證明自己不是機器人，才能夠成為我們的一份子。某些機器人已經非常聰明，真假難辨，通過愈高等級的人類驗證任務，愈有機會是真實的人類。
        </Text>
        <UnorderedList fontSize="xl" my={4}>
          <ListItem>參與人數: 24,131</ListItem>
          <ListItem>數值位置: (0000, 01)</ListItem>
          <ListItem>你的排名: 1,742</ListItem>
        </UnorderedList>
        <Button width="100%" borderRadius={2} py={8} mt={6}>
          Copy Your Link
        </Button>
      </Box>
      <Box flex={3}>
        <Text fontWeight="bold" fontSize="2xl">
          Invited List
        </Text>
      </Box>
    </Flex>
  );
};

export default Invite;

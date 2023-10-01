import useScrollToTop from "@/libs/useScrollToTop";
import { Flex } from "@chakra-ui/react";

const KnowledgeTest = () => {
  useScrollToTop();
  return (
    <Flex
      minH="calc(100vh - 94px)"
      bg="black"
      p={12}
      gap={16}
      direction={{ base: "column", lg: "row" }}
    >
      Knowledge Test
    </Flex>
  );
};

export default KnowledgeTest;

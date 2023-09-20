import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

const KnowledgeTest = () => {
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
      Knowledge Test
    </Flex>
  );
};

export default KnowledgeTest;

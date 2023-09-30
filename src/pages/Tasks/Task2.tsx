import { useEffect } from "react";
import { Box, Container, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const Referral = () => {
  // auto scroll to top when entering this page
  useEffect(() => {
    setTimeout(() => {
      // @ts-expect-error
      window?.scrollTo({ top: 0, behavior: "instant" });
    }, 10);
  }, []);

  return (
    <Box minH="calc(100vh - 94px)" bg="black" p={{ base: 3, md: 12 }}>
      <Container maxW={1440}>
        <Text fontSize="xl">Task #002</Text>
        <Text fontSize="4xl" fontWeight="bold" my={2}>
          Invite more human to join
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
                <Link to="/task-introduction/1">
                  <ExternalLinkIcon />
                </Link>
              </Flex>
            </Box>
          </Box>
          <Box flex={3} maxW={500}>
            <VStack alignItems="stretch" gap={10}></VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Referral;

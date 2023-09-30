import { createAvatarUrl, shortenAddress } from "@/libs";
import {
  Avatar,
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface LeaderboardProps {
  totalParticipants?: number;
  data?: Array<{ value: number; address: string }>;
  updatedAt?: number;
}

const Leaderboard = ({
  totalParticipants,
  data,
  updatedAt,
}: LeaderboardProps) => (
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
        Total: {totalParticipants != null ? totalParticipants : "--"}{" "}
        Participants
      </Flex>
    </Flex>
    <TableContainer
      bg="#21221D"
      px={8}
      py={3}
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
          {data?.map(({ address, value }, index) => (
            <Tr borderBottom="none" key={index}>
              <Td>{index + 1}</Td>
              <Td>{value}</Td>
              <Td>
                <Flex align="center" gap={3}>
                  <Avatar src={createAvatarUrl(address)} size="sm" />
                  {shortenAddress(address)}
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
    <Text my={3} align="right" color="#736B6B">
      Data input date: {updatedAt != null ? updatedAt : "--"}
    </Text>
  </Box>
);

export default Leaderboard;

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
import LevelIcon from "./LevelIcon";

interface LeaderboardProps {
  totalParticipants?: number;
  data?: Array<{ joinedAt: number; address: string; level: number }>;
  updatedAt?: number;
}

const ReferralLeaderboard = ({
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
      px={{ base: 3, md: 8 }}
      py={{ base: 1, md: 3 }}
      borderWidth={2}
      borderColor="accent"
      overflowX="unset"
      overflowY="unset"
    >
      <Table variant="unstyled" size="md">
        <Thead position="sticky" top={0} zIndex="docked">
          <Tr>
            <Th pr={4}>#</Th>
            <Th pr={4}>JoinedAt</Th>
            <Th pr={4}>Address</Th>
            <Th pr={4}>Human Level</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map(({ address, joinedAt, level }, index) => (
            <Tr borderBottom="none" key={index}>
              <Td>{index + 1}</Td>
              <Td>{joinedAt}</Td>
              <Td>
                <Flex align="center" gap={2}>
                  <Avatar
                    src={createAvatarUrl(address)}
                    size={{ base: "xs", md: "sm" }}
                  />
                  {shortenAddress(address)}
                </Flex>
              </Td>
              <Td>
                <Flex gap={2}>
                  <LevelIcon level={1} completed={level > 1} />
                  <LevelIcon level={2} completed={level > 2} />
                  <LevelIcon level={3} completed={level > 3} />
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

export default ReferralLeaderboard;

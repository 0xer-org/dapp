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
import dayjs from "dayjs";
import LevelIcon from "./LevelIcon";

interface LeaderboardProps {
  totalParticipants?: number;
  data?: Array<{ joinedAt: number; address: string; level: number }>;
}

const Leaderboard = ({ totalParticipants, data }: LeaderboardProps) =>
  !!data?.length ? (
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
            <Tr display="flex">
              <Th flex={2}>#</Th>
              <Th flex={3}>Join</Th>
              <Th flex={6}>Address</Th>
              <Th display={{ base: "none", md: "block" }} flex={3}>
                Human Level
              </Th>
            </Tr>
          </Thead>
          <Tbody
            display="block"
            p={0}
            maxHeight={{ base: 460, md: 520 }}
            overflow="auto"
            fontSize="sm"
          >
            {data?.map(({ address, joinedAt, level }, index) => (
              <Tr
                key={index}
                borderBottom="none"
                display="flex"
                alignItems="center"
              >
                <Td flex={2}>{(index + 1).toString().padStart(4, "0")}</Td>
                <Td flex={3}>{dayjs(joinedAt).format("MM/DD")}</Td>
                <Td flex={6}>
                  <Flex align="center" gap={2}>
                    <Avatar
                      src={createAvatarUrl(address)}
                      size={{ base: "xs", md: "sm" }}
                    />
                    {shortenAddress(address)}
                  </Flex>
                </Td>
                <Td display={{ base: "none", md: "flex" }} flex={3} gap={3}>
                  <LevelIcon level={1} completed={level >= 1} />
                  <LevelIcon level={2} completed={level >= 2} />
                  <LevelIcon level={3} completed={level >= 3} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  ) : null;

export default Leaderboard;

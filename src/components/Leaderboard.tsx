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
              <Th flex={1}>Rank</Th>
              <Th flex={1}>Value</Th>
              <Th flex={{ base: 3, md: 4 }}>Address</Th>
            </Tr>
          </Thead>
          <Tbody
            display="block"
            p={0}
            maxHeight={{ base: 460, md: 520 }}
            overflow="auto"
          >
            {data?.map(({ address, value }, index) => (
              <Tr
                key={index}
                borderBottom="none"
                display="flex"
                alignItems="center"
              >
                <Td flex={1}>{(index + 1).toString().padStart(4, "0")}</Td>
                <Td flex={1} textAlign="center">
                  {value}
                </Td>
                <Td flex={{ base: 3, md: 4 }}>
                  <Flex align="center" gap={2}>
                    <Avatar
                      src={createAvatarUrl(address)}
                      size={{ base: "xs", md: "sm" }}
                    />
                    {shortenAddress(address)}
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  ) : null;

export default Leaderboard;

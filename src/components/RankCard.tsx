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

interface RankCardProps {
  account?: string;
  value?: number;
  rank?: number;
  totalPaticipants?: number;
}

const RankCard = ({ account, rank, value, totalPaticipants }: RankCardProps) =>
  account ? (
    <Box mb={10}>
      <Flex
        justify="space-between"
        align={{ base: "start", md: "center" }}
        flexDir={{ base: "column", md: "row" }}
        gap={4}
        pb={5}
      >
        <Text>Your Rank</Text>
        <Flex align="center" gap={3}>
          <Avatar src={createAvatarUrl(account)} size="sm" />
          {shortenAddress(account)}
        </Flex>
      </Flex>
      <TableContainer
        bg="#21221D"
        px={8}
        pt={3}
        pb={2}
        borderWidth="1px"
        borderColor="accent"
      >
        <Table variant="unstyled" size="md">
          <Thead borderBottom="1px solid #52534F">
            <Tr>
              <Th>Value</Th>
              <Th textAlign="right">Rank</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr borderBottom="none">
              <Td py={4}>{value != null ? value : "--"}</Td>
              <Td textAlign="right">
                {rank != null ? `${rank} / ${totalPaticipants}` : "--"}
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  ) : null;

export default RankCard;

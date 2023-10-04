import { createAvatarUrl, shortenAddress } from "@/libs";
import {
  Avatar,
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";

interface ReferralsOverviewProps {
  data?: Array<{ joinedAt: number; address: string }>;
}

const ReferralsOverview = ({ data }: ReferralsOverviewProps) =>
  !!data?.length ? (
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
            <Th flex={{ base: 6, md: 8 }}>Address</Th>
          </Tr>
        </Thead>
        <Tbody
          display="block"
          p={0}
          maxHeight={{ base: 460, md: 520 }}
          overflow="auto"
          fontSize={{ base: "sm", md: "md" }}
        >
          {data?.map(({ address, joinedAt }, index) => (
            <Tr
              key={index}
              borderBottom="none"
              display="flex"
              alignItems="center"
            >
              <Td flex={2}>{(index + 1).toString().padStart(4, "0")}</Td>
              <Td flex={3}>{dayjs(joinedAt).format("MM/DD")}</Td>
              <Td flex={{ base: 6, md: 8 }}>
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
  ) : null;

export default ReferralsOverview;

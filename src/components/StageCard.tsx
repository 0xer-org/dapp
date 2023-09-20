import { Box, Button, Center, Flex, Image, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import CompletedIcon from "@/components/CompletedIcon";

interface StageCardProps {
  icon: string;
  current: number;
  level: number;
  onStart: () => void;
  children?: ReactElement | ReactElement[];
}

const StageCard = ({
  icon,
  level,
  current,
  children,
  onStart,
}: StageCardProps) =>
  level === current ? (
    <Box>
      <Text mb={4}>Start here</Text>
      <Box p={6} bg="#21221D" borderRadius={5} border="2px solid white">
        <Center flexDir="column" maxW={400} mx="auto">
          <Image src={icon} width={30} height={30} />
          <Text fontSize="lg" p={3}>
            Level {level}
          </Text>
          <Box textAlign="center">{children}</Box>

          <Button variant="outlineDark" mt={5} onClick={onStart}>
            Start
          </Button>
        </Center>
      </Box>
    </Box>
  ) : (
    <Box>
      {current === level - 1 && <Text mb={4}>Next</Text>}
      <Box p={5} bg="#21221D" border="1px solid #52534F">
        <Flex gap={3} align="cennter">
          {current > level && <CompletedIcon />}
          <Text fontSize="lg">Level {level}</Text>
        </Flex>
        <Flex alignItems="center" gap={5} mt={3}>
          <Image src={icon} width={30} height={30} />

          <Box textAlign="left">{children}</Box>
        </Flex>
      </Box>
    </Box>
  );

export default StageCard;

import { Box } from "@chakra-ui/react";

const LevelIcon = ({
  level,
  completed,
}: {
  level: number;
  completed: boolean;
}) => (
  <Box
    width="20px"
    display={{ base: "none", lg: "block" }}
    height="20px"
    borderRadius="50%"
    bg={completed ? "white" : "#393A36"}
    border="1px solid #52534F"
    color="#52534F"
    borderColor="accent"
    textAlign="center"
    lineHeight="20px"
    fontSize={10}
  >
    {level}
  </Box>
);

export default LevelIcon;

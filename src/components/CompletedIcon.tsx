import { Box } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const CompletedIcon = ({ checked }: { checked?: boolean }) => (
  <Box
    width="20px"
    height="20px"
    borderRadius="50%"
    bg={checked ? "white" : "#393A36"}
    border="1px solid"
    borderColor="accent"
    textAlign="center"
    fontSize={10}
  >
    {checked ? <CheckIcon color="black" /> : ""}
  </Box>
);

export default CompletedIcon;

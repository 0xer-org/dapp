import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  ChakraProps,
  Collapse,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

interface CollapsibleProps extends ChakraProps {
  title: string;
  titleProps: ChakraProps;
  children: ReactJSXElement | ReactJSXElement[];
}

const Collapsible = ({
  title,
  titleProps,
  children,
  ...props
}: CollapsibleProps) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });
  return (
    <Box {...props}>
      <Text {...titleProps} onClick={onToggle}>
        {title} {isOpen ? <TriangleUpIcon /> : <TriangleDownIcon />}
      </Text>
      <Collapse in={isOpen}>{children}</Collapse>
    </Box>
  );
};

export default Collapsible;

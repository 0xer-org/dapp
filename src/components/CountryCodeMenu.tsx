import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";

interface CountryCodeMenuProps {
  value: string;
  onSelect: (param: string) => void;
  list: Array<{
    country: string;
    code: string;
  }>;
}

const CountryCodeMenu = ({
  value,
  onSelect,
  list = [],
}: CountryCodeMenuProps) => (
  <Menu>
    <MenuButton
      border="2px solid #52534F"
      px={3}
      bg="#393A36"
      borderRadius={5}
      width={110}
    >
      <Flex justifyContent="space-between" align="center">
        <Text>{value}</Text>
        <ChevronDownIcon />
      </Flex>
    </MenuButton>
    <MenuList bg="#21221D">
      {list.map(({ country, code }) => (
        <MenuItem
          key={code}
          onClick={() => onSelect(code)}
          display="flex"
          bg={value === code ? "#D0D9E433" : "#21221D"}
          fontWeight={value === code ? "bold" : "normal"}
          justifyContent="space-between"
          _hover={{
            bg: "#D0D9E433",
          }}
        >
          <Text>{country}</Text>
          <Text>{code}</Text>
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
);

export default CountryCodeMenu;

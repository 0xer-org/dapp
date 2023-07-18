import { Box, Center, Image, SimpleGrid } from "@chakra-ui/react";
import lock from "@/assets/images/lock.png";

interface NFTRendererProps {
  values?: string;
  size?: number;
}

const NFTRenderer = ({ values, size = 750 }: NFTRendererProps) => {
  const displayValues = Array.from({ length: 256 }).map((_, i) =>
    values
      ? values
          .slice(i * 2, i * 2 + 2)
          .padStart(2, "0")
          .toUpperCase()
      : "00"
  );
  const initialized = !!values;
  return (
    <Box width={size} height={size} position="relative">
      <SimpleGrid
        columns={16}
        spacing={1}
        my={2}
        bg="black"
        p={6}
        height="100%"
      >
        {displayValues.map((value, index: number) => (
          <Box key={index} textAlign="center">
            {value}
          </Box>
        ))}
      </SimpleGrid>
      {!initialized && (
        <Center
          position="absolute"
          width="100%"
          height="100%"
          top={2}
          left={0}
          backdropFilter="blur(4px)"
          bg="whiteAlpha.600"
          m="auto"
        >
          <Image src={lock} />
        </Center>
      )}
    </Box>
  );
};

export default NFTRenderer;

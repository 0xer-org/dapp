import { Box, Center, Image } from "@chakra-ui/react";
import lock from "@/assets/images/lock.png";

interface NFTRendererProps {
  values?: string;
  size?: number;
}

const VALUE_START_X = 65;
const VALUE_START_Y = 30;
const GAP_X = 27;
const GAP_Y = 30;
const OFFSET_START_X = 10;
const OFFSET_START_Y = 30;

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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMinYMin meet"
        viewBox="0 0 500 500"
      >
        <style>{`text{fill:white;font-family:courier;font-size:16px;`}</style>
        <rect width="100%" height="100%" fill="black" />
        {Array.from({ length: 16 }).map((_, index: number) => (
          <text
            key={index}
            x={OFFSET_START_X}
            y={OFFSET_START_Y + GAP_Y * index}
          >
            {(index * 16).toString(16).toUpperCase().padStart(4, "0")}
          </text>
        ))}
        {displayValues.map((value, index: number) => (
          <text
            key={index}
            x={VALUE_START_X + GAP_X * (index % 16)}
            y={VALUE_START_Y + Math.floor(index / 16) * GAP_Y}
          >
            {value}
          </text>
        ))}
      </svg>
      {!initialized && (
        <Center
          position="absolute"
          width="100%"
          height="100%"
          top={0}
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

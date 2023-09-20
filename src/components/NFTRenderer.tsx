import {
  Box,
  Center,
  Image,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import lock from "@/assets/images/lock.png";
import { useCallback, useMemo, useState } from "react";

interface NFTRendererProps {
  values?: string;
  // @todo: better typings
  size?: any;
}

const VALUE_START_X = 65;
const VALUE_START_Y = 30;
const GAP_X = 27;
const GAP_Y = 30;
const OFFSET_START_X = 10;
const OFFSET_START_Y = 30;

// @todo: add other

const IndexInformation = ({
  title,
  lines,
}: {
  title: string;
  lines?: string[];
}) => (
  <Box maxW="60%">
    <Text fontSize="3xl" mb={5} fontWeight="bold">
      {title}
    </Text>
    <UnorderedList>
      {lines?.map((line: string, index) => (
        <ListItem key={index}>{line}</ListItem>
      ))}
    </UnorderedList>
  </Box>
);

const NFTRenderer = ({ values, size = 750 }: NFTRendererProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>();
  const displayValues = Array.from({ length: 256 }).map((_, i) =>
    values
      ? values
          .slice(i * 2, i * 2 + 2)
          .padStart(2, "0")
          .toUpperCase()
      : "00"
  );
  const initialized = !!values;

  const selectCurrentIndex = useCallback(
    (index: number) => () => setCurrentIndex(index),
    []
  );

  const resetCurrentIndex = useCallback(() => setCurrentIndex(undefined), []);
  const indexInformation = useMemo(() => {
    if (currentIndex === 0) {
      // humanity index
      return (
        <IndexInformation
          title="#001 Humanity Index"
          lines={[
            "Address: 0x(0000)",
            "Goal: Calculate your likelihood of being human by passing various levels of human verification tests.",
          ]}
        />
      );
    } else if (currentIndex === 80) {
      // community builder index
      return (
        <IndexInformation
          title="#002 Community Builder Index"
          lines={["Address: 0x(0050)"]}
        />
      );
    } else if (currentIndex === 192) {
      // web3 knowledge Index
      return (
        <IndexInformation
          title="#003 Web3 Knowledge Level Index"
          lines={["Address: 0x(00C0)"]}
        />
      );
    }
    return <IndexInformation title="Coming Soon" />;
  }, [currentIndex]);

  const hasMeaningfulIndex = currentIndex != null && indexInformation;

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
            style={{ cursor: "pointer" }}
            onClick={selectCurrentIndex(index)}
          >
            {value}
          </text>
        ))}
      </svg>
      <Center
        pointerEvents={hasMeaningfulIndex ? "auto" : "none"}
        position="absolute"
        width="100%"
        height="100%"
        top={0}
        left={0}
        bg="blackAlpha.600"
        backdropFilter={hasMeaningfulIndex ? "blur(2px)" : "none"}
        onClick={resetCurrentIndex}
        opacity={hasMeaningfulIndex ? 1 : 0}
        transition="opacity .2s, backdrop-filter .5s"
        m="auto"
      >
        {indexInformation}
      </Center>
      {!initialized && (
        <Center position="absolute" width="100%" height="100%" top={0} left={0}>
          <Center w="20%" h="20%" bg="whiteAlpha.600" m="auto">
            <Image src={lock} />
          </Center>
        </Center>
      )}
    </Box>
  );
};

export default NFTRenderer;

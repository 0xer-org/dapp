import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import counterImage from "@/assets/images/counter.png";

const Counter = ({
  size = "60px",
  resetTrigger,
}: {
  size?: any;
  resetTrigger: any;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setCount(count + 1), 1000);
    return () => clearTimeout(timeout);
  }, [count]);

  // reset counter when the trigger changed
  useEffect(() => {
    setCount(0);
  }, [resetTrigger]);

  return (
    <Box width={size} height={size} position="relative">
      <Image src={counterImage} width={size} />
      <Text
        position="absolute"
        top={0}
        width={size}
        align="center"
        lineHeight={size}
      >
        {count}
      </Text>
    </Box>
  );
};

export default Counter;

import { Button, Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useLiff } from "react-liff";

const LineIntegration = () => {
  const [display, setDisplay] = useState(false);

  const { isReady, liff } = useLiff();

  const callback = useCallback(
    async (e: any) => {
      e.preventDefault();
      const queryParams = new URLSearchParams(window.location.search);

      const callbackType = queryParams.get("callbackType");

      if (callbackType === "message") {
        const message = queryParams.get("message");
        await liff.sendMessages([
          {
            type: "text",
            text: message,
          },
        ]);
      }
    },
    [liff]
  );

  // check line client
  useEffect(() => {
    if (isReady && liff.isInClient()) {
      setDisplay(true);
    }
  }, [callback, isReady, liff]);

  return (
    <Flex position="fixed" width="100vw" left={0} bottom={10} hidden={!display}>
      <Button onClick={() => liff.closeWindow()} mx="auto">
        Back to Line
      </Button>
    </Flex>
  );
};

export default LineIntegration;

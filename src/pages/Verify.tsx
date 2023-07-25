import CompletedIcon from "@/components/CompletedIcon";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";

const Verify = () => {
  return (
    <Flex height="calc(100vh - 94px)" bg="black" p={12} gap={16}>
      <Box flex={2}>
        <Text fontSize="xl">Mission #001</Text>
        <Text fontSize="4xl" fontWeight="bold" my={2}>
          人類驗證
        </Text>
        <Text fontSize="xl" lineHeight={2} my={4}>
          說明：你必須要證明自己不是機器人，才能夠成為我們的一份子。某些機器人已經非常聰明，真假難辨，通過愈高等級的人類驗證任務，愈有機會是真實的人類。
        </Text>
        <UnorderedList fontSize="xl" my={4}>
          <ListItem>參與人數: 24,131</ListItem>
          <ListItem>數值位置: (0000, 01)</ListItem>
          <ListItem>你的排名: 1,742</ListItem>
        </UnorderedList>
        <Flex gap={4} mt={4}>
          <CompletedIcon checked />
          <CompletedIcon />
          <CompletedIcon />
        </Flex>
      </Box>
      <Box flex={3}>
        <Accordion columnGap={10} width="100%" defaultIndex={[0]}>
          <AccordionItem>
            <AccordionButton display="flex" justifyContent="space-between">
              <Flex align="center" gap={3}>
                <CompletedIcon checked />

                <Text fontWeight="bold">
                  Level 1: ReCAPTCHA (I'm not a Robot)
                </Text>
              </Flex>

              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pl={12} pb={4}>
              <Text mb={4}>
                Intro about level 1, you need to click Google ReCAPTCHA V2 to
                identify you are not a Robot Intro about level 1
              </Text>
              <Button variant="outline">Start</Button>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton display="flex" justifyContent="space-between">
              <Flex align="center" gap={3}>
                <CompletedIcon />
                <Text fontWeight="bold">
                  Level 2: 簡訊驗證：手機 SMS 簡訊驗證服務
                </Text>
              </Flex>

              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pl={12} pb={4}>
              <Text mb={4}></Text>
              <Button variant="outline">Start</Button>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton display="flex" justifyContent="space-between">
              <Flex align="center" gap={3}>
                <CompletedIcon />
                <Text fontWeight="bold">Level 3: 生物認證</Text>
              </Flex>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pl={12} pb={4}>
              <Text mb={4}></Text>
              <Button variant="outline">Start</Button>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Flex>
  );
};

export default Verify;

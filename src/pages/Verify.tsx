import { useCallback, useContext, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// @ts-expect-error no v3 types provided
import RecaptchaV2 from "react-google-recaptcha";
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import AccountContext from "@/context/account";
import LevelIcon from "@/components/LevelIcon";
import recaptchaLogo from "@/assets/images/recaptcha.png";
import smsLogo from "@/assets/images/sms.png";
import faceLogo from "@/assets/images/face.png";
import StageCard from "@/components/StageCard";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { sendSMSMessage, verifyRecaptcha, verifySMSMessage } from "@/api";
import Countdown from "@/components/Countdown";

enum VerificationStatus {
  IDLE,
  WAITING,
  SUCCESS,
  ERROR,
}

const Verify = () => {
  const { account, values } = useContext(AccountContext);
  const [level, setLevel] = useState<number>(1);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [resendable, setResendable] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(
    VerificationStatus.IDLE
  );
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const sendMessage = useCallback(() => {
    if (account)
      sendSMSMessage({ account, phone }).then(() => setResendable(false));
  }, [account, phone]);

  const verifyMessage = useCallback(() => {
    if (account) {
      verifySMSMessage({ account, code })
        .then(async () => {
          setVerificationStatus(VerificationStatus.SUCCESS);
        })
        .catch(() => {
          setVerificationStatus(VerificationStatus.ERROR);
        });
    }
  }, [account, code]);

  const finishVerificationProcess = useCallback(
    (success: boolean) => () => {
      setVerificationStatus(VerificationStatus.IDLE);
      onClose();
      if (success) setLevel((n) => n + 1);
    },
    [onClose]
  );

  const recaptchaVerify = useCallback(
    async (v2Response: string) => {
      if (!account || !executeRecaptcha) return;
      const v3Response = await executeRecaptcha("yourAction");
      const responses = { v2: v2Response, v3: v3Response };

      const result = await verifyRecaptcha({ account, responses });
      if (result.success) {
        // to next level
        setVerificationStatus(VerificationStatus.SUCCESS);
      }
    },
    [account, executeRecaptcha]
  );

  // auto scroll to top when entering this page
  useEffect(() => {
    setTimeout(() => {
      // @ts-expect-error
      window?.scrollTo({ top: 0, behavior: "instant" });
    }, 10);
  }, []);

  // fetch verification status
  useEffect(() => {
    const parsedValue = parseInt(values?.slice(0, 2) || "0");
    const parsedLevel =
      1 +
      (parsedValue & 1) +
      ((parsedValue >> 1) & 1) +
      ((parsedValue >> 2) & 1);
    setLevel(parsedLevel);
  }, [values]);

  return (
    <Box minH="calc(100vh - 94px)" bg="black" p={{ base: 3, md: 12 }}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "sm", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="lg" top={3} position="absolute" width="90%">
              Level {level}
            </Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody
            p={5}
            borderTop="1px solid #52534F"
            borderBottom="1px solid #52534F"
          >
            {verificationStatus === VerificationStatus.SUCCESS && (
              <Center flexDirection="column">
                <CheckIcon fontSize="120px" color="#67AE3C" m={20} />
                <Button
                  variant="outlineDark"
                  onClick={finishVerificationProcess(true)}
                >
                  OK(
                  <Countdown
                    from={3}
                    onFinish={finishVerificationProcess(true)}
                  />
                  )
                </Button>
              </Center>
            )}
            {verificationStatus === VerificationStatus.ERROR && (
              <Center flexDirection="column">
                <CloseIcon fontSize="120px" color="#B00C0C" m={20} />
                <Button
                  variant="outlineDark"
                  onClick={finishVerificationProcess(false)}
                >
                  Retry
                </Button>
              </Center>
            )}
            <>
              {level === 1 && (
                <Box
                  display={
                    verificationStatus === VerificationStatus.IDLE
                      ? "block"
                      : "none"
                  }
                >
                  <Text my={3}>按下 Google 人類驗證按鈕，證明你不是機器人</Text>
                  <Text>Click Google ReCAPTCHA V2</Text>
                  <Box my={3}>
                    <RecaptchaV2
                      sitekey="6LcvoXUnAAAAAJKJNH9lfguHB0ljVxQgLOxCChhR"
                      onChange={recaptchaVerify}
                    />
                  </Box>
                </Box>
              )}
              {level === 2 && (
                <Box
                  display={
                    verificationStatus === VerificationStatus.IDLE
                      ? "block"
                      : "none"
                  }
                >
                  <Text my={3}>進行手機簡訊驗證</Text>
                  <Text>
                    Enter your phone number, receive and enter the verification
                    code.
                  </Text>
                  <Box my={5}>
                    <Flex gap={3} my={4} width="80%">
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        width="70%"
                        placeholder="Type your phone number"
                      />
                      <Button
                        borderRadius={4}
                        onClick={sendMessage}
                        flex={1}
                        isDisabled={!resendable}
                        _disabled={{
                          opacity: 0.6,
                        }}
                      >
                        Send{" "}
                        {resendable || (
                          <>
                            (
                            <Countdown
                              from={60}
                              onFinish={() => setResendable(true)}
                            />
                            )
                          </>
                        )}
                      </Button>
                    </Flex>
                    <Flex
                      opacity={resendable ? 0 : 1}
                      gap={3}
                      my={4}
                      width="80%"
                    >
                      <Input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        width="70%"
                        placeholder="Code"
                      />
                      <Button borderRadius={4} flex={1} onClick={verifyMessage}>
                        OK
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              )}
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Container maxW={1440}>
        <Text fontSize="xl">Task #001</Text>
        <Text fontSize="4xl" fontWeight="bold" my={2}>
          Proof of Humanity
        </Text>
        <Flex gap={16} direction={{ base: "column", lg: "row" }}>
          <Box flex={2}>
            <Box fontSize="lg" lineHeight={2} mb={4}>
              <Text as="p" mb={2}>
                You must prove that you are not a robot to become a part of us.
                Some robots have become so sophisticated that it's hard to
                distinguish them from real humans. The higher the level of human
                verification tasks you pass, the more likely you are to be a
                real human.{" "}
              </Text>
              <Text as="p" mb={2}>
                Human verification tasks are currently open up to level 3, and
                you will go through familiar verification methods in everyday
                life to prove you are not a robot. This process is only used for
                identity or device recognition and will not retain your personal
                information.
              </Text>
            </Box>
            <Divider my={3} />
            <Box>
              <Text fontSize="xl" my={4}>
                Data Contribute to
              </Text>
              <Text fontWeight={300}>Humanity Index {"{0x(0000)}"}</Text>
            </Box>
          </Box>
          <Box flex={3} maxW={500}>
            <Flex align="center" gap={3} mb={4}>
              <Text fontSize="xl">Identify Level</Text>
              <Flex gap={4}>
                <LevelIcon level={1} completed={level > 1} />
                <LevelIcon level={2} completed={level > 2} />
                <LevelIcon level={3} completed={level > 3} />
              </Flex>
            </Flex>

            <VStack alignItems="stretch" gap={10}>
              <StageCard
                icon={recaptchaLogo}
                level={1}
                current={level}
                onStart={onOpen}
              >
                <Text>按下 Google 人類驗證按鈕，證明你不是機器人</Text>
                <Text>Click Google ReCAPTCHA V2</Text>
                <Text fontSize="sm" fontWeight={300}>
                  (I'm not a Robot)
                </Text>
              </StageCard>
              <StageCard
                icon={smsLogo}
                level={2}
                current={level}
                onStart={onOpen}
              >
                <Text>進行手機簡訊驗證</Text>
                <Text>Mobile SMS Identity</Text>
              </StageCard>
              <StageCard
                icon={faceLogo}
                level={3}
                current={level}
                onStart={onOpen}
              >
                <Text>用你的手機進行人臉辨識或是指紋登入</Text>
                <Text>Apple Face ID or Android Authentication</Text>
              </StageCard>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Verify;

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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
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
import { CheckIcon, CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { sendSMSMessage, verifyRecaptcha, verifySMSMessage } from "@/api";
import Countdown from "@/components/Countdown";
import { useLiff } from "react-liff";
import { Link } from "react-router-dom";
import CountryCodeMenu from "@/components/CountryCodeMenu";
import useScrollToTop from "@/libs/useScrollToTop";

enum VerificationStatus {
  IDLE,
  WAITING,
  SUCCESS,
  ERROR,
}

const Verify = () => {
  useScrollToTop();
  const { account, values } = useContext(AccountContext);
  const [level, setLevel] = useState<number>(0);
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+886");
  const [code, setCode] = useState("");
  const [resendable, setResendable] = useState(true);
  const [lineMode, setLineMode] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(
    VerificationStatus.IDLE
  );
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isReady, liff } = useLiff();

  const sendMessage = useCallback(() => {
    if (account) {
      sendSMSMessage({ account, countryCode, phone }).then(() =>
        setResendable(false)
      );
    }
  }, [account, countryCode, phone]);

  const lineCallback = useCallback(async () => {
    if (!(isReady && liff.isInClient())) return;
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
  }, [isReady, liff]);

  const verifyMessage = useCallback(() => {
    if (account) {
      verifySMSMessage({ account, code })
        .then(async () => {
          await lineCallback();
          setVerificationStatus(VerificationStatus.SUCCESS);
        })
        .catch(() => {
          setVerificationStatus(VerificationStatus.ERROR);
        });
    }
  }, [account, code, lineCallback]);

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
        await lineCallback();
      }
    },
    [account, executeRecaptcha, lineCallback]
  );

  // check if is from line
  useEffect(() => {
    if (isReady && liff.isInClient()) {
      setLineMode(true);
    }
  }, [isReady, liff]);

  // fetch verification status
  useEffect(() => {
    if (!values) return setLevel(0);
    const parsedValue = parseInt(values?.slice(0, 2) || "0");
    const parsedLevel =
      1 +
      (parsedValue & 1) +
      ((parsedValue >> 1) & 1) +
      ((parsedValue >> 2) & 1);
    setLevel(parsedLevel);
  }, [values]);

  return (
    <>
      <Modal
        isOpen={isOpen || lineMode}
        onClose={onClose}
        isCentered
        size={{ base: "sm", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent borderWidth={lineMode ? 0 : 1}>
          {lineMode || (
            <ModalHeader>
              <Text fontSize="lg" top={3} position="absolute" width="90%">
                Level {level}
              </Text>
              <ModalCloseButton />
            </ModalHeader>
          )}
          <ModalBody
            p={5}
            borderTop={lineMode ? "none" : "1px solid #52534F"}
            borderBottom={lineMode ? "none" : "1px solid #52534F"}
          >
            {verificationStatus === VerificationStatus.SUCCESS && (
              <Center flexDirection="column">
                <CheckIcon fontSize="120px" color="#67AE3C" m={20} />
                <Button
                  variant="outlineDark"
                  onClick={
                    lineMode
                      ? () => liff.closeWindow()
                      : finishVerificationProcess(true)
                  }
                >
                  OK(
                  <Countdown
                    from={3}
                    onFinish={
                      lineMode
                        ? () => liff.closeWindow()
                        : finishVerificationProcess(true)
                    }
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
                    <Flex gap={3} my={4} wrap="wrap">
                      <Flex gap={3} width={{ base: "100%", md: "70%" }}>
                        <CountryCodeMenu
                          value={countryCode}
                          onSelect={setCountryCode}
                          list={[
                            { country: "United State", code: "+1" },
                            { country: "Taiwan", code: "+886" },
                            { country: "China", code: "+86" },
                            { country: "Hong Kong", code: "+852" },
                          ]}
                        />
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Type your phone number"
                          flex={3}
                          borderWidth={2}
                        />
                      </Flex>
                      <Button
                        onClick={sendMessage}
                        flex={1}
                        maxW={120}
                        isDisabled={!resendable}
                        borderRadius={4}
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
                    <Flex opacity={resendable ? 0 : 1} gap={3} wrap="wrap">
                      <Input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        width={{ base: "100%", md: "70%" }}
                        placeholder="Code"
                      />
                      <Button
                        onClick={verifyMessage}
                        borderRadius={4}
                        flex={1}
                        maxW={120}
                      >
                        OK
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              )}
              {level === 3 && (
                <Box
                  display={
                    verificationStatus === VerificationStatus.IDLE
                      ? "block"
                      : "none"
                  }
                >
                  Coming Soon
                </Box>
              )}
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
      {lineMode || (
        <Box minH="calc(100vh - 94px)" bg="black" p={{ base: 3, md: 12 }}>
          <Container maxW={1440}>
            <Text fontSize="xl">Task #001</Text>
            <Text fontSize="4xl" fontWeight="bold" my={2}>
              Proof of Humanity
            </Text>
            <Flex gap={16} direction={{ base: "column", lg: "row" }}>
              <Box flex={2}>
                <Box fontSize="lg" lineHeight={2} mb={4}>
                  <Text as="p" mb={2}>
                    You must prove that you are not a robot to become a part of
                    us. Some robots have become so sophisticated that it's hard
                    to distinguish them from real humans. The higher the level
                    of human verification tasks you pass, the more likely you
                    are to be a real human.{" "}
                  </Text>
                  <Text as="p" mb={2}>
                    Human verification tasks are currently open up to level 3,
                    and you will go through familiar verification methods in
                    everyday life to prove you are not a robot. This process is
                    only used for identity or device recognition and will not
                    retain your personal information.
                  </Text>
                </Box>
                <Divider my={6} />
                <Box>
                  <Text fontSize="xl" fontWeight="bold" my={4}>
                    Data Contribute to
                  </Text>
                  <Flex align="center">
                    <Text fontWeight={300} pr={2}>
                      Humanity Index {"{0x(0000)}"}
                    </Text>
                    <Link to="/task-introduction/1">
                      <ExternalLinkIcon />
                    </Link>
                  </Flex>
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
      )}
    </>
  );
};

export default Verify;

import { useCallback, useContext, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useGoogleLogin } from "@react-oauth/google";
import { useLiff } from "react-liff";
import { Link } from "react-router-dom";
// @ts-expect-error no v3 types provided
import RecaptchaV2 from "react-google-recaptcha";
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Container,
  Divider,
  Flex,
  Image,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import StageCard from "@/components/StageCard";
import { CheckIcon, CloseIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  getLeaderboard,
  getUser,
  sendSMSMessage,
  verifyOauthResponse,
  verifyRecaptcha,
  verifySMSMessage,
} from "@/api";
import Countdown from "@/components/Countdown";

import CountryCodeMenu from "@/components/CountryCodeMenu";
import useScrollToTop from "@/libs/useScrollToTop";
import isInLineBrowser from "@/libs/isInLineBrowser";

import AccountContext from "@/context/account";
import LevelIcon from "@/components/LevelIcon";
import recaptchaLogo from "@/assets/images/recaptcha.png";
import smsLogo from "@/assets/images/sms.png";
import faceLogo from "@/assets/images/face.png";
import googleLogo from "@/assets/images/google.png";

enum VerificationStatus {
  IDLE,
  WAITING,
  SUCCESS,
  ERROR,
}

const Verify = () => {
  useScrollToTop();
  const { account, accountInfo } = useContext(AccountContext);
  const [level, setLevel] = useState<number>(0);
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState<number>();
  const [rank, setRank] = useState<number>();
  const [countryCode, setCountryCode] = useState("+886");
  const [code, setCode] = useState("");
  const lineMode = isInLineBrowser();
  const [resendable, setResendable] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(
    VerificationStatus.IDLE
  );
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isReady, liff } = useLiff();

  const googleLogin = useGoogleLogin({
    onSuccess: ({ access_token: token }) => {
      if (account)
        verifyOauthResponse({ provider: "google", account, token })
          .then(() => setVerificationStatus(VerificationStatus.SUCCESS))
          .catch(() => setVerificationStatus(VerificationStatus.ERROR));
    },
    onError: (e) => {
      setVerificationStatus(VerificationStatus.ERROR);
    },
  });

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

  const onVerifySuccessClick = useCallback(
    () => (lineMode ? liff.closeWindow() : finishVerificationProcess(true)()),
    [finishVerificationProcess, liff, lineMode]
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

  // initialize apple login button
  useEffect(() => {
    if (isOpen && level === 3) {
      const successHandler = async (event: any) => {
        // Handle successful response.
        const { id_token: token } = event?.detail?.authorization || {};
        if (account)
          verifyOauthResponse({ provider: "apple", account, token })
            .then(() => setVerificationStatus(VerificationStatus.SUCCESS))
            .catch(() => setVerificationStatus(VerificationStatus.ERROR));
      };
      const errorHandler = () =>
        setVerificationStatus(VerificationStatus.ERROR);
      setTimeout(() => {
        (window as any).AppleID.auth.init({
          clientId: "signing.org.0xer.app",
          scope: "name email",
          redirectURI: `${window.location.origin}/tasks/1`,
          usePopup: true,
        });
        // Listen for authorization success.
        document.addEventListener("AppleIDSignInOnSuccess", successHandler);
        // Listen for authorization failures.
        document.addEventListener("AppleIDSignInOnFailure", errorHandler);
      }, 0);

      return () => {
        document.removeEventListener("AppleIDSignInOnSuccess", successHandler);
        document.removeEventListener("AppleIDSignInOnSuccess", errorHandler);
      };
    }
  }, [account, isOpen, level]);

  // fetch verification status
  useEffect(() => {
    if (account && accountInfo) {
      getUser().then(({ verification_results: verificationResults }) =>
        setLevel((verificationResults?.length || 0) + 1)
      );
      getLeaderboard(0x00).then(({ user, data }) => {
        setTotal(data?.length || 0);
        setRank(user?.rank);
      });
    }
  }, [account, accountInfo]);

  return (
    <>
      <Modal
        isOpen={isOpen || lineMode}
        onClose={onClose}
        isCentered
        size={{ base: "sm", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent borderWidth={lineMode ? 0 : 2}>
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
            borderTop={lineMode ? "none" : "2px solid #52534F"}
            borderBottom={lineMode ? "none" : "2px solid #52534F"}
          >
            {(() => {
              switch (true) {
                case verificationStatus === VerificationStatus.SUCCESS:
                  return (
                    <Center flexDirection="column">
                      <CheckIcon fontSize="120px" color="#67AE3C" m={20} />
                      <Button
                        variant="outlineDark"
                        onClick={onVerifySuccessClick}
                      >
                        OK(
                        <Countdown from={3} onFinish={onVerifySuccessClick} />)
                      </Button>
                    </Center>
                  );
                case verificationStatus === VerificationStatus.ERROR:
                  return (
                    <Center flexDirection="column">
                      <CloseIcon fontSize="120px" color="#B00C0C" m={20} />
                      <Button
                        variant="outlineDark"
                        onClick={finishVerificationProcess(false)}
                      >
                        Retry
                      </Button>
                    </Center>
                  );
                case level === 0:
                  return (
                    <Box p={20} textAlign="center">
                      <CircularProgress isIndeterminate />
                    </Box>
                  );
                case level === 1:
                  return (
                    <Box>
                      <Text my={3}></Text>
                      <Text>Click Google ReCAPTCHA V2</Text>
                      <Box my={3}>
                        <RecaptchaV2
                          sitekey="6LcvoXUnAAAAAJKJNH9lfguHB0ljVxQgLOxCChhR"
                          onChange={recaptchaVerify}
                        />
                      </Box>
                    </Box>
                  );
                case level === 2:
                  return (
                    <Box>
                      <Text>
                        Enter your phone number, receive and enter the
                        verification code.
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
                  );
                case level === 3:
                  return (
                    <Box>
                      <Text mb={4}>
                        Complete the verification using your Apple or Google
                        account.
                      </Text>
                      <VStack my={5} alignItems="center" gap={3}>
                        <Button
                          variant="outline"
                          bg="white"
                          size="lg"
                          width="302px"
                          borderRadius={8}
                          fontFamily="apple-button-font-0"
                          fontSize="20px"
                          border="none"
                          _hover={{
                            bg: "white",
                          }}
                          onClick={() => googleLogin()}
                        >
                          <Image width={4} src={googleLogo} mr={2} />
                          Continue with Google
                        </Button>
                        <Box>
                          <div
                            id="appleid-signin"
                            data-color="white"
                            data-type="continue"
                            data-mode="center-align"
                            className="apple-login-button"
                          />
                        </Box>
                      </VStack>
                    </Box>
                  );
              }
            })()}
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
                  <Box>
                    <UnorderedList>
                      <ListItem>
                        Participants: {total ? total.toLocaleString() : "--"}
                      </ListItem>
                      <ListItem>
                        Your Rank: {rank ? rank.toLocaleString() : "--"}
                      </ListItem>
                    </UnorderedList>
                  </Box>
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
                  <Text fontSize="xl" fontWeight={500}>
                    Identify Level
                  </Text>
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
                    <Text>Mobile SMS Identity</Text>
                  </StageCard>
                  <StageCard
                    icon={faceLogo}
                    level={3}
                    current={level}
                    onStart={onOpen}
                  >
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

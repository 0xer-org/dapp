import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import useScrollToTop from "@/libs/useScrollToTop";
import { useCallback, useContext, useEffect, useState } from "react";
import AccountContext from "@/context/account";
import recaptchaLogo from "@/assets/images/recaptcha.png";
import correctIcon from "@/assets/images/correct.png";
import incorrectIcon from "@/assets/images/incorrect.png";
import { answerQuestion, getQuestions, getUser } from "@/api";
import counterImage from "@/assets/images/counter.png";
import Countdown from "@/components/Countdown";

enum STATUSES {
  IDLE,
  STARTED,
  SCORE,
}

const KnowledgeTest = () => {
  useScrollToTop();
  const { account, values, id, getTokenId } = useContext(AccountContext);
  const [startAt, setStartAt] = useState(0);
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [totalResponseTime, setTotalResponseTime] = useState(0);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<
    Array<{
      description: string;
      answer: number;
      options: string[];
      image: string;
    }>
  >([]);
  const question = questions[progress];

  const start = useCallback(() => {
    setSelected(-1);
    setStartAt(Date.now());
    if (progress !== questions.length) setStatus(STATUSES.STARTED);
    else setStatus(STATUSES.SCORE);
  }, [progress, questions]);

  const onSelect = useCallback(
    (value: number) => async () => {
      setSelected(value);
      const responseTime = Date.now() - startAt;
      setTotalResponseTime(totalResponseTime + responseTime);
      if (value === question.answer) {
        setScore(score + 1);
      }
      try {
        await answerQuestion({
          index: progress,
          selected: value,
          responseTime,
        });

        setTimeout(() => {
          setStartAt(Date.now());
          setSelected(-1);
          setProgress(progress + 1);
          if (progress === questions.length - 1) {
            setStatus(STATUSES.SCORE);
          }
        }, 1000);
      } catch (e) {
        console.error(e);
      }
    },
    [progress, question, questions, score, startAt, totalResponseTime]
  );

  const computeSelectedStyle = useCallback(
    (
      index: number,
      styles: { correct: string; normal: string; incorrect: string }
    ) => {
      switch (true) {
        case selected === index && selected === question.answer:
        case selected !== -1 && index === question.answer:
          return styles.correct;
        case selected !== index && selected !== -1:
          return styles.normal;
        case selected !== -1 && index !== question.answer:
          return styles.incorrect;
      }
    },
    [question, selected]
  );

  useEffect(() => {
    if (account && values) {
      Promise.all([getQuestions(), getUser()]).then(
        ([{ data }, { web3_test_results: web3TestResults = [] }]) => {
          setQuestions(data);
          setProgress(web3TestResults.length);
          setTotalResponseTime(
            web3TestResults.reduce(
              (acc: number, cur: any) => acc + cur.response_time,
              0
            )
          );
          setScore(
            web3TestResults.reduce(
              (acc: number, cur: any) => acc + +cur.correct,
              0
            )
          );
        }
      );
    }
  }, [account, values]);

  // fetch user token id first
  useEffect(() => {
    if (account) getTokenId();
  }, [account, getTokenId]);

  return (
    <Box minH="calc(100vh - 94px)" bg="black" p={{ base: 3, md: 12 }}>
      <Container maxW={1440}>
        <Text fontSize="xl">Task #003</Text>
        <Text fontSize="4xl" fontWeight="bold" my={2}>
          Web3 Knowledge Test
        </Text>
        <Flex gap={16} direction={{ base: "column", lg: "row" }}>
          <Box flex={2}>
            <Box fontSize="lg" lineHeight={2} mb={4}>
              <Text as="p" mb={2}>
                Welcome to the captivating world of Web3—a landscape of
                ceaseless innovation and change since Satoshi Nakamoto
                introduced Bitcoin. This realm has been enriched by
                groundbreaking technologies like Ethereum, the burgeoning
                interest in NFTs, and myriad DeFi applications. While there have
                been setbacks and challenges, the scale of innovation remains
                awe-inspiring. This assessment encapsulates pivotal events and
                key themes within Web3, aiming to evaluate your level of
                understanding and familiarity with this evolving ecosystem. The
                higher your score, the more extensive your Web3 insights are.
              </Text>
            </Box>
            <Divider my={6} />
            <Box>
              <Text fontSize="xl" fontWeight="bold" my={4}>
                Data Contribute to
              </Text>
              <Flex align="center">
                <Text fontWeight={300} pr={2}>
                  Web3 Knowledge Level {"{0x(0050)}"}
                </Text>
                <Link to="/task-introduction/3">
                  <ExternalLinkIcon />
                </Link>
              </Flex>
            </Box>
          </Box>
          <Box flex={3} maxW={500}>
            <VStack alignItems="stretch" gap={10}>
              {(() => {
                if (!id) return;
                switch (status) {
                  case STATUSES.IDLE:
                    return (
                      <Box>
                        <Text fontSize="xl" fontWeight={500} mb={4}>
                          Start your challenge now!
                        </Text>
                        <Progress
                          mb={3}
                          value={(100 * progress) / (questions.length || 1)}
                          borderColor="accent"
                          bg="#21221D"
                          borderWidth={2}
                          colorScheme="none"
                        />
                        <Text mb={4} letterSpacing={1}>
                          Progress | {progress} / {questions.length}
                        </Text>
                        <Box
                          bg="#21221D"
                          borderWidth={2}
                          borderColor="accent"
                          px={{ base: 5, md: 8 }}
                          py={{ base: 5, md: 6 }}
                        >
                          <Image
                            src={recaptchaLogo}
                            display={{ base: "none", md: "block" }}
                            width="40px"
                            mb={4}
                          />
                          <Text fontWeight="bold" fontSize="lg" mb={4}>
                            Web3 Knowledge Test (100 questions in total)
                          </Text>
                          <Text mb={8}>
                            Below are multiple-choice questions with four
                            options each, provided randomly. Each question has
                            only one correct answer. If you pause midway, you
                            can resume from where you left off, but your
                            previous scores will not be reset.
                          </Text>
                          <Button
                            onClick={start}
                            variant="outlineDark"
                            width="100%"
                          >
                            {progress === 0 && "Start"}
                            {0 < progress &&
                              progress < questions.length &&
                              "Continue"}
                            {progress >= questions.length && "Your Score"}
                          </Button>
                        </Box>
                      </Box>
                    );
                  case STATUSES.STARTED:
                    return (
                      <Box>
                        <Text
                          role="button"
                          textDecor="underline"
                          align="end"
                          mb={6}
                          onClick={() => setStatus(STATUSES.SCORE)}
                        >
                          Stop
                        </Text>
                        <Box
                          bg="#21221D"
                          borderWidth={2}
                          borderColor="accent"
                          px={{ base: 5, md: 8 }}
                          py={{ base: 5, md: 6 }}
                        >
                          <Flex gap={5}>
                            <Box>
                              <Box
                                width={"60px"}
                                height={"60px"}
                                position="relative"
                              >
                                <Image src={counterImage} width={"60px"} />
                                <Text
                                  position="absolute"
                                  top={0}
                                  width={"60px"}
                                  align="center"
                                  lineHeight={"60px"}
                                >
                                  <Countdown
                                    from={10}
                                    resetTrigger={progress}
                                    onFinish={onSelect(-2)}
                                  />
                                </Text>
                              </Box>
                            </Box>
                            <Box>
                              <Text mb={2} fontWeight={500}>
                                #{progress + 1}/{questions.length}
                              </Text>
                              <Text mb={4} fontWeight={500}>
                                {question.description}
                              </Text>
                              <Image
                                src={question.image}
                                width={140}
                                height={140}
                              />
                            </Box>
                          </Flex>

                          {question.options.map((option, index) => (
                            <Button
                              key={index}
                              onClick={onSelect(index)}
                              variant="outlineDark"
                              width="100%"
                              mt={4}
                              color={computeSelectedStyle(index, {
                                correct: "white !important",
                                incorrect: "white !important",
                                normal: "white",
                              })}
                              bg={computeSelectedStyle(index, {
                                correct: "#67AE3C !important",
                                incorrect: "#B00C0C !important",
                                normal: "transparent",
                              })}
                              borderColor={computeSelectedStyle(index, {
                                correct: "#67AE3C",
                                incorrect: "#B00C0C",
                                normal: "white",
                              })}
                              _hover={{
                                bg: "white",
                                color: "black",
                              }}
                              isDisabled={selected !== -1}
                            >
                              {option}
                              {selected === index && (
                                <Box position="absolute" right={5}>
                                  <Image
                                    src={
                                      index === question.answer
                                        ? correctIcon
                                        : incorrectIcon
                                    }
                                    width="16px"
                                  />
                                </Box>
                              )}
                            </Button>
                          ))}
                        </Box>
                      </Box>
                    );
                  case STATUSES.SCORE:
                    return (
                      <Box>
                        <Text fontSize="4xl" fontWeight={500} mb={10}>
                          Your Score
                        </Text>
                        <Text fontSize="lg" fontWeight={500} mb={4}>
                          Answered Questions
                        </Text>
                        <Progress
                          mb={3}
                          value={(100 * progress) / (questions.length || 1)}
                          borderColor="accent"
                          bg="#21221D"
                          borderWidth={2}
                          colorScheme="none"
                        />
                        <Text mb={4} letterSpacing={1}>
                          Progress | {progress} / {questions.length}
                        </Text>
                        <Flex
                          mb={6}
                          gap={4}
                          flexDir={{ base: "column", md: "row" }}
                        >
                          <Box
                            bg="#21221D"
                            flex={1}
                            py={10}
                            borderWidth={2}
                            borderColor="accent"
                          >
                            <Text fontSize="3xl" align="center">
                              {((score / (progress || 1)) * 100).toFixed(1)}%
                            </Text>
                            <Text
                              fontSize="md"
                              fontWeight={300}
                              letterSpacing={1}
                              align="center"
                            >
                              Correctness Rate(%)
                            </Text>
                          </Box>
                          <Box
                            bg="#21221D"
                            flex={1}
                            py={10}
                            borderWidth={2}
                            borderColor="accent"
                          >
                            <Text fontSize="3xl" align="center">
                              {(
                                totalResponseTime /
                                1000 /
                                (questions.length || 1)
                              ).toFixed(2)}
                            </Text>
                            <Text
                              fontSize="md"
                              fontWeight={300}
                              letterSpacing={1}
                              align="center"
                            >
                              AVG. Response Time(S)
                            </Text>
                          </Box>
                        </Flex>
                        {questions.length > progress && (
                          <Text mb={6}>
                            You still have {questions.length - progress}{" "}
                            questions unanswered. You can press the 'Continue'
                            button to resume the challenge.
                          </Text>
                        )}

                        <Button
                          onClick={() => setStatus(STATUSES.IDLE)}
                          variant="outlineDark"
                          width="100%"
                        >
                          OK
                        </Button>
                      </Box>
                    );
                }
              })()}
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default KnowledgeTest;

import { ListItem, UnorderedList } from "@chakra-ui/react";
import Template from "./Template";
import { useContext, useEffect, useState } from "react";
import AccountContext from "@/context/account";
import { getLeaderboard } from "@/api";

const code = `
# Define the function to calculate the scaled score of web3_knowledge_level
def calculate_scaled_score(C, N):
    # Calculate the accuracy rate A
    A = C / N
    
    # Calculate the scaled score of web3_knowledge_level
    web3_knowledge_level = int(A * 255)
    
    return web3_knowledge_level

# Example case: 80 questions in total and 64 answered correctly
C_example = 64
N_example = 80

# Calculate the scaled score for the example case
web3_knowledge_level_example = calculate_scaled_score(C_example, N_example)
`;

const Intro3 = () => {
  const { account, accountInfo } = useContext(AccountContext);
  const [leaderboard, setLeaderBoard] = useState<{
    data: Array<{ value: number; address: string }>;
  }>({ data: [] });
  const [task, setTask] = useState({ startFrom: 0, endAt: 0 });
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [userData, setUserData] = useState<{
    value: number;
    rank: number;
  }>();

  useEffect(() => {
    if (account && accountInfo)
      getLeaderboard(0xc0).then(
        ({ data, length, user, start_from: startFrom, end_at: endAt }) => {
          setLeaderBoard({ data });
          setTask({ startFrom, endAt });
          setUserData(user);
          setTotalParticipants(length);
        }
      );
  }, [account, accountInfo]);

  return (
    <Template
      name="Web3 Knowledge Level"
      address="0x(0050)"
      introduction="Your Web3 score is a quantitative gauge of your understanding and exposure in this dynamic domain. A higher score signifies not only deeper knowledge but also marks you as a seasoned Web3 explorer. It serves as your compass in navigating the complex landscape of Web3, representing both your grasp of its history and your role in shaping its future as we collectively journey toward decentralization."
      task={{
        index: 3,
        name: "Web3 Knowledge Test",
        ...task,
      }}
      method="By calculating your total score from the Web3 Knowledge Test, you obtain a correctness ratio that is then compared with other participating 0xers. This relative ranking is converted into a value between 0 and 255."
      parameters={
        <UnorderedList gap={2}>
          <ListItem>web3_knowledge_level: A value between 1 and 255</ListItem>
          <ListItem>
            N: represent the total number of questions used to evaluate web3
            knowledge level.
          </ListItem>
          <ListItem>
            A: represent the accuracy rate of the individual's responses.
          </ListItem>
          <ListItem>
            C: represent the number of questions answered correctly by an
            individual.
          </ListItem>
          <ListItem>
            Only those who answer more than 50 questions will be counted into
            the leaderboard.
          </ListItem>
        </UnorderedList>
      }
      formula="web3_knowledge_level = [(C/N) * 255]"
      code={code}
      totalParticipants={totalParticipants}
      userData={userData}
      leaderboard={leaderboard}
    />
  );
};

export default Intro3;

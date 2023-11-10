import { ListItem, UnorderedList } from "@chakra-ui/react";
import Template from "./Template";
import algorithmImage from "@/assets/images/algorithm-1.png";
import { useContext, useEffect, useState } from "react";
import AccountContext from "@/context/account";
import { getLeaderboard } from "@/api";

const Intro1 = () => {
  const { account, accountInfo } = useContext(AccountContext);
  const [leaderboard, setLeaderBoard] = useState<{
    data: Array<{ value: number; address: string }>;
  }>({ data: [] });
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [userData, setUserData] = useState<{
    value: number;
    rank: number;
  }>();

  useEffect(() => {
    if (account && accountInfo)
      getLeaderboard(0x00).then(({ data, length, user }) => {
        setLeaderBoard({ data });

        setUserData(user);
        setTotalParticipants(length);
      });
  }, [account, accountInfo]);

  return (
    <Template
      name="Humanity Index"
      address="0x(0000)"
      introduction="The Humanity Index is a measure of the likelihood that you are a real person, and is the fundamental building block of trust in the decentralised community."
      task={{
        index: 1,
        name: "Proof of Humanity",
        startFrom: Date.now(),
        endAt: Date.now(),
      }}
      method="By passing different levels of authentication in Task #001, users obtain values provided by the authentication. These values are then processed through an algorithm to be allocated into a range between 0 and 255."
      parameters={
        <UnorderedList gap={2}>
          <ListItem>humanity_index: A value between 0 - 255</ListItem>
          <ListItem>recaptcha_v2: 0 = failure, 1 = success</ListItem>
          <ListItem>
            recaptcha_v3: A floating point number between 0 and 1, representing
            the likelihood of the user being classified as human.
          </ListItem>
          <ListItem>sms_verification: 0 = failure, 1 = success</ListItem>
          <ListItem>biometric_verification: 0 = failure, 1 = success</ListItem>
          <ListItem>
            w1, w2, w3, w4: Weights for each verification method (w1 + w2 + w3 +
            w4 = 1)
          </ListItem>
        </UnorderedList>
      }
      formula="humanity_index = (w1 * recaptcha_v2 + w2 * recaptcha_v3 + w3 * sms_verification + w4 * biometric_verification) * 255"
      algorithm={algorithmImage}
      totalParticipants={totalParticipants}
      userData={userData}
      leaderboard={leaderboard}
    />
  );
};

export default Intro1;

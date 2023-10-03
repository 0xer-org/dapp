import { ListItem, UnorderedList } from "@chakra-ui/react";
import Template from "./Template";
import algorithmPicture from "@/assets/images/algorithm.png";
import { useContext, useEffect, useState } from "react";
import { getReferrals } from "@/api";
import AccountContext from "@/context/account";

const Intro2 = () => {
  const { account } = useContext(AccountContext);
  const [leaderboard, setLeaderBoard] = useState<{
    data: Array<{ value: number; address: string }>;
    updatedAt?: number;
  }>({ data: [] });
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [userData, setUserData] = useState<{
    value: number;
    rank: number;
    updatedAt?: number;
  }>();

  useEffect(() => {
    if (account)
      getReferrals().then(
        ({ data, length, value, rank, updated_at: updatedAt }) => {
          console.log(length, value, value, rank);
          setLeaderBoard({
            data,
            updatedAt,
          });

          setUserData({
            value,
            rank,
            updatedAt,
          });
          setTotalParticipants(length);
        }
      );
  }, [account]);

  return (
    <Template
      name="0xer Referral Score"
      address="0x(00C0)"
      introduction="A community is a group of people who come together to share common interests. If you identify with the 0xer community and share it with more people, your index will grow in this regard. The higher the score, the greater your contribution to the community."
      task={{
        index: 2,
        name: "0xer Referral Mission",
        startFrom: Date.now(),
        endAt: Date.now(),
      }}
      method="Calculate both the number of successful user invitations and the Humanity Index {0x(0000)} of the invited members from Task #002. Then, use an algorithm to compute these two values and convert them to a range between 0 and 255."
      parameters={
        <UnorderedList gap={2}>
          <ListItem>
            0xer_referral_score = (invitation_score / h * 255)
          </ListItem>
          <ListItem ml={4}>
            0 {"<="} 0xer_referral_score {"<="} 255
          </ListItem>
          <ListItem ml={4}>
            h is an adjustment parameter that sets the upper limit for the
            invitation score, thus modulating the task's difficulty.
          </ListItem>
          <ListItem>
            invitation_score=Σ(invitation_success x humanity_index), sums over
            all invitees
          </ListItem>
        </UnorderedList>
      }
      formula="0xer_referral_score = ( Σ(invitation_success x humanity_index) / h ) * 255"
      algorithm={algorithmPicture}
      totalParticipants={totalParticipants}
      userData={userData}
      leaderboard={leaderboard}
    />
  );
};

export default Intro2;

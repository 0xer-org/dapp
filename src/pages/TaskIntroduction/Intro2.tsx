import { ListItem, UnorderedList } from "@chakra-ui/react";
import Template from "./Template";
import { useContext, useEffect, useState } from "react";
import { getLeaderboard } from "@/api";
import AccountContext from "@/context/account";

const code = `
import math

def calculate_0xer_referral_score(invitations):
    h = 100000  # adjustment parameter
    invitation_score = 0
    
    for invitation in invitations:
        invitation_success = invitation['success']
        humanity_index = invitation['humanity_index']
        invitation_score += invitation_success * humanity_index
    
    # Calculate 0xer_referral_score
    referral_score = (invitation_score / h) * 255
    
    return math.ceil(referral_score)  # Rounding up to the nearest integer

# Example usage
invitations_example = [
    {'success': 1, 'humanity_index': 200},
    {'success': 1, 'humanity_index': 150},
    {'success': 0, 'humanity_index': 100},
    {'success': 1, 'humanity_index': 255},
    {'success': 1, 'humanity_index': 50}
]

result = calculate_0xer_referral_score(invitations_example)
`;

const Intro2 = () => {
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
      getLeaderboard(0x50).then(
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
      name="0xer Referral Score"
      address="0x(00C0)"
      introduction="A community is a group of people who come together to share common interests. If you identify with the 0xer community and share it with more people, your index will grow in this regard. The higher the score, the greater your contribution to the community."
      task={{
        index: 2,
        name: "0xer Referral Mission",
        ...task,
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
      code={code}
      totalParticipants={totalParticipants}
      userData={userData}
      leaderboard={leaderboard}
    />
  );
};

export default Intro2;

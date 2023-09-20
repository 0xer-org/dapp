import { useContext } from "react";
import { shortenAddress } from "@/libs";
import { Button, Text } from "@chakra-ui/react";
import AccountContext from "@/context/account";

import WalletConnectionContext from "@/context/walletConnection";

const ProfileLink = () => {
  const { account } = useContext(AccountContext);
  const { connectWallet } = useContext(WalletConnectionContext);

  return account ? (
    <Text textDecor="underline">{shortenAddress(account)}</Text>
  ) : (
    <Button onClick={connectWallet} variant="outlineDark">
      Connect
    </Button>
  );
};

export default ProfileLink;

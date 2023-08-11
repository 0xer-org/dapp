import { useContext } from "react";
import { shortenAddress } from "@/libs";
import { Button } from "@chakra-ui/react";
import TokenContext from "@/context/token";

import WalletConnectionContext from "@/context/walletConnection";

const ProfileLink = () => {
  const { account } = useContext(TokenContext);
  const { connectWallet } = useContext(WalletConnectionContext);

  return account ? (
    <>{shortenAddress(account)}</>
  ) : (
    <Button onClick={connectWallet} variant="outline">
      Connect
    </Button>
  );
};

export default ProfileLink;

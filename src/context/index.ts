import { ComponentType } from "react";
import { withAccountContext } from "./account";
import { withWalletConnectionContext } from "./walletConnection";

const withContext = (Component: ComponentType) =>
  withAccountContext(withWalletConnectionContext(Component));

export default withContext;

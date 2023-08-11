import { ComponentType } from "react";
import { withTokenContext } from "./token";
import { withWalletConnectionContext } from "./walletConnection";

const withContext = (Component: ComponentType) =>
  withTokenContext(withWalletConnectionContext(Component));

export default withContext;

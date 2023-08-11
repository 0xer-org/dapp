import { ComponentType, createContext } from "react";
import { useDisclosure } from "@chakra-ui/react";

interface WalletConnectionContextType {
  isOpen: boolean;
  connectWallet: () => void;
  close: () => void;
}

const WalletConnectionContext = createContext<WalletConnectionContextType>({
  isOpen: false,
  connectWallet: () => {},
  close: () => {},
});

const withWalletConnectionContext =
  (Component: ComponentType) => (props: any) => {
    const { isOpen, onOpen: connectWallet, onClose: close } = useDisclosure();

    return (
      <WalletConnectionContext.Provider
        value={{ isOpen, connectWallet, close }}
      >
        <Component {...props} />
      </WalletConnectionContext.Provider>
    );
  };

export default WalletConnectionContext;
export { withWalletConnectionContext };

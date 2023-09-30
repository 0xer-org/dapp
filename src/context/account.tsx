import {
  ComponentType,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Contract from "web3-eth-contract";
import Web3 from "web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import ABI from "@/abi.json";
import { useToast } from "@chakra-ui/react";
import { getUser } from "@/api";

interface AccountContextType {
  account?: string;
  id?: number;
  sign: (message: string) => Promise<string | null>;
  connect: (privateKey?: string) => void;
  getTokenId: () => Promise<number | undefined>;
  fetchValues: () => Promise<string | undefined>;
  setValues: (param: string) => void;
  values?: string;
}

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID || "0", 10);
const RPC = process.env.REACT_APP_RPC || "";

const AccountContext = createContext<AccountContextType>({
  connect: () => {},
  sign: async () => null,
  getTokenId: async () => undefined,
  fetchValues: async () => undefined,
  setValues: () => undefined,
});

const withAccountContext = (Component: ComponentType) => (props: any) => {
  const providerRef = useRef<any>();
  const contractRef = useRef<any>();
  const [account, setAccount] = useState<string>();
  const [values, setValues] = useState<string>();
  const [id, setId] = useState<number>();
  const [chainId, setChainId] = useState<number>();
  const toast = useToast();

  const getTokenId = useCallback(async () => {
    if (!contractRef.current) return;
    if (!account) return;
    try {
      const result = await contractRef.current.methods
        .tokenIdOf(account)
        .call();
      const id = parseInt(result);
      setId(id);
      return id;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, [account]);

  const fetchValues = useCallback(async () => {
    if (account) {
      const { data } = await getUser(account);
      setValues(data);
      return data;
    }
  }, [account]);

  const connect = useCallback(
    async (privateKey?: string) => {
      providerRef.current = (window as any).ethereum;
      // get wallet provider from privatekey
      if (privateKey) {
        providerRef.current = new HDWalletProvider({
          privateKeys: [privateKey],
          providerOrUrl: RPC,
        });
      }
      const provider = providerRef.current as any;

      if (!provider) return;
      try {
        const web3 = new Web3(provider);
        let accounts;
        try {
          accounts = await web3.eth.requestAccounts();
        } catch (e) {
          accounts = await web3.eth.getAccounts();
        }

        if (accounts?.length === 0) {
          toast({
            title:
              "Failed to get accounts info from wallet. Make sure you've unlocked your wallet",
            duration: 3000,
            status: "error",
          });
        }

        const fetchedAccount = web3.utils.toChecksumAddress(accounts[0]);

        contractRef.current = new Contract(ABI, CONTRACT_ADDRESS, {
          from: fetchedAccount,
        });
        contractRef.current.setProvider(providerRef.current);

        setAccount(fetchedAccount);

        let chainIdBN = await web3.eth.getChainId();
        let currentChaindId = +chainIdBN.toString(10);
        if (currentChaindId && currentChaindId !== CHAIN_ID) {
          try {
            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x" + CHAIN_ID.toString(16) }],
            });
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
              try {
                await provider.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: CHAIN_ID,
                      chainName: "Arbitrum",
                      rpcUrls: ["https://arb1.arbitrum.io/rpc"],
                    },
                  ],
                });
                await provider.request({
                  method: "wallet_switchEthereumChain",
                  params: [{ chainId: "0x" + CHAIN_ID.toString(16) }],
                });
              } catch (addError) {
                // handle "add" error
              }
            }
            // handle other "switch" errors
          }
          chainIdBN = await web3.eth.getChainId();
          currentChaindId = +chainIdBN.toString(10);
        }

        setChainId(+currentChaindId.toString(10));
      } catch (e) {
        console.error(e);
      }
    },
    [toast]
  );

  const sign = useCallback(
    async (message: string) => {
      providerRef.current = (window as any).ethereum;
      const provider = providerRef.current as any;
      if (!provider) return null;
      if (account) {
        const web3 = new Web3(provider);
        // @ts-expect-error
        const result = await web3.eth.personal.sign(
          web3.utils.utf8ToHex(message),
          account,
          ""
        );
        return typeof result === "string" ? result : result.signature;
      }
      return null;
    },
    [account]
  );

  // detect account switch
  useEffect(() => {
    if (!providerRef.current) return;
    const provider = providerRef.current;
    // not support events
    if (!provider.on || typeof provider.on !== "function") return;

    const accountChangedhandler = (accounts: string[]) => {
      console.log(`Account changed to: ${accounts[0]}`);
      setAccount(accounts[0]);
    };
    const networkChangedhandler = (networkId: string) => {
      console.log(`Account changed to: ${networkId}`);
      setChainId(parseInt(networkId, 10));
    };
    provider.on("accountsChanged", accountChangedhandler);
    provider.on("networkChanged", networkChangedhandler);
    return () => {
      provider.removeListener("accountChanged", accountChangedhandler);
      provider.removeListener("networkChanged", networkChangedhandler);
    };
  }, [account]);

  // auto wallet connection
  useEffect(() => {
    if (localStorage.getItem("auth") != null) connect();
  }, [connect]);

  // check chain id
  useEffect(() => {
    if (chainId && chainId !== CHAIN_ID) {
      toast({
        title: "Wrong network detected, please switch to Arbitrum network.",
        duration: 5000,
        status: "error",
      });
    }
  }, [chainId, toast]);

  return (
    <AccountContext.Provider
      value={{
        account,
        id,
        connect,
        sign,
        getTokenId,
        fetchValues,
        setValues,
        values,
      }}
    >
      <Component {...props} />
    </AccountContext.Provider>
  );
};

export default AccountContext;
export { withAccountContext };

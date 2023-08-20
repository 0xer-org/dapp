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

interface TokenContextType {
  account?: string;
  id?: number;
  connect: (privateKey?: string) => void;
  values?: string;
}

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID || "0", 10);
const RPC = process.env.REACT_APP_RPC || "";

const TokenContext = createContext<TokenContextType>({
  connect: () => {},
});

const withTokenContext = (Component: ComponentType) => (props: any) => {
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
      return id;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, [account]);

  const updateTokenInfo = useCallback(
    async (id?: number) => {
      if (id && account) {
        setId(id);
        getUser(account).then(({ data }) => setValues(data));
      } else {
        setId(undefined);
        setValues("");
      }
    },
    [account]
  );

  const connect = useCallback(async (privateKey?: string) => {
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
      // backward compatibility for hdwallet
      const web3 = new Web3(provider);
      const accounts = await web3.eth.getAccounts();

      contractRef.current = new Contract(ABI, CONTRACT_ADDRESS, {
        from: accounts[0],
      });
      contractRef.current.setProvider(providerRef.current);

      setAccount(accounts[0]);

      const chainId = await web3.eth.getChainId();
      setChainId(+chainId.toString(10));
    } catch (e) {
      console.error(e);
    }
  }, []);

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
    // connect();
  }, [connect]);

  // check mint status
  useEffect(() => {
    getTokenId().then(updateTokenInfo);
  }, [getTokenId, updateTokenInfo]);

  // check chain id
  useEffect(() => {
    if (chainId && chainId !== CHAIN_ID) {
      console.log(chainId, CHAIN_ID);
      toast({
        title: "Wrong network detected, please switch to Arbitrum network.",
        duration: 5000,
        status: "error",
      });
    }
  }, [chainId, toast]);

  return (
    <TokenContext.Provider value={{ account, id, connect, values }}>
      <Component {...props} />
    </TokenContext.Provider>
  );
};

export default TokenContext;
export { withTokenContext };

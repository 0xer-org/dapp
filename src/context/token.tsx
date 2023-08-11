import {
  ComponentType,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Contract from "web3-eth-contract";
import ABI from "@/abi.json";
import { useToast } from "@chakra-ui/react";

interface TokenContextType {
  account?: string;
  id?: number;
  connect: () => void;
  mint: () => void;
  values?: string;
}

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID || "0", 10);

const TokenContext = createContext<TokenContextType>({
  connect: () => {},
  mint: () => {},
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
      if (id) {
        setId(id);
        const { data } = await fetch(
          `${SERVER_URL}/0xer/${account}/validation`
        ).then((response) => response.json());
        setValues(data);
      } else {
        setId(undefined);
        setValues("");
      }
    },
    [account]
  );

  const connect = useCallback(async () => {
    providerRef.current = (window as any).ethereum;
    const provider = providerRef.current as any;
    if (!provider) return;
    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      contractRef.current = new Contract(ABI, CONTRACT_ADDRESS, {
        from: accounts[0],
      });
      contractRef.current.setProvider(providerRef.current);

      setAccount(accounts[0]);

      const chainId = await provider.request({ method: "eth_chainId" });
      setChainId(parseInt(chainId, 16));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const mint = useCallback(async () => {
    if (!contractRef.current) return;
    const { transactionHash } = await contractRef.current.methods
      .claim()
      .send()
      .on("confirmation", async () => {
        const tokenId: any = await getTokenId();
        // create user record
        await fetch(`${SERVER_URL}/0xer/${account}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId }),
        })
          .then((response) => response.json())
          .then(console.log);
        updateTokenInfo(tokenId);
      });
    return transactionHash;
  }, [account, getTokenId, updateTokenInfo]);

  // detect account switch
  useEffect(() => {
    if (!providerRef.current) return;
    const provider = providerRef.current;
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
    <TokenContext.Provider value={{ account, id, connect, mint, values }}>
      <Component {...props} />
    </TokenContext.Provider>
  );
};

export default TokenContext;
export { withTokenContext };

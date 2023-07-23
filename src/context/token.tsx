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

interface TokenContextType {
  account?: string;
  id?: number;
  connect: () => void;
  mint: () => void;
  values?: string;
}

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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

  const fetchTokenInfo = useCallback(async () => {
    if (!contractRef.current) return;
    if (!account) return;
    try {
      const result = await contractRef.current.methods
        .tokenIdOf(account)
        .call();
      const id = parseInt(result);
      setId(id);
      const { data } = await fetch(
        `${SERVER_URL}/0xer/${account}/validation`
      ).then((response) => response.json());

      setValues(data);
      return id;
    } catch (e) {
      console.error(e);
    }
  }, [account]);

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
        const tokenId: any = await fetchTokenInfo();
        // create user record
        fetch(`${SERVER_URL}/0xer/${account}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId }),
        });
      });
    return transactionHash;
  }, [account, fetchTokenInfo]);

  // detect account switch
  useEffect(() => {
    if (!providerRef.current) return;
    const provider = providerRef.current;
    const handler = (accounts: string[]) => {
      console.log(`Account changed to: ${accounts[0]}`);
      setAccount(accounts[0]);
    };
    provider.on("accountsChanged", handler);
    return () => provider.removeListener("accountChanged", handler);
  }, []);

  // auto wallet connection
  useEffect(() => {
    // connect();
  }, [connect]);

  // check mint status
  useEffect(() => {
    fetchTokenInfo();
  }, [fetchTokenInfo]);

  return (
    <TokenContext.Provider value={{ account, id, connect, mint, values }}>
      <Component {...props} />
    </TokenContext.Provider>
  );
};

export default TokenContext;
export { withTokenContext };

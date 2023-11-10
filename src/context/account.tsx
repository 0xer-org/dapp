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

interface AccountInfo {
  data: string;
  updatedAt?: number;
}
interface AccountContextType {
  account?: string;
  id?: number;
  sign: (message: string) => Promise<string | null>;
  submit: (signature: string) => Promise<string | null>;
  connect: (privateKey?: string) => void;
  getTokenId: () => Promise<number | undefined>;
  getLastSyncTime: () => Promise<number | undefined>;
  fetchValues: () => Promise<string | undefined>;
  setAccountInfo: (param: any) => void;
  accountInfo?: AccountInfo;
}

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID || "0", 10);
const RPC = process.env.REACT_APP_RPC || "";
const RPC_L1 = process.env.REACT_APP_RPC_L1 || "";

const AccountContext = createContext<AccountContextType>({
  connect: () => {},
  sign: async () => null,
  submit: async () => null,
  getTokenId: async () => undefined,
  getLastSyncTime: async () => undefined,
  fetchValues: async () => undefined,
  setAccountInfo: (info: AccountInfo) => undefined,
});

const withAccountContext = (Component: ComponentType) => (props: any) => {
  const providerRef = useRef<any>();
  const contractRef = useRef<any>();
  const [account, setAccount] = useState<string>();
  const [accountInfo, setAccountInfo] = useState<AccountInfo>();
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
      const { data, updated_at: updatedAt } = await getUser();
      setAccountInfo({ data, updatedAt });
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

  const submit = useCallback(
    async (signature: string) => {
      if (!accountInfo) return;
      const contract = contractRef.current;
      if (!account || !contract) return;
      const id = await getTokenId();
      try {
        const { transactionHash } = await contract.methods
          .update(id, `0x${accountInfo.data}`, signature)
          .send();
        return transactionHash;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    [account, getTokenId, accountInfo]
  );

  const getLastSyncTime = useCallback(async () => {
    if (!accountInfo) return;
    const contract = contractRef.current;
    if (!account || !contract) return;
    providerRef.current = (window as any).ethereum;
    const provider = providerRef.current as any;
    if (!provider) return;

    try {
      const blockNumber = await contract.methods
        .getLastSyncTime(account)
        .call();
      const blockInfo = (await fetch(RPC_L1, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: "eth_getBlockByNumber",
          params: [`0x${blockNumber.toString(16)}`, false],
          jsonrpc: "2.0",
          id: 1,
        }),
      }).then((response) => response.json())) as any;
      return parseInt(blockInfo.result.timestamp, 16) * 1000;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }, [account, accountInfo]);

  // detect account switch
  useEffect(() => {
    if (!providerRef.current) return;
    const provider = providerRef.current;
    // not support events
    if (!provider.on || typeof provider.on !== "function") return;

    const accountChangedhandler = (accounts: string[]) => {
      console.log(`Account changed to: ${accounts[0]}`);
      localStorage.removeItem("auth");
      setAccount(accounts[0]);
    };
    const networkChangedhandler = (networkId: string) => {
      console.log(`Account changed to: ${networkId}`);
      localStorage.removeItem("auth");
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
        submit,
        getTokenId,
        getLastSyncTime,
        fetchValues,
        setAccountInfo,
        accountInfo,
      }}
    >
      <Component {...props} />
    </AccountContext.Provider>
  );
};

export default AccountContext;
export { withAccountContext };

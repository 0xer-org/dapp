import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import Contract from "web3-eth-contract";
import ABI from "./abi.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;

function App() {
  const providerRef = useRef();
  const contractRef = useRef<any>();
  const [account, setAccount] = useState<string>();
  const [txHash, setTxHash] = useState<string>();
  const [tokenInfo, setTokenInfo] = useState<{ id: number; uri: string }>();

  const fetchTokenInfo = useCallback(() => {
    if (!contractRef.current) return;
    if (!account) return;
    contractRef.current.methods
      .tokenIdOf(account)
      .call()
      .then(async (result: string) => {
        const id = parseInt(result);
        const uri = await contractRef.current.methods.tokenURI(id).call();
        const json = await fetch(uri).then((response) => response.json());
        setTokenInfo({ id, uri: json.image });
      })
      .catch(console.error);
  }, [account]);

  const onConnect = useCallback(async () => {
    providerRef.current = (window as any).ethereum;
    const provider = providerRef.current as any;
    if (!provider) return;

    const accounts = await provider.request({ method: "eth_requestAccounts" });
    contractRef.current = new Contract(ABI, CONTRACT_ADDRESS, {
      from: accounts[0],
    });
    contractRef.current.setProvider(providerRef.current);

    setAccount(accounts[0]);
  }, []);

  const onMint = useCallback(async () => {
    if (!contractRef.current) return;
    const { transactionHash } = await contractRef.current.methods
      .claim()
      .send()
      .on("receipt", ({ transactionHash }: { transactionHash: string }) =>
        setTxHash(transactionHash)
      )
      .on("confirmation", fetchTokenInfo);
    // eslint-disable-next-line
    setTxHash(transactionHash);
  }, [fetchTokenInfo]);

  // auto wallet connection
  useEffect(() => {
    onConnect();
  }, [onConnect]);

  // check mint status
  useEffect(() => {
    fetchTokenInfo();
  }, [fetchTokenInfo]);

  return (
    <Flex height="100vh" width="100vw">
      <Flex
        flexDir="column"
        alignItems="center"
        shadow="md"
        w={500}
        h={300}
        m="auto"
      >
        <Text>{account}</Text>
        {!contractRef.current && "Contract initializing ..."}
        {txHash && `Minting: tx hash ${txHash}`}
        {!!tokenInfo?.id && `Minted: token id #${tokenInfo?.id}`}
        {!!tokenInfo?.id && <Image src={tokenInfo.uri} />}

        {!!account || (
          <Button mt={3} onClick={onConnect}>
            Connect Wallet
          </Button>
        )}
        {!!tokenInfo?.id || (
          <Button mt={3} onClick={onMint}>
            Mint
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default App;

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Contract from "web3-eth-contract";
import ABI from "./abi.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const shortenAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

const App = () => {
  const providerRef = useRef<any>();
  const contractRef = useRef<any>();
  const [account, setAccount] = useState<string>();
  const [txHash, setTxHash] = useState<string>();
  const [values, setValues] = useState<number[]>(new Array(256).fill(0));
  const [tokenInfo, setTokenInfo] = useState<{ id: number; uri: string }>();

  const fetchTokenInfo = useCallback(async () => {
    if (!contractRef.current) return;
    if (!account) return;
    try {
      const result = await contractRef.current.methods
        .tokenIdOf(account)
        .call();
      const id = parseInt(result);
      const uri = await contractRef.current.methods.tokenURI(id).call();
      const json = await fetch(uri).then((response) => response.json());
      const fetched = { id, uri: json.image };
      setTokenInfo(fetched);
      return fetched;
    } catch (e) {
      console.error(e);
    }
  }, [account]);

  const changeValue = useCallback(
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = parseInt(e.target.value || "0");
      if (newValue < 0) newValue = 0;
      if (newValue > 256) newValue = 255;
      const newValues = values.slice();
      newValues[index] = newValue;
      setValues(newValues);
    },
    [values]
  );

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
      .on("confirmation", async () => {
        const fetched: any = await fetchTokenInfo();
        const { tokenId } = fetched || {};
        // create user record
        fetch(`${SERVER_URL}/0xer/${account}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tokenId }),
        });
      });
    setTxHash(transactionHash);
  }, [account, fetchTokenInfo]);

  const onSubmit = useCallback(async () => {
    const provider = providerRef.current;
    if (!provider) return;
    const hash = values
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("");
    await fetch(`${SERVER_URL}/0xer/${account}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: hash }),
    }).then((response) => response.json());
    const { data: raw, signature } = await fetch(
      `${SERVER_URL}/0xer/${account}/validation`
    ).then((response) => response.json());

    const data = "0x" + raw;

    contractRef.current.methods
      .update(tokenInfo?.id, data, signature)
      .send()
      .on("confirmation", fetchTokenInfo)
      .catch(console.error);
  }, [account, fetchTokenInfo, tokenInfo?.id, values]);

  // auto wallet connection
  useEffect(() => {
    onConnect();
  }, [onConnect]);

  // check mint status
  useEffect(() => {
    fetchTokenInfo();
  }, [fetchTokenInfo]);

  // detect account switch
  useEffect(() => {
    if (!providerRef.current) return;
    const provider = providerRef.current;
    const handler = (accounts: string[]) => {
      console.log(`Account changed to: ${accounts[0]}`);
      setAccount(accounts[0]);
      fetchTokenInfo();
    };
    provider.on("accountsChanged", handler);
    return () => provider.removeListener("accountChanged", handler);
  }, [fetchTokenInfo]);

  return (
    <Box>
      <Flex
        height="56px"
        bg="blue.300"
        alignItems="center"
        justify="space-between"
        px={4}
      >
        <Text fontSize="1.5rem">0xer</Text>
        <Box>
          {account ? (
            shortenAddress(account)
          ) : (
            <Button mt={3} onClick={onConnect}>
              Connect Wallet
            </Button>
          )}
        </Box>
      </Flex>
      <Box m="auto" p={4}>
        {!contractRef.current && "Contract initializing ..."}
        {txHash && `Minting: tx hash ${txHash}`}
        {!!tokenInfo?.id ? (
          <Flex>
            <Box flex={1}>
              <Text fontSize="1.5rem" align="center">
                0xer #{tokenInfo?.id}
              </Text>
              <Image src={tokenInfo.uri} width={800} />
            </Box>
            <Box flex={1}>
              <Text fontSize="1.5rem" align="center">
                Set values
              </Text>
              <SimpleGrid columns={16} spacing={1} my={2}>
                {values.map((value, index) => (
                  <Box key={index}>
                    <Input
                      value={value}
                      onChange={changeValue(index)}
                      type="number"
                      height={8}
                      py={1}
                      px={0}
                    />
                  </Box>
                ))}
              </SimpleGrid>
              <Flex justify="end">
                <Button onClick={onSubmit}>Sign and submit</Button>
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Flex justify="center">
            <Button mt={3} onClick={onMint}>
              Claim your identity
            </Button>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default App;

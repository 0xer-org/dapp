import Contract from "web3-eth-contract";
import ABI from "@/abi.json";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS;
const RPC = process.env.REACT_APP_RPC || "";

const contract = new Contract(ABI, CONTRACT_ADDRESS);
contract.setProvider(RPC);

const getTotalMint = async () =>
  contract.methods
    .totalSupply()
    .call()
    .then((result) => Promise.resolve(Number(result as any)));

export default getTotalMint;

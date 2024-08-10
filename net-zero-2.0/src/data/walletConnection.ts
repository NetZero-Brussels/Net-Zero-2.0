import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import {NetZeroGovernerABI} from "./NetZeroGovernerABI";
import { baseSepolia } from "thirdweb/chains";

const myChain = defineChain({
    id: 84532,
    rpc: "https://virtual.base-sepolia.rpc.tenderly.co/ded2449a-54e0-4c7d-97ce-c8fd0cd26cd2",
});



const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID!,
});


export const NetZeroContract = getContract({
    address: "0x60423e0B9FB597c35249C86fF0249dcA66C07292",
    chain: baseSepolia,
    client,
});


export const NetZeroContractWithAbi = getContract({
    client: client,
    chain: defineChain(84532), 
    address: "0x60423e0B9FB597c35249C86fF0249dcA66C07292",
});

export const TestContract = getContract({
    client: client,
    chain: defineChain(84532), 
    address: "0x3664177eD5cf20D93963e45A00Ba561dbfBaCd1d",
});
import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import {NetZeroGovernerABI} from "./NetZeroGovernerABI";
import { baseSepolia } from "thirdweb/chains";

const myChain = defineChain({
    id: 84532,
    rpc: "https://virtual.base-sepolia.rpc.tenderly.co/ded2449a-54e0-4c7d-97ce-c8fd0cd26cd2",
});

export const NETZEROADDRESS = "0x7cA95E87F3A95f4689C6b860CA259A68A5D4c5D7";


const baseSepoliaChain = defineChain({
    id: 84532,
    rpc: "https://base-sepolia.g.alchemy.com/v2/pkHx6pj0u2G76QD14i_eIH91oYZAsXqc",
});


const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID!,
});


export const NetZeroContract = getContract({
    address: NETZEROADDRESS,
    chain: baseSepolia,
    client,
});


export const NetZeroContractRPC = getContract({
    client: client,
    chain: baseSepoliaChain, 
    address: NETZEROADDRESS,
});


export const TestContract = getContract({
    client: client,
    chain: defineChain(84532), 
    address: "0x3664177eD5cf20D93963e45A00Ba561dbfBaCd1d",
});
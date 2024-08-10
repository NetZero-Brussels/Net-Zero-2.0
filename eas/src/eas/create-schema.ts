import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import { config } from 'dotenv'; 

const { PRIVATE_KEY, SCHEMA_REGISTRY_CONTRACT_ADDRESS } = process.env;

const schemaRegistryContractAddress = "0xYourSchemaRegistryContractAddress";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

const signer = new ethers.Wallet(PRIVATE_KEY as string);

schemaRegistry.connect(signer);

const schema = "uint256 eventId, uint8 voteIndex";
// const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
const revocable = true;

const transaction = await schemaRegistry.register({
  schema,
  resolverAddress: SCHEMA_REGISTRY_CONTRACT_ADDRESS,
  revocable,
});

// Optional: Wait for transaction to be validated
await transaction.wait();
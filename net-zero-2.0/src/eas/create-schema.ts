import { EAS, Offchain, SchemaEncoder, SchemaRegistry } from '@ethereum-attestation-service/eas-sdk';
import { ethers, Provider } from 'ethers';


//base sepolia
export const EASContractAddress = '0x4200000000000000000000000000000000000021';
export const SchemaRegistryContractAddress = '0x4200000000000000000000000000000000000020'

// Initialize the sdk with the address of the EAS Schema contract address
const eas = new EAS(EASContractAddress);

const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL || 'https://base-sepolia.g.alchemy.com/v2/pkHx6pj0u2G76QD14i_eIH91oYZAsXqc';

// Gets a default provider (in production use something else like infura/alchemy)
const provider = ethers.getDefaultProvider('sepolia');

// Connects an ethers style provider/signingProvider to perform read/write functions.
// MUST be a signer to do write operations!
eas.connect(provider);
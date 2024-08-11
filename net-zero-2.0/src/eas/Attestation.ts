import { EAS, SchemaEncoder, TransactionSigner } from "@ethereum-attestation-service/eas-sdk";

export const EASContractAddress = '0x4200000000000000000000000000000000000021';
export const SchemaRegistryContractAddress = '0x4200000000000000000000000000000000000020';
export const SCHEMA_UUID = '0xf6c549f2ebc46565727b07f1fbb85b66beefe127336da2f7779f305db60c9a41';

// Utility function to create an attestation
export async function createAttestation({
    easContractAddress,
    schemaUID,
    providerOrSigner,
    recipientAddress,
    donationAmount,
    hasSufficientFunds,
    institutionAddress,
    expirationTime = 0, // Default to no expiration
    revocable = true, // Default to revocable
  }: {
    easContractAddress: string;
    schemaUID: string;
    providerOrSigner: TransactionSigner;
    recipientAddress: string;
    donationAmount: number;
    hasSufficientFunds: boolean;
    institutionAddress: string;
    expirationTime?: number;
    revocable?: boolean;
  }) {
    // Initialize the EAS SDK with the contract address
    const eas = new EAS(easContractAddress);
    eas.connect(providerOrSigner);
  
    // Define the schema string
    const schemaString = "uint64 donationAmount, bool hasSufficientFunds, address institutionAddress";
  
    // Initialize SchemaEncoder with the schema string
    const schemaEncoder = new SchemaEncoder(schemaString);
  
    // Encode the data according to your schema
    const encodedData = schemaEncoder.encodeData([
      { name: "donationAmount", value: donationAmount, type: "uint64" },
      { name: "hasSufficientFunds", value: hasSufficientFunds, type: "bool" },
      { name: "institutionAddress", value: institutionAddress, type: "address" },
    ]);
  
    try {
      // Create the attestation
      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: recipientAddress,
          expirationTime: BigInt(0),
          revocable: true,
          data: encodedData,
        },
      });
  
      // Wait for the transaction to be mined
      const newAttestationUID = await tx.wait();
  
      // Return the UID of the new attestation
      return newAttestationUID;
    } catch (error) {
      console.error("Error creating attestation:", error);
      throw new Error("Failed to create attestation");
    }
  }
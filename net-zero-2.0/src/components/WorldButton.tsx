// import type { any } from "./api/verify";
import { IonButton } from "@ionic/react";
import { IDKitWidget } from "@worldcoin/idkit";
import { ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { defineChain, getContract, prepareContractCall } from "thirdweb";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { decodeAbiParameters, parseAbiParameters } from "viem";
import React, { ReactElement } from "react";

interface WorldButtonProps {
  children: ReactElement;
  projectId: number;
  voteCount: number;
}

const myChain = defineChain({
  id: 84532,
  rpc: "https://virtual.base-sepolia.rpc.tenderly.co/ded2449a-54e0-4c7d-97ce-c8fd0cd26cd2",
});

export const WorldButton: React.FC<WorldButtonProps> = ({
  children,
  projectId,
  voteCount,
}) => {
  const activeAccount = useActiveAccount();

  const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID!,
  });

  const contract = getContract({
    //TODO: Change address to worldcoin router
    address: "0xd9319196f7c7f71632086fefb67438aafbd86593",
    //TODO: Change chain to specific tenderly testchain
    chain: myChain,
    client,
  });

  const { mutate: sendTx, data: transactionResult } = useSendTransaction();

  const submitTx = (proof: ISuccessResult) => {
    let projectIdBig = BigInt(projectId);
    let voteCountBig = BigInt(voteCount);
    console.log("Sending transaction");
    console.log(projectIdBig, voteCountBig);
    const transaction = prepareContractCall({
      contract,
      method:
        "function verifyAndExecuteVote(address signal, uint256 root, uint256 nullifierHash, uint256[8] calldata proof, uint64 projectId, uint64 voteCount)",
      params: [
        activeAccount?.address!,
        BigInt(proof!.merkle_root),
        BigInt(proof!.nullifier_hash),
        decodeAbiParameters(
          parseAbiParameters("uint256[8]"),
          proof!.proof as `0x${string}`
        )[0],
        projectIdBig,
        voteCountBig,
      ],
    });

    sendTx(transaction);
    console.log("Transaction sent");
    console.log(transactionResult);
  };

  return (
    <IDKitWidget
      app_id={`app_staging_3d6b9391a6fc1feba657f05a206f61e0`} // this is your app id from the Developer Portal
      action={process.env.REACT_PUBLIC_ACTION!} // this is your action name from the Developer Portal
      signal={"user_value"} // any arbitrary value the user is committing to, e.g. a vote
      onSuccess={submitTx}
      verification_level={VerificationLevel.Device} // minimum verification level accepted, defaults to "orb"
    >
      {/* {({ open }: any) => (
        <IonButton onClick={open}>Verify with World ID</IonButton>
      )} */}
      {({ open }: { open: () => void }) =>
        React.cloneElement(children, { onClick: open })
      }
    </IDKitWidget>
  );
};

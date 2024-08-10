// import type { any } from "./api/verify";
import { IonButton } from "@ionic/react";
import { IDKitWidget } from "@worldcoin/idkit";
import { ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { getContract, prepareContractCall } from "thirdweb";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";
import { decodeAbiParameters, parseAbiParameters } from "viem";
import React, { ReactElement } from "react";

interface WorldButtonProps {
  children: ReactElement;
  projectId: number;
  voteCount: number;
}

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
    address: "0x...",
    //TODO: Change chain to specific tenderly testchain
    chain: baseSepolia,
    client,
  });

  const { mutate: sendTx, data: transactionResult } = useSendTransaction();

  const submitTx = (proof: ISuccessResult) => {
    //TODO: infer projectId and voteCount from the UI
    let projectIdBig = BigInt(projectId);
    let voteCountBig = BigInt(voteCount);

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
  };

  return (
    <IDKitWidget
      app_id={`app_${process.env.REACT_PUBLIC_APP_ID!}`} // this is your app id from the Developer Portal
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

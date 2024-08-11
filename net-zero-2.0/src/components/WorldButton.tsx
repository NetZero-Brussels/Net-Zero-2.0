import { IDKitWidget } from "@worldcoin/idkit";
import { ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { prepareContractCall } from "thirdweb";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import { decodeAbiParameters, parseAbiParameters } from "viem";
import React, { ReactElement } from "react";
import { NetZeroContractRPC } from "../data/walletConnection";

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

  const { mutate: sendTx, data: transactionResult } = useSendTransaction();

  const submitTx = (proof: ISuccessResult) => {
    let projectIdBig = BigInt(projectId);
    let voteCountBig = BigInt(voteCount);
    const transaction = prepareContractCall({
      contract: NetZeroContractRPC,
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
    console.log(proof);
    console.log(transaction);
    sendTx(transaction);
    console.log("Transaction sent");
    console.log(transactionResult);
  };

  return (
    <IDKitWidget
      app_id={`app_staging_3d6b9391a6fc1feba657f05a206f61e0`} // this is your app id from the Developer Portal
      action={process.env.REACT_PUBLIC_ACTION!} // this is your action name from the Developer Portal
      signal={activeAccount?.address!} // any arbitrary value the user is committing to, e.g. a vote
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

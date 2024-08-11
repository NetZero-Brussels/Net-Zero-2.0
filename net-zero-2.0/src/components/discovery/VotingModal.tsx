import { useState } from "react";
import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";
import { prepareContractCall } from "thirdweb";
import { NetZeroContractRPC } from "../../data/walletConnection";
import {
  TransactionButton,
  useActiveAccount,
  useSendTransaction,
} from "thirdweb/react";
import { decodeAbiParameters, parseAbiParameters } from "viem";

const VotingModal = ({ isOpen, onClose, onSubmit, projectId }: any) => {
  const [voteCount, setVoteCount] = useState("");
  const [proof, setProof] = useState<ISuccessResult | null>(null);

  const activeAccount = useActiveAccount();

  const { mutate: sendTx, data: transactionResult } = useSendTransaction();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(voteCount);
    setVoteCount("");
  };

  const submitTx = (proof: ISuccessResult) => {
    setProof(proof);
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter Vote Count</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min="1"
            value={voteCount}
            onChange={(e) => setVoteCount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Number of votes"
            required
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded mr-2"
            >
              Cancel
            </button>
            <IDKitWidget
              app_id={`app_staging_3d6b9391a6fc1feba657f05a206f61e0`} // this is your app id from the Developer Portal
              action={process.env.REACT_PUBLIC_ACTION!} // this is your action name from the Developer Portal
              signal={"user_value"} // any arbitrary value the user is committing to, e.g. a vote
              onSuccess={submitTx}
              verification_level={VerificationLevel.Device} // minimum verification level accepted, defaults to "orb"
            >
              {({ open }: any) => (
                <button onClick={open}>Verify with World ID</button>
              )}
            </IDKitWidget>

            {proof && (
              <TransactionButton
                transaction={() => {
                  // Create a transaction object and return it
                  let projectIdBig = BigInt(projectId);
                  let voteCountBig = BigInt(voteCount);
                  const tx = prepareContractCall({
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
                  console.log(tx);
                  return tx;
                }}
                onTransactionSent={(result) => {
                  console.log("Transaction submitted", result.transactionHash);
                }}
                onTransactionConfirmed={(receipt) => {
                  console.log("Transaction confirmed", receipt.transactionHash);
                }}
                onError={(error) => {
                  console.log(activeAccount);
                  console.error("Transaction error", error);
                }}
              >
                Confirm Profile
              </TransactionButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VotingModal;

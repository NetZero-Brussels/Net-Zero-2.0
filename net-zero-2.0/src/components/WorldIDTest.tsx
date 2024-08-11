import { NetZeroGovernerABI } from "../data/NetZeroGovernerABI";
import { ConnectKitButton } from "connectkit";
import {
  IDKitWidget,
  ISuccessResult,
  useIDKit,
  VerificationLevel,
} from "@worldcoin/idkit";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  type BaseError,
  WagmiProvider,
} from "wagmi";
import { decodeAbiParameters, parseAbiParameters } from "viem";
import { useState } from "react";
import { NETZEROADDRESS } from "../data/walletConnection";

export default function WorldIDTest() {
  const account = useAccount();
  const { setOpen } = useIDKit();
  const [done, setDone] = useState(false);
  const {
    data: hash,
    isPending,
    error,
    writeContractAsync,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const submitTx = async (proof: ISuccessResult) => {
    try {
      await writeContractAsync({
        address: NETZEROADDRESS,
        account: account.address!,
        abi: NetZeroGovernerABI,
        functionName: "verifyAndExecuteVote",
        args: [
          account.address!,
          BigInt(proof!.merkle_root),
          BigInt(proof!.nullifier_hash),
          decodeAbiParameters(
            parseAbiParameters("uint256[8]"),
            proof!.proof as `0x${string}`
          )[0],
          2,
          1,
        ],
      });
      setDone(true);
    } catch (error) {
      throw new Error((error as BaseError).shortMessage);
    }
  };

  return (
    <div>
      <ConnectKitButton />
      {account.isConnected && (
        <>
          <IDKitWidget
            app_id={`app_staging_3d6b9391a6fc1feba657f05a206f61e0`}
            action={process.env.REACT_PUBLIC_ACTION!}
            signal={account.address}
            onSuccess={submitTx}
            autoClose
            verification_level={VerificationLevel.Device}
          />

          {!done && (
            <button onClick={() => setOpen(true)}>
              {!hash &&
                (isPending
                  ? "Pending, please check your wallet..."
                  : "Verify and Execute Transaction")}
            </button>
          )}

          {hash && <p>Transaction Hash: {hash}</p>}
          {isConfirming && <p>Waiting for confirmation...</p>}
          {isConfirmed && <p>Transaction confirmed.</p>}
          {error && <p>Error: {(error as BaseError).message}</p>}
        </>
      )}
    </div>
  );
}

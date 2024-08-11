import { prepareContractCall } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { NetZeroContractRPC } from "../../data/walletConnection";

export default function DepositFundsButton() {
  return (
    <div className="flex items-center justify-center px-3">
      <TransactionButton
        unstyled
        //Style it for it to be blue #003778 and width 100%
        className="bg-[#003778] text-white w-full rounded-md p-3"
        transaction={() => {
          // TODO Change transaction
          const tx = prepareContractCall({
            contract: NetZeroContractRPC,
            method: "function createInstitution(string memory name)",
            params: [" "],
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
          console.error("Transaction error", error);
        }}
      >
        Deposit Funds
      </TransactionButton>
    </div>
  );
}

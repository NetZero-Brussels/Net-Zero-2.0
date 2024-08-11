import { IonContent, IonPage, IonButton } from "@ionic/react";
import { Header } from "../../components";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import ThirdwebLogIn from "../../components/LogIn";
import { prepareContractCall } from "thirdweb";
import { NetZeroContractRPC } from "../../data/walletConnection";
import { TransactionButton, useActiveAccount } from "thirdweb/react";

export default function OnboardingCompleted() {
  const [walletAddr, setWalletAddr] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string | undefined | null>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const [transaction, setTransaction] = useState<any | null>(null);

  const activeAccount = useActiveAccount();
  useEffect(() => {
    console.log(activeAccount);
    setRole(localStorage.getItem("role")!);
    setName(localStorage.getItem("name")!);
    setWalletAddr(activeAccount?.address);
    console.log("TX done");
  }, [activeAccount]);

  const blockScoutBaseUrl = "https://base-sepolia.blockscout.com/"; // Replace with the actual BlockScout base URL for your network

  function handleBlockScoutRedirect(transaction: any) {
    const url = `${blockScoutBaseUrl}/tx/${transaction!}`;
    window.open(url, "_blank");
  }

  return (
    <IonPage>
      <Header />
      <IonContent>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight * 0.9}
          recycle={false}
          numberOfPieces={400}
          run={true}
        />

        <div className="text-center p-8 justify-center items-center h-full">
          <h1 className="text-2xl font-bold mb-16">Congratulations!</h1>
          <div className="grid gap-10">
            <p className="mb-6">
              You have successfully finish onboarding. Send your first
              transaction to start browsing in Net Zero!
            </p>
            <ThirdwebLogIn />
            {role === "voter" && (
              <>
                <TransactionButton
                  transaction={() => {
                    // Create a transaction object and return it
                    const tx = prepareContractCall({
                      contract: NetZeroContractRPC,
                      method:
                        "function createVoter(string memory name, address walletAddress)",
                      params: [name!, walletAddr!],
                    });

                    console.log(tx);
                    return tx;
                  }}
                  onTransactionSent={(result) => {
                    console.log(
                      "Transaction submitted",
                      result.transactionHash
                    );
                  }}
                  onTransactionConfirmed={(receipt) => {
                    setTransaction(receipt.transactionHash);
                    console.log(
                      "Transaction confirmed",
                      receipt.transactionHash
                    );
                  }}
                  onError={(error) => {
                    console.log(walletAddr);
                    console.error("Transaction error", error);
                  }}
                >
                  Confirm Profile
                </TransactionButton>
                {transaction !== null && (
                  <div className="grid gap-4">
                    <p className="text-green-500">
                      Transaction Hash: {transaction}
                    </p>
                    <button
                      onClick={() => handleBlockScoutRedirect(transaction)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                      View on BlockScout
                    </button>
                    <button
                      onClick={() => window.location.replace("/voter")}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Continue to Dashboard
                    </button>
                  </div>
                )}
              </>
            )}
            {role === "institutional" && (
              <>
                <TransactionButton
                  transaction={() => {
                    // Create a transaction object and return it
                    const tx = prepareContractCall({
                      contract: NetZeroContractRPC,
                      method:
                        "function createInstitution(string memory name, address walletAddress)",
                      params: [name!, walletAddr!],
                    });

                    console.log(tx);
                    return tx;
                  }}
                  onTransactionSent={(result) => {
                    console.log(
                      "Transaction submitted",
                      result.transactionHash
                    );
                  }}
                  onTransactionConfirmed={(receipt) => {
                    setTransaction(receipt.transactionHash);
                    console.log(
                      "Transaction confirmed",
                      receipt.transactionHash
                    );
                  }}
                  onError={(error) => {
                    console.log(walletAddr);
                    console.error("Transaction error", error);
                  }}
                >
                  Confirm Profile
                </TransactionButton>
                {transaction !== null && (
                  <div>
                    <p className="text-green-500">
                      Transaction Hash: {transaction}
                    </p>
                    <button
                      onClick={() => handleBlockScoutRedirect(transaction)}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                      View on BlockScout
                    </button>
                    <button
                      onClick={() => window.location.replace("/institutions")}
                      className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                      Continue to Dashboard
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

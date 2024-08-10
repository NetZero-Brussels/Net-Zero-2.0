import { IonContent, IonPage, IonButton } from "@ionic/react";
import { Header } from "../../components";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import ThirdwebLogIn from "../../components/LogIn";
import {
  sendTransaction,
  getContract,
  prepareTransaction,
  prepareContractCall,
  createThirdwebClient,
  defineChain,
} from "thirdweb";
import {
  NetZeroContract,
  NetZeroContractWithAbi,
  TestContract,
} from "../../data/walletConnection";
import {
  TransactionButton,
  useActiveAccount,
  useSendTransaction
} from "thirdweb/react";
import { baseSepolia } from "thirdweb/chains";

export default function OnboardingCompleted() {
  const [walletAddr, setWalletAddr] = useState<string | undefined>(undefined);
  const [role, setRole] = useState<string | undefined | null>(undefined);
  const [transaction, setTransaction] = useState<any | null>(null);

  const { mutate: sendTx, data: transactionResult } = useSendTransaction();

  const { mutate: sendTransaction, data: tra } = useSendTransaction();

  const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID!,
  });

  /* const client = createThirdwebClient({
    clientId: process.env.REACT_APP_CLIENT_ID!,
  });

  const myChain = defineChain({
    id: 84532,
    rpc: "https://virtual.base-sepolia.rpc.tenderly.co/ded2449a-54e0-4c7d-97ce-c8fd0cd26cd2",
  });

  const NetZeroContract = getContract({
    address: "0xd9319196f7c7f71632086fefb67438aafbd86593",
    chain: myChain,
    client,

  }); */

  const onClickBut = () => {
    console.log("Button clicked");
    const transaction2 = prepareContractCall({
      contract: NetZeroContract,
      method: "function createVoter(string name, address walletAddress)",
      params: ["name", walletAddr!],
      gasPrice: BigInt(100000),
    });
    sendTransaction(transaction2);
    console.log("Transaction sent");
    console.log(tra);
  };

  const onClickBut2 = () => {
    console.log("Button clicked");
    const transaction2 = prepareContractCall({
      contract: NetZeroContract,
      method: "function createVoter(string name, address walletAddress)",
      params: ["name", walletAddr!],
      gasPrice: BigInt(100000),
    });
    sendTransaction(transaction2);
    console.log("Transaction sent");
    console.log(tra);
  };

  const activeAccount = useActiveAccount();
  useEffect(() => {
    console.log(activeAccount);
    setRole(localStorage.getItem("role")!);
    setWalletAddr(activeAccount?.address);
    console.log("TX done");
  }, [activeAccount]);


  /* const handleButtonClick = () => {
    if (role === null || role === undefined) {
      console.log("Role not set");
    } else if (role === "institutional") {
      console.log("Institutional Role set");
      const transaction = prepareContractCall({
        contract: NetZeroContract,
        method:
          "function createInstitution(string memory name, address walletAddress)",
        //TODO: Change the name to the name of the institution
        params: ["to", walletAddr!],
      });
      sendTx(transaction);
      //redirect when the transaction is successful

      //window.location.href = "/institutional";
    } else if (role === "voter") {
      console.log("Voter Role set");
      const transaction = prepareContractCall({
        contract: NetZeroContract,
        method:
          "function createVoter(string memory name, address walletAddress)",
        //TODO: Change the name to the name of the user
        params: ["Fer", walletAddr!],
      });
      sendTx(transaction);
      //redirect when the transaction is successful
      //window.location.href = "/institutional";
    }
  };
 */
  return (
    <IonPage>
      <Header />
      <IonContent>
        {/* make the confeti stop after 5 seconds */}
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
            <button onClick={onClickBut}>Butonsito</button>
            <TransactionButton
              transaction={() => {
                // Create a transaction object and return it
                const tx = prepareContractCall({
                  contract: NetZeroContractWithAbi,
                  method: "function createVoter(string, address)",
                  params: ["Institution", walletAddr!],
                  /* maxFeePerGas: BigInt(30),
                  maxPriorityFeePerGas: BigInt(1),
                  gasPrice: BigInt(1000), */
                });

                console.log(tx);
                return tx;
                /* const tx = prepareTransaction({
                  to: NetZeroContractWithAbi.address,
                  chain: baseSepolia,
                  client: client,
                  method: "function createVoter(string, address)",
                });
                return tx; */
              }}
              onTransactionSent={(result) => {
                console.log("Transaction submitted", result.transactionHash);
              }}
              onTransactionConfirmed={(receipt) => {
                console.log("Transaction confirmed", receipt.transactionHash);
              }}
              onError={(error) => {
                console.log(walletAddr);
                console.error("Transaction error", error);
              }}
            >
              Confirm Transaction
            </TransactionButton>
            <IonButton onClick={() => {}} expand="full" className="normal-case">
              Go to Discovery page
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

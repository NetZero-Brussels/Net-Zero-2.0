import React, { useEffect, useState } from "react";
import bg from "../public/bg.jpeg";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
} from "@ionic/react";
import { Header, ThirdwebLogIn, ThirdwebSignUp } from "../components";
import {
  useActiveAccount,
  useActiveWallet,
  useReadContract,
} from "thirdweb/react";
import { NetZeroContractRPC } from "../data/walletConnection";

export default function LandingPage() {
  const activeAccount = useActiveAccount();
  const [walletAddr, setWalletAddr] = useState<string | undefined>(undefined);

  // Hook to check if the user is registered as a voter
  const { data: isVoter, isLoading: isVoterLoading } = useReadContract({
    contract: NetZeroContractRPC, // Replace with your contract address
    method: "function isVoterRegistered(address userAddress) returns (bool)",
    params: [walletAddr!],
  });

  // Hook to check if the user is registered as an institution
  const { data: isInstitution, isLoading: isInstitutionLoading } =
    useReadContract({
      contract: NetZeroContractRPC, // Replace with your contract address
      method:
        "function isInstitutionRegistered(address institutionAddress) returns (bool)",
      params: [walletAddr!],
    });

  useEffect(() => {
    // Function to check user registration status
    const checkUserRegistration = () => {
      setWalletAddr(activeAccount?.address);

      if (walletAddr) {
        console.log(`User is connected with address: ${walletAddr}`);
        if (!isVoterLoading && !isInstitutionLoading) {
          console.log("User registration status loaded");
          console.log("address: ", walletAddr);
          console.log(`isVoter: ${isVoter}`);
          console.log(`isInstitution: ${isInstitution}`);

          if (isVoter) {
            window.location.href = "/voter";
          } else if (isInstitution) {
            window.location.href = "/institution";
          } else {
            window.location.href = "/onboarding";
          }
        }
      } else {
        console.log("User is not connected");
      }
    };

    // Call the function to check the registration status
    checkUserRegistration();
  }, [
    activeAccount,
    isVoterLoading,
    isInstitutionLoading,
    isVoter,
    isInstitution,
  ]);

  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="mt-16 mb-20 mx-[20%] flex items-center justify-center">
          <div className="object-center text-xl bg-white bg-opacity-30 p-8 rounded-lg shadow-md w-full ">
            <IonText color={"white"}>
              A web3 app that helps neutralize your carbon footprint and offers
              sustainable products to offset carbon emissions.
            </IonText>
          </div>
        </div>
        <div className="mx-[20%] grid gap-12">
          <div className="absolute inset-0 z-[-40]"></div>
          <ThirdwebLogIn />
          <ThirdwebSignUp />
        </div>
        <div className="absolute inset-0 z-[-1]">
          <img src={bg} className="object-cover w-full h-full" alt="bg" />
        </div>
      </IonContent>
    </IonPage>
  );
}

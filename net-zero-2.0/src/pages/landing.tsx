import React, { useEffect, useState } from "react";
import bg from "../public/bg.jpeg";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonRedirect,
  IonText,
} from "@ionic/react";
import { Header, ThirdwebLogIn, ThirdwebSignUp } from "../components";
import { useActiveWallet } from "thirdweb/react";

export default function LandingPage() {
  const wallet = useActiveWallet();

  useEffect(() => {
    // Function to check if the user is connected
    const checkWalletConnection = () => {
      if (wallet) {
        console.log(`User is connected with address: ${wallet}`);
        window.location.href = "/onboarding";
      } else {
        console.log("User is not connected");
      }
    };

    // Call the function to check the connection status
    checkWalletConnection();
  }, [wallet]); // Depend on isConnected and address to re-run the effect if they change

  return (
    <IonPage>
      <Header />
      <IonContent>
        <div className="mt-16 mb-20 mx-[20%] flex items-center justify-center">
          {/* box for the text to be seen correclty */}
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

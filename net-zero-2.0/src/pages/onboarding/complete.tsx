import { IonContent, IonPage, IonButton } from "@ionic/react";
import { Header } from "../../components";
import React from "react";
import Confetti from "react-confetti";
import ThirdwebLogIn from "../../components/LogIn";

export default function OnboardingCompleted() {
  const handleButtonClick = () => {
    // Implement navigation to the discovery page
    window.location.href = "/voter/discovery";
    console.log("Navigate to the discovery page");
  };

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
              You have successfully created your account. Now start browsing Net
              Zero!
            </p>
            <ThirdwebLogIn />
            <IonButton
              onClick={handleButtonClick}
              expand="full"
              className="normal-case"
            >
              Go to Discovery page
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

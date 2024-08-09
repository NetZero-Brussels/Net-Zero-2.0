import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonButton,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import Header from "../../components/header";
import React, { useState } from "react";

export default function LandingPage() {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Selected option:", selectedOption);
    // Add your form submission logic here
    window.location.href = "/onboarding-completed";
  };

  return (
    <IonPage>
      <Header />
      <IonContent style={{ backgroundColor: "white" }}>
        <form onSubmit={handleSubmit} className="w-full p-[10%]">
          <IonRadioGroup
            value={selectedOption}
            onIonChange={(e) => handleOptionChange(e.detail.value)}
          >
            <div>
              <IonCard
                onClick={() => handleOptionChange("institutional")}
                className={`cursor-pointer ${
                  selectedOption === "institutional" ? "border-blue-500" : ""
                }`}
              >
                <IonCardContent>
                  <IonItem lines="none">
                    <IonLabel className="block">
                      <h2 className="text-lg font-bold">Institutional User</h2>
                      <p>Deposit funds and allocation</p>
                    </IonLabel>
                    <IonRadio slot="start" value="institutional" />
                  </IonItem>
                </IonCardContent>
              </IonCard>
              <h5 className="text-[#54BBE9] text-center">Or</h5>
              <IonCard
                onClick={() => handleOptionChange("voter")}
                className={`cursor-pointer ${
                  selectedOption === "voter" ? "border-blue-500" : ""
                }`}
              >
                <IonCardContent>
                  <IonItem lines="none">
                    <IonLabel className="block">
                      <h2 className="text-lg font-bold">Voter</h2>
                      <p>Vote for projects you want to</p>
                    </IonLabel>
                    <IonRadio slot="start" value="voter" />
                  </IonItem>
                </IonCardContent>
              </IonCard>
            </div>
          </IonRadioGroup>

          <IonButton type="submit" expand="full" className="mt-12 normal-case">
            Confirm
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}

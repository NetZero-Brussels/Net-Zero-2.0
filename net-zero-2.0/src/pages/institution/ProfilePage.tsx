import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../../components";
import { CompanyContribution } from "../../components/institution/CompanyContribution";
import IProfileCard from "./profile/ProfileCard";
import ILeaderboardPage from "./profile/ILeaderboardPage";

export default function IProfilePage() {
  return (
    <>
      <Header />
      <IonContent>
        <IProfileCard />
        <CompanyContribution />
        <ILeaderboardPage />
      </IonContent>
    </>
  );
}

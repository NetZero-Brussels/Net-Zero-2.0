import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../../components";
import { MyVotes, ApprovedProjects, OngoingVotes } from "./discovery";

export default function DiscoveryPage() {
  return (
    <IonContent>
      <Header />
      <MyVotes />
      <OngoingVotes />
      <ApprovedProjects />
    </IonContent>
  );
}

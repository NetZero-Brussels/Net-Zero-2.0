import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../../components";
import { MyVotes, ApprovedProjects, OngoingVotes } from "./discovery";
import { DiscoveryHeader } from "../../components/discovery";

export default function DiscoveryPage() {
  return (
    <>
      <Header />
      <IonContent>
        <DiscoveryHeader />
        <MyVotes />
        <OngoingVotes />
        <ApprovedProjects />
      </IonContent>
    </>
  );
}

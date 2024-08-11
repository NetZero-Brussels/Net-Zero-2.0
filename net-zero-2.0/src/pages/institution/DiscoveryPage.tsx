import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../../components";
import { IApprovedProjects, FundedProjects, AllocationList } from "./discovery";
import { IDHeader } from "../../components/institution";

export default function DiscoveryPage() {
  return (
    <>
      <Header />
      <IonContent>
        <IDHeader />
        <FundedProjects />
        <AllocationList />
        <IApprovedProjects />
      </IonContent>
    </>
  );
}

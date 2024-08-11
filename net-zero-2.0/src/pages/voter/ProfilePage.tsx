import { IonContent, IonPage } from "@ionic/react";
import { Header } from "../../components";
import { MyVotes, ApprovedProjects, OngoingVotes } from "./discovery";
import LeaderboardCard from "../../components/profile/LeaderboardCard";
import { PersonalContribution } from "./profile/PersonalContribution";
import UserProfileCard from "./profile/ProfileCard";

export default function ProfilePage() {
  return (
    <>
      <Header />
      <IonContent>
        <UserProfileCard />
        <PersonalContribution />
        <LeaderboardCard />
      </IonContent>
    </>
  );
}

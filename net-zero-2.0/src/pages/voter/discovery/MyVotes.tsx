import { IonButton } from "@ionic/react";
import { VotingCard } from "../../../components/discovery";
import { mockVotingCardData } from "../../../data/votingCardData";

export default function MyVotes() {
  return (
    <div className="mx-[10%] mt-7">
      <div className="flex flex-row mb-4 justify-between items-center">
        <h1 className="text-[28px] font-semibold leading-[32px] text-center ">
          My Votes
        </h1>
        <IonButton className="normal-case h-[80%]" fill="outline">
          View all votes
        </IonButton>
      </div>
      <div className="flex p-1 overflow-y-auto gap-7 whitespace-nowrap snap-proximity snap-y">
        {mockVotingCardData.map((cardData) => (
          <VotingCard
            id={cardData.id}
            name={cardData.name}
            description={cardData.description}
            participants={cardData.participants}
            endTime={cardData.endTime}
          />
        ))}
      </div>
    </div>
  );
}

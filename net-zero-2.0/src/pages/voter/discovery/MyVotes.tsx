import { VotingCard } from "../../../components/discovery";
import { mockVotingCardData } from "../../../data/projectCardData";

export default function MyVotes() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 space-y-6">
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
  );
}

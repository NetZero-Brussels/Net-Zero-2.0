import { OngoingCard } from "../../../components/discovery";
import { mockProjectCardData } from "../../../data/ongoingCardData";

export default function OngoingVotes() {
  return (
    <div className="mx-[10%] mt-7">
      <div className="flex flex-row mb-4 justify-between items-center">
        <h1 className="text-[28px] font-semibold leading-[32px] text-center ">
          Ongoing Voting
        </h1>
      </div>
      <div className="flex p-1 overflow-y-auto gap-7 whitespace-nowrap snap-proximity snap-y">
        {mockProjectCardData.map((project) => (
          <OngoingCard
            id={project.id}
            key={project.id}
            teamName={project.teamName}
            projectName={project.projectName}
            location={project.location}
            energyExport={project.energyExport}
            fundRaiseGoal={project.fundRaiseGoal}
            currentVote={project.currentVote}
            endTime={project.endTime}
            fundedPercentage={project.fundedPercentage}
          />
        ))}
      </div>
    </div>
  );
}
